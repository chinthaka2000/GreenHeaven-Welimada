import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { statsData as stats } from '../../data/siteData';

export function Stats() {
  return (
    <div className="relative z-20 -mt-16 md:-mt-24 px-4 max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        {stats.map((stat, index) =>
          <GlassCard
            key={index}
            className="p-6 text-center flex flex-col items-center justify-center h-40 bg-white/50 border border-forest-moss/10 shadow-lg">

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5
              }}
              whileInView={{
                opacity: 1,
                scale: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: index * 0.1,
                type: 'spring'
              }}>

              <div className="font-serif text-4xl md:text-5xl text-forest-moss mb-2">
                {stat.value}
                {stat.suffix}
              </div>
              <div className="font-mono text-xs tracking-widest text-forest-moss/60 uppercase font-semibold">
                {stat.label}
              </div>
            </motion.div>
          </GlassCard>
        )}
      </div>
    </div>);

}