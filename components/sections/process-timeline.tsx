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
        copy: "Within approximately 2 weeks, the Division of Health & Senior Services arrives at your door. We assess your needs, check your home safety, and listen to your story.",
        icon: Home,
    },
    {
        title: "3. Your Care Plan",
        copy: "We write a custom script for your care. Nursing visits are scheduled around your life, not ours.",
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
        <section className="relative py-24 bg-bg-base overflow-hidden">
            <div className="container relative z-10 px-6 mx-auto">
                {/* Section Heading */}
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-display text-4xl md:text-5xl font-bold text-text-primary">
                        Your Journey to <span className="text-royal italic">Recovery</span>
                    </h2>
                    <div className="w-24 h-1 bg-champagne mx-auto rounded-full opacity-60" />
                </div>

                {/* Timeline Container */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Central Line (Desktop) / Left Line (Mobile) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-champagne/20 via-champagne to-champagne/20 md:-translate-x-1/2 shadow-[0_0_15px_rgba(216,181,106,0.3)] rounded-full" />

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
                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-surface border-4 border-champagne shadow-[0_0_20px_rgba(216,181,106,0.2)] flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300">
                                        <step.icon className="w-7 h-7 text-royal fill-transparent" />
                                    </div>

                                    {/* Card Content */}
                                    <div className="pl-24 md:pl-0 w-full md:w-5/12">
                                        <WarmCard className="border-royal/10 hover:border-champagne/50 transition-all duration-300">
                                            <h3 className="text-2xl font-display font-bold text-text-primary mb-3">
                                                {step.title}
                                            </h3>
                                            <p className="text-text-muted leading-relaxed">
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
                    <div className="relative rounded-2xl overflow-hidden p-1 p-[1px] bg-gradient-to-r from-transparent via-champagne/50 to-transparent">
                        <div className="absolute inset-0 bg-champagne/10 blur-xl" />
                        <div className="relative bg-surface rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 text-center md:text-left shadow-lg">
                            <div className="space-y-4 max-w-2xl">
                                <div className="flex items-center justify-center md:justify-start gap-3 text-royal mb-2">
                                    <CheckCircle2 className="w-6 h-6" />
                                    <span className="font-bold tracking-widest uppercase text-sm">Eligibility Verified</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
                                    The Best Part? Often Covered by Medicaid.
                                </h3>
                                <p className="text-lg text-text-muted">
                                    For eligible Missourians, Medicaid typically covers all home health care services—including personal care, skilled nursing, and Consumer Directed Services (CDS) support.
                                    <span className="text-royal font-semibold block mt-1">We help verify your benefits at no cost.</span>
                                </p>
                                <p className="text-sm text-royal mt-3 italic">
                                    Proudly serving families in the St. Louis metro area, Jefferson County, and St. Charles County.
                                </p>
                            </div>

                            <div className="flex-shrink-0">
                                {/* Disclaimer */}
                                <p className="text-xs text-text-muted/60 max-w-xs mx-auto md:mx-0">
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
