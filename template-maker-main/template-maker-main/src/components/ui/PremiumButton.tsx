'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export function PremiumButton({ 
  children, 
  variant = 'primary',
  size = 'md',
  glow = true,
  icon,
  iconPosition = 'right',
  className = '',
  ...props 
}: PremiumButtonProps) {
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5'
  };
  
  const variantStyles = {
    primary: `
      bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-rose
      text-white font-semibold
      hover:shadow-glow-lg
    `,
    secondary: `
      bg-white/[0.05] border border-white/[0.1]
      text-white font-medium
      hover:bg-white/[0.08] hover:border-white/[0.15]
    `,
    ghost: `
      bg-transparent
      text-white/70 font-medium
      hover:text-white hover:bg-white/[0.05]
    `
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative inline-flex items-center justify-center
        rounded-full overflow-hidden
        font-display tracking-tight
        transition-all duration-300
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {/* Glow effect */}
      {glow && variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-rose blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 -z-10" />
      )}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Content */}
      <span className="relative flex items-center gap-2">
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>
    </motion.button>
  );
}

