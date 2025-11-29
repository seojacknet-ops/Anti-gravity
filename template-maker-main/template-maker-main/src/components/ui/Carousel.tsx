'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CarouselProps {
    children: ReactNode[];
    autoplay?: boolean;
    interval?: number;
    showDots?: boolean;
    showArrows?: boolean;
    className?: string;
    primaryColor?: string;
}

/**
 * Carousel component for testimonials, galleries, and featured content
 * Supports autoplay, manual navigation, and keyboard controls
 */
export function Carousel({
    children,
    autoplay = false,
    interval = 5000,
    showDots = true,
    showArrows = true,
    className = '',
    primaryColor = '#1e3a5f'
}: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Safety check: ensure children array exists and has items
    if (!children || children.length === 0) {
        return null;
    }

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = children.length - 1;
            if (nextIndex >= children.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!autoplay) return;

        const timer = setInterval(() => {
            paginate(1);
        }, interval);

        return () => clearInterval(timer);
    }, [autoplay, interval, currentIndex]);

    // Keyboard navigation
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') paginate(-1);
            if (e.key === 'ArrowRight') paginate(1);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div className="relative h-full">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute w-full"
                    >
                        {children[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {showArrows && children.length > 1 && (
                <>
                    <button
                        onClick={() => paginate(-1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
                        aria-label="Previous slide"
                    >
                        <ChevronLeftIcon className="w-6 h-6" style={{ color: primaryColor }} />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 shadow-lg hover:bg-white transition-colors"
                        aria-label="Next slide"
                    >
                        <ChevronRightIcon className="w-6 h-6" style={{ color: primaryColor }} />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {showDots && children.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {children.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'w-8' : 'w-2'
                                }`}
                            style={{
                                backgroundColor: index === currentIndex ? primaryColor : '#ffffff',
                                opacity: index === currentIndex ? 1 : 0.5
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
