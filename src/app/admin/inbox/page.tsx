'use client';

import React from 'react';
import { useAdminStore } from '@/lib/store/admin-store';
import { databaseService } from '@/services/database';
// import { MessageList } from '@/components/features/messages/MessageList';
// import { MessageInput } from '@/components/features/messages/MessageInput';
import { MessageDocument } from '@/lib/schemas/firebase';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, User, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export default function AdminInboxPage() {
    const { users, fetchDashboardData } = useAdminStore();
    const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
    const [messages, setMessages] = React.useState<MessageDocument[]>([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [inputText, setInputText] = React.useState('');

    React.useEffect(() => {
        fetchDashboardData();
    }, []);

    // Fetch messages for selected user
    React.useEffect(() => {
        if (!selectedUserId) return;

        const fetchMessages = async () => {
            // This is a placeholder. In reality we need a proper conversation model.
            // We'll query messages where userId == selectedUserId
            const msgs = await databaseService.query<MessageDocument>('messages', {
                where: [{ field: 'userId', operator: '==', value: selectedUserId }],
                orderBy: 'createdAt',
                orderDirection: 'asc'
            });
            setMessages(msgs);
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 5000); // Polling for now
        return () => clearInterval(interval);

    }, [selectedUserId]);

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUserId || !inputText.trim()) return;

        try {
            // Send as admin
            await databaseService.create('messages', {
                content: inputText,
                userId: selectedUserId, // We are sending TO this user's stream
                senderId: 'admin', // Mark as admin sender
                senderName: 'SEOJack Support',
                senderRole: 'admin',
                createdAt: new Date(),
                read: false,
                attachments: [] // Handle attachments later
            });

            setInputText('');

            // Refresh
            const msgs = await databaseService.query<MessageDocument>('messages', {
                where: [{ field: 'userId', operator: '==', value: selectedUserId }],
                orderBy: 'createdAt',
                orderDirection: 'asc'
            });
            setMessages(msgs);
        } catch (error) {
            console.error('Failed to send message', error);
        }
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] -m-6 bg-white">
            {/* Sidebar */}
            <div className="w-80 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="font-semibold mb-4">Inbox</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search clients..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.map(user => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUserId(user.id)}
                            className={cn(
                                "p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50",
                                selectedUserId === user.id && "bg-indigo-50 border-indigo-100"
                            )}
                        >
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt={user.name} className="h-full w-full rounded-full object-cover" />
                                ) : (
                                    <User className="h-5 w-5" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <p className={cn("font-medium truncate", selectedUserId === user.id ? "text-indigo-900" : "text-gray-900")}>
                                        {user.name || 'Unnamed User'}
                                    </p>
                                    {/* <span className="text-xs text-gray-400">2m</span> */}
                                </div>
                                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50/50">
                {selectedUserId ? (
                    <>
                        <div className="p-4 border-b border-gray-100 bg-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <h3 className="font-bold text-gray-900">
                                    {users.find(u => u.id === selectedUserId)?.name}
                                </h3>
                                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Active</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg: any) => {
                                const isMe = msg.senderRole === 'admin';
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[70%] p-3 rounded-xl ${isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white border border-gray-200 rounded-bl-none'}`}>
                                            <p className="text-sm">{msg.content}</p>
                                            <span className={`text-[10px] block mt-1 ${isMe ? 'text-indigo-200' : 'text-gray-400'}`}>
                                                {msg.createdAt ? formatDistanceToNow(new Date(msg.createdAt.seconds * 1000), { addSuffix: true }) : 'Just now'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="p-4 bg-white border-t border-gray-100">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <Input
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1"
                                />
                                <Button type="submit" size="icon">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        Select a conversation to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}
