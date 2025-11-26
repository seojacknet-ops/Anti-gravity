'use client';

import React from 'react';
import { Activity, CheckCircle, FileText, MessageSquare, Upload } from 'lucide-react';

interface ActivityItem {
    id: string;
    type: 'audit' | 'upload' | 'message' | 'milestone';
    title: string;
    timestamp: string;
    icon: React.ReactNode;
    iconBg: string;
}

export default function RecentActivity() {
    const activities: ActivityItem[] = [
        {
            id: '1',
            type: 'milestone',
            title: 'Design draft completed',
            timestamp: '2 hours ago',
            icon: <CheckCircle className="w-4 h-4" />,
            iconBg: 'bg-green-100 text-green-600',
        },
        {
            id: '2',
            type: 'upload',
            title: 'Logo files uploaded to vault',
            timestamp: '1 day ago',
            icon: <Upload className="w-4 h-4" />,
            iconBg: 'bg-blue-100 text-blue-600',
        },
        {
            id: '3',
            type: 'message',
            title: 'New message from design team',
            timestamp: '2 days ago',
            icon: <MessageSquare className="w-4 h-4" />,
            iconBg: 'bg-purple-100 text-brand-purple',
        },
        {
            id: '4',
            type: 'audit',
            title: 'SEO audit completed',
            timestamp: '3 days ago',
            icon: <FileText className="w-4 h-4" />,
            iconBg: 'bg-pink-100 text-accent-pink',
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-brand-purple" />
                Recent Activity
            </h2>

            <div className="space-y-4">
                {activities.map((activity, idx) => (
                    <div
                        key={activity.id}
                        className="flex items-start gap-4 group hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${activity.iconBg}`}>
                            {activity.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-brand-purple transition-colors">
                                {activity.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{activity.timestamp}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-4 text-sm font-medium text-brand-purple hover:text-brand-purple-dark transition-colors py-2">
                View All Activity →
            </button>
        </div>
    );
}
