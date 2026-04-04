import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Settings as SettingsIcon } from 'lucide-react';

export function EditSettings() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data: settingsData, error } = await supabase.from('site_settings').select('*').single();
    if (!error && settingsData) {
      setData(settingsData);
    } else {
      // If no data exists, we'll try to create a default record on save.
      setData({ accommodations_opening_soon: false });
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    let error;

    if (data.id) {
      // Update existing
      const result = await supabase
        .from('site_settings')
        .update({
          accommodations_opening_soon: data.accommodations_opening_soon,
        })
        .eq('id', data.id);
      error = result.error;
    } else {
      // Create new (assumes id 1)
      const result = await supabase
        .from('site_settings')
        .insert([{ id: 1, accommodations_opening_soon: data.accommodations_opening_soon }])
        .select()
        .single();
      error = result.error;
      if (!error && result.data) {
        setData(result.data);
      }
    }

    if (error) {
      setMessage('Error saving: ' + error.message);
    } else {
      setMessage('Successfully saved settings!');
    }
    setSaving(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/5">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-8 h-8 text-forest-moss" />
        <h1 className="font-serif text-3xl text-forest-moss">Site Settings</h1>
      </div>

      {message && <div className="mb-6 p-4 rounded-xl bg-sage-green/10 text-forest-moss font-mono text-sm">{message}</div>}

      <form onSubmit={handleSave} className="space-y-8 max-w-2xl">
        <div className="p-6 border border-black/10 rounded-2xl">
          <h2 className="font-serif text-xl text-forest-moss mb-4">Accommodations Section</h2>
          <div className="flex items-center gap-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={data?.accommodations_opening_soon || false}
                onChange={(e) => setData({ ...data, accommodations_opening_soon: e.target.checked })}
              />
              <div className="w-14 h-7 bg-black/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-sage-green"></div>
            </label>
            <div>
              <span className="block font-sans font-bold text-forest-moss">Opening Soon Mode</span>
              <span className="block font-sans text-sm text-forest-moss/60">If enabled, the accommodations page will be blurred out with an "Opening Soon" overlay.</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-forest-moss text-white px-8 py-3 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-black transition-colors"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
