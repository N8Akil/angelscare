import Link from "next/link"
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
        description: "RN visits, medication management, wound & ostomy care, catheter care, and chronic disease monitoring—coordinated with your doctor.",
        icon: Stethoscope,
    },
    {
        slug: "consumer-directed-services",
        title: "Consumer Directed Services",
        subtitle: "Care from the people who know you best.",
        description: "Missouri Medicaid program letting you hire family or friends as caregivers. We handle payroll and paperwork—you focus on family.",
        icon: Users,
    },
    {
        slug: "personal-care",
        title: "Personal Care",
        subtitle: "Dignity in every detail of daily life.",
        description: "Respectful assistance with bathing, dressing, grooming, mobility, and personal hygiene. Personalized safety plans.",
        icon: Heart,
    },
    {
        slug: "elderly-home-care",
        title: "Elderly Home Care",
        subtitle: "A tidy home, a warm meal, and a friendly face.",
        description: "Light housekeeping, meal prep, companionship, errands, and respite care so family caregivers can take a break.",
        icon: Home,
    },
]

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                {/* Background gradient - soft and airy */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/10" />

                <div className="container mx-auto relative z-10 px-6 md:px-12 text-center">
                    <p className="text-secondary font-medium tracking-widest uppercase mb-4">
                        The Care You Deserve
                    </p>
                    <h1 className="font-display text-4xl md:text-6xl font-bold text-maroon-dark mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl text-maroon/80 max-w-2xl mx-auto leading-relaxed">
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
                                    <WarmCard className="h-full p-8 transition-all duration-300 hover:scale-[1.02] hover:border-plum/20 cursor-pointer bg-white group-hover:shadow-lg border-transparent">
                                        {/* Icon */}
                                        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 group-hover:bg-plum/10 transition-colors border border-plum/5">
                                            <Icon className="w-8 h-8 text-plum" />
                                        </div>

                                        {/* Content */}
                                        <h2 className="font-display text-2xl font-bold text-maroon-dark mb-2">
                                            {service.title}
                                        </h2>
                                        <p className="text-plum text-sm font-medium mb-4">
                                            {service.subtitle}
                                        </p>
                                        <p className="text-maroon/70 leading-relaxed">
                                            {service.description}
                                        </p>

                                        {/* "Learn More" indicator */}
                                        <div className="mt-6 pt-4 border-t border-plum/10 flex items-center text-plum font-semibold group-hover:translate-x-1 transition-transform font-sans">
                                            <span>Learn More</span>
                                            <span className="ml-2">&rarr;</span>
                                        </div>
                                    </WarmCard>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Lite Eligibility Section (New) */}
            <section className="py-20 bg-accent/5 border-y border-plum/5">
                <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-plum font-bold text-sm uppercase tracking-widest mb-6 border border-plum/10">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Coverage Check</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-maroon-dark mb-6">
                        Often Covered by Medicare & Medicaid
                    </h2>
                    <p className="text-xl text-maroon/80 mb-8">
                        Many of our services, including skilled nursing and therapy, may be covered for eligible patients.
                        Our team handles the insurance verification for you.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-plum/5 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 w-2 h-2 rounded-full bg-maroon-dark" />
                            <div>
                                <strong className="block text-maroon-dark">Medicare</strong>
                                <span className="text-sm text-maroon/70">Skilled Nursing, Therapy, Home Health Aide</span>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="mt-1 w-2 h-2 rounded-full bg-secondary" />
                            <div>
                                <strong className="block text-maroon-dark">Missouri Medicaid</strong>
                                <span className="text-sm text-maroon/70">Consumer Directed Services (CDS), Personal Care</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Help Section - Big CTA for Seniors */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-6 md:px-12 text-center">
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-maroon-dark mb-6">
                        Not Sure Where to Start?
                    </h2>
                    <p className="text-xl text-maroon/70 max-w-xl mx-auto mb-10">
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

                    <p className="mt-6 text-maroon/60 text-sm">
                        Available Monday - Friday, 8am - 5pm
                    </p>
                </div>
            </section>
        </div>
    )
}
