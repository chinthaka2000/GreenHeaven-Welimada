import { useState, useEffect } from 'react';
import { Section } from '../ui/Section';
import { GlassCard } from '../ui/GlassCard';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
// @ts-ignore
import * as Icons from 'lucide-react';

export function Experiences() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchExperiences();
  }, []);

  const renderIcon = (iconName: string, featured: boolean) => {
    // @ts-ignore
    const IconComponent = Icons[iconName] || Icons.Star;
    return <IconComponent className={`w-8 h-8 ${featured ? 'text-golden-amber' : 'text-sage-green'}`} />;
  };

  return (
    <Section id="experiences">
      <div className="mb-16">
        <h2 className="font-mono text-forest-moss text-sm tracking-[0.3em] uppercase mb-4 font-bold">
          Experiences
        </h2>
        <h3 className="font-serif text-4xl md:text-5xl text-forest-moss">
          Curated Moments
        </h3>
      </div>

      {loading ? (
        <div className="flex justify-center text-forest-moss font-mono tracking-widest uppercase">Loading experiences...</div>
      ) : experiences.length === 0 ? (
        <div className="text-center text-forest-moss/60 font-mono tracking-widest uppercase mt-12">
          Coming Soon
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {experiences.map((exp) =>
            <Link to={`/experiences/${exp.slug}`} key={exp.id} className={exp.featured ? 'md:col-span-2 md:row-span-2' : ''}>
              <GlassCard
                className={`flex flex-col justify-end p-0 overflow-hidden relative group border-white/40 shadow-xl rounded-3xl h-full w-full block`}
              >
                {exp.image_url ? (
                  <img
                    src={exp.image_url}
                    alt={exp.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-forest-moss/20" />
                )}

                <div className={`absolute inset-0 bg-gradient-to-t from-forest-moss/90 via-forest-moss/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 ${exp.featured ? 'from-forest-moss via-forest-moss/50' : ''}`} />

                <div className="relative z-10 p-8">
                  <div className="mb-4 p-3 rounded-full bg-white/20 w-fit backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {renderIcon(exp.icon_name, exp.featured)}
                  </div>
                  <h4
                    className={`font-serif ${exp.featured ? 'text-4xl' : 'text-2xl'} text-white font-bold mb-3 drop-shadow-md`}>
                    {exp.title}
                  </h4>
                  <p className={`font-sans text-white/90 leading-relaxed mb-6 drop-shadow-sm ${exp.featured ? 'text-lg max-w-md' : 'text-sm'}`}>
                    {exp.short_desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {exp.tags && exp.tags.map((tag: string) =>
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 text-[10px] font-mono font-bold uppercase tracking-wider text-white">
                        {tag}
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </Link>
          )}
        </div>
      )}
    </Section>
  );
}