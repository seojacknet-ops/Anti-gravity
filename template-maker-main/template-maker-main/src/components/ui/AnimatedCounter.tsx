'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
    decimals?: number;
}

/**
 * Animated counter component that counts up from 0 to end value
 * Respects prefers-reduced-motion
 */
export function AnimatedCounter({
    end,
    duration = 2,
    suffix = '',
    prefix = '',
    className = '',
    decimals = 0
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            setCount(end);
            return;
        }

        const startTime = Date.now();
        const endTime = startTime + duration * 1000;

        const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / (duration * 1000), 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = easeOutQuart * end;

            setCount(currentCount);

            if (now < endTime) {
                requestAnimationFrame(updateCount);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(updateCount);
    }, [isVisible, end, duration]);

    const displayValue = decimals > 0
        ? count.toFixed(decimals)
        : Math.floor(count).toString();

    return (
        <span ref={ref} className={className}>
            {prefix}{displayValue}{suffix}
        </span>
    );
}
