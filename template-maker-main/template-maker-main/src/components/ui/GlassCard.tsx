'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import { cardHover3D } from '@/lib/premium-effects';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'gradient' | 'glow';
  hover?: boolean;
  className?: string;
}

export function GlassCard({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  ...props 
}: GlassCardProps) {
  
  const baseStyles = `
    relative overflow-hidden rounded-3xl p-8
    backdrop-blur-xl border transition-all duration-500
  `;
  
  const variantStyles = {
    default: 'bg-white/[0.03] border-white/[0.08]',
    gradient: 'bg-gradient-to-br from-white/[0.05] to-white/[0.02] border-white/[0.08]',
    glow: 'bg-white/[0.03] border-white/[0.08] hover:shadow-glow'
  };

  return (
    <motion.div
      variants={hover ? cardHover3D : undefined}
      initial="rest"
      whileHover={hover ? "hover" : undefined}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div 
          className="absolute inset-0 rounded-3xl"
          style={{
            padding: '1px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.5) 0%, rgba(217, 70, 239, 0.5) 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />
      </div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

