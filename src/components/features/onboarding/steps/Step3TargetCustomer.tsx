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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Who's Your Target Audience? 🎯</h2>
                <p className="text-gray-600">
                    Help us understand who you're trying to reach with your website.
                </p>
            </div>

            {/* Customer Type */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    Who are you targeting?
                </label>
                <p className="text-sm text-gray-600 mb-3">Select all that apply</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        { id: 'homeowners', label: 'Homeowners', emoji: '🏠', desc: 'Residential customers' },
                        { id: 'businesses', label: 'Businesses', emoji: '🏢', desc: 'Commercial clients' },
                        {
                            id: 'tradespeople',
                            label: 'Other Professionals',
                            emoji: '🏗️',
                            desc: 'B2B services',
                        },
                        {
                            id: 'elderly',
                            label: 'Specific Demographics',
                            emoji: '👥',
                            desc: 'Targeted audience',
                        },
                        { id: 'mixed', label: 'General Public', emoji: '🌍', desc: 'Everyone' },
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
                            className={`p-4 border-2 rounded-lg text-left transition-all hover:scale-105 ${targetCustomer.customerType.includes(
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
        </div>
    )
}
