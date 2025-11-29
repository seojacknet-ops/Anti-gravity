"use client"

import React from "react"
import { useTicketStore, Ticket } from "@/lib/store/ticket-store"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "./StatusBadge"
import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface TicketListProps {
    onSelectTicket: (ticket: Ticket) => void
    selectedTicketId?: string
}

export const TicketList = ({ onSelectTicket, selectedTicketId }: TicketListProps) => {
    const { tickets } = useTicketStore()

    const formatDate = (date: any) => {
        if (!date) return 'Just now';
        // Handle Firestore Timestamp
        if (date.toDate) return formatDistanceToNow(date.toDate(), { addSuffix: true });
        // Handle Date object or string
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    }

    return (
        <div className="space-y-3">
            {tickets.map((ticket) => (
                <Card
                    key={ticket.id}
                    className={cn(
                        "p-4 cursor-pointer hover:bg-secondary/50 transition-colors space-y-3",
                        selectedTicketId === ticket.id ? "border-brand-purple bg-brand-purple/5" : "border-border"
                    )}
                    onClick={() => onSelectTicket(ticket)}
                >
                    <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium text-sm line-clamp-1">{ticket.title}</h4>
                        <span className="text-xs text-muted-foreground shrink-0 font-mono">{ticket.id.slice(0, 8)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <StatusBadge status={ticket.status} />
                        <StatusBadge priority={ticket.priority} />
                    </div>

                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(ticket.updatedAt)}</span>
                    </div>
                </Card>
            ))}
        </div>
    )
}
