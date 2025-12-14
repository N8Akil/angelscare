import { ShieldCheck, Award, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function TrustBadges({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-wrap items-center gap-4 md:gap-8 opacity-80", className)}>
            {/* Medicare Certified Badge */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors cursor-help group" title="Certified by Centers for Medicare & Medicaid Services">
                <div className="relative">
                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                    <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full animate-pulse" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold group-hover:text-blue-300 transition-colors">Official Agency</span>
                    <span className="text-sm font-bold text-[#F5F5F0] leading-none">Medicare Certified</span>
                </div>
            </div>

            {/* State Licensed Badge */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 transition-colors cursor-help group" title="Licensed by the State of Missouri">
                <div className="relative">
                    <Award className="w-6 h-6 text-[#D4AF37]" />
                    <div className="absolute inset-0 bg-[#D4AF37]/20 blur-lg rounded-full" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-white/50 font-semibold group-hover:text-[#D4AF37] transition-colors">Missouri State</span>
                    <span className="text-sm font-bold text-[#F5F5F0] leading-none">Licensed & Insured</span>
                </div>
            </div>
        </div>
    );
}
