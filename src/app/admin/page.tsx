"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, MessageSquare, Ticket, DollarSign, ArrowRight, CheckSquare, Clock, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useAdminStore } from "@/lib/store/admin-store"

export default function AdminDashboard() {
    const { stats, projects, isLoading, fetchDashboardData } = useAdminStore()

    React.useEffect(() => {
        fetchDashboardData()
    }, [])

    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Command Center</h1>
                    <p className="text-sm text-muted-foreground mt-1">Overview of your agency's performance and critical tasks.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-9 text-muted-foreground hover:text-foreground">
                        <Search className="mr-2 h-4 w-4" />
                        Search (⌘K)
                    </Button>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white dark:bg-gray-900 shadow-sm border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{isLoading ? "..." : stats.activeProjects}</div>
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">Total active projects</p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900 shadow-sm border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Unread Messages</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                            <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.unreadMessages}</div>
                        <p className="text-xs text-muted-foreground mt-1">4 waiting &gt; 1 hour</p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900 shadow-sm border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Open Tickets</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                            <Ticket className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{isLoading ? "..." : stats.openTickets}</div>
                        <p className="text-xs text-muted-foreground mt-1">Across all projects</p>
                    </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-900 shadow-sm border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">£{isLoading ? "..." : stats.totalRevenue}</div>
                        <p className="text-xs font-medium text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                            <span>+£350</span>
                            <span className="text-muted-foreground font-normal">this month</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Feed Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Needs Attention */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                                Needs Attention
                            </h2>
                        </div>
                        <div className="grid gap-3">
                            <div className="group flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:border-red-100 dark:hover:border-red-900/30">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Smith Plumbing</p>
                                        <p className="text-sm text-red-600 dark:text-red-400">Payment failed 2 days ago</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">Contact Client</Button>
                            </div>

                            <div className="group flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:border-orange-100 dark:hover:border-orange-900/30">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center flex-shrink-0">
                                        <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Johnson Electric</p>
                                        <p className="text-sm text-muted-foreground">Waiting for response <span className="text-orange-600 font-medium">(3 days)</span></p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">Reply</Button>
                            </div>

                            <div className="group flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 hover:border-red-100 dark:hover:border-red-900/30">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                                        <Ticket className="h-5 w-5 text-red-600 dark:text-red-400" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">ABC Cleaning</p>
                                        <p className="text-sm text-muted-foreground">Critical bug reported: <span className="text-gray-900 dark:text-gray-300">"Contact form broken"</span></p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity">View Ticket</Button>
                            </div>
                        </div>
                    </section>

                    {/* Pipeline */}
                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Project Pipeline</h2>
                            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-indigo-600">View Board <ArrowRight className="ml-1 h-3 w-3" /></Button>
                        </div>
                        <Card className="border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {projects.length === 0 && !isLoading && (
                                        <div className="text-center text-muted-foreground py-4">No projects found.</div>
                                    )}
                                    {projects.slice(0, 5).map((project) => (
                                        <div key={project.id} className="space-y-2 group cursor-pointer">
                                            <div className="flex justify-between text-sm items-center">
                                                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{project.businessName}</span>
                                                <Badge variant="secondary" className="text-xs font-normal bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">{project.status}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-8">
                    {/* Today's Priorities */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Today's Priorities</h2>
                        <Card className="border-gray-100 dark:border-gray-800 shadow-sm">
                            <CardContent className="p-0">
                                <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
                                    {[
                                        { text: "Review design draft — Manchester Roofing", sub: "Due today", done: false },
                                        { text: "Send welcome email — 2 new signups", sub: null, done: false },
                                        { text: "Follow up — 3 clients awaiting feedback", sub: "> 48hrs", done: false },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors group cursor-pointer">
                                            <div className="mt-0.5 h-5 w-5 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                                                {item.done && <CheckSquare className="h-3.5 w-3.5 text-indigo-600" />}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{item.text}</p>
                                                {item.sub && <p className="text-xs text-red-500 mt-0.5 font-medium">{item.sub}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3 border-t border-gray-50 dark:border-gray-800/50 bg-gray-50/30 dark:bg-gray-900/30">
                                    <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-indigo-600">View All Tasks</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Weekly Stats */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">Weekly Pulse</h2>
                        <Card className="border-gray-100 dark:border-gray-800 shadow-sm bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/50">
                            <CardContent className="p-6 space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                    <div>
                                        <p className="font-medium text-sm text-gray-900 dark:text-white">3 New Clients</p>
                                        <p className="text-xs text-muted-foreground">+£1,050 MRR added to the books.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                    <div>
                                        <p className="font-medium text-sm text-gray-900 dark:text-white">2 Sites Launched</p>
                                        <p className="text-xs text-muted-foreground">ABC Cleaning & Manchester Roofing are live.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="h-2 w-2 mt-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                    <div>
                                        <p className="font-medium text-sm text-gray-900 dark:text-white">Response Time: 2.4h</p>
                                        <p className="text-xs text-green-600 font-medium">Target: &lt; 4h (On Track)</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </div>
    )
}
