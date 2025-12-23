import Link from "next/link"
import Image from "next/image"
import { Phone, Stethoscope, Users, Heart, Home, ArrowRight, CheckCircle2 } from "lucide-react"
import { WarmCard } from "@/components/ui/warm-card"
import { Button } from "@/components/ui/button"

export const metadata = {
    title: "Our Services | Angel's Care Home Health",
    description: "Comprehensive home health services including skilled nursing, consumer directed services, personal care, and elderly home care in St. Louis & Florissant.",
}

const services = [
    {
        slug: "home-health-care",
        title: "Home Health Care",
        subtitle: "Medical excellence, delivered to your door.",
        description: "RN visits and medication management—coordinated with your doctor.",
        icon: Stethoscope,
        image: "/images/home-health-care.png",
    },
    {
        slug: "consumer-directed-services",
        title: "Consumer Directed Services",
        subtitle: "Care from the people who know you best.",
        description: "Missouri Medicaid program letting you hire family or friends as caregivers. We handle payroll and paperwork—you focus on family.",
        icon: Users,
        image: "/images/consumer-directed-services.png",
    },
    {
        slug: "personal-care",
        title: "Personal Care",
        subtitle: "Dignity in every detail of daily life.",
        description: "Respectful assistance with bathing, dressing, grooming, mobility, and personal hygiene. Personalized safety plans.",
        icon: Heart,
        image: "/images/personal-care.png",
    },
    {
        slug: "elderly-home-care",
        title: "Elderly and Disabled Home Care",
        subtitle: "A tidy home, a warm meal, and a friendly face.",
        description: "Light housekeeping, meal prep, companionship, errands, and respite care so family caregivers can take a break.",
        icon: Home,
        image: "/images/elderly-home-care.png",
    },
]

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-bg-base">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                {/* Background gradient - soft and airy */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-alt/30" />

                <div className="container mx-auto relative z-10 px-6 md:px-12 text-center">
                    <p className="text-royal font-medium tracking-widest uppercase mb-4">
                        The Care You Deserve
                    </p>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-text-primary mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                        Every service is a chapter in your recovery story.
                        Tap any card below to learn more.
                    </p>
                </div>
            </section>

            {/* Services Grid - Large, Tappable Cards for Seniors */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {services.map((service) => {
                            const Icon = service.icon
                            return (
                                <Link
                                    key={service.slug}
                                    href={`/services/${service.slug}`}
                                    className="group block"
                                >
                                    <div className="h-full overflow-hidden rounded-2xl bg-white border border-brand-navy/10 shadow-lg hover:shadow-xl hover:border-brand-gold/40 transition-all duration-500 hover:scale-[1.02]">
                                        {/* Image Section */}
                                        <div className="relative h-52 overflow-hidden">
                                            <Image
                                                src={service.image}
                                                alt={service.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />

                                            {/* Floating Icon Badge */}
                                            <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-white/95 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                <Icon className="w-7 h-7 text-brand-gold" />
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6">
                                            <p className="text-brand-gold text-sm font-bold uppercase tracking-wider mb-2">
                                                {service.subtitle}
                                            </p>
                                            <h2 className="font-display text-2xl font-bold text-brand-navy mb-3">
                                                {service.title}
                                            </h2>
                                            <p className="text-text-muted leading-relaxed">
                                                {service.description}
                                            </p>

                                            {/* "Learn More" indicator */}
                                            <div className="mt-5 pt-4 border-t border-brand-navy/10 flex items-center text-brand-navy font-semibold group-hover:text-brand-gold group-hover:translate-x-1 transition-all">
                                                <span>Learn More</span>
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Lite Eligibility Section (New) */}
            <section className="py-20 bg-bg-alt/50 border-y border-royal/5">
                <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface rounded-full text-royal font-bold text-sm uppercase tracking-widest mb-6 border border-royal/10">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Coverage Check</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">
                        Often Covered by Medicare & Medicaid
                    </h2>
                    <p className="text-xl text-text-muted mb-8">
                        Many of our services, including skilled nursing and therapy, may be covered for eligible patients.
                        Our team handles the insurance verification for you.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto bg-surface p-6 rounded-2xl border border-royal/5 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 w-2 h-2 rounded-full bg-royal" />
                            <div>
                                <strong className="block text-text-primary">Medicare</strong>
                                <span className="text-sm text-text-muted">Skilled Nursing, Therapy, Home Health Aide</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-1 w-2 h-2 rounded-full bg-champagne" />
                            <div>
                                <strong className="block text-text-primary">Missouri Medicaid</strong>
                                <span className="text-sm text-text-muted">Consumer Directed Services (CDS), Personal Care</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Help Section - Big CTA for Seniors */}
            <section className="py-20 bg-bg-base">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">
                        Not Sure Where to Start?
                    </h2>
                    <p className="text-xl text-text-muted max-w-xl mx-auto mb-10">
                        Our care coordinators are happy to help you find the right services.
                        No pressure, just answers.
                    </p>

                    {/* Large, accessible phone button */}
                    <Link
                        href="tel:3143810321"
                        className="inline-flex items-center gap-3 btn-primary px-10 py-5 rounded-full text-xl shadow-lg hover:scale-105 transition-transform"
                    >
                        <Phone className="w-6 h-6 fill-current" />
                        <span>Call (314) 381-0321</span>
                    </Link>

                    <p className="mt-6 text-text-muted text-sm">
                        Available Monday - Friday, 8am - 5pm
                    </p>
                </div>
            </section>
        </div>
    )
}
