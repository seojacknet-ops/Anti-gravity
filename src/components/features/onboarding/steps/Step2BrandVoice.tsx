'use client'

import React, { useEffect } from 'react'
import { useOnboardingStore } from '@/lib/store/onboarding-store'
import { INDUSTRY_CONFIGS, SECRET_SAUCE_OPTIONS } from '@/lib/config/industry-defaults'

export const Step2BrandVoice = () => {
    const { data, updateBrandVoice } = useOnboardingStore()
    const { brandVoice, businessInfo } = data

    // Apply smart defaults when industry is selected
    useEffect(() => {
        if (businessInfo.industry && businessInfo.industry !== 'other') {
            const config = INDUSTRY_CONFIGS[businessInfo.industry]
            if (config && (brandVoice.services ?? []).length === 0) {
                updateBrandVoice({ services: config.defaultServices })
            }
        }
    }, [businessInfo.industry])

    const industryConfig =
        businessInfo.industry && businessInfo.industry !== 'other'
            ? INDUSTRY_CONFIGS[businessInfo.industry]
            : null

    const toggleService = (service: string) => {
        const services = brandVoice.services ?? []
        if (services.includes(service)) {
            updateBrandVoice({ services: services.filter((s) => s !== service) })
        } else {
            updateBrandVoice({ services: [...services, service] })
        }
    }

    const toggleSecretSauce = (item: string) => {
        const secretSauce = brandVoice.secretSauce ?? []
        if (secretSauce.includes(item)) {
            updateBrandVoice({ secretSauce: secretSauce.filter((s) => s !== item) })
        } else if (secretSauce.length < 3) {
            updateBrandVoice({ secretSauce: [...secretSauce, item] })
        }
    }

    const toggleCertification = (cert: string) => {
        const certifications = brandVoice.certifications ?? []
        if (certifications.includes(cert)) {
            updateBrandVoice({ certifications: certifications.filter((c) => c !== cert) })
        } else {
            updateBrandVoice({ certifications: [...certifications, cert] })
        }
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Let's Build Your Website 🚀
                </h2>
                <p className="text-gray-600">
                    Tell us what features you need and we'll create the perfect website for you.
                </p>
            </div>


            {/* Website Features */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    What features do you need on your website?
                </label>
                <p className="text-sm text-gray-600 mb-3">Tick all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        { id: 'ecommerce', label: 'E-commerce / Online Store', emoji: '🛒' },
                        { id: 'booking', label: 'Online Booking / Scheduling', emoji: '📅' },
                        { id: 'portfolio', label: 'Portfolio / Gallery', emoji: '🖼️' },
                        { id: 'blog', label: 'Blog / News', emoji: '📝' },
                        { id: 'contact', label: 'Contact Forms', emoji: '📧' },
                        { id: 'testimonials', label: 'Customer Reviews / Testimonials', emoji: '⭐' },
                        { id: 'team', label: 'Team / About Us', emoji: '👥' },
                        { id: 'services', label: 'Services / Products Showcase', emoji: '💼' },
                        { id: 'faq', label: 'FAQ Section', emoji: '❓' },
                        { id: 'chat', label: 'Live Chat Support', emoji: '💬' },
                    ].map((feature) => (
                        <button
                            key={feature.id}
                            onClick={() => toggleService(feature.id)}
                            className={`p-3 border-2 rounded-lg text-left transition-all hover:scale-105 ${(brandVoice.services ?? []).includes(feature.id)
                                ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{feature.emoji}</span>
                                <span className="font-medium text-gray-900">{feature.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="mt-3">
                    <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                        placeholder="Add your own feature (press Enter)"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                const newService = e.currentTarget.value.trim()
                                updateBrandVoice({
                                    customServices: [...(brandVoice.customServices ?? []), newService],
                                })
                                e.currentTarget.value = ''
                            }
                        }}
                    />
                    {(brandVoice.customServices ?? []).length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {(brandVoice.customServices ?? []).map((service, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-sm flex items-center gap-2"
                                >
                                    {service}
                                    <button
                                        onClick={() =>
                                            updateBrandVoice({
                                                customServices: (brandVoice.customServices ?? []).filter(
                                                    (_, i) => i !== idx
                                                ),
                                            })
                                        }
                                        className="hover:text-brand-purple-dark"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>


            {/* Tone of Voice */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    How should your website sound?
                </label>
                <p className="text-sm text-gray-600 mb-3">Select the tone that fits your brand</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                        { id: 'friendly', label: 'Friendly & Casual', emoji: '👋' },
                        { id: 'professional', label: 'Corporate & Professional', emoji: '👔' },
                        { id: 'luxury', label: 'Luxury & Elegant', emoji: '✨' },
                        { id: 'urgent', label: 'Urgent & Direct', emoji: '⚡' },
                        { id: 'warm', label: 'Warm & Welcoming', emoji: '🏡' },
                        { id: 'minimal', label: 'Minimal & Clean', emoji: '⚪' },
                    ].map((tone) => (
                        <button
                            key={tone.id}
                            onClick={() => updateBrandVoice({ toneOfVoice: tone.id })}
                            className={`p-3 border-2 rounded-lg text-left transition-all hover:scale-105 ${brandVoice.toneOfVoice === tone.id
                                ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xl">{tone.emoji}</span>
                                <span className="font-medium text-gray-900 text-sm">{tone.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Why Choose Us (USPs) */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Why should customers choose you?
                </label>
                <p className="text-sm text-gray-600 mb-3">Select your top highlights (max 3)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        { id: '24-7', label: '24/7 Availability', emoji: '🕒' },
                        { id: 'family-owned', label: 'Family Owned & Operated', emoji: '👨‍👩‍👧‍👦' },
                        { id: 'best-price', label: 'Best Price Guarantee', emoji: '💰' },
                        { id: 'award-winning', label: 'Award Winning Service', emoji: '🏆' },
                        { id: 'eco-friendly', label: 'Eco-Friendly / Green', emoji: '🌿' },
                        { id: 'free-estimates', label: 'Free Estimates', emoji: '📝' },
                        { id: 'licensed', label: 'Fully Licensed & Insured', emoji: '🛡️' },
                        { id: 'satisfaction', label: '100% Satisfaction Guarantee', emoji: '🤝' },
                    ].map((usp) => (
                        <button
                            key={usp.id}
                            onClick={() => {
                                const usps = brandVoice.usps ?? []
                                if (usps.includes(usp.id)) {
                                    updateBrandVoice({
                                        usps: usps.filter((u) => u !== usp.id),
                                    })
                                } else if (usps.length < 3) {
                                    updateBrandVoice({
                                        usps: [...usps, usp.id],
                                    })
                                }
                            }}
                            className={`p-3 border-2 rounded-lg text-left transition-all hover:scale-105 ${(brandVoice.usps ?? []).includes(usp.id)
                                ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{usp.emoji}</span>
                                <span className="font-medium text-gray-900">{usp.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {industryConfig && (
                <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                        Any certifications, memberships, or qualifications?
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                        These badges build instant trust on your website
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {industryConfig.commonCertifications.map((cert) => (
                            <button
                                key={cert}
                                onClick={() => toggleCertification(cert)}
                                className={`p-3 border-2 rounded-lg transition-all ${(brandVoice.certifications ?? []).includes(cert)
                                    ? 'border-brand-purple bg-brand-purple/10'
                                    : 'border-gray-200 hover:border-brand-purple/50'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${(brandVoice.certifications ?? []).includes(cert)
                                            ? 'bg-brand-purple border-brand-purple'
                                            : 'border-gray-300'
                                            }`}
                                    >
                                        {(brandVoice.certifications ?? []).includes(cert) && (
                                            <svg
                                                className="w-3 h-3 text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={3}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        )}
                                    </div>
                                    <span className="font-medium text-gray-900 text-sm">{cert}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}
