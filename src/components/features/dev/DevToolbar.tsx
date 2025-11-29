'use client'

import React, { useState } from 'react'
import { Wrench, User, Shield, Zap, RotateCcw, X, ChevronUp, ChevronDown, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { authService } from '@/services/auth'
import { databaseService } from '@/services/database'

export type DevUserState = 'real' | 'new_user' | 'standard_plan' | 'pro_plan' | 'admin'

interface DevToolbarProps {
    onSimulate: (state: DevUserState) => void
    currentState: DevUserState
}

export const DevToolbar = ({ onSimulate, currentState }: DevToolbarProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isPromoting, setIsPromoting] = useState(false)

    const handleSimulate = (state: DevUserState, label: string) => {
        onSimulate(state)
        toast.info(`Simulating: ${label}`)
    }

    const handlePromoteToAdmin = async () => {
        setIsPromoting(true)
        try {
            const user = await authService.getCurrentUser()
            if (!user) {
                toast.error('You must be logged in to promote yourself.')
                return
            }

            await databaseService.update('users', user.id, { role: 'admin' })
            toast.success('You are now an Admin! Reloading...')
            setTimeout(() => window.location.reload(), 1000)
        } catch (error) {
            console.error('Failed to promote', error)
            toast.error('Failed to promote to admin')
        } finally {
            setIsPromoting(false)
        }
    }

    if (!isOpen) {
        return (
            <div className="fixed bottom-4 right-4 z-50">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="rounded-full h-12 w-12 bg-gray-900 text-white shadow-xl hover:bg-gray-800"
                >
                    <Wrench className="h-6 w-6" />
                </Button>
            </div>
        )
    }

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <Card className="p-4 bg-white/95 backdrop-blur shadow-2xl border-gray-200 w-72">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-brand-purple" />
                        <h3 className="font-bold text-sm">Dev Tools</h3>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-2">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">
                        Simulate User State
                    </p>

                    <Button
                        variant={currentState === 'new_user' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleSimulate('new_user', 'New User (Onboarding)')}
                    >
                        <User className="mr-2 h-4 w-4" />
                        New User (Onboarding)
                    </Button>

                    <Button
                        variant={currentState === 'standard_plan' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleSimulate('standard_plan', 'Standard Plan')}
                    >
                        <Zap className="mr-2 h-4 w-4 text-blue-500" />
                        Standard Plan
                    </Button>

                    <Button
                        variant={currentState === 'pro_plan' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleSimulate('pro_plan', 'Pro Plan')}
                    >
                        <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                        Pro Plan
                    </Button>

                    <Button
                        variant={currentState === 'admin' ? 'default' : 'outline'}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleSimulate('admin', 'Admin User')}
                    >
                        <Shield className="mr-2 h-4 w-4 text-red-500" />
                        Admin User (Simulated)
                    </Button>

                    <div className="pt-2 mt-2 border-t border-gray-100">
                        <Button
                            variant="default"
                            size="sm"
                            className="w-full justify-start bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0"
                            onClick={handlePromoteToAdmin}
                            disabled={isPromoting}
                        >
                            <Crown className="mr-2 h-4 w-4" />
                            {isPromoting ? 'Promoting...' : 'Make Me Real Admin'}
                        </Button>
                    </div>

                    <div className="pt-2 mt-2 border-t border-gray-100">
                        <Button
                            variant={currentState === 'real' ? 'secondary' : 'ghost'}
                            size="sm"
                            className="w-full justify-start text-gray-600"
                            onClick={() => handleSimulate('real', 'Real User State')}
                        >
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset to Real State
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
