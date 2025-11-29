'use client'

import React from 'react'
import { Globe, Layout } from 'lucide-react'

export const LivePreview = () => {
    return (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
            <div className="p-12 text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Globe className="w-10 h-10 text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Your Website Preview
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Your website is being prepared by our team.
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        Once ready, your website preview will appear here.
                    </p>
                    <button className="inline-flex items-center gap-2 px-6 py-3 bg-brand-purple text-white rounded-lg font-medium hover:bg-brand-purple-dark transition-all shadow-md hover:shadow-lg">
                        <Layout className="w-5 h-5" />
                        Browse Templates
                    </button>
                </div>
            </div>
        </div>
    )
}
