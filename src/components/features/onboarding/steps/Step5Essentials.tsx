'use client'

import React from 'react'
import { useOnboardingStore } from '@/lib/store/onboarding-store'

export const Step5Essentials = () => {
    const { data, updateEssentials } = useOnboardingStore()
    const { essentials } = data

    const toggleContactMethod = (method: 'phone' | 'email' | 'whatsapp' | 'contact-form' | 'messenger') => {
        if (essentials.contactMethods.includes(method)) {
            updateEssentials({
                contactMethods: essentials.contactMethods.filter((m) => m !== method),
            })
        } else {
            updateEssentials({ contactMethods: [...essentials.contactMethods, method] })
        }
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">The Essentials 📋</h2>
                <p className="text-gray-600">
                    Almost there! Just a few practical details to make your website functional.
                </p>
            </div>

            {/* Contact Preferences */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    How should customers reach you?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        { id: 'phone', label: 'Phone', emoji: '📞' },
                        { id: 'email', label: 'Email', emoji: '✉️' },
                        { id: 'whatsapp', label: 'WhatsApp', emoji: '💬' },
                        { id: 'contact-form', label: 'Contact Form', emoji: '📝' },
                        { id: 'messenger', label: 'Facebook Messenger', emoji: '💬' },
                    ].map((method) => (
                        <button
                            key={method.id}
                            onClick={() =>
                                toggleContactMethod(
                                    method.id as 'phone' | 'email' | 'whatsapp' | 'contact-form' | 'messenger'
                                )
                            }
                            className={`p-4 border-2 rounded-lg text-left transition-all ${essentials.contactMethods.includes(
                                method.id as 'phone' | 'email' | 'whatsapp' | 'contact-form' | 'messenger'
                            )
                                    ? 'border-brand-purple bg-brand-purple/10'
                                    : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{method.emoji}</span>
                                <span className="font-medium text-gray-900">{method.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Best phone number
                    </label>
                    <input
                        type="tel"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                        placeholder="07xxx xxx xxx"
                        value={essentials.phone}
                        onChange={(e) => updateEssentials({ phone: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">Best email</label>
                    <input
                        type="email"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                        placeholder="you@business.com"
                        value={essentials.email}
                        onChange={(e) => updateEssentials({ email: e.target.value })}
                    />
                </div>
            </div>

            {/* Business Hours */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">When are you available?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    {[
                        { label: 'Mon-Fri 9-5', value: 'Mon-Fri 9-5' },
                        { label: 'Mon-Sat 8-6', value: 'Mon-Sat 8-6' },
                        { label: '24/7 Emergency', value: '24/7 Emergency' },
                        { label: 'Custom', value: 'custom' },
                    ].map((preset) => (
                        <button
                            key={preset.value}
                            onClick={() =>
                                updateEssentials({
                                    businessHours: preset.value === 'custom' ? '' : preset.value,
                                })
                            }
                            className={`p-3 border-2 rounded-lg transition-all ${essentials.businessHours === preset.value ||
                                    (preset.value === 'custom' &&
                                        essentials.businessHours &&
                                        !['Mon-Fri 9-5', 'Mon-Sat 8-6', '24/7 Emergency'].includes(
                                            essentials.businessHours
                                        ))
                                    ? 'border-brand-purple bg-brand-purple/10'
                                    : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="font-medium text-gray-900 text-sm">{preset.label}</div>
                        </button>
                    ))}
                </div>
                {essentials.businessHours &&
                    !['Mon-Fri 9-5', 'Mon-Sat 8-6', '24/7 Emergency'].includes(essentials.businessHours) && (
                        <input
                            type="text"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                            placeholder="Enter your custom hours..."
                            value={essentials.businessHours}
                            onChange={(e) => updateEssentials({ businessHours: e.target.value })}
                        />
                    )}
                <div className="mt-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={essentials.showHours}
                            onChange={(e) => updateEssentials({ showHours: e.target.checked })}
                            className="w-4 h-4 text-brand-purple border-gray-300 rounded focus:ring-brand-purple"
                        />
                        <span className="text-sm text-gray-700">Show hours on website</span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                        Some tradespeople prefer flexibility
                    </p>
                </div>
            </div>

            {/* Social Media */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Got any social media we should link to?
                </label>
                <div className="space-y-3">
                    {[
                        { key: 'facebook', label: 'Facebook', icon: '📘' },
                        { key: 'instagram', label: 'Instagram', icon: '📷' },
                        { key: 'tiktok', label: 'TikTok', icon: '🎵' },
                        { key: 'youtube', label: 'YouTube', icon: '📹' },
                        { key: 'linkedin', label: 'LinkedIn', icon: '💼' },
                        { key: 'googleBusiness', label: 'Google Business', icon: '🗺️' },
                    ].map((social) => (
                        <div key={social.key} className="flex items-center gap-3">
                            <span className="text-2xl w-8">{social.icon}</span>
                            <input
                                type="url"
                                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                                placeholder={`${social.label} URL (optional)`}
                                value={
                                    essentials.socialMedia[social.key as keyof typeof essentials.socialMedia] ||
                                    ''
                                }
                                onChange={(e) =>
                                    updateEssentials({
                                        socialMedia: {
                                            ...essentials.socialMedia,
                                            [social.key]: e.target.value,
                                        },
                                    })
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Existing Website */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Do you have a website currently?
                </label>
                <div className="flex gap-4 mb-3">
                    <button
                        onClick={() => updateEssentials({ hasExistingWebsite: true })}
                        className={`flex-1 p-3 border-2 rounded-lg transition-all ${essentials.hasExistingWebsite
                                ? 'border-brand-purple bg-brand-purple/10'
                                : 'border-gray-200 hover:border-brand-purple/50'
                            }`}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() =>
                            updateEssentials({ hasExistingWebsite: false, existingWebsiteUrl: undefined })
                        }
                        className={`flex-1 p-3 border-2 rounded-lg transition-all ${!essentials.hasExistingWebsite
                                ? 'border-brand-purple bg-brand-purple/10'
                                : 'border-gray-200 hover:border-brand-purple/50'
                            }`}
                    >
                        No
                    </button>
                </div>
                {essentials.hasExistingWebsite && (
                    <input
                        type="url"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                        placeholder="Current website URL"
                        value={essentials.existingWebsiteUrl || ''}
                        onChange={(e) => updateEssentials({ existingWebsiteUrl: e.target.value })}
                    />
                )}
            </div>

            {/* Reviews */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Where do your best reviews live?
                </label>
                <p className="text-sm text-gray-600 mb-3">We can pull these into your website</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Google', 'Facebook', 'Checkatrade', 'Bark', 'TrustPilot', 'Yell'].map((source) => (
                        <button
                            key={source}
                            onClick={() => {
                                if (essentials.reviewSources.includes(source)) {
                                    updateEssentials({
                                        reviewSources: essentials.reviewSources.filter((s) => s !== source),
                                    })
                                } else {
                                    updateEssentials({
                                        reviewSources: [...essentials.reviewSources, source],
                                    })
                                }
                            }}
                            className={`p-3 border-2 rounded-lg transition-all ${essentials.reviewSources.includes(source)
                                    ? 'border-brand-purple bg-brand-purple/10'
                                    : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="font-medium text-gray-900 text-sm">{source}</div>
                        </button>
                    ))}
                </div>
                <div className="mt-4">
                    <textarea
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 min-h-[100px]"
                        placeholder="Or paste a few of your favourite customer quotes here..."
                        value={essentials.testimonials}
                        onChange={(e) => updateEssentials({ testimonials: e.target.value })}
                    />
                </div>
            </div>
        </div>
    )
}
