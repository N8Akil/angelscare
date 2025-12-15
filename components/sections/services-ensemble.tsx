import { GlassCard } from "@/components/ui/glass-card";
import Link from "next/link";
import {
    Stethoscope,
    Users,
    Heart,
    Home
} from "lucide-react";

const services = [
    {
        slug: "home-health-care",
        title: "Home Health Care",
        tagline: "Medical excellence, delivered to your door.",
        description: "RN visits, medication management, wound & ostomy care, catheter care, and chronic disease monitoring—coordinated with your doctor.",
        icon: Stethoscope,
    },
    {
        slug: "consumer-directed-services",
        title: "Consumer Directed Services",
        tagline: "Care from the people who know you best.",
        description: "Missouri Medicaid program letting you hire family or friends as caregivers. We handle payroll and paperwork—you focus on family.",
        icon: Users,
    },
    {
        slug: "personal-care",
        title: "Personal Care",
        tagline: "Dignity in every detail of daily life.",
        description: "Respectful assistance with bathing, dressing, grooming, mobility, and personal hygiene. Personalized safety plans.",
        icon: Heart,
    },
    {
        slug: "elderly-home-care",
        title: "Elderly Home Care",
        tagline: "A tidy home, a warm meal, and a friendly face.",
        description: "Light housekeeping, meal prep, companionship, errands, and respite care so family caregivers can take a break.",
        icon: Home,
    },
];

export function ServicesEnsemble() {
    return (
        <section className="relative py-24 bg-navy overflow-hidden">
            {/* Background Texture/Gradient for depth - deep royal blue */}
            <div className="absolute inset-0 bg-navy opacity-100 z-0" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy/80 to-transparent opacity-50 z-0" />

            <div className="container relative z-10 px-6 mx-auto">
                {/* Section Heading */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-display text-4xl md:text-5xl font-bold text-white">
                        A Cast of Caregivers, <span className="text-champagne italic">Dedicated to You.</span>
                    </h2>
                    <div className="w-24 h-1 bg-champagne mx-auto rounded-full opacity-60" />
                </div>

                {/* Services Grid - 2x2 layout for 4 services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {services.map((service) => (
                        <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="group block"
                        >
                            <GlassCard
                                className="relative p-0 overflow-hidden flex flex-col h-full border border-white/5 hover:border-champagne/50 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(216,181,106,0.15)]"
                            >
                                {/* Image Placeholder area */}
                                <div className="h-48 bg-royal-dark/50 w-full relative group-hover:bg-royal-dark/70 transition-colors duration-500 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-royal/80 to-transparent" />
                                    {/* Large icon as placeholder until photos are ready */}
                                    <service.icon className="w-20 h-20 text-white/10" />
                                </div>

                                {/* Floating Icon */}
                                <div className="absolute top-40 left-6 p-3 rounded-xl bg-gradient-to-br from-royal to-royal-dark border border-white/10 shadow-lg group-hover:scale-110 group-hover:border-champagne/50 transition-all duration-500 z-20">
                                    <service.icon className="w-8 h-8 text-champagne" />
                                </div>

                                {/* Content */}
                                <div className="p-8 pt-12 flex-grow flex flex-col space-y-3">
                                    <div>
                                        <span className="text-champagne font-medium tracking-wide text-sm uppercase opacity-90 block mb-1">
                                            {service.tagline}
                                        </span>
                                        <h3 className="text-2xl font-bold text-white font-display">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-white/70 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* "Learn More" indicator */}
                                    <div className="mt-auto pt-4 flex items-center text-champagne font-medium group-hover:translate-x-1 transition-transform">
                                        <span>Learn More</span>
                                        <span className="ml-2">&rarr;</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
