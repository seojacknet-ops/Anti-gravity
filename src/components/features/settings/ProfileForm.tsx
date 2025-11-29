'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { authService, AuthUser } from '@/services/auth'
import { databaseService } from '@/services/database'

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    timezone: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileFormProps {
    user: AuthUser
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
    const [isLoading, setIsLoading] = React.useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
            phone: (user as any).phone || '',
            timezone: (user as any).timezone || 'UTC',
        }
    })

    const onSubmit = async (data: ProfileFormValues) => {
        setIsLoading(true)
        try {
            // Update Auth Profile (Name)
            await authService.updateProfile(user.id, { name: data.name })

            // Update Database Profile (Phone, Timezone)
            await databaseService.update('users', user.id, {
                phone: data.phone,
                timezone: data.timezone,
                updatedAt: new Date()
            })

            toast.success('Profile updated successfully')
        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error('Failed to update profile')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and preferences.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" {...register('name')} />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" {...register('email')} disabled className="bg-gray-50" />
                        <p className="text-xs text-gray-500">Email cannot be changed directly.</p>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" {...register('phone')} placeholder="+1 (555) 000-0000" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <select
                            id="timezone"
                            {...register('timezone')}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">Eastern Time (US & Canada)</option>
                            <option value="America/Chicago">Central Time (US & Canada)</option>
                            <option value="America/Denver">Mountain Time (US & Canada)</option>
                            <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                            <option value="Europe/London">London</option>
                            <option value="Europe/Paris">Paris</option>
                            <option value="Asia/Tokyo">Tokyo</option>
                            <option value="Australia/Sydney">Sydney</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
