'use client';

import React, { useState } from 'react';
import { Search, MoreVertical, Phone, Video, Send, Paperclip, Smile } from 'lucide-react';

export default function MessagesPage() {
    const [activeThread, setActiveThread] = useState(1);

    const threads = [
        { id: 1, name: 'SEOJack Support', lastMsg: 'Sure, we can update that logo.', time: '2m', unread: 0, online: true },
        { id: 2, name: 'Design Team', lastMsg: 'Draft v2 is ready for review.', time: '1h', unread: 2, online: false },
    ];

    return (
        <div className="h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-gray-100 flex overflow-hidden">
            {/* Sidebar (Threads) */}
            <div className="w-80 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-1 focus:ring-brand-purple"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {threads.map((thread) => (
                        <div
                            key={thread.id}
                            onClick={() => setActiveThread(thread.id)}
                            className={`p-4 flex items-center cursor-pointer hover:bg-gray-50 transition-colors ${activeThread === thread.id ? 'bg-brand-purple/5 border-r-2 border-brand-purple' : ''
                                }`}
                        >
                            <div className="relative mr-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                                    {thread.name.charAt(0)}
                                </div>
                                {thread.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className={`text-sm font-semibold truncate ${activeThread === thread.id ? 'text-brand-purple' : 'text-gray-900'}`}>{thread.name}</h3>
                                    <span className="text-xs text-gray-400">{thread.time}</span>
                                </div>
                                <p className="text-sm text-gray-500 truncate">{thread.lastMsg}</p>
                            </div>
                            {thread.unread > 0 && (
                                <div className="ml-2 bg-brand-purple text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    {thread.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50/50">
                {/* Chat Header */}
                <div className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
                    <div className="flex items-center">
                        <h2 className="font-bold text-gray-900">SEOJack Support</h2>
                        <span className="ml-3 px-2 py-0.5 bg-green-100 text-green-600 text-xs font-medium rounded-full">Online</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-400">
                        <button className="hover:text-brand-purple"><Phone className="w-5 h-5" /></button>
                        <button className="hover:text-brand-purple"><Video className="w-5 h-5" /></button>
                        <button className="hover:text-brand-purple"><MoreVertical className="w-5 h-5" /></button>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    <div className="flex justify-center">
                        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Today, 10:23 AM</span>
                    </div>

                    <div className="flex items-end">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0 mr-2"></div>
                        <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 max-w-md">
                            <p className="text-sm text-gray-800">Hi Alex! I saw you uploaded the new logo. It looks great! Do you want us to use the purple variation for the header?</p>
                        </div>
                    </div>

                    <div className="flex items-end justify-end">
                        <div className="bg-brand-purple p-4 rounded-2xl rounded-br-none shadow-md max-w-md text-white">
                            <p className="text-sm">Yes please! That would be perfect.</p>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-brand-purple/20 focus-within:border-brand-purple transition-all">
                        <button className="text-gray-400 hover:text-brand-purple mr-2"><Paperclip className="w-5 h-5" /></button>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
                        />
                        <button className="text-gray-400 hover:text-brand-purple mx-2"><Smile className="w-5 h-5" /></button>
                        <button className="bg-brand-purple text-white p-2 rounded-lg hover:bg-brand-purple-dark transition-colors shadow-lg shadow-brand-purple/20">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
