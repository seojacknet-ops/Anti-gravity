'use client'

import React from 'react'
import { useOnboardingStore } from '@/lib/store/onboarding-store'

export const Step3TargetCustomer = () => {
    const { data, updateTargetCustomer } = useOnboardingStore()
    const { targetCustomer, businessInfo } = data

    const toggleCustomerType = (type: 'homeowners' | 'businesses' | 'tradespeople' | 'elderly' | 'mixed') => {
        if (targetCustomer.customerType.includes(type)) {
            updateTargetCustomer({
                customerType: targetCustomer.customerType.filter((t) => t !== type),
            })
        } else {
            updateTargetCustomer({ customerType: [...targetCustomer.customerType, type] })
        }
    }

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Ideal Customer 🎯</h2>
                <p className="text-gray-600">
                    Understanding who you serve helps us make your website speak directly to those people.
                </p>
            </div>

            {/* Customer Type */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Who's your ideal customer?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        { id: 'homeowners', label: 'Homeowners', emoji: '🏠', desc: 'Residential customers' },
                        { id: 'businesses', label: 'Businesses', emoji: '🏢', desc: 'Commercial clients' },
                        {
                            id: 'tradespeople',
                            label: 'Other Tradespeople',
                            emoji: '🏗️',
                            desc: 'B2B services',
                        },
                        {
                            id: 'elderly',
                            label: 'Elderly/Vulnerable',
                            emoji: '👵',
                            desc: 'Trust signals matter',
                        },
                        { id: 'mixed', label: 'Mix of Above', emoji: '🔄', desc: 'All customer types' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() =>
                                toggleCustomerType(
                                    option.id as
                                    | 'homeowners'
                                    | 'businesses'
                                    | 'tradespeople'
                                    | 'elderly'
                                    | 'mixed'
                                )
                            }
                            className={`p-4 border-2 rounded-lg text-left transition-all ${targetCustomer.customerType.includes(
                                option.id as
                                | 'homeowners'
                                | 'businesses'
                                | 'tradespeople'
                                | 'elderly'
                                | 'mixed'
                            )
                                    ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                    : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-3xl">{option.emoji}</span>
                                <div>
                                    <div className="font-semibold text-gray-900">{option.label}</div>
                                    <div className="text-sm text-gray-600">{option.desc}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Service Area */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    How far do you travel for work?
                </label>
                <div className="space-y-3">
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Within</span>
                        <input
                            type="number"
                            min="1"
                            max="200"
                            className="w-24 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                            placeholder="20"
                            value={targetCustomer.serviceAreaMiles || ''}
                            onChange={(e) =>
                                updateTargetCustomer({
                                    serviceAreaMiles: parseInt(e.target.value) || null,
                                })
                            }
                        />
                        <span className="text-sm text-gray-600">
                            miles of {businessInfo.location || 'your location'}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500">
                        Or specify particular areas/postcodes (optional):
                    </div>
                    <input
                        type="text"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20"
                        placeholder="e.g. M1, M2, Salford, Trafford..."
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                                const newArea = e.currentTarget.value.trim()
                                updateTargetCustomer({
                                    specificAreas: [...targetCustomer.specificAreas, newArea],
                                })
                                e.currentTarget.value = ''
                            }
                        }}
                    />
                    {targetCustomer.specificAreas.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {targetCustomer.specificAreas.map((area, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-sm flex items-center gap-2"
                                >
                                    {area}
                                    <button
                                        onClick={() =>
                                            updateTargetCustomer({
                                                specificAreas: targetCustomer.specificAreas.filter(
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

            {/* Price Positioning */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Where do you sit on price?
                </label>
                <div className="space-y-3">
                    {[
                        {
                            id: 'budget',
                            label: 'Budget-friendly',
                            desc: 'I compete on price',
                            emoji: '💷',
                        },
                        {
                            id: 'mid-range',
                            label: 'Mid-range',
                            desc: 'Fair prices for quality work',
                            emoji: '⚖️',
                        },
                        {
                            id: 'premium',
                            label: 'Premium',
                            desc: "I'm not the cheapest, but I'm worth it",
                            emoji: '⭐',
                        },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() =>
                                updateTargetCustomer({
                                    pricePositioning: option.id as 'budget' | 'mid-range' | 'premium',
                                })
                            }
                            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${targetCustomer.pricePositioning === option.id
                                    ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                    : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{option.emoji}</span>
                                <div>
                                    <div className="font-semibold text-gray-900">{option.label}</div>
                                    <div className="text-sm text-gray-600">{option.desc}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Dream Job */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">The Dream Job</label>
                <p className="text-sm text-gray-600 mb-3">
                    What's your favourite type of job to get called out for?
                </p>
                <textarea
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all min-h-[100px]"
                    placeholder="e.g. Full bathroom renovations - I love seeing the transformation"
                    value={targetCustomer.dreamJob}
                    onChange={(e) => updateTargetCustomer({ dreamJob: e.target.value })}
                />
                <p className="mt-2 text-xs text-gray-500">
                    💡 This helps us know what to emphasize on your website
                </p>
            </div>
        </div>
    )
}
