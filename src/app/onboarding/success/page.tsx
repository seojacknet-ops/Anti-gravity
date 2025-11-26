"use client"

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Clock, MessageSquare, Mail, ArrowRight, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function OnboardingSuccessPage() {
    const router = useRouter()

    useEffect(() => {
        // Simulate system events
        const timer1 = setTimeout(() => {
            toast.success("Confirmation email sent to your inbox!", {
                icon: <Mail className="w-4 h-4" />,
                description: "Check your spam folder just in case."
            })
        }, 1500)

        const timer2 = setTimeout(() => {
            toast.info("New Message from SEOJack Team", {
                icon: <MessageSquare className="w-4 h-4" />,
                description: "Welcome aboard! I'm reviewing your details now.",
                action: {
                    label: "Reply",
                    onClick: () => console.log("Open chat")
                }
            })
        }, 3500)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
        }
    }, [])

    const timeline = [
        {
            id: 1,
            title: "Onboarding Complete",
            description: "We have received your brand details and goals.",
            status: "completed",
            date: "Just now"
        },
        {
            id: 2,
            title: "Design Draft",
            description: "Our team is crafting your initial homepage concept.",
            status: "in-progress",
            date: "Est. 48 hours"
        },
        {
            id: 3,
            title: "Review & Feedback",
            description: "You'll receive a link to comment on the design.",
            status: "pending",
            date: "Upcoming"
        },
        {
            id: 4,
            title: "Site Launch",
            description: "Once approved, we go live on your domain.",
            status: "pending",
            date: "Upcoming"
        }
    ]

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl w-full"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-10 h-10" />
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Project Confirmed!
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                        We've started working on your project. Here's what happens next.
                    </p>
                </div>

                <Card className="p-8 border-brand-purple/20 shadow-lg mb-8">
                    <div className="space-y-8">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (index * 0.1) }}
                                className="flex gap-4"
                            >
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${item.status === 'completed' ? 'bg-green-100 text-green-600' :
                                            item.status === 'in-progress' ? 'bg-brand-purple text-white animate-pulse' :
                                                'bg-secondary text-muted-foreground'
                                        }`}>
                                        {item.status === 'completed' ? <CheckCircle className="w-5 h-5" /> :
                                            item.status === 'in-progress' ? <Clock className="w-5 h-5" /> :
                                                <div className="w-3 h-3 rounded-full bg-current" />}
                                    </div>
                                    {index !== timeline.length - 1 && (
                                        <div className={`w-0.5 grow mt-2 ${item.status === 'completed' ? 'bg-green-100' : 'bg-secondary'
                                            }`} />
                                    )}
                                </div>
                                <div className="pb-2">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className={`font-semibold text-lg ${item.status === 'in-progress' ? 'text-brand-purple' : 'text-foreground'
                                            }`}>
                                            {item.title}
                                        </h3>
                                        {item.status === 'in-progress' && (
                                            <span className="text-xs bg-brand-purple/10 text-brand-purple px-2 py-0.5 rounded-full font-medium">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground mb-1">{item.description}</p>
                                    <p className="text-xs font-medium text-muted-foreground/70 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> {item.date}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-brand-purple hover:bg-brand-purple/90 text-white gap-2 w-full sm:w-auto"
                        onClick={() => router.push("/")}
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Go to Dashboard
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 w-full sm:w-auto"
                        onClick={() => console.log("Open chat")}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Chat with Designer
                    </Button>
                </div>
            </motion.div>
        </div>
    )
}
