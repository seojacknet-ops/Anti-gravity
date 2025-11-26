'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Paperclip } from 'lucide-react';

import { useChatStore } from '@/lib/store/chat-store';
import { cn } from '@/lib/utils';

export const ChatWidget = () => {
    const { isOpen, setIsOpen, messages, sendMessage, subscribeToMessages } = useChatStore();
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const unsubscribe = subscribeToMessages();
        return () => unsubscribe();
    }, [subscribeToMessages]);

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        await sendMessage(inputValue);
        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col animate-slide-up overflow-hidden">
                    {/* Header */}
                    <div className="bg-brand-purple p-4 flex justify-between items-center text-white">
                        <div>
                            <h3 className="font-bold">SEOJack Support</h3>
                            <p className="text-xs text-brand-purple-light opacity-90">We typically reply in 5m</p>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
                        <div className="flex flex-col space-y-4">
                            {/* Bot Message - Always show welcome */}
                            <div className="flex items-start">
                                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-3 max-w-[80%] shadow-sm">
                                    <p className="text-sm text-gray-800">Hi there! 👋 How can we help you with your site today?</p>
                                </div>
                            </div>

                            {/* Dynamic Messages */}
                            {messages.map((msg) => {
                                const isUser = msg.senderId !== 'support-agent' && msg.senderId !== 'system'; // Simple check
                                return (
                                    <div key={msg.id} className={cn("flex", isUser ? "items-end justify-end" : "items-start")}>
                                        <div className={cn(
                                            "rounded-2xl p-3 max-w-[80%] shadow-sm",
                                            isUser ? "bg-brand-purple text-white rounded-tr-none" : "bg-white border border-gray-200 rounded-tl-none"
                                        )}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                            <button className="text-gray-400 hover:text-brand-purple transition-colors">
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 border-none focus:ring-0 bg-gray-50 rounded-full px-4 py-2 text-sm"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                onClick={handleSend}
                                className="bg-brand-purple text-white p-2 rounded-full hover:bg-brand-purple-dark transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-brand-purple hover:bg-brand-purple-dark text-white p-4 rounded-full shadow-lg shadow-brand-purple/30 transition-all transform hover:scale-105"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </button>
        </div>
    );
};
