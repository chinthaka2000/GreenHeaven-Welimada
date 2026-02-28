import React from 'react';
import { motion } from 'framer-motion';
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}
export function GlassCard({
  children,
  className = '',
  hoverEffect = true,
  onClick
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
        ${className}
      `}
      whileHover={
      hoverEffect ?
      {
        y: -12,
        borderColor: 'rgba(232, 166, 69, 0.4)',
        boxShadow:
        '0 20px 40px rgba(0,0,0,0.6), inset 0 0 20px rgba(255,255,255,0.05)'
      } :
      {}
      }
      transition={{
        duration: 0.4,
        ease: 'easeOut'
      }}
      onClick={onClick}>

      {/* Top edge highlight gradient */}
      {hoverEffect &&
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-terracotta-clay via-golden-amber to-sage-green opacity-0"
        whileHover={{
          opacity: 1,
          scaleX: 1
        }}
        initial={{
          opacity: 0,
          scaleX: 0
        }}
        transition={{
          duration: 0.4
        }} />

      }

      {/* Inner shimmer effect container - could be expanded for more complex effects */}
      <div className="relative z-10 h-full">{children}</div>

      {/* Subtle inner noise/texture could go here */}
    </motion.div>);

}