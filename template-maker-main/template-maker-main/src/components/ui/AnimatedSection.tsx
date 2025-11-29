'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/premium-effects';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
}

export function AnimatedSection({ 
  children, 
  className = '',
  stagger = false,
  delay = 0
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={stagger ? staggerContainer : fadeInUp}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Export animated child for use within staggered sections
export function AnimatedItem({ 
  children, 
  className = '' 
}: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

