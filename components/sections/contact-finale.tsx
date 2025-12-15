"use client"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { TrustBadges } from "@/components/ui/trust-badges"
import { Phone, MapPin, Mail, ArrowRight, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { submitContactForm } from "@/lib/actions/contact"

export function ContactFinale() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)

        const formData = new FormData(e.currentTarget)
        const firstName = formData.get("firstName") as string
        const lastName = formData.get("lastName") as string
        const phone = formData.get("phone") as string
        const email = formData.get("email") as string
        const message = formData.get("message") as string

        const result = await submitContactForm({
            name: `${firstName} ${lastName}`.trim(),
            phone,
            email,
            serviceType: "General Inquiry",
            message,
        })

        setIsSubmitting(false)

        if (result.success) {
            setIsSuccess(true)
        } else {
            setError(result.message)
        }
    }

    return (
        <footer className="relative pt-24 pb-12 overflow-hidden">
            {/* Sophisticated Background - Deep Navy Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-navy z-0" />

            {/* Top Highlight/Sheen */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-champagne/30 to-transparent z-10" />

            <div className="container relative z-10 px-6 mx-auto mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Column: Emotional Hook & Info */}
                    <div className="space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-display text-5xl md:text-6xl font-medium text-white">
                                Your Story <span className="text-champagne italic">Starts Here.</span>
                            </h2>
                            <p className="text-xl text-white/80 font-light leading-relaxed max-w-lg font-sans">
                                Don&apos;t face the healthcare system alone. Let our family help yours.
                                A nurse is standing by to answer your questions and guide you to the care you deserve.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {/* Huge Phone Number */}
                            <div>
                                <Link href="tel:3143810321" className="group inline-flex items-center gap-3 transition-opacity hover:opacity-80">
                                    <div className="p-3 rounded-full bg-champagne/10 text-champagne group-hover:bg-champagne group-hover:text-navy transition-colors border border-champagne/20">
                                        <Phone className="w-8 h-8 md:w-10 md:h-10 fill-current" />
                                    </div>
                                    <span className="font-display font-medium text-4xl md:text-5xl text-white tracking-tight group-hover:text-champagne transition-colors">
                                        (314) 381-0321
                                    </span>
                                </Link>
                                <p className="text-white/40 ml-20 mt-2 text-sm font-sans">
                                    Proudly serving St. Louis, Jefferson County &amp; St. Charles County.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4 text-white/70 font-sans">
                                <div className="flex items-center gap-4">
                                    <Mail className="w-5 h-5 text-champagne" />
                                    <a href="mailto:info@angelscare-homehealth.com" className="hover:text-white transition-colors">info@angelscare-homehealth.com</a>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPin className="w-5 h-5 text-champagne" />
                                    <span>23 N Oaks Plz #245, Saint Louis, MO 63121</span>
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div className="w-full h-48 bg-navy/50 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://placehold.co/600x400/183A8C/FFF?text=Map+of+Service+Area')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <div className="relative z-10 flex items-center gap-2 p-2 px-4 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                    <MapPin className="w-4 h-4 text-champagne" />
                                    <span className="text-xs font-medium text-white">Serving St. Louis Metro Area</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Glass Form */}
                    <div className="w-full">
                        <GlassCard className="p-8 md:p-10 border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-champagne/20 flex items-center justify-center border border-champagne/30">
                                        <CheckCircle className="w-8 h-8 text-champagne" />
                                    </div>
                                    <h3 className="text-2xl font-display font-medium text-white">Thank You!</h3>
                                    <p className="text-white/70 max-w-sm font-sans">
                                        We&apos;ve received your message and will be in touch shortly.
                                        Feel free to call us at <Link href="tel:3143810321" className="text-champagne hover:underline">(314) 381-0321</Link> if you need immediate assistance.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-base font-medium text-white/90 ml-1 font-sans">First Name</label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                required
                                                className="w-full h-12 rounded-lg bg-white/5 border border-white/10 px-4 text-white placeholder:text-white/50 focus:border-champagne focus:ring-1 focus:ring-champagne outline-none transition-all font-sans"
                                                placeholder="Jane"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-base font-medium text-white/90 ml-1 font-sans">Last Name</label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                required
                                                className="w-full h-12 rounded-lg bg-white/5 border border-white/10 px-4 text-white placeholder:text-white/50 focus:border-champagne focus:ring-1 focus:ring-champagne outline-none transition-all font-sans"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-base font-medium text-white/90 ml-1 font-sans">Phone Number</label>
                                        <input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            required
                                            className="w-full h-12 rounded-lg bg-white/5 border border-white/10 px-4 text-white placeholder:text-white/50 focus:border-champagne focus:ring-1 focus:ring-champagne outline-none transition-all font-sans"
                                            placeholder="(314) 555-1234"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-base font-medium text-white/90 ml-1 font-sans">Email Address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="w-full h-12 rounded-lg bg-white/5 border border-white/10 px-4 text-white placeholder:text-white/50 focus:border-champagne focus:ring-1 focus:ring-champagne outline-none transition-all font-sans"
                                            placeholder="jane@example.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-base font-medium text-white/90 ml-1 font-sans">How can we help?</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            className="w-full h-32 rounded-lg bg-white/5 border border-white/10 p-4 text-white placeholder:text-white/50 focus:border-champagne focus:ring-1 focus:ring-champagne outline-none transition-all resize-none font-sans"
                                            placeholder="I'm interested in care for my mother..."
                                        />
                                    </div>

                                    {error && (
                                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm font-sans">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-14 rounded-lg text-lg flex items-center justify-center gap-2 bg-gradient-to-r from-champagne to-champagne-light text-navy font-semibold hover:shadow-[0_0_30px_rgba(216,181,106,0.4)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-sans"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Start the Conversation</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>

                                    <p className="text-center text-xs text-white/40 font-sans">
                                        Your information is private and secure. No spam, ever.
                                    </p>
                                </form>
                            )}
                        </GlassCard>
                    </div>

                </div>
            </div>

            {/* Closing Credits (Footer) */}
            <div className="relative z-10 border-t border-white/10 mt-12 pt-8">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* Brand */}
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src="/ACLOGO.png"
                                    alt="Angel's Care Home Health"
                                    className="h-12 w-12 flex-shrink-0 object-contain opacity-90"
                                />
                                <div>
                                    <span className="font-display text-xl font-medium text-white block">Angel&apos;s Care</span>
                                    <span className="text-xs text-white/50 font-sans tracking-wider uppercase">Home Health Agency</span>
                                </div>
                            </div>
                            <TrustBadges className="mt-4 opacity-80" />
                        </div>

                        {/* Links */}
                        <nav className="flex items-center gap-8 text-sm text-white/60 font-sans">
                            <Link href="/" className="hover:text-champagne transition-colors">Home</Link>
                            <Link href="/services" className="hover:text-champagne transition-colors">Services</Link>
                            <Link href="/about" className="hover:text-champagne transition-colors">About Us</Link>
                            <Link href="/legal/privacy-policy" className="hover:text-champagne transition-colors">Privacy Policy</Link>
                        </nav>

                        {/* Copyright */}
                        <div className="text-xs text-white/30 font-sans text-right">
                            &copy; {new Date().getFullYear()} Angel&apos;s Care Home Health.<br />All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
