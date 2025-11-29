'use client';

import React from 'react';
import { useAdminStore } from '@/lib/store/admin-store';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AdminTicketsPage() {
    const { tickets, users, isLoading, fetchDashboardData } = useAdminStore();
    const [statusFilter, setStatusFilter] = React.useState<string>('all');

    React.useEffect(() => {
        if (tickets.length === 0) {
            fetchDashboardData();
        }
    }, []);

    const getUserName = (userId: string) => {
        const user = users.find(u => u.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const filteredTickets = tickets.filter(ticket => {
        if (statusFilter === 'all') return true;
        return ticket.status === statusFilter;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-blue-100 text-blue-700';
            case 'in_progress': return 'bg-purple-100 text-purple-700';
            case 'awaiting_info': return 'bg-orange-100 text-orange-700';
            case 'completed': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
                    <p className="text-gray-500">Manage and resolve client issues.</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search tickets..." className="pl-10" />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="awaiting_info">Awaiting Info</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Tickets Table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ticket</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">Loading tickets...</TableCell>
                            </TableRow>
                        ) : filteredTickets.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-gray-500">No tickets found.</TableCell>
                            </TableRow>
                        ) : (
                            filteredTickets.map((ticket) => (
                                <TableRow key={ticket.id} className="cursor-pointer hover:bg-gray-50">
                                    <TableCell>
                                        <div className="font-medium text-gray-900">{ticket.title}</div>
                                        <div className="text-sm text-gray-500 truncate max-w-xs">{ticket.description}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">
                                                {getUserName(ticket.userId)[0]}
                                            </div>
                                            <span className="text-sm font-medium">{getUserName(ticket.userId)}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize">
                                            {ticket.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={`${getStatusColor(ticket.status)} hover:${getStatusColor(ticket.status)} border-0`}>
                                            {ticket.status.replace('_', ' ')}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-500">
                                        {ticket.createdAt ? format(new Date(ticket.createdAt as any), 'MMM d, HH:mm') : '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="outline">
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
