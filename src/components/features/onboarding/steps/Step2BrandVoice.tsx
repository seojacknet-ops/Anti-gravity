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
            if (config && brandVoice.services.length === 0) {
                updateBrandVoice({ services: config.defaultServices })
            }
        }
    }, [businessInfo.industry])

    const industryConfig =
        businessInfo.industry && businessInfo.industry !== 'other'
            ? INDUSTRY_CONFIGS[businessInfo.industry]
            : null

    const toggleService = (service: string) => {
        if (brandVoice.services.includes(service)) {
            updateBrandVoice({ services: brandVoice.services.filter((s) => s !== service) })
        } else {
            updateBrandVoice({ services: [...brandVoice.services, service] })
        }
    }

    const toggleSecretSauce = (item: string) => {
        if (brandVoice.secretSauce.includes(item)) {
            updateBrandVoice({ secretSauce: brandVoice.secretSauce.filter((s) => s !== item) })
        } else if (brandVoice.secretSauce.length < 3) {
            updateBrandVoice({ secretSauce: [...brandVoice.secretSauce, item] })
        }
    }

    const toggleCertification = (cert: string) => {
        if (brandVoice.certifications.includes(cert)) {
            updateBrandVoice({ certifications: brandVoice.certifications.filter((c) => c !== cert) })
        } else {
            updateBrandVoice({ certifications: [...brandVoice.certifications, cert] })
        }
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    What Makes {businessInfo.businessName || 'You'} Different? ✨
                </h2>
                <p className="text-gray-600">
                    Let's capture what makes your business special. This becomes your website copy.
                </p>
            </div>

            {/* The Pub Test */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">The "Pub Test"</label>
                <p className="text-sm text-gray-600 mb-3">
                    Imagine you're at the pub and someone asks what you do. What do you tell them?
                </p>
                <textarea
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all min-h-[120px]"
                    placeholder={
                        industryConfig?.samplePubDescription ||
                        "Tell us your story in your own words. Don't worry about making it perfect - just be yourself!"
                    }
                    value={brandVoice.pubDescription}
                    onChange={(e) => updateBrandVoice({ pubDescription: e.target.value })}
                />
                {industryConfig && (
                    <p className="mt-2 text-xs text-gray-500">
                        💡 Example: "{industryConfig.samplePubDescription}"
                    </p>
                )}
            </div>

            {/* Services Offered */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    What services do you offer?
                </label>
                <p className="text-sm text-gray-600 mb-3">Tick all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {industryConfig?.defaultServices.map((service) => (
                        <button
                            key={service}
                            onClick={() => toggleService(service)}
                            className={`p-3 border-2 rounded-lg text-left transition-all ${brandVoice.services.includes(service)
                                    ? 'border-brand-purple bg-brand-purple/10'
                                    : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${brandVoice.services.includes(service)
                                            ? 'bg-brand-purple border-brand-purple'
                                            : 'border-gray-300'
                                        }`}
                                >
                                    {brandVoice.services.includes(service) && (
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
                                <span className="font-medium text-gray-900">{service}</span>
                            </div>
                        </button>
                    ))}
                </div>
                <div className="mt-3">
                    <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                        placeholder="Add your own service (press Enter)"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                const newService = e.currentTarget.value.trim()
                                updateBrandVoice({
                                    customServices: [...brandVoice.customServices, newService],
                                })
                                e.currentTarget.value = ''
                            }
                        }}
                    />
                    {brandVoice.customServices.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {brandVoice.customServices.map((service, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-sm flex items-center gap-2"
                                >
                                    {service}
                                    <button
                                        onClick={() =>
                                            updateBrandVoice({
                                                customServices: brandVoice.customServices.filter(
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

            {/* The Secret Sauce */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    What do your happiest customers say about you?
                </label>
                <p className="text-sm text-gray-600 mb-3">Pick your top 3</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SECRET_SAUCE_OPTIONS.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => toggleSecretSauce(option.id)}
                            disabled={
                                !brandVoice.secretSauce.includes(option.id) &&
                                brandVoice.secretSauce.length >= 3
                            }
                            className={`p-4 border-2 rounded-lg text-left transition-all ${brandVoice.secretSauce.includes(option.id)
                                    ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                    : 'border-gray-200 hover:border-brand-purple/50 disabled:opacity-50 disabled:cursor-not-allowed'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{option.emoji}</span>
                                <span className="font-medium text-gray-900">{option.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
                {brandVoice.secretSauce.length > 0 && (
                    <p className="mt-2 text-sm text-brand-purple">
                        {brandVoice.secretSauce.length}/3 selected
                    </p>
                )}
            </div>

            {/* Certifications & Trust Signals */}
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
                                className={`p-3 border-2 rounded-lg transition-all ${brandVoice.certifications.includes(cert)
                                        ? 'border-brand-purple bg-brand-purple/10'
                                        : 'border-gray-200 hover:border-brand-purple/50'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${brandVoice.certifications.includes(cert)
                                                ? 'bg-brand-purple border-brand-purple'
                                                : 'border-gray-300'
                                            }`}
                                    >
                                        {brandVoice.certifications.includes(cert) && (
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

            {/* Jobs Completed */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Roughly how many jobs have you completed?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                        { id: '50+', label: '50+' },
                        { id: '100+', label: '100+' },
                        { id: '500+', label: '500+' },
                        { id: '1000+', label: '1000+' },
                        { id: 'lost-count', label: 'Lost count!' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() =>
                                updateBrandVoice({
                                    jobsCompleted: option.id as
                                        | '50+'
                                        | '100+'
                                        | '500+'
                                        | '1000+'
                                        | 'lost-count',
                                })
                            }
                            className={`p-3 border-2 rounded-lg transition-all ${brandVoice.jobsCompleted === option.id
                                    ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                    : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="font-semibold text-gray-900">{option.label}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
