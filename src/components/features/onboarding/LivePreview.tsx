'use client'

import React from 'react'
import { useOnboardingStore } from '@/lib/store/onboarding-store'
import { COLOR_PALETTES } from '@/lib/config/industry-defaults'

export const LivePreview = () => {
    const { data } = useOnboardingStore()
    const { businessInfo, visualDirection, brandVoice } = data

    const selectedPalette = visualDirection.colorPalette
        ? COLOR_PALETTES[visualDirection.colorPalette]
        : null
    const primaryColor = selectedPalette?.colors[0] || '#7C3AED'

    return (
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
            {/* Disclaimer Banner */}
            <div className="bg-amber-50 border-b border-amber-200 p-4 flex items-start gap-3">
                <div className="text-2xl">🚧</div>
                <div>
                    <h3 className="text-amber-900 font-bold text-lg">Rough First Draft</h3>
                    <p className="text-amber-800 text-sm mt-1">
                        This is an early preview based on your onboarding answers.
                        Our design team will polish this into a professional, high-converting website.
                    </p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark p-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                    <span>✨</span>
                    <span>Your Website is Taking Shape!</span>
                </h3>
                <p className="text-white/80 text-sm mt-1">Live preview based on your choices</p>
            </div>

            <div className="p-6">
                {/* Mock Website Preview */}
                <div
                    className="border-2 rounded-lg overflow-hidden"
                    style={{ borderColor: primaryColor }}
                >
                    {/* Header */}
                    <div
                        className="p-6 text-white"
                        style={{
                            backgroundColor: primaryColor,
                            background: selectedPalette
                                ? `linear-gradient(135deg, ${selectedPalette.colors[0]}, ${selectedPalette.colors[1]})`
                                : primaryColor,
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">
                                {businessInfo.businessName || 'Your Business Name'}
                            </h1>
                            <div className="flex gap-4 text-sm">
                                <span>Home</span>
                                <span>Services</span>
                                <span>Contact</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Section */}
                    <div className="p-8 bg-gray-50">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {businessInfo.location
                                ? `Professional ${businessInfo.industry || 'Services'} in ${businessInfo.location}`
                                : `Professional ${businessInfo.industry || 'Services'}`}
                        </h2>
                        {brandVoice.pubDescription && (
                            <p className="text-gray-700 mb-4">{brandVoice.pubDescription}</p>
                        )}
                        {brandVoice.secretSauce.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {brandVoice.secretSauce.slice(0, 3).map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 rounded-full text-sm text-white"
                                        style={{ backgroundColor: primaryColor }}
                                    >
                                        ✓ {item.replace(/-/g, ' ')}
                                    </span>
                                ))}
                            </div>
                        )}
                        <button
                            className="px-6 py-3 text-white rounded-lg font-semibold"
                            style={{ backgroundColor: primaryColor }}
                        >
                            Get a Free Quote
                        </button>
                    </div>

                    {/* Services Section */}
                    {brandVoice.services.length > 0 && (
                        <div className="p-8 bg-white">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Services</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {brandVoice.services.slice(0, 4).map((service, idx) => (
                                    <div key={idx} className="p-4 border rounded-lg">
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                                            style={{ backgroundColor: `${primaryColor}20` }}
                                        >
                                            <span style={{ color: primaryColor }}>✓</span>
                                        </div>
                                        <h4 className="font-semibold text-gray-900">{service}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Preview Stats */}
                <div className="mt-4 flex justify-between text-sm text-gray-600">
                    <div>
                        <span className="font-semibold">Vibe:</span>{' '}
                        {visualDirection.vibe?.replace(/-/g, ' ') || 'Not set'}
                    </div>
                    <div>
                        <span className="font-semibold">Colors:</span>{' '}
                        {selectedPalette?.name || 'Not set'}
                    </div>
                    <div>
                        <span className="font-semibold">Services:</span> {brandVoice.services.length}
                    </div>
                </div>
            </div>
        </div>
    )
}
