'use client';

import React from 'react';
import { useOnboardingStore } from './store';
import { VibeStep } from './steps/VibeStep';
import { ContentStep } from './steps/ContentStep';
import { GoalStep } from './steps/GoalStep';
import { ChevronRight, ChevronLeft, HelpCircle } from 'lucide-react';

export const Wizard = () => {
    const { step, setStep } = useOnboardingStore();
    const totalSteps = 3;

    const renderStep = () => {
        switch (step) {
            case 1: return <VibeStep />;
            case 2: return <ContentStep />;
            case 3: return <GoalStep />;
            default: return <VibeStep />;
        }
    };

    const progress = (step / totalSteps) * 100;

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-brand p-8">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
                    <span>Step {step} of {totalSteps}</span>
                    <span>{Math.round(progress)}% Completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-brand-purple h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
                {renderStep()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                <button
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
                        }`}
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                </button>

                <div className="flex space-x-3">
                    <button
                        className="flex items-center px-4 py-2 text-brand-purple hover:bg-brand-purple/5 rounded-lg text-sm font-medium transition-colors"
                        onClick={() => alert('Opening Chat...')} // Placeholder for Chat trigger
                    >
                        <HelpCircle className="w-4 h-4 mr-1" />
                        Ask SEOJack
                    </button>

                    <button
                        onClick={() => {
                            if (step < totalSteps) {
                                setStep(step + 1);
                            } else {
                                alert('Onboarding Complete!');
                            }
                        }}
                        className="flex items-center px-6 py-2 bg-brand-purple text-white rounded-lg text-sm font-medium hover:bg-brand-purple-dark shadow-lg shadow-brand-purple/20 transition-all"
                    >
                        {step === totalSteps ? 'Finish' : 'Continue'}
                        {step !== totalSteps && <ChevronRight className="w-4 h-4 ml-1" />}
                    </button>
                </div>
            </div>
        </div>
    );
};
