import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

export function ExperienceList() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true });

    if (!error && data) {
      setExperiences(data);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await supabase.from('experiences').delete().eq('id', id);
      fetchExperiences();
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-black/5">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-forest-moss">Experiences</h1>
        <Link
          to="/admin/experiences/new"
          className="flex items-center gap-2 bg-sage-green text-forest-moss px-6 py-3 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          <PlusCircle size={18} />
          New Experience
        </Link>
      </div>

      {experiences.length === 0 ? (
        <p className="text-forest-moss/60 font-mono text-sm">No experiences found. Create one!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-black/10 text-forest-moss font-mono text-xs uppercase tracking-widest">
                <th className="pb-4 font-normal">Title</th>
                <th className="pb-4 font-normal">Order</th>
                <th className="pb-4 font-normal">Featured</th>
                <th className="pb-4 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {experiences.map((exp) => (
                <tr key={exp.id} className="hover:bg-sage-green/5 transition-colors group">
                  <td className="py-4 pr-4">
                    <p className="font-bold text-forest-moss">{exp.title}</p>
                    <p className="text-sm text-forest-moss/60 truncate max-w-xs">{exp.slug}</p>
                  </td>
                  <td className="py-4 text-sm text-forest-moss/60 font-mono">
                    {exp.order_index}
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${exp.featured ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                      {exp.featured ? 'Featured' : 'Standard'}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link to={`/admin/experiences/${exp.id}`} className="text-forest-moss hover:text-sage-green transition-colors">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(exp.id, exp.title)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
