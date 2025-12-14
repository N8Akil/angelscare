import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
    return (
        <div
            className={cn("glass-panel rounded-xl p-6 transition-all duration-300", className)}
            {...props}
        >
            {children}
        </div>
    );
}
