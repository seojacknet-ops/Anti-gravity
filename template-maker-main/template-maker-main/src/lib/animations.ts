'use client';

/**
 * Animation Library for Template Enhancements
 * Provides reusable animation variants and utilities for Framer Motion
 * Respects user's motion preferences (prefers-reduced-motion)
 */

import { Variants } from 'framer-motion';

/**
 * Get animation duration based on user's motion preferences
 */
export const getAnimationDuration = (defaultDuration: number = 0.6): number => {
  if (typeof window === 'undefined') return defaultDuration;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion ? 0 : defaultDuration;
};

/**
 * Scroll-triggered fade in from bottom
 */
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: getAnimationDuration(0.6),
      ease: 'easeOut'
    } 
  }
};

/**
 * Scroll-triggered fade in from top
 */
export const fadeInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -40 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: getAnimationDuration(0.6),
      ease: 'easeOut'
    } 
  }
};

/**
 * Scroll-triggered fade in from left
 */
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -40 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: getAnimationDuration(0.6),
      ease: 'easeOut'
    } 
  }
};

/**
 * Scroll-triggered fade in from right
 */
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 40 
  },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: getAnimationDuration(0.6),
      ease: 'easeOut'
    } 
  }
};

/**
 * Simple fade in
 */
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1, 
    transition: { 
      duration: getAnimationDuration(0.6) 
    } 
  }
};

/**
 * Scale up animation
 */
export const scaleUp: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: getAnimationDuration(0.5),
      ease: 'easeOut'
    } 
  }
};

/**
 * Stagger children animations
 */
export const staggerChildren: Variants = {
  visible: { 
    transition: { 
      staggerChildren: getAnimationDuration(0.1) 
    } 
  }
};

/**
 * Stagger children with faster timing
 */
export const staggerChildrenFast: Variants = {
  visible: { 
    transition: { 
      staggerChildren: getAnimationDuration(0.05) 
    } 
  }
};

/**
 * Card hover effect - lift and shadow
 */
export const cardHover: Variants = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: { 
      duration: 0.2 
    }
  },
  hover: { 
    scale: 1.02, 
    y: -4,
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    transition: { 
      duration: 0.2 
    }
  }
};

/**
 * Button hover effect - subtle scale
 */
export const buttonHover: Variants = {
  rest: { 
    scale: 1,
    transition: { 
      duration: 0.2 
    }
  },
  hover: { 
    scale: 1.05,
    transition: { 
      duration: 0.2 
    }
  },
  tap: {
    scale: 0.95,
    transition: { 
      duration: 0.1 
    }
  }
};

/**
 * Icon pulse animation
 */
export const iconPulse: Variants = {
  rest: { 
    scale: 1 
  },
  hover: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 1
    }
  }
};

/**
 * Rotate animation for loading states
 */
export const rotate: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

/**
 * Slide in from bottom (for modals/drawers)
 */
export const slideInFromBottom: Variants = {
  hidden: { 
    y: '100%',
    opacity: 0
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: { 
      duration: getAnimationDuration(0.3),
      ease: 'easeOut'
    } 
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { 
      duration: getAnimationDuration(0.2),
      ease: 'easeIn'
    }
  }
};

/**
 * Slide in from right (for mobile menus)
 */
export const slideInFromRight: Variants = {
  hidden: { 
    x: '100%',
    opacity: 0
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: { 
      duration: getAnimationDuration(0.3),
      ease: 'easeOut'
    } 
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { 
      duration: getAnimationDuration(0.2),
      ease: 'easeIn'
    }
  }
};

/**
 * Number counter animation hook
 */
export const useCountUp = (end: number, duration: number = 2) => {
  if (typeof window === 'undefined') return end;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return prefersReducedMotion ? end : end;
};

/**
 * Shimmer loading animation (CSS keyframes)
 */
export const shimmerKeyframes = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

/**
 * Shimmer background style
 */
export const shimmerBackground = {
  background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 2s infinite'
};
