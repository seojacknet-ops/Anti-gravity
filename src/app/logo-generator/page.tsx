'use client'

import React from 'react'
import { LogoGenerator } from '@/components/features/ai/LogoGenerator'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function LogoGeneratorPage() {
    // TODO: Get user data from auth context
    const businessName = 'My Business' // Placeholder
    const brandAdjectives = ['Professional', 'Modern', 'Trustworthy'] // Placeholder

    const handleLogoGenerated = (logoUrl: string) => {
        console.log('Logo saved:', logoUrl)
        // TODO: Update user profile with logo URL
        // TODO: Show success message and option to use as profile logo
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-purple mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </Link>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <LogoGenerator
                        businessName={businessName}
                        brandAdjectives={brandAdjectives}
                        onLogoGenerated={handleLogoGenerated}
                    />
                </div>

                {/* Info Section */}
                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Tips for Great Logos</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Be specific about shapes, styles, and themes</li>
                        <li>• Mention your industry for more relevant results</li>
                        <li>• Try different variations to find the perfect fit</li>
                        <li>• Keep it simple - the best logos are memorable and clean</li>
                        <li>• Generated logos are saved to your Media Vault automatically</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
