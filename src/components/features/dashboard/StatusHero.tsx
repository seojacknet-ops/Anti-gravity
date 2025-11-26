'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface StatusHeroProps {
    userName: string;
    projectPhase: string;
    currentStep: number;
    totalSteps: number;
}

export default function StatusHero({ userName, projectPhase, currentStep, totalSteps }: StatusHeroProps) {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="bg-gradient-to-br from-brand-purple via-brand-purple-light to-brand-purple-dark rounded-3xl p-8 text-white shadow-brand relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-2">
                            <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                            Welcome back, {userName}.
                        </h1>
                        <p className="text-white/80 text-lg">Your project is making great progress!</p>
                    </div>

                    {/* Status Badge */}
                    <div className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2.5 shadow-lg">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                        <div>
                            <p className="text-xs text-white/70 font-medium">Current Phase</p>
                            <p className="text-sm font-bold text-white">{projectPhase}</p>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-white/90 font-medium">Project Progress</span>
                        <span className="text-white font-bold">Step {currentStep} of {totalSteps}</span>
                    </div>
                    <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-300 rounded-full transition-all duration-500 shadow-lg"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="h-full w-full bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                    <p className="text-xs text-white/70">
                        {progress < 50 ? 'Just getting started!' : progress < 75 ? 'Making great progress!' : 'Almost there!'}
                    </p>
                </div>
            </div>
        </div>
    );
}
