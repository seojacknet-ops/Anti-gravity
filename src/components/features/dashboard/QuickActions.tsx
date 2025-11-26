'use client';

import React from 'react';
import Link from 'next/link';
import { UploadCloud, MessageCircle, BarChart3, FileText, CreditCard, HelpCircle } from 'lucide-react';

interface QuickAction {
    label: string;
    href: string;
    icon: React.ReactNode;
    color: string;
}

export default function QuickActions() {
    const actions: QuickAction[] = [
        {
            label: 'Upload Media',
            href: '/vault',
            icon: <UploadCloud className="w-5 h-5" />,
            color: 'bg-blue-500 hover:bg-blue-600',
        },
        {
            label: 'Message Team',
            href: '/messages',
            icon: <MessageCircle className="w-5 h-5" />,
            color: 'bg-brand-purple hover:bg-brand-purple-dark',
        },
        {
            label: 'View Analytics',
            href: '#analytics',
            icon: <BarChart3 className="w-5 h-5" />,
            color: 'bg-green-500 hover:bg-green-600',
        },
        {
            label: 'View Reports',
            href: '#reports',
            icon: <FileText className="w-5 h-5" />,
            color: 'bg-pink-500 hover:bg-pink-600',
        },
        {
            label: 'Billing',
            href: '/billing',
            icon: <CreditCard className="w-5 h-5" />,
            color: 'bg-indigo-500 hover:bg-indigo-600',
        },
        {
            label: 'Get Support',
            href: '/support',
            icon: <HelpCircle className="w-5 h-5" />,
            color: 'bg-orange-500 hover:bg-orange-600',
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {actions.map((action) => (
                    <Link
                        key={action.label}
                        href={action.href}
                        className="group"
                    >
                        <div className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all">
                            <div className={`w-12 h-12 rounded-xl ${action.color} text-white flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                                {action.icon}
                            </div>
                            <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                                {action.label}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
