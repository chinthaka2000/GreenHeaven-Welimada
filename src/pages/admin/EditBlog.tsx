import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [data, setData] = useState<any>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    published: false,
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    const { data: post, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
    if (!error && post) {
      setData(post);
    }
    setLoading(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let progressInterval: any;
    try {
      setUploading(true);
      setUploadProgress(10);
      setMessage('');
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      progressInterval = setInterval(() => {
        setUploadProgress((prev: number) => Math.min(prev + 10, 90));
      }, 500);

      const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
      clearInterval(progressInterval);

      if (uploadError) throw uploadError;

      setUploadProgress(100);
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
      setData({ ...data, image_url: publicUrl });
      setMessage('Image uploaded successfully! Remember to save changes.');
    } catch (error: any) {
      if (progressInterval) clearInterval(progressInterval);
      setMessage('Error uploading image: ' + error.message);
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 1000);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    // Ensure slug is url-friendly
    const formattedSlug = data.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const postData = {
      title: data.title,
      slug: formattedSlug,
      excerpt: data.excerpt,
      content: data.content,
      image_url: data.image_url,
      published: data.published,
      updated_at: new Date().toISOString()
    };

    let error;

    if (isNew) {
      const result = await supabase.from('blog_posts').insert([postData]).select().single();
      error = result.error;
      if (!error && result.data) {
        navigate(`/admin/blog/${result.data.id}`, { replace: true });
        setMessage('Post created successfully!');
      }
    } else {
      const result = await supabase.from('blog_posts').update(postData).eq('id', id);
      error = result.error;
      if (!error) setMessage('Post updated successfully!');
    }

    if (error) {
      setMessage('Error saving: ' + error.message);
    }
    setSaving(false);
  };

  const generateSlug = () => {
    if (!data.title) return;
    const computedSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    setData({ ...data, slug: computedSlug });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/5">
      <button onClick={() => navigate('/admin/blog')} className="flex items-center gap-2 text-forest-moss/60 hover:text-forest-moss mb-6 font-mono text-sm uppercase tracking-widest transition-colors">
        <ArrowLeft size={16} /> Back to Posts
      </button>

      <h1 className="font-serif text-3xl text-forest-moss mb-6">{isNew ? 'Create New Post' : 'Edit Post'}</h1>

      {message && <div className="mb-6 p-4 rounded-xl bg-sage-green/10 text-forest-moss font-mono text-sm sticky top-4 z-10">{message}</div>}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Title</label>
            <input
              type="text"
              required
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              onBlur={isNew ? generateSlug : undefined}
              className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green text-lg font-bold bg-white text-forest-moss"
            />
          </div>
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">URL Slug</label>
            <input
              type="text"
              required
              value={data.slug}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
              className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green font-mono text-sm bg-white text-forest-moss"
              placeholder="e.g. my-first-post"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Short Excerpt</label>
          <textarea
            required
            value={data.excerpt}
            onChange={(e) => setData({ ...data, excerpt: e.target.value })}
            className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green h-24 bg-white text-forest-moss"
            placeholder="A brief summary of the post..."
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Full Content (Supports HTML/Text)</label>
          <textarea
            required
            value={data.content}
            onChange={(e) => setData({ ...data, content: e.target.value })}
            className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green h-96 font-sans text-lg leading-relaxed bg-white text-forest-moss"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Cover Image</label>
          <div className="space-y-3">
            {data.image_url && (
              <img src={data.image_url} alt="Cover" className="h-48 w-auto object-cover rounded-xl border border-black/10" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-mono file:bg-sage-green file:text-forest-moss hover:file:bg-black hover:file:text-white transition-colors"
            />
            {uploading && (
              <div className="mt-2 space-y-2">
                <div className="flex justify-between text-xs font-mono text-forest-moss/60 uppercase tracking-widest">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-black/5 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-sage-green h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-black/5">
          <input
            type="checkbox"
            id="published"
            checked={data.published}
            onChange={(e) => setData({ ...data, published: e.target.checked })}
            className="w-5 h-5 accent-sage-green"
          />
          <label htmlFor="published" className="font-mono text-sm uppercase tracking-widest text-forest-moss cursor-pointer">
            Publish on website
          </label>
        </div>

        <div className="pt-6 border-t border-black/10">
          <button
            type="submit"
            disabled={saving}
            className="bg-forest-moss text-white px-8 py-3 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-black transition-colors"
          >
            {saving ? 'Saving...' : 'Save Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
