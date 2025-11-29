'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface AccordionItem {
    id: string;
    title: string;
    content: ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    allowMultiple?: boolean;
    className?: string;
    primaryColor?: string;
}

/**
 * Accordion component for FAQs and expandable content
 * Supports single or multiple open items
 */
export function Accordion({
    items,
    allowMultiple = false,
    className = '',
    primaryColor = '#1e3a5f'
}: AccordionProps) {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);

            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                if (!allowMultiple) {
                    newSet.clear();
                }
                newSet.add(id);
            }

            return newSet;
        });
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {items.map((item) => {
                const isOpen = openItems.has(item.id);

                return (
                    <div
                        key={item.id}
                        className="border rounded-lg overflow-hidden"
                        style={{ borderColor: `${primaryColor}20` }}
                    >
                        <button
                            onClick={() => toggleItem(item.id)}
                            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                            aria-expanded={isOpen}
                        >
                            <span
                                className="font-semibold text-lg"
                                style={{ color: primaryColor }}
                            >
                                {item.title}
                            </span>
                            <motion.div
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDownIcon
                                    className="w-5 h-5"
                                    style={{ color: primaryColor }}
                                />
                            </motion.div>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 py-4 text-gray-600 border-t" style={{ borderColor: `${primaryColor}10` }}>
                                        {item.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
