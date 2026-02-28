import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export function EditGallery() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase.from('gallery_items').select('*').order('order_index');
    if (!error && data) {
      setItems(data);
    }
    setLoading(false);
  };

  const handleUpdate = (id: string, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
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
      const filePath = `gallery/${fileName}`;

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

  const handleSave = async (item: any) => {
    setSavingId(item.id);
    setMessage('');

    const { error } = await supabase
      .from('gallery_items')
      .update({
        title: item.title,
        description: item.description,
        image_url: item.image_url,
      })
      .eq('id', item.id);

    if (error) {
      setMessage(`Error saving ${item.title}: ` + error.message);
    } else {
      setMessage(`Successfully saved ${item.title}!`);
    }
    setSavingId(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/5">
      <h1 className="font-serif text-3xl text-forest-moss mb-6">Edit Gallery Section</h1>

      {message && <div className="mb-6 p-4 rounded-xl bg-sage-green/10 text-forest-moss font-mono text-sm sticky top-4 z-10">{message}</div>}

      <div className="grid grid-cols-1 gap-8">
        {items.map(item => (
          <div key={item.id} className="p-6 border border-black/10 rounded-2xl flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 shrink-0">
              <img src={item.image_url} alt={item.title} className="w-full aspect-square object-cover rounded-xl" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green bg-white text-forest-moss"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Description</label>
                <textarea
                  value={item.description}
                  onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green min-h-[100px] bg-white text-forest-moss"
                />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-widest text-forest-moss/60 mb-2">Change Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(item.id, e)}
                  disabled={uploadingId === item.id}
                  className="w-full border border-black/10 rounded-xl p-3 focus:outline-sage-green file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-mono file:bg-sage-green file:text-forest-moss hover:file:bg-black hover:file:text-white transition-colors"
                />
                {uploadingId === item.id && (
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

              <button
                onClick={() => handleSave(item)}
                disabled={savingId === item.id}
                className="bg-forest-moss text-white px-8 py-3 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-black transition-colors w-full md:w-auto"
              >
                {savingId === item.id ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
