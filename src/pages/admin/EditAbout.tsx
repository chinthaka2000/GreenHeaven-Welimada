import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function EditAbout() {
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    const { data, error } = await supabase.from('about_stories').select('*').order('order_index');
    if (!error && data) {
      setStories(data);
    }
    setLoading(false);
  };

  const handleUpdate = (id: string, field: string, value: string) => {
    setStories(stories.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleImageUpload = async (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    let progressInterval: any;
    try {
      setUploadingId(id);
      setUploadProgress(10);
      setMessage('');
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `about/${fileName}`;

      progressInterval = setInterval(() => {
        setUploadProgress((prev: number) => Math.min(prev + 10, 90));
      }, 500);

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      clearInterval(progressInterval);

      if (uploadError) throw uploadError;

      setUploadProgress(100);
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      handleUpdate(id, 'image_url', publicUrl);
      setMessage('Image uploaded successfully! Remember to save changes.');
    } catch (error: any) {
      if (progressInterval) clearInterval(progressInterval);
      setMessage('Error uploading image: ' + error.message);
    } finally {
      setTimeout(() => {
        setUploadingId(null);
        setUploadProgress(0);
      }, 1000);
    }
  };

  const handleSave = async (story: any) => {
    setSavingId(story.id);
    setMessage('');

    const { error } = await supabase
      .from('about_stories')
      .update({
        title: story.title,
        heading: story.heading,
        text1: story.text1,
        text2: story.text2,
        image_url: story.image_url,
        img_alt: story.img_alt,
      })
      .eq('id', story.id);

    if (error) {
      setMessage(`Error saving ${story.title}: ` + error.message);
    } else {
      setMessage(`Successfully saved ${story.title}!`);
    }
    setSavingId(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/5">
      <h1 className="font-serif text-3xl text-forest-moss mb-6">Edit About Section</h1>

      {message && <div className="mb-6 p-4 rounded-xl bg-sage-green/10 text-forest-moss font-mono text-sm sticky top-4 z-10">{message}</div>}

      <div className="space-y-12">
        {stories.map(story => (
          <div key={story.id} className="p-6 border border-black/10 rounded-2xl space-y-4">
            <h2 className="font-mono text-sm tracking-widest uppercase text-forest-moss/60 border-b border-black/5 pb-2">Story {story.order_index}</h2>

            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Title</label>
              <input
                type="text"
                value={story.title}
                onChange={(e) => handleUpdate(story.id, 'title', e.target.value)}
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green bg-white text-forest-moss"
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Heading</label>
              <input
                type="text"
                value={story.heading}
                onChange={(e) => handleUpdate(story.id, 'heading', e.target.value)}
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green bg-white text-forest-moss"
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Paragraph 1</label>
              <textarea
                value={story.text1}
                onChange={(e) => handleUpdate(story.id, 'text1', e.target.value)}
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green min-h-[100px] bg-white text-forest-moss"
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Paragraph 2</label>
              <textarea
                value={story.text2}
                onChange={(e) => handleUpdate(story.id, 'text2', e.target.value)}
                className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green min-h-[100px] bg-white text-forest-moss"
              />
            </div>
            <div>
              <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Image</label>
              <div className="space-y-3">
                {story.image_url && (
                  <img src={story.image_url} alt={story.title} className="w-full h-48 object-cover rounded-xl border border-black/10" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(story.id, e)}
                  disabled={uploadingId === story.id}
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-mono file:bg-sage-green file:text-forest-moss hover:file:bg-black hover:file:text-white transition-colors"
                />
                {uploadingId === story.id && (
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
              onClick={() => handleSave(story)}
              disabled={savingId === story.id}
              className="bg-forest-moss text-white px-8 py-3 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-black transition-colors"
            >
              {savingId === story.id ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
