'use client';

import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'white' | 'animated';
  className?: string;
}

export function GradientText({ 
  children, 
  variant = 'primary',
  className = '' 
}: GradientTextProps) {
  
  const gradientStyles = {
    primary: 'bg-gradient-to-r from-accent-violet via-accent-fuchsia to-accent-rose',
    secondary: 'bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-fuchsia',
    white: 'bg-gradient-to-b from-white to-white/50',
    animated: 'bg-gradient-to-r from-accent-violet via-accent-fuchsia via-accent-rose via-accent-fuchsia to-accent-violet bg-[length:200%_auto] animate-gradient',
  };

  return (
    <span 
      className={`
        ${gradientStyles[variant]}
        bg-clip-text text-transparent
        ${className}
      `}
    >
      {children}
    </span>
  );
}

