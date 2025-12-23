"use client";

// import { useWindowScroll } from "@uidotdev/usehooks"; // Optional, but good for scroll aware. For now simple fixed.
import { Phone, CalendarHeart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function MobileCtaBar() {
    const [isVisible, setIsVisible] = useState(false);

    // Simple hydration fix to prevent hydration mismatch/flash
    useEffect(() => {
        setIsVisible(true);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden pb-safe">
            {/* Background with blur and gradient border */}
            <div className="absolute inset-0 bg-[#0F172A]/95 backdrop-blur-md border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]" />

            <div className="relative flex items-center justify-between gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                {/* Primary Action: Call (icon only with pulse) */}
                <Link
                    href="tel:3143810321"
                    className={cn(
                        "flex items-center justify-center",
                        "w-12 h-12 rounded-full",
                        "bg-brand-gold/50 text-brand-navy",
                        "animate-pulse-glow",
                        "active:scale-95 transition-transform"
                    )}
                    aria-label="Call Angel's Care"
                >
                    <Phone className="w-5 h-5 fill-current" />
                </Link>

                {/* Secondary Action: Request Care */}
                <Link
                    href="/contact"
                    className={cn(
                        "flex-1 flex items-center justify-center gap-2",
                        "bg-white/10 border border-white/20",
                        "text-white font-medium text-base h-12 rounded-lg",
                        "active:bg-white/20 active:scale-95 transition-all"
                    )}
                >
                    <CalendarHeart className="w-5 h-5 text-white" />
                    <span>Get Care</span>
                </Link>
            </div>
        </div>
    );
}
