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
import { AuthUser } from '@/services/auth'
import { databaseService } from '@/services/database'

const businessSchema = z.object({
    businessName: z.string().min(2, 'Business Name must be at least 2 characters'),
    industry: z.string().min(2, 'Industry is required'),
    website: z.string().url('Invalid URL').optional().or(z.literal('')),
    address: z.string().optional(),
})

type BusinessFormValues = z.infer<typeof businessSchema>

interface BusinessFormProps {
    user: AuthUser
    profileData?: any
}

export const BusinessForm: React.FC<BusinessFormProps> = ({ user, profileData }) => {
    const [isLoading, setIsLoading] = React.useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<BusinessFormValues>({
        resolver: zodResolver(businessSchema),
        defaultValues: {
            businessName: profileData?.businessName || '',
            industry: profileData?.industry || '',
            website: profileData?.website || '',
            address: profileData?.address || '',
        }
    })

    const onSubmit = async (data: BusinessFormValues) => {
        setIsLoading(true)
        try {
            await databaseService.update('users', user.id, {
                businessName: data.businessName,
                industry: data.industry,
                website: data.website,
                address: data.address,
                updatedAt: new Date()
            })

            toast.success('Business details updated successfully')
        } catch (error) {
            console.error('Error updating business details:', error)
            toast.error('Failed to update business details')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>Information about your company.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="businessName">Business Name</Label>
                        <Input id="businessName" {...register('businessName')} />
                        {errors.businessName && <p className="text-sm text-red-500">{errors.businessName.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input id="industry" {...register('industry')} placeholder="e.g. Plumbing, E-commerce, Legal" />
                        {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="website">Website URL (Current)</Label>
                        <Input id="website" {...register('website')} placeholder="https://example.com" />
                        {errors.website && <p className="text-sm text-red-500">{errors.website.message}</p>}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="address">Business Address</Label>
                        <Input id="address" {...register('address')} placeholder="123 Main St, City, State" />
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
