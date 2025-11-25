import React from 'react';
import { useOnboardingStore } from '../store';

export const GoalStep = () => {
    const { goal, setGoal } = useOnboardingStore();

    const goals = [
        { id: 'leads', label: 'Generate Leads', desc: 'Get more inquiries and calls.' },
        { id: 'sales', label: 'Drive Sales', desc: 'Sell products directly online.' },
        { id: 'brand', label: 'Brand Awareness', desc: 'Showcase work and build authority.' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-brand-purple">Step 3: The Goal</h2>
            <p className="text-gray-600">What is the primary objective of this website?</p>

            <div className="grid grid-cols-1 gap-4">
                {goals.map((g) => (
                    <div
                        key={g.id}
                        onClick={() => setGoal(g.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${goal === g.id
                                ? 'border-brand-purple bg-brand-purple/10 ring-2 ring-brand-purple'
                                : 'border-gray-200 hover:border-brand-purple-light'
                            }`}
                    >
                        <h3 className="font-semibold text-gray-900">{g.label}</h3>
                        <p className="text-sm text-gray-500">{g.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
