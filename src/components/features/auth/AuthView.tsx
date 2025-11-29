'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Loader2, Mail, Lock, User, Chrome } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { authService } from '@/services/auth'

// Schemas
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

export const AuthView = () => {
    const [isLoading, setIsLoading] = useState(false)

    // Login Form
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    // Register Form
    const {
        register: registerSignup,
        handleSubmit: handleSubmitSignup,
        formState: { errors: errorsSignup },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    const onLogin = async (data: LoginFormData) => {
        setIsLoading(true)
        try {
            await authService.login(data)
            toast.success('Welcome back!')
            // Page reload or state update will happen automatically via onAuthStateChanged in parent
        } catch (error: any) {
            console.error('Login error:', error)
            toast.error(error.message || 'Failed to login')
        } finally {
            setIsLoading(false)
        }
    }

    const onSignup = async (data: RegisterFormData) => {
        setIsLoading(true)
        try {
            await authService.register(data)
            toast.success('Account created successfully!')
        } catch (error: any) {
            console.error('Signup error:', error)
            toast.error(error.message || 'Failed to create account')
        } finally {
            setIsLoading(false)
        }
    }

    const onGoogleLogin = async () => {
        setIsLoading(true)
        try {
            await authService.loginWithGoogle()
            toast.success('Signed in with Google!')
        } catch (error: any) {
            console.error('Google login error:', error)
            toast.error(error.message || 'Failed to sign in with Google')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center space-y-2">
                    <CardTitle className="text-2xl font-bold text-brand-purple">SEOJack</CardTitle>
                    <CardDescription>
                        Your AI-powered web design concierge.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login">Sign In</TabsTrigger>
                            <TabsTrigger value="register">Create Account</TabsTrigger>
                        </TabsList>

                        {/* Login Tab */}
                        <TabsContent value="login">
                            <form onSubmit={handleSubmitLogin(onLogin)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="email"
                                            placeholder="hello@example.com"
                                            className="pl-10"
                                            {...registerLogin('email')}
                                        />
                                    </div>
                                    {errorsLogin.email && (
                                        <p className="text-xs text-red-500">{errorsLogin.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            className="pl-10"
                                            {...registerLogin('password')}
                                        />
                                    </div>
                                    {errorsLogin.password && (
                                        <p className="text-xs text-red-500">{errorsLogin.password.message}</p>
                                    )}
                                </div>
                                <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-purple-dark" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
                                </Button>
                            </form>
                        </TabsContent>

                        {/* Register Tab */}
                        <TabsContent value="register">
                            <form onSubmit={handleSubmitSignup(onSignup)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="name"
                                            placeholder="Jack Smith"
                                            className="pl-10"
                                            {...registerSignup('name')}
                                        />
                                    </div>
                                    {errorsSignup.name && (
                                        <p className="text-xs text-red-500">{errorsSignup.name.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="signup-email"
                                            placeholder="hello@example.com"
                                            className="pl-10"
                                            {...registerSignup('email')}
                                        />
                                    </div>
                                    {errorsSignup.email && (
                                        <p className="text-xs text-red-500">{errorsSignup.email.message}</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            id="signup-password"
                                            type="password"
                                            className="pl-10"
                                            {...registerSignup('password')}
                                        />
                                    </div>
                                    {errorsSignup.password && (
                                        <p className="text-xs text-red-500">{errorsSignup.password.message}</p>
                                    )}
                                </div>
                                <Button type="submit" className="w-full bg-brand-purple hover:bg-brand-purple-dark" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                        onClick={onGoogleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Chrome className="mr-2 h-4 w-4" />
                        )}
                        Google
                    </Button>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-xs text-gray-500 text-center">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
