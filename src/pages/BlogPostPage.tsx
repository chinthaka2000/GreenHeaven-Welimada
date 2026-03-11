import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
// @ts-ignore
import DOMPurify from 'dompurify';
import { SEO } from '../components/SEO';

export function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();

      if (!error && data) {
        setPost(data);
      }
      setLoading(false);
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-forest-black pt-32 pb-24 px-4 flex justify-center items-center">
        <div className="text-sage-green font-mono tracking-widest uppercase">Loading story...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-forest-black pt-32 pb-24 px-4 flex flex-col justify-center items-center">
        <h1 className="font-serif text-4xl text-cream-mist mb-6">Story not found.</h1>
        <Link to="/blog" className="text-sage-green font-mono tracking-widest uppercase hover:text-white transition-colors">
          ← Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={`${post.title} | Green Heaven Welimada`}
        description={post.excerpt || 'Read our latest story from Green Heaven Welimada.'}
        url={`https://greenheaven.lk/blog/${slug}`}
        type="article"
        image={post.image_url || 'https://greenheaven.lk/og-image.jpg'}
      />
      <div className="min-h-screen bg-forest-black pt-32 pb-24">
      <article className="max-w-4xl mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sage-green/70 hover:text-sage-green mb-12 font-mono text-sm uppercase tracking-widest transition-colors">
          <ArrowLeft size={16} /> Back to Journal
        </Link>

        {post.image_url && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-[50vh] md:h-[70vh] rounded-[40px] overflow-hidden mb-16"
          >
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-16 text-center">
            <p className="font-mono text-sage-green text-sm tracking-[0.3em] uppercase mb-6 font-bold">
              {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="font-serif text-5xl md:text-6xl text-cream-mist font-bold mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="w-16 h-[2px] bg-sage-green/50 mx-auto" />
          </div>

          <div
            className="prose prose-lg prose-invert prose-p:text-cream-mist/80 prose-p:leading-relaxed prose-p:font-sans prose-headings:font-serif prose-headings:text-cream-mist prose-a:text-sage-green hover:prose-a:text-white prose-a:transition-colors max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
        </motion.div>
      </article>
    </div>
    </>
  );
}
