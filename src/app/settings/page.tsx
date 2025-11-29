'use client'

import React from 'react'
import { authService, AuthUser } from '@/services/auth'
import { databaseService } from '@/services/database'
import { ProfileForm } from '@/components/features/settings/ProfileForm'
import { BusinessForm } from '@/components/features/settings/BusinessForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingsPage() {
    const [user, setUser] = React.useState<AuthUser | null>(null)
    const [profileData, setProfileData] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const loadData = async () => {
            try {
                const currentUser = await authService.getCurrentUser()
                if (currentUser) {
                    setUser(currentUser)
                    const profile = await databaseService.read<any>('users', currentUser.id)
                    setProfileData(profile)
                }
            } catch (error) {
                console.error('Failed to load settings data', error)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    if (loading) {
        return <div className="flex items-center justify-center h-96 text-brand-purple animate-pulse">Loading Settings...</div>
    }

    if (!user) {
        return <div className="p-8 text-center">Please log in to view settings.</div>
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500">Manage your account and business preferences.</p>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="bg-white border border-gray-200 p-1 rounded-xl h-auto w-full md:w-auto flex-wrap">
                    <TabsTrigger
                        value="profile"
                        className="rounded-lg px-4 py-2 data-[state=active]:bg-brand-purple data-[state=active]:text-white data-[state=active]:shadow-md transition-all flex-1 md:flex-none"
                    >
                        Profile
                    </TabsTrigger>
                    <TabsTrigger
                        value="business"
                        className="rounded-lg px-4 py-2 data-[state=active]:bg-brand-purple data-[state=active]:text-white data-[state=active]:shadow-md transition-all flex-1 md:flex-none"
                    >
                        Business Details
                    </TabsTrigger>
                    <TabsTrigger
                        value="notifications"
                        className="rounded-lg px-4 py-2 data-[state=active]:bg-brand-purple data-[state=active]:text-white data-[state=active]:shadow-md transition-all flex-1 md:flex-none"
                    >
                        Notifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile" className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ProfileForm user={user} />
                </TabsContent>

                <TabsContent value="business" className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <BusinessForm user={user} profileData={profileData} />
                </TabsContent>

                <TabsContent value="notifications" className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Preferences</h3>
                        <p className="text-gray-500 mb-4">Control how and when you receive updates.</p>
                        <p className="text-sm text-brand-purple bg-brand-purple/10 px-3 py-1 rounded-full inline-block">Coming Soon</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
