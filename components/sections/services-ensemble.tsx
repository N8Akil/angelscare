import Link from "next/link";
import Image from "next/image";
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
        description: "RN visits and medication management—coordinated with your doctor.",
        icon: Stethoscope,
        image: "/images/home-health-care.png",
    },
    {
        slug: "consumer-directed-services",
        title: "Consumer Directed Services",
        tagline: "Care from the people who know you best.",
        description: "Missouri Medicaid program letting you hire family or friends as caregivers. We handle payroll and paperwork—you focus on family.",
        icon: Users,
        image: "/images/consumer-directed-services.png",
    },
    {
        slug: "personal-care",
        title: "Personal Care",
        tagline: "Dignity in every detail of daily life.",
        description: "Respectful assistance with bathing, dressing, grooming, mobility, and personal hygiene. Personalized safety plans.",
        icon: Heart,
        image: "/images/personal-care.png",
    },
    {
        slug: "elderly-home-care",
        title: "Elderly and Disabled Home Care",
        tagline: "A tidy home, a warm meal, and a friendly face.",
        description: "Light housekeeping, meal prep, companionship, errands, and respite care so family caregivers can take a break.",
        icon: Home,
        image: "/images/elderly-home-care.png",
    },
];

export function ServicesEnsemble() {
    return (
        <section className="relative py-24 bg-bg-base overflow-hidden">
            {/* Subtle background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-bg-alt/50 to-transparent z-0" />

            <div className="container relative z-10 px-6 mx-auto">
                {/* Section Heading */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-display text-4xl md:text-5xl font-bold text-brand-navy">
                        A Cast of Caregivers, <span className="text-brand-gold italic">Dedicated to You.</span>
                    </h2>
                    <div className="w-24 h-1 bg-brand-gold mx-auto rounded-full opacity-60" />
                </div>

                {/* Services Grid - 2x2 layout for 4 services */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {services.map((service) => (
                        <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="group block"
                        >
                            <div className="relative p-0 overflow-hidden flex flex-col h-full bg-white rounded-2xl border border-brand-navy/10 shadow-lg hover:border-brand-gold/50 transition-all duration-500 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-navy/10">
                                {/* Service Image */}
                                <div className="h-48 w-full relative overflow-hidden">
                                    <Image
                                        src={service.image}
                                        alt={service.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Subtle overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/40 to-transparent" />
                                </div>

                                {/* Floating Icon */}
                                <div className="absolute top-40 left-6 p-3 rounded-xl bg-white border border-brand-navy/10 shadow-lg group-hover:scale-110 group-hover:border-brand-gold/50 transition-all duration-500 z-20">
                                    <service.icon className="w-8 h-8 text-brand-gold" />
                                </div>

                                {/* Content */}
                                <div className="p-8 pt-12 flex-grow flex flex-col space-y-3 bg-white rounded-b-2xl">
                                    <div>
                                        <span className="text-brand-gold font-medium tracking-wide text-sm uppercase block mb-1">
                                            {service.tagline}
                                        </span>
                                        <h3 className="text-2xl font-bold text-brand-navy font-display">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-text-muted leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* "Learn More" indicator */}
                                    <div className="mt-auto pt-4 flex items-center text-brand-navy font-semibold group-hover:text-brand-gold group-hover:translate-x-1 transition-all">
                                        <span>Learn More</span>
                                        <span className="ml-2">&rarr;</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
