'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Bell, ChevronRight, User } from 'lucide-react';

import { ThemeToggle } from "@/components/theme-toggle";

export const Header = () => {
    const pathname = usePathname();

    // Simple breadcrumb logic
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = pathSegments.length > 0
        ? pathSegments.map(s => s.charAt(0).toUpperCase() + s.slice(1))
        : ['Home'];

    return (
        <header className="h-16 backdrop-blur-md bg-background/80 border-b border-border flex items-center justify-between px-6 sticky top-0 z-30">
            {/* Breadcrumbs */}
            <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Dashboard</span>
                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={crumb}>
                        <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
                        <span className={`font-medium ${index === breadcrumbs.length - 1 ? 'text-brand-purple' : 'text-muted-foreground'}`}>
                            {crumb}
                        </span>
                    </React.Fragment>
                ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
                <ThemeToggle />

                <button className="relative p-2 text-muted-foreground hover:text-brand-purple transition-colors rounded-full hover:bg-surface-hover">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-accent-pink rounded-full border-2 border-background"></span>
                </button>

                <div className="flex items-center space-x-3 pl-4 border-l border-border">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-foreground">Alex Johnson</p>
                        <p className="text-xs text-muted-foreground">Pro Plan</p>
                    </div>
                    <div className="w-10 h-10 bg-brand-purple/10 rounded-full flex items-center justify-center text-brand-purple border border-brand-purple/20">
                        <User className="w-5 h-5" />
                    </div>
                </div>
            </div>
        </header>
    );
};
