'use client';

import { motion } from 'framer-motion';

interface FloatingOrbsProps {
  variant?: 'hero' | 'section' | 'subtle';
}

export function FloatingOrbs({ variant = 'hero' }: FloatingOrbsProps) {
  const configs = {
    hero: [
      { size: 'w-[600px] h-[600px]', color: 'bg-accent-violet/20', position: 'top-0 left-1/4', delay: 0, duration: 15 },
      { size: 'w-[500px] h-[500px]', color: 'bg-accent-fuchsia/15', position: 'bottom-0 right-1/4', delay: 2, duration: 18 },
      { size: 'w-[400px] h-[400px]', color: 'bg-accent-cyan/10', position: 'top-1/2 right-0', delay: 4, duration: 20 },
    ],
    section: [
      { size: 'w-[400px] h-[400px]', color: 'bg-accent-violet/15', position: 'top-1/4 left-0', delay: 0, duration: 12 },
      { size: 'w-[300px] h-[300px]', color: 'bg-accent-fuchsia/10', position: 'bottom-1/4 right-0', delay: 1, duration: 14 },
    ],
    subtle: [
      { size: 'w-[300px] h-[300px]', color: 'bg-accent-violet/10', position: 'top-0 right-1/4', delay: 0, duration: 10 },
      { size: 'w-[200px] h-[200px]', color: 'bg-accent-fuchsia/8', position: 'bottom-0 left-1/4', delay: 2, duration: 12 },
    ],
  };

  const orbs = configs[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute ${orb.size} ${orb.color} ${orb.position} rounded-full blur-3xl`}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}

