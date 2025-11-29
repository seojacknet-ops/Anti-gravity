import { Variants } from 'framer-motion';

// ========================================
// ANIMATION VARIANTS
// ========================================

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] // easeOutExpo
    }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

// ========================================
// HOVER EFFECTS
// ========================================

export const cardHover3D: Variants = {
  rest: { 
    scale: 1, 
    y: 0,
  },
  hover: { 
    scale: 1.02, 
    y: -8,
    transition: { 
      duration: 0.4, 
      ease: 'easeOut'
    }
  }
};

export const buttonHover: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const linkHover: Variants = {
  rest: { x: 0 },
  hover: { 
    x: 4,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

// ========================================
// SPECIAL EFFECTS
// ========================================

export const floatingAnimation = {
  y: [0, -20, 0],
  rotate: [0, 2, -2, 0],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const pulseGlow = {
  opacity: [0.5, 0.8, 0.5],
  scale: [1, 1.05, 1],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut'
  }
};

export const rotatingGradient = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear'
  }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

export const glassMorphism = (intensity: 'light' | 'medium' | 'strong' = 'medium') => {
  const intensities = {
    light: { bg: 0.03, blur: 12, border: 0.06 },
    medium: { bg: 0.05, blur: 16, border: 0.1 },
    strong: { bg: 0.08, blur: 24, border: 0.15 }
  };
  
  const { bg, blur, border } = intensities[intensity];
  
  return {
    background: `rgba(255, 255, 255, ${bg})`,
    backdropFilter: `blur(${blur}px)`,
    WebkitBackdropFilter: `blur(${blur}px)`,
    border: `1px solid rgba(255, 255, 255, ${border})`
  };
};

export const gradientText = (
  gradient: 'primary' | 'secondary' | 'white' = 'primary'
) => {
  const gradients = {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #D946EF 50%, #F43F5E 100%)',
    secondary: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
    white: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.5) 100%)'
  };
  
  return {
    background: gradients[gradient],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };
};

export const glowEffect = (color: 'violet' | 'fuchsia' | 'cyan' = 'violet') => {
  const colors = {
    violet: 'rgba(139, 92, 246, 0.5)',
    fuchsia: 'rgba(217, 70, 239, 0.5)',
    cyan: 'rgba(34, 211, 238, 0.4)'
  };
  
  return {
    boxShadow: `0 0 60px ${colors[color]}`
  };
};

