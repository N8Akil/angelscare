"use client";

import { Star, Quote } from "lucide-react";
import { WarmCard } from "@/components/ui/warm-card";
import { cn } from "@/lib/utils";
import Image from "next/image";

const testimonials = [
    {
        quote: "They helped my mom come home after her surgery and kept us from panicking about her meds. The nurse was an angel.",
        author: "Maria R.",
        role: "Daughter of Patient",
        location: "North St. Louis",
        avatar: "https://placehold.co/100x100/F5F0E8/1B263B?text=MR",
    },
    {
        quote: "I didn't know I could hire my own grandson to help me. Angel's Care handled all the paperwork for the CDS program.",
        author: "James T.",
        role: "CDS Client",
        location: "Florissant, MO",
        avatar: "https://placehold.co/100x100/F5F0E8/1B263B?text=JT",
    },
    {
        quote: "Professional, on time, and truly caring. It felt like having a family friend stop by to check on my husband.",
        author: "Sarah L.",
        role: "Wife of Patient",
        location: "Hazelwood",
        avatar: "https://placehold.co/100x100/F5F0E8/1B263B?text=SL",
    }
];

export function TestimonialCarousel() {
    return (
        <section className="py-24 bg-[#FBF9F7] overflow-hidden">
            <div className="container px-6 mx-auto">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F0E8] rounded-full text-[#B8960C] font-bold text-sm uppercase tracking-widest mb-4">
                        <Star className="w-4 h-4 fill-current" />
                        <span>Trusted By Families</span>
                    </div>
                    <h2 className="text-display text-4xl md:text-5xl font-bold text-[#1B263B]">
                        Stories from <span className="text-[#B8960C] italic">Home.</span>
                    </h2>
                    <p className="text-xl text-[#4A5568] max-w-2xl mx-auto">
                        You don&apos;t have to take our word for it. Here is what your neighbors are saying about the care they received.
                    </p>
                </div>

                {/* Grid (Carousel for now, simplified to grid for v1) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <WarmCard key={idx} className="relative p-8 hover:-translate-y-1 transition-transform duration-300">
                            <Quote className="absolute top-8 right-8 w-10 h-10 text-[#B8960C]/10 fill-current" />

                            <div className="space-y-6">
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-[#D4AF37] fill-current" />
                                    ))}
                                </div>

                                <blockquote className="text-lg text-[#1B263B] leading-relaxed italic">
                                    &ldquo;{t.quote}&rdquo;
                                </blockquote>

                                <div className="flex items-center gap-4 pt-4 border-t border-[#1B263B]/10">
                                    <div className="w-10 h-10 rounded-full bg-[#1B263B]/10 overflow-hidden relative">
                                        {/* Placeholder Avatar */}
                                        <div className="absolute inset-0 bg-[#E8D5C4] flex items-center justify-center text-xs font-bold text-[#1B263B]">
                                            {t.author.charAt(0)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-[#1B263B]">{t.author}</div>
                                        <div className="text-xs text-[#4A5568]">{t.role} • {t.location}</div>
                                    </div>
                                </div>
                            </div>
                        </WarmCard>
                    ))}
                </div>

            </div>
        </section>
    );
}
