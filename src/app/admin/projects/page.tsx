import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Filter, MoreHorizontal, Clock, AlertCircle } from "lucide-react"

const stages = [
    { id: 'onboarding', name: 'Onboarding', count: 4, color: 'bg-blue-500' },
    { id: 'briefing', name: 'Briefing', count: 2, color: 'bg-indigo-500' },
    { id: 'design', name: 'Design', count: 3, color: 'bg-purple-500' },
    { id: 'dev', name: 'Dev', count: 1, color: 'bg-pink-500' },
    { id: 'review', name: 'Review', count: 2, color: 'bg-orange-500' },
    { id: 'live', name: 'Live', count: 18, color: 'bg-green-500' },
]

const projects = [
    { id: 1, client: 'ABC Co', plan: 'Starter', stage: 'onboarding', days: 1, status: 'on-track' },
    { id: 2, client: 'XYZ Ltd', plan: 'Growth', stage: 'onboarding', days: 2, status: 'on-track' },
    { id: 3, client: 'Quick Clean', plan: 'Starter', stage: 'onboarding', days: 1, status: 'on-track' },
    { id: 4, client: 'New Sign', plan: 'Pro', stage: 'onboarding', days: 0, status: 'on-track' },
    { id: 5, client: 'Johnson Electric', plan: 'Growth', stage: 'briefing', days: 3, status: 'waiting' },
    { id: 6, client: 'Williams', plan: 'Pro', stage: 'briefing', days: 5, status: 'on-track' },
    { id: 7, client: 'Smith Plumbing', plan: 'Growth', stage: 'design', days: 8, status: 'on-track' },
    { id: 8, client: 'Manchester Roofing', plan: 'Growth', stage: 'design', days: 10, status: 'overdue' },
    { id: 9, client: 'Taylor Builders', plan: 'Pro', stage: 'dev', days: 12, status: 'on-track' },
    { id: 10, client: 'Davis', plan: 'Starter', stage: 'review', days: 15, status: 'pending' },
    { id: 11, client: 'Park Lane', plan: 'Growth', stage: 'review', days: 14, status: 'on-track' },
]

export default function ProjectsPage() {
    return (
        <div className="p-6 h-full flex flex-col max-w-[1800px] mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Project Pipeline</h1>
                    <p className="text-sm text-muted-foreground mt-1">Track project progress from onboarding to launch.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-9"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                    <Button className="h-9 bg-indigo-600 hover:bg-indigo-700"><Plus className="mr-2 h-4 w-4" /> New Project</Button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto pb-4 -mx-6 px-6">
                <div className="flex gap-6 min-w-max h-full">
                    {stages.map((stage) => (
                        <div key={stage.id} className="w-80 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-3 px-1">
                                <h3 className="uppercase tracking-wide text-xs font-bold text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${stage.color}`} />
                                    {stage.name}
                                </h3>
                                <span className="text-xs font-medium text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">{stage.count}</span>
                            </div>

                            <div className="space-y-3 overflow-y-auto flex-1 pr-2 pb-2 custom-scrollbar">
                                {projects.filter(p => p.stage === stage.id).map((project) => (
                                    <Card key={project.id} className="group cursor-pointer border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-900 rounded-lg">
                                        <CardContent className="p-4 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div className="space-y-1">
                                                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">{project.client}</h4>
                                                    <Badge variant="secondary" className="text-[10px] h-5 px-1.5 font-normal bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">{project.plan}</Badge>
                                                </div>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 -mt-1 -mr-2 text-gray-300 hover:text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreHorizontal className="h-3 w-3" />
                                                </Button>
                                            </div>

                                            <div className="pt-2 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center">
                                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{project.days}d</span>
                                                </div>

                                                {project.status === 'waiting' && (
                                                    <div className="flex items-center gap-1 text-xs text-orange-600 font-medium bg-orange-50 dark:bg-orange-900/20 px-1.5 py-0.5 rounded">
                                                        <AlertCircle className="h-3 w-3" />
                                                        Waiting
                                                    </div>
                                                )}
                                                {project.status === 'overdue' && (
                                                    <div className="flex items-center gap-1 text-xs text-red-600 font-medium bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded">
                                                        <AlertCircle className="h-3 w-3" />
                                                        Overdue
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                                <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-indigo-600 text-sm h-9 border border-dashed border-gray-200 dark:border-gray-800 hover:border-indigo-200 hover:bg-indigo-50/50 rounded-lg">
                                    <Plus className="mr-2 h-3 w-3" /> Add Task
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
