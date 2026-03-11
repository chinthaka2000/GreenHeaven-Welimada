import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';

export function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      // Only fetch published posts for the public view
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <SEO 
        title="Farm Journal & Stories | Green Heaven Welimada" 
        description="Read about our latest harvests, sustainable farming techniques, and life at Green Heaven Welimada." 
        url="https://greenheaven.lk/blog"
      />
      <div className="min-h-screen bg-forest-black pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-mono text-sage-green text-sm tracking-[0.3em] uppercase mb-4 font-bold">
            Farm Journal
          </h1>
          <h2 className="font-serif text-5xl md:text-6xl text-cream-mist font-bold mb-6">
            Stories from the Soil
          </h2>
          <p className="font-sans text-xl text-cream-mist/70 max-w-2xl mx-auto leading-relaxed">
            Read about our latest harvests, sustainable farming techniques, and life at GreenHeaven Welimada.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center text-sage-green font-mono tracking-widest uppercase">Loading stories...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-cream-mist/50 font-mono tracking-widest uppercase mt-12">
            No stories published yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={post.id}
              >
                <Link to={`/blog/${post.slug}`} className="group block h-full bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-sage-green/50 transition-all duration-500 flex flex-col">
                  {post.image_url ? (
                    <div className="w-full h-64 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-sage-green/10 flex items-center justify-center">
                      <span className="font-serif text-sage-green/50 italic">greenHeaven</span>
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-1">
                    <p className="font-mono text-xs text-sage-green tracking-[0.2em] uppercase mb-4">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <h3 className="font-serif text-2xl text-cream-mist font-bold mb-4 line-clamp-2 leading-tight group-hover:text-sage-green transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-sans text-cream-mist/70 leading-relaxed mb-8 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto font-mono text-xs text-cream-mist tracking-[0.2em] uppercase flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                      Read Story <span className="text-sage-green">→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
