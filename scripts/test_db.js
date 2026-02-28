import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function test() {
  console.log("Testing hero_content...")
  const { data: hero, error: heroErr } = await supabase.from('hero_content').select('*').single()
  console.log(heroErr ? heroErr : "Hero found: " + hero.id)
  
  console.log("Testing about_stories...")
  const { data: about, error: aboutErr } = await supabase.from('about_stories').select('*')
  console.log(aboutErr ? aboutErr : "About found: " + about.length)
  
  console.log("Testing gallery_items...")
  const { data: gallery, error: galleryErr } = await supabase.from('gallery_items').select('*')
  console.log(galleryErr ? galleryErr : "Gallery found: " + gallery.length)
}

test()
