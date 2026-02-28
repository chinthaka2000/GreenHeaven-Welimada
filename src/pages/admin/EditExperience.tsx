import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// @ts-ignore
import * as Icons from 'lucide-react';

export function EditExperience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [data, setData] = useState<any>({
    title: '',
    slug: '',
    short_desc: '',
    full_desc: '',
    image_url: '',
    icon_name: 'Star',
    tags: [],
    featured: false,
    order_index: 0,
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchExperience();
    }
  }, [id]);

  const fetchExperience = async () => {
    const { data: exp, error } = await supabase.from('experiences').select('*').eq('id', id).single();
    if (!error && exp) {
      setData(exp);
      setTagsInput(exp.tags?.join(', ') || '');
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
      const filePath = `experiences/${fileName}`;

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

    const formattedSlug = data.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const formattedTags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

    const expData = {
      title: data.title,
      slug: formattedSlug,
      short_desc: data.short_desc,
      full_desc: data.full_desc,
      image_url: data.image_url,
      icon_name: data.icon_name,
      tags: formattedTags,
      featured: data.featured,
      order_index: data.order_index,
      updated_at: new Date().toISOString()
    };

    let error;

    if (isNew) {
      const result = await supabase.from('experiences').insert([expData]).select().single();
      error = result.error;
      if (!error && result.data) {
        navigate(`/admin/experiences/${result.data.id}`, { replace: true });
        setMessage('Experience created successfully!');
      }
    } else {
      const result = await supabase.from('experiences').update(expData).eq('id', id);
      error = result.error;
      if (!error) setMessage('Experience updated successfully!');
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
      <button onClick={() => navigate('/admin/experiences')} className="flex items-center gap-2 text-forest-moss/60 hover:text-forest-moss mb-6 font-mono text-sm uppercase tracking-widest transition-colors">
        <ArrowLeft size={16} /> Back to Experiences
      </button>

      <h1 className="font-serif text-3xl text-forest-moss mb-6">{isNew ? 'Create New Experience' : 'Edit Experience'}</h1>

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
              placeholder="e.g. be-a-farmer"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Short Description (for the card)</label>
          <textarea
            required
            value={data.short_desc}
            onChange={(e) => setData({ ...data, short_desc: e.target.value })}
            className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green h-24 bg-white text-forest-moss"
            placeholder="A brief summary of the experience..."
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Full Description (Supports HTML/Text)</label>
          <textarea
            value={data.full_desc}
            onChange={(e) => setData({ ...data, full_desc: e.target.value })}
            className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green h-64 font-sans text-lg leading-relaxed bg-white text-forest-moss"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Icon Name (Lucide string)</label>
            <input
              type="text"
              value={data.icon_name}
              onChange={(e) => setData({ ...data, icon_name: e.target.value })}
              className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green font-mono bg-white text-forest-moss"
              placeholder="e.g. Shovel, Sun, Bike"
            />
          </div>
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Order Index</label>
            <input
              type="number"
              value={data.order_index}
              onChange={(e) => setData({ ...data, order_index: parseInt(e.target.value) || 0 })}
              className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green font-mono bg-white text-forest-moss"
            />
          </div>
          <div>
            <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green font-mono bg-white text-forest-moss"
              placeholder="e.g. Guided, Hands-on"
            />
          </div>
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
            id="featured"
            checked={data.featured}
            onChange={(e) => setData({ ...data, featured: e.target.checked })}
            className="w-5 h-5 accent-sage-green"
          />
          <label htmlFor="featured" className="font-mono text-sm uppercase tracking-widest text-forest-moss cursor-pointer">
            Featured (spans 2 grid columns)
          </label>
        </div>

        <div className="pt-6 border-t border-black/10">
          <button
            type="submit"
            disabled={saving}
            className="bg-forest-moss text-white px-8 py-3 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-black transition-colors"
          >
            {saving ? 'Saving...' : 'Save Experience'}
          </button>
        </div>
      </form>
    </div>
  );
}
