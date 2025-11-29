'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
}

/**
 * Modal component for lightboxes, forms, and overlays
 * Supports keyboard navigation (Esc to close) and click outside to close
 */
export function Modal({
    isOpen,
    onClose,
    children,
    title,
    size = 'md',
    className = ''
}: ModalProps) {
    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-2xl',
        lg: 'max-w-4xl',
        xl: 'max-w-6xl',
        full: 'max-w-full mx-4'
    };

    // Handle Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} ${className} max-h-[90vh] overflow-hidden flex flex-col`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between px-6 py-4 border-b">
                                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                                    <button
                                        onClick={onClose}
                                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        aria-label="Close modal"
                                    >
                                        <XMarkIcon className="w-6 h-6 text-gray-500" />
                                    </button>
                                </div>
                            )}

                            {/* Content */}
                            <div className="overflow-y-auto flex-1">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
