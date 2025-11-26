import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal, Download, UserPlus, ChevronDown } from "lucide-react"

// Mock Data
const clients = [
    {
        id: "1",
        name: "Smith Plumbing Services",
        plan: "Growth",
        status: "Design",
        health: "Healthy",
        mrr: "£89",
        lastActive: "2 hours ago",
        assignedTo: "Jack",
    },
    {
        id: "2",
        name: "Johnson Electric",
        plan: "Pro",
        status: "Dev",
        health: "Warning",
        mrr: "£199",
        lastActive: "3 days ago",
        assignedTo: "Jack",
    },
    {
        id: "3",
        name: "ABC Cleaning",
        plan: "Starter",
        status: "Live",
        health: "Critical",
        mrr: "£49",
        lastActive: "1 day ago",
        assignedTo: "Sarah",
    },
    {
        id: "4",
        name: "Manchester Roofing",
        plan: "Growth",
        status: "Review",
        health: "Healthy",
        mrr: "£89",
        lastActive: "5 mins ago",
        assignedTo: "Jack",
    },
    {
        id: "5",
        name: "Taylor Builders",
        plan: "Pro",
        status: "Live",
        health: "Healthy",
        mrr: "£199",
        lastActive: "1 week ago",
        assignedTo: "Sarah",
    },
]

export default function ClientsPage() {
    return (
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Clients</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage your client base and view their status.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-9"><Download className="mr-2 h-4 w-4" /> Export</Button>
                    <Button className="h-9 bg-indigo-600 hover:bg-indigo-700"><UserPlus className="mr-2 h-4 w-4" /> Add Client</Button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="relative flex-1 w-full md:max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search clients..." className="pl-9 h-10 bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 transition-all" />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <Button variant="outline" size="sm" className="h-10 border-dashed text-muted-foreground hover:text-foreground">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <div className="relative">
                        <select className="h-10 appearance-none pl-3 pr-8 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">All Plans</option>
                            <option value="starter">Starter</option>
                            <option value="growth">Growth</option>
                            <option value="pro">Pro</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <div className="relative">
                        <select className="h-10 appearance-none pl-3 pr-8 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="">All Statuses</option>
                            <option value="onboarding">Onboarding</option>
                            <option value="design">Design</option>
                            <option value="dev">Dev</option>
                            <option value="live">Live</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Clients Table */}
            <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-gray-50/50 dark:bg-gray-800/50">
                        <TableRow className="hover:bg-transparent border-gray-100 dark:border-gray-800">
                            <TableHead className="font-semibold text-gray-900 dark:text-white">Client Name</TableHead>
                            <TableHead className="font-semibold text-gray-900 dark:text-white">Plan</TableHead>
                            <TableHead className="font-semibold text-gray-900 dark:text-white">Status</TableHead>
                            <TableHead className="font-semibold text-gray-900 dark:text-white">Health</TableHead>
                            <TableHead className="font-semibold text-gray-900 dark:text-white">MRR</TableHead>
                            <TableHead className="font-semibold text-gray-900 dark:text-white">Last Active</TableHead>
                            <TableHead className="font-semibold text-gray-900 dark:text-white">Assigned To</TableHead>
                            <TableHead className="text-right font-semibold text-gray-900 dark:text-white">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 border-gray-100 dark:border-gray-800 transition-colors">
                                <TableCell className="font-medium text-gray-900 dark:text-white">{client.name}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="font-normal bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">{client.plan}</Badge>
                                </TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-300">{client.status}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${client.health === 'Healthy' ? 'bg-green-500' :
                                                client.health === 'Warning' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`} />
                                        <span className={`text-sm ${client.health === 'Healthy' ? 'text-green-700 dark:text-green-400' :
                                                client.health === 'Warning' ? 'text-yellow-700 dark:text-yellow-400' : 'text-red-700 dark:text-red-400'
                                            }`}>{client.health}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-gray-900 dark:text-white">{client.mrr}</TableCell>
                                <TableCell className="text-muted-foreground text-xs">{client.lastActive}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400">
                                            {client.assignedTo.charAt(0)}
                                        </div>
                                        <span className="text-sm text-gray-600 dark:text-gray-300">{client.assignedTo}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
