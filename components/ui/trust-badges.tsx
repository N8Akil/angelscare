import { ShieldCheck, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrustBadges({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-wrap items-center gap-4 md:gap-8", className)}>
            {/* Medicare Certified Badge */}
            <div className="flex items-center gap-3 bg-gold/10 border border-gold/40 rounded-full px-5 py-3 transition-colors cursor-help group" title="Certified by Centers for Medicare & Medicaid Services">
                <div className="relative">
                    <ShieldCheck className="w-6 h-6 text-gold" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-navy/60 font-medium group-hover:text-navy transition-colors">Official Agency</span>
                    <span className="text-sm font-bold text-navy leading-none">Medicare Certified</span>
                </div>
            </div>

            {/* State Licensed Badge */}
            <div className="flex items-center gap-3 bg-gold/10 border border-gold/40 rounded-full px-5 py-3 transition-colors cursor-help group" title="Licensed by the State of Missouri">
                <div className="relative">
                    <Award className="w-6 h-6 text-gold" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-navy/60 font-medium group-hover:text-navy transition-colors">Missouri State</span>
                    <span className="text-sm font-bold text-navy leading-none">Licensed & Insured</span>
                </div>
            </div>
        </div>
    );
}
