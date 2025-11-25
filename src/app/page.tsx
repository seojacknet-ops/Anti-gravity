'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, FileText, UploadCloud, CreditCard } from 'lucide-react';

export default function DashboardHome() {
  // Mock State
  const userName = "Alex";
  const projectPhase = "Design Draft";
  const planName = "10 Page Growth";
  const nextBillDate = "Dec 12, 2025";

  return (
    <div className="space-y-8">
      {/* Hero Widget */}
      <div className="bg-gradient-to-r from-brand-purple to-brand-purple-light rounded-3xl p-8 text-white shadow-brand relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}.</h1>
          <p className="text-brand-purple-light/90 text-lg">Project Status: <span className="font-semibold text-white">{projectPhase}</span></p>
        </div>
        {/* Decorative Circle */}
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Next Action Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-brand-purple" />
              Next Action
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="font-semibold text-gray-900">Review Design Draft v1</h3>
                <p className="text-sm text-gray-500 mt-1">Our team has uploaded the first look at your homepage.</p>
              </div>
              <button className="bg-brand-purple text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-purple-dark transition-colors shadow-lg shadow-brand-purple/20 flex items-center">
                View Draft <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          {/* Project Progress Stepper */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Project Progress</h2>
            <div className="relative">
              {/* Line */}
              <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-100 -translate-y-1/2 hidden sm:block"></div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
                {[
                  { label: 'Onboarding', status: 'completed' },
                  { label: 'Design', status: 'current' },
                  { label: 'Development', status: 'pending' },
                  { label: 'Live', status: 'pending' },
                ].map((step, idx) => (
                  <div key={step.label} className="flex flex-col items-center text-center bg-white sm:bg-transparent p-2 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-colors ${step.status === 'completed' ? 'bg-green-500 border-green-100 text-white' :
                      step.status === 'current' ? 'bg-brand-purple border-brand-purple/20 text-white animate-pulse' :
                        'bg-white border-gray-200 text-gray-300'
                      }`}>
                      {step.status === 'completed' ? <CheckCircle className="w-5 h-5" /> : <span>{idx + 1}</span>}
                    </div>
                    <p className={`mt-3 text-sm font-medium ${step.status === 'current' ? 'text-brand-purple' : 'text-gray-500'
                      }`}>{step.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4">Your Plan</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-pink-100 text-pink-500 rounded-lg flex items-center justify-center mr-3">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tier</p>
                    <p className="text-xs text-gray-500">{planName}</p>
                  </div>
                </div>
                <Link href="/billing" className="text-xs font-medium text-brand-purple hover:underline">Manage</Link>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 text-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Next Bill</p>
                    <p className="text-xs text-gray-500">{nextBillDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Upload */}
          <div className="bg-brand-purple/5 rounded-2xl p-6 border border-brand-purple/10 text-center">
            <h3 className="font-bold text-brand-purple mb-2">Quick Upload</h3>
            <p className="text-sm text-gray-600 mb-4">Need to send us a file?</p>
            <Link href="/vault" className="w-full block bg-white border border-brand-purple/20 text-brand-purple py-2 rounded-xl text-sm font-medium hover:bg-brand-purple hover:text-white transition-all">
              <UploadCloud className="w-4 h-4 inline-block mr-2" />
              Open Vault
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
