import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { motion } from 'framer-motion';
import { testimonialsData as reviews } from '../../data/siteData';

export function Testimonials() {
  return (
    <div className="py-24 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-forest-black via-transparent to-forest-black z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 w-max"
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}>

        {[...reviews, ...reviews].map((review, idx) =>
          <GlassCard key={idx} className="w-[400px] p-8 flex-shrink-0">
            <p className="font-serif text-2xl italic text-cream-mist mb-6">
              "{review.text}"
            </p>
            <p className="font-mono text-xs text-golden-amber uppercase tracking-widest">
              — {review.author}
            </p>
          </GlassCard>
        )}
      </motion.div>
    </div>);

}