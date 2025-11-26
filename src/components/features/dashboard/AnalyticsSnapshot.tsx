'use client';

import React from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

interface MetricCardProps {
    label: string;
    value: string;
    change: number;
    trend: 'up' | 'down';
}

function MetricCard({ label, value, change, trend }: MetricCardProps) {
    return (
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <div className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {change}%
                </div>
            </div>
        </div>
    );
}

export default function AnalyticsSnapshot() {
    // Mock data - would come from API
    const metrics = [
        { label: 'Organic Traffic', value: '2.4K', change: 12, trend: 'up' as const },
        { label: 'Keyword Rankings', value: '47', change: 8, trend: 'up' as const },
        { label: 'Page Speed', value: '94', change: 3, trend: 'up' as const },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-brand-purple" />
                    Analytics Snapshot
                </h2>
                <span className="text-xs text-gray-500">Last 30 days</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {metrics.map((metric) => (
                    <MetricCard key={metric.label} {...metric} />
                ))}
            </div>

            {/* Mini Sparkline Chart */}
            <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-end justify-between h-16 gap-1">
                    {[40, 45, 38, 50, 48, 55, 52, 60, 58, 65, 70, 68].map((height, idx) => (
                        <div
                            key={idx}
                            className="flex-1 bg-gradient-to-t from-brand-purple to-brand-purple-light rounded-t-sm transition-all hover:opacity-80"
                            style={{ height: `${height}%` }}
                        />
                    ))}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Traffic Growth Trend</p>
            </div>
        </div>
    );
}
