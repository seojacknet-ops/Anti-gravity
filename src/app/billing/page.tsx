import React from 'react';
import { PricingTable } from '@/components/features/billing/PricingTable';

export default function BillingPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
                <p className="mt-4 text-xl text-gray-600">Choose the plan that fits your growth.</p>
            </div>
            <PricingTable />
        </div>
    );
}
