import React from 'react'
import { LivePreview } from '@/components/features/onboarding/LivePreview'

export default function WebsitePage() {
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Website</h1>
                <p className="text-gray-500 mt-2">Preview and manage your generated website.</p>
            </div>

            <LivePreview />
        </div>
    )
}
