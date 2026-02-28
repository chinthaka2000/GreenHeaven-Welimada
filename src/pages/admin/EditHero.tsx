import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function EditHero() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    const { data: heroData, error } = await supabase.from('hero_content').select('*').single();
    if (!error && heroData) {
      setData(heroData);
    }
    setLoading(false);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let progressInterval: any;
    try {
      setUploading(true);
      setUploadProgress(10);
      setMessage('');
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      progressInterval = setInterval(() => {
        setUploadProgress((prev: number) => Math.min(prev + 10, 90));
      }, 500);

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      clearInterval(progressInterval);

      if (uploadError) {
        throw uploadError;
      }

      setUploadProgress(100);
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

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

    const { error } = await supabase
      .from('hero_content')
      .update({
        headline: data.headline,
        subheadline: data.subheadline,
        badge_text: data.badge_text,
        image_url: data.image_url,
      })
      .eq('id', data.id);

    if (error) {
      setMessage('Error saving: ' + error.message);
    } else {
      setMessage('Successfully saved!');
    }
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data found.</div>;

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/5">
      <h1 className="font-serif text-3xl text-forest-moss mb-6">Edit Hero Section</h1>

      {message && <div className="mb-6 p-4 rounded-xl bg-sage-green/10 text-forest-moss font-mono text-sm">{message}</div>}

      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Badge Text</label>
          <input
            type="text"
            value={data.badge_text}
            onChange={(e) => setData({ ...data, badge_text: e.target.value })}
            className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green bg-white text-forest-moss"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Headline</label>
          <input
            type="text"
            value={data.headline}
            onChange={(e) => setData({ ...data, headline: e.target.value })}
            className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green bg-white text-forest-moss"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Subheadline</label>
          <input
            type="text"
            value={data.subheadline}
            onChange={(e) => setData({ ...data, subheadline: e.target.value })}
            className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green bg-white text-forest-moss"
          />
        </div>
        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Background Image</label>
          <div className="space-y-3">
            {data.image_url && (
              <img src={data.image_url} alt="Hero Background" className="w-full h-48 object-cover rounded-xl border border-black/10" />
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

        <button
          type="submit"
          disabled={saving}
          className="bg-forest-moss text-white px-8 py-3 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-black transition-colors"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
