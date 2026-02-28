import fsSync from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (redirectRes) => {
          const file = fsSync.createWriteStream(dest);
          redirectRes.pipe(file);
          file.on('finish', () => file.close(resolve));
        }).on('error', reject);
      } else {
        const file = fsSync.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      }
    }).on('error', reject);
  });
}

function extractIdFromUnsplash(url) {
  const match = url.match(/photo-([a-zA-Z0-9-]+)/);
  return match ? match[1] : null;
}

async function uploadToSupabase(filePath, fileName) {
  const fileContent = await fs.readFile(filePath);
  const ext = path.extname(fileName).toLowerCase();
  let contentType = 'image/jpeg';
  if (ext === '.png') contentType = 'image/png';
  if (ext === '.webp') contentType = 'image/webp';
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload(fileName, fileContent, {
      contentType,
      upsert: true
    });
    
  if (error) {
    console.error(`Failed to upload ${fileName}:`, error);
    return null;
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(fileName);
    
  return publicUrl;
}

async function run() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const sectionsDir = path.join(process.cwd(), 'src', 'components', 'sections');
  
  // Ensure images directory exists
  try {
    await fs.mkdir(imagesDir, { recursive: true });
  } catch (e) {}

  // Find all component files
  const files = await fs.readdir(sectionsDir);
  const modifications = [];
  const urlMap = new Map(); // original URL -> Supabase URL
  
  for (const file of files) {
    if (!file.endsWith('.tsx')) continue;
    
    const filePath = path.join(sectionsDir, file);
    let content = await fs.readFile(filePath, 'utf-8');
    let modified = false;
    
    // Process local images (/images/...)
    const localMatches = [...content.matchAll(/(?:\/images\/)([a-zA-Z0-9_.-]+)/g)];
    for (const match of localMatches) {
      const originalPath = match[0]; // e.g. /images/hero_landscape.png
      const fileName = match[1];
      
      const localFilePath = path.join(imagesDir, fileName);
      try {
        await fs.access(localFilePath);
      } catch (e) {
        console.log(`Local file not found: ${localFilePath}`);
        continue;
      }
      
      if (!urlMap.has(originalPath)) {
        console.log(`Uploading local file: ${fileName}`);
        const sbUrl = await uploadToSupabase(localFilePath, fileName);
        if (sbUrl) urlMap.set(originalPath, sbUrl);
      }
      
      if (urlMap.get(originalPath)) {
        content = content.replaceAll(originalPath, urlMap.get(originalPath));
        modified = true;
      }
    }
    
    // Process Unsplash images
    const unsplashMatches = [...content.matchAll(/https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+(?:[^"'\s]*)/g)];
    for (const match of unsplashMatches) {
      const fullUrl = match[0];
      const id = extractIdFromUnsplash(fullUrl);
      if (!id) continue;
      
      const fileName = `unsplash-${id}.jpg`;
      const localFilePath = path.join(imagesDir, fileName);
      
      if (!urlMap.has(fullUrl)) {
        try {
          await fs.access(localFilePath);
        } catch (e) {
          console.log(`Downloading ${fullUrl}`);
          await downloadImage(fullUrl, localFilePath);
        }
        
        console.log(`Uploading ${fileName}`);
        const sbUrl = await uploadToSupabase(localFilePath, fileName);
        if (sbUrl) urlMap.set(fullUrl, sbUrl);
      }
      
      if (urlMap.get(fullUrl)) {
        content = content.replaceAll(fullUrl, urlMap.get(fullUrl));
        modified = true;
      }
    }
    
    if (modified) {
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`Updated ${file}`);
    }
  }
}

run().catch(console.error);
