import React from 'react';
import { motion } from 'framer-motion';
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}
export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-24 px-4 md:px-8 max-w-7xl mx-auto ${className}`}>

      <motion.div
        initial={{
          opacity: 0,
          y: 50
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{
          once: true,
          margin: '-100px'
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}>

        {children}
      </motion.div>

      {/* Animated Divider Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"
        initial={{
          scaleX: 0,
          opacity: 0
        }}
        whileInView={{
          scaleX: 1,
          opacity: 1
        }}
        viewport={{
          once: true
        }}
        transition={{
          duration: 1.5,
          delay: 0.2
        }} />

    </section>);

}