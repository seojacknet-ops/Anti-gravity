'use client';

import React, { useEffect, useState } from 'react';
import { authService } from '@/services/auth';
import { Button } from "@/components/ui/button";
import { Eye, X } from 'lucide-react';

export const ImpersonationBanner = () => {
    const [isImpersonating, setIsImpersonating] = useState(false);

    useEffect(() => {
        setIsImpersonating(authService.isImpersonating());
    }, []);

    const handleStopImpersonation = async () => {
        await authService.stopImpersonation();
    };

    if (!isImpersonating) return null;

    return (
        <div className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-between shadow-md relative z-50">
            <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span className="text-sm font-medium">
                    Viewing as Client Mode
                </span>
            </div>
            <Button
                variant="secondary"
                size="sm"
                className="h-7 text-xs bg-white text-indigo-600 hover:bg-indigo-50 border-0"
                onClick={handleStopImpersonation}
            >
                Exit View
            </Button>
        </div>
    );
};
