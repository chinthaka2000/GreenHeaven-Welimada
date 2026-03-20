import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
// @ts-ignore
import * as Icons from 'lucide-react';
// @ts-ignore
import DOMPurify from 'dompurify';

export function ExperienceDetailsPage() {
  const { slug } = useParams();
  const [exp, setExp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperience = async () => {
      const cleanSlug = slug?.replace(/[\/#?]+$/, '').trim();
      const { data, error } = await supabase
        .from('experiences')
        .select('*')
        .eq('slug', cleanSlug)
        .single();

      if (!error && data) {
        setExp(data);
      }
      setLoading(false);
    };

    if (slug) fetchExperience();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-black pt-32 pb-24 px-4 flex justify-center items-center">
        <div className="text-golden-amber font-mono tracking-widest uppercase">Loading experience...</div>
      </div>
    );
  }

  if (!exp) {
    return (
      <div className="min-h-screen bg-forest-black pt-32 pb-24 px-4 flex flex-col justify-center items-center">
        <h1 className="font-serif text-4xl text-cream-mist mb-6">Experience not found.</h1>
        <Link to="/#experiences" className="text-golden-amber font-mono tracking-widest uppercase hover:text-white transition-colors">
          ← Back to All Experiences
        </Link>
      </div>
    );
  }

  const renderIcon = (iconName: string) => {
    // @ts-ignore
    const IconComponent = Icons[iconName] || Icons.Star;
    return <IconComponent className="w-8 h-8 text-golden-amber" />;
  };

  return (
    <div className="min-h-screen bg-forest-black pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-4">
        <Link to="/#experiences" className="inline-flex items-center gap-2 text-sage-green/70 hover:text-sage-green mb-12 font-mono text-sm uppercase tracking-widest transition-colors">
          <ArrowLeft size={16} /> Back to Experiences
        </Link>

        {exp.image_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[50vh] md:h-[70vh] rounded-[40px] overflow-hidden mb-16 relative"
          >
            <img
              src={exp.image_url}
              alt={exp.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-black via-forest-black/40 to-transparent" />

            <div className="absolute bottom-12 left-12 right-12 z-10 flex flex-col items-start text-left">
              <div className="mb-6 p-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
                {renderIcon(exp.icon_name)}
              </div>
              <h1 className="font-serif text-5xl md:text-7xl text-white font-bold mb-4 drop-shadow-xl">
                {exp.title}
              </h1>
              <div className="flex flex-wrap gap-3">
                {exp.tags && exp.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-xs font-mono font-bold uppercase tracking-widest text-white shadow-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
        >
          {exp.full_desc ? (
            <div
              className="prose prose-lg prose-invert prose-p:text-cream-mist/80 prose-p:leading-relaxed prose-p:font-sans prose-headings:font-serif prose-headings:text-cream-mist prose-a:text-golden-amber hover:prose-a:text-white prose-a:transition-colors max-w-none prose-li:text-cream-mist/80"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(exp.full_desc) }}
            />
          ) : (
            <p className="font-sans text-xl text-cream-mist/70 leading-relaxed text-center italic">
              More details coming soon. Please contact us to learn more about this experience.
            </p>
          )}

          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <Link to="/accommodations" className="inline-block px-8 py-4 rounded-full bg-golden-amber text-forest-black font-bold font-mono uppercase tracking-widest hover:bg-cream-mist transition-colors">
              Book Your Stay
            </Link>
            <p className="mt-4 font-mono text-xs tracking-widest uppercase text-cream-mist/50">Experiences are curated exclusively for our guests</p>
          </div>
        </motion.div>
      </article>
    </div>
  );
}
