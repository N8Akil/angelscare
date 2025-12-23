import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { WarmCard } from "@/components/ui/warm-card";
import { cn } from "@/lib/utils";

// 1. Data Structure (The "Screenplay") - Based on deep analysis of angelscarehomehealth.com
interface Episode {
    title: string;
    tagline: string;
    description: string;
    heroGradient: string;
    features: string[];
    disclosure?: string;
}

const EPISODES: Record<string, Episode> = {
    "home-health-care": {
        title: "Home Health Care",
        tagline: "Medical excellence, delivered to your door.",
        description: "Stay home while getting hospital-quality care. Our nurses work directly with your doctor to manage your health needs safely and comfortably.",
        heroGradient: "from-blue-900/60",
        features: ["RN Visits", "Medication Management"],
    },
    "consumer-directed-services": {
        title: "Consumer Directed Services",
        tagline: "Care from the people who know you best: Your Family.",
        description: "Hire a family member or friend as your paid caregiver through Missouri Medicaid. We handle all the paperwork and payroll—you focus on family.",
        disclosure: "Consumer Directed Services (CDS) is a Missouri Medicaid program. Contact us to verify your eligibility.",
        heroGradient: "from-green-900/60",
        features: ["Hire Your Own Family/Friend", "Medicaid Approved Program", "Weekly Pay for Caregivers", "Free Training Provided", "No Experience Required", "Angel's Care Handles Payroll"],
    },
    "personal-care": {
        title: "Personal Care",
        tagline: "Dignity in every detail of daily life.",
        description: "Respectful help with bathing, dressing, and daily tasks. Our aides keep you safe and independent while respecting your privacy.",
        heroGradient: "from-purple-900/60",
        features: ["Bathing & Showering Assist", "Dressing & Grooming", "Mobility & Transfer Help", "Toileting & Incontinence Care", "Personal Hygiene Support", "Fall Prevention"],
    },
    "elderly-home-care": {
        title: "Elderly and Disabled Home Care",
        tagline: "A tidy home, a warm meal, and a friendly face.",
        description: "Help with cooking, cleaning, errands, and companionship. We also offer Respite Care so family caregivers can take a break.",
        heroGradient: "from-amber-900/60",
        features: ["Light Housekeeping & Laundry", "Meal Preparation", "Companionship", "Shopping & Errands", "Respite Care (Family Relief)", "Medication Reminders"],
    },
};

type EpisodeKey = keyof typeof EPISODES;

export async function generateStaticParams() {
    return Object.keys(EPISODES).map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const episode = EPISODES[slug as EpisodeKey];
    if (!episode) return { title: "Service Not Found" };
    return {
        title: `${episode.title} - Angel's Care`,
        description: episode.tagline,
    }
}

export default async function ServiceEpisodePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const episode = EPISODES[slug as EpisodeKey];

    if (!episode) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-[#FBF9F7] text-[#1B263B] overflow-x-hidden">

            {/* A. The Cold Open (Hero Section) */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Placeholder Video Background */}
                <div className="absolute inset-0 bg-[#1B263B] z-0">
                    <div className={cn("absolute inset-0 bg-gradient-to-b to-[#0F172A]", episode.heroGradient)} />
                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                {/* Back Link */}
                <div className="absolute top-28 left-6 md:left-12 z-20">
                    <Link href="/services" className="glass-panel px-4 py-2 rounded-full flex items-center gap-2 text-sm text-white/80 hover:text-primary transition-colors hover:bg-white/10">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Services</span>
                    </Link>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 space-y-4 max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-1000">
                    <h1 className="text-display text-5xl md:text-7xl font-bold tracking-tight drop-shadow-2xl text-white">
                        {episode.title}
                    </h1>
                    <p className="text-xl md:text-3xl text-white/90 font-medium italic tracking-wide drop-shadow-lg font-display">
                        {episode.tagline}
                    </p>
                </div>
            </section>

            {/* B. The Script (Body Content) */}
            <section className="relative -mt-20 z-20 pb-24 px-4">
                <div className="max-w-3xl mx-auto space-y-12">

                    {/* Story Block */}
                    <WarmCard className="bg-[#F5F0E8] p-8 md:p-12 rounded-2xl shadow-xl border-[#1B263B]/10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg md:text-xl leading-relaxed text-[#1B263B] font-light font-sans">
                                {episode.description}
                            </p>
                        </div>
                        {episode.disclosure && (
                            <div className="mt-6 p-4 bg-[#FBF9F7] border-l-4 border-green-600 rounded-r-lg shadow-sm">
                                <p className="text-sm text-[#2F3E46] italic font-medium">
                                    <span className="font-bold text-green-700 not-italic block mb-1">Important:</span>
                                    {episode.disclosure}
                                </p>
                            </div>
                        )}
                    </WarmCard>

                    {/* C. The Plot Points (Feature Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                        {episode.features.map((feature, idx) => (
                            <WarmCard key={idx} className="p-6 flex items-center gap-4 hover:border-[#D4AF37]/50 transition-colors group bg-white border-[#1B263B]/5 shadow-sm">
                                <div className="p-2 rounded-full bg-[#F5F0E8] text-[#D4AF37] group-hover:scale-110 transition-transform border border-[#1B263B]/5">
                                    <Check className="w-5 h-5" />
                                </div>
                                <span className="text-lg font-medium text-[#1B263B] group-hover:text-black transition-colors">
                                    {feature}
                                </span>
                            </WarmCard>
                        ))}
                    </div>

                </div>
            </section>

        </main>
    );
}
