import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export function Hero() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    supabase.from('hero_content').select('*').single().then(({ data }) => {
      if (data) setData(data);
    });
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center">

      {/* Background Image & Gradient Mesh */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url('${data?.image_url || 'https://mgfwijircgytueryzkyw.supabase.co/storage/v1/object/public/images/unsplash-1584773920278-4ada215dbe93.jpg'}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      {/* Green overlay for natural vibe & readability */}
      <div className="absolute inset-0 bg-emerald-900/30 mix-blend-overlay z-0" />
      <div className="absolute inset-0 bg-black/30 z-0" />
      {/* Seamless fade to next section at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-forest-black to-transparent z-0" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-800/30 rounded-full blur-[120px] animate-pulse-slow z-0" />

      {/* Main Glass Frame Content */}
      <motion.div
        style={{
          scale,
          opacity,
          y
        }}
        className="relative z-10 max-w-3xl mx-4 p-8 md:p-10 rounded-[40px] border border-white/50 bg-black/30 shadow-4xl text-center overflow-hidden">

        {/* Inner Glow Orbs - Reduced opacity */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-slate-300/5 rounded-full blur-[80px] animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sage-green/5 rounded-full blur-[1px] animate-float"
            style={{
              animationDelay: '2s'
            }} />

        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center px-4 py-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md mb-8">

          <span className="font-mono text-xs tracking-[0.2em] text-white/90 uppercase font-semibold">
            {data?.badge_text || 'Welimada · Sri Lanka · Highland Escapes'}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl italic leading-tight mb-6">

          <span className="bg-gradient-to-r from-emerald-400 to-sage-green bg-clip-text text-transparent drop-shadow-lg">
            {data?.headline || 'Experience Real Sri Lankan'}
          </span>
          <br />
          <span className="text-white drop-shadow-xl">{data?.subheadline || 'Farming Life 🌾'}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-2xl text-white/90 font-light tracking-wide mb-10"
        >
          Plant • Harvest • Cook • Stay with Local Farmers
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.8
          }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12">

          <button
            onClick={() => navigate('/accommodations')}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-sage-green to-terracotta-clay text-cream-mist font-mono text-sm tracking-widest uppercase font-bold hover:scale-105 hover:shadow-[0_0_30px_rgba(132,204,22,0.4)] transition-all duration-300">
            Book Your Stay
          </button>
          <button
            onClick={() => navigate('/about')}
            className="px-8 py-4 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white font-mono text-sm tracking-widest uppercase hover:bg-white/10 transition-colors">
            Explore Farm
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 1.5,
          duration: 1
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20">

        <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-24 bg-gradient-to-b from-golden-amber to-transparent relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{
              top: ['-100%', '100%']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear'
            }} />

        </div>
      </motion.div>
    </div>);

}