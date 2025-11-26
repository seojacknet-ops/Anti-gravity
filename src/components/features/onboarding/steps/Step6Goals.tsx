'use client'

import React from 'react'
import { useOnboardingStore } from '@/lib/store/onboarding-store'
import { PRIMARY_GOALS } from '@/lib/config/industry-defaults'

export const Step6Goals = () => {
    const { data, updateGoals } = useOnboardingStore()
    const { goals, businessInfo } = data

    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">The Finish Line 🎯</h2>
                <p className="text-gray-600">One final question - let's clarify your goals and timeline.</p>
            </div>

            {/* Primary Goal */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    What's the #1 thing you want this website to do?
                </label>
                <div className="space-y-3">
                    {PRIMARY_GOALS.map((goal) => (
                        <button
                            key={goal.id}
                            onClick={() =>
                                updateGoals({
                                    primaryGoal: goal.id as
                                        | 'phone-ringing'
                                        | 'online-booking'
                                        | 'look-professional'
                                        | 'google-ranking'
                                        | 'win-bigger-jobs',
                                })
                            }
                            className={`w-full p-4 border-2 rounded-lg text-left transition-all ${goals.primaryGoal === goal.id
                                    ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                    : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">{goal.emoji}</span>
                                <div>
                                    <div className="font-semibold text-gray-900 text-lg">{goal.label}</div>
                                    <div className="text-sm text-gray-600">{goal.description}</div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                    How soon do you need this live?
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { id: 'yesterday', label: 'Yesterday!', emoji: '🔥', desc: 'ASAP' },
                        { id: '2-weeks', label: 'Within 2 weeks', emoji: '⚡', desc: 'Fast track' },
                        { id: '1-month', label: 'Within a month', emoji: '📅', desc: 'Standard' },
                        { id: 'no-rush', label: 'No rush', emoji: '🌱', desc: 'Get it right' },
                    ].map((option) => (
                        <button
                            key={option.id}
                            onClick={() =>
                                updateGoals({
                                    timeline: option.id as 'yesterday' | '2-weeks' | '1-month' | 'no-rush',
                                })
                            }
                            className={`p-4 border-2 rounded-lg transition-all ${goals.timeline === option.id
                                    ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple/30'
                                    : 'border-gray-200 hover:border-brand-purple/50'
                                }`}
                        >
                            <div className="text-3xl mb-2">{option.emoji}</div>
                            <div className="font-semibold text-gray-900 text-sm">{option.label}</div>
                            <div className="text-xs text-gray-600">{option.desc}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Additional Notes */}
            <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Anything else?</label>
                <p className="text-sm text-gray-600 mb-3">
                    Dream features? Specific requests? Horror stories from past web designers? We're all ears.
                </p>
                <textarea
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all min-h-[120px]"
                    placeholder="Tell us anything else that might be helpful..."
                    value={goals.additionalNotes}
                    onChange={(e) => updateGoals({ additionalNotes: e.target.value })}
                />
            </div>

            {/* Summary Preview */}
            <div className="mt-8 p-6 bg-gradient-to-br from-brand-purple/10 to-brand-purple/5 border-2 border-brand-purple/20 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🎉 You're all set!</h3>
                <p className="text-gray-700 mb-4">
                    We've captured everything we need to build an amazing website for{' '}
                    <span className="font-semibold">{businessInfo.businessName || 'your business'}</span>.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Business info and industry details</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Your unique selling points and services</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Target customer profile</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Visual direction and brand preferences</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Contact details and social media</span>
                    </div>
                    <div className="flex items-start gap-2">
                        <span className="text-green-600 font-bold">✓</span>
                        <span>Primary goals and timeline</span>
                    </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg border border-brand-purple/20">
                    <p className="text-sm font-medium text-gray-900 mb-1">What happens next?</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Our design team will review your brief</li>
                        <li>• You'll receive a design draft within 48 hours</li>
                        <li>• We'll keep you updated via the chat</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
