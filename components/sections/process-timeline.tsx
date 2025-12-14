import { WarmCard } from "@/components/ui/warm-card";
import { PhoneIncoming, Home, ClipboardCheck, Sun, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    {
        title: "1. The Referral",
        copy: "It starts with a simple call. Whether from your doctor or a family member, we take the details and handle the paperwork immediately.",
        icon: PhoneIncoming,
    },
    {
        title: "2. The First Visit",
        copy: "Within 24-48 hours, a registered nurse arrives at your door. We assess your needs, check your home safety, and listen to your story.",
        icon: Home,
    },
    {
        title: "3. Your Care Plan",
        copy: "We write a custom script for your recovery. Nursing, therapy, and aid visits are scheduled around your life, not ours.",
        icon: ClipboardCheck,
    },
    {
        title: "4. Regaining Independence",
        copy: "Our goal is to work ourselves out of a job. We help you get stronger and safer so you can live your best life, independent and free.",
        icon: Sun,
    },
];

export function ProcessTimeline() {
    return (
        <section className="relative py-24 bg-[#FAF7F5] overflow-hidden">
            <div className="container relative z-10 px-6 mx-auto">
                {/* Section Heading */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-display text-4xl md:text-5xl font-bold text-[#3A151C]">
                        Your Journey to <span className="text-[#D4AF37] italic">Recovery</span>
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto rounded-full opacity-60" />
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line (Desktop) / Left Line (Mobile) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/20 via-primary to-primary/20 md:-translate-x-1/2 shadow-[0_0_15px_rgba(212,175,55,0.3)] rounded-full" />

                    <div className="space-y-12 md:space-y-0">
                        {steps.map((step, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={index} className={cn(
                                    "relative flex items-center md:justify-between group",
                                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                                )}>

                                    {/* Spacer for Desktop Layout to push card to alternating side */}
                                    <div className="hidden md:block w-5/12" />

                                    {/* Node / Marker */}
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#F5EDE8] border-4 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                                        <step.icon className="w-7 h-7 text-[#D4AF37] fill-transparent" />
                                    </div>

                                    {/* Card Content */}
                                    <div className="pl-24 md:pl-0 w-full md:w-5/12">
                                        <WarmCard className="border-[#6B3A5B]/10 hover:border-[#D4AF37]/50 transition-all duration-300">
                                            <h3 className="text-2xl font-display font-bold text-[#3A151C] mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-[#4A5568] leading-relaxed">
                                                {step.copy}
                                            </p>
                                        </WarmCard>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Eligibility Banner (The Plot Twist Resolver) */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <div className="relative rounded-2xl overflow-hidden p-1 p-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent">
                        <div className="absolute inset-0 bg-[#D4AF37]/10 blur-xl" />
                        <div className="relative bg-[#F5EDE8] rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 text-center md:text-left shadow-lg">
                            <div className="space-y-4 max-w-2xl">
                                <div className="flex items-center justify-center md:justify-start gap-3 text-[#D4AF37] mb-2">
                                    <CheckCircle2 className="w-6 h-6" />
                                    <span className="font-bold tracking-widest uppercase text-sm">Eligibility Verified</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-[#3A151C]">
                                    The Best Part? Often Covered by Medicare & Medicaid.
                                </h3>
                                <p className="text-lg text-[#4A5568]">
                                    Medicare often covers allowable charges for qualified home health services for eligible patients.
                                    <span className="text-[#B8960C] font-semibold block mt-1">Coverage varies. We help verify your benefits.</span>
                                </p>
                                <p className="text-base text-[#4A5568] mt-4 border-t border-[#6B3A5B]/10 pt-4">
                                    <strong className="text-[#3A151C]">Medicare</strong> covers skilled nursing care for those who qualify.
                                    <strong className="text-[#3A151C] ml-1">Medicaid</strong> covers personal care and CDS support for eligible Missourians.
                                </p>
                                <p className="text-sm text-[#B8960C] mt-3 italic">
                                    Proudly serving families in the St. Louis metro area, Jefferson County, and St. Charles County.
                                </p>
                            </div>

                            <div className="flex-shrink-0">
                                {/* Disclaimer */}
                                <p className="text-xs text-[#4A5568]/60 max-w-xs mx-auto md:mx-0">
                                    * Eligibility requirements apply. Contact us to verify your specific coverage.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
