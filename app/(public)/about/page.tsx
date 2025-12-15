import { WarmCard } from "@/components/ui/warm-card";
import { TrustBadges } from "@/components/ui/trust-badges";
import { MapPin, Phone, Heart, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "About Us | Angel's Care Home Health",
    description: "Serving St. Louis & Florissant families with skilled nursing and compassionate home care. State Licensed & Medicare Certified.",
};

export default function AboutPage() {
    return (
        <main className="bg-bg-base min-h-screen text-text-primary">
            {/* Hero Section (Light Theme) */}
            <section className="relative pt-32 pb-20 px-6 container mx-auto text-center">
                <h1 className="text-display text-5xl md:text-6xl font-bold mb-6 text-text-primary">
                    Our Story is <span className="text-navy text-script italic">Your Story.</span>
                </h1>
                <p className="text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
                    For over 20 years, we&apos;ve believed that the best healing happens at home.
                    We are not just a healthcare agency; we are neighbors caring for neighbors in St. Louis and Florissant.
                </p>
            </section>

            {/* Trust & Mission Grid */}
            <section className="px-6 pb-24 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    {/* Left: Determining Factors (The "Why Us") */}
                    <div className="space-y-6">
                        <WarmCard className="p-8 md:p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <ShieldCheck className="w-32 h-32" />
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-3">
                                <ShieldCheck className="w-6 h-6 text-gold" />
                                Verified Trust
                            </h3>
                            <p className="text-text-muted mb-6">
                                We know that inviting someone into your home requires immense trust. That&apos;s why we go beyond the basics.
                                Angel&apos;s Care is fully <strong className="text-text-primary">State Licensed</strong> and <strong className="text-text-primary">Medicare Certified</strong>.
                            </p>
                            {/* Badges in Gold Seal Style */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-gold/10 border border-gold/40 px-4 py-2 rounded-full">
                                    <ShieldCheck className="w-4 h-4 text-navy" />
                                    <span className="text-sm font-bold text-navy">Medicare Certified</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gold/10 border border-gold/40 px-4 py-2 rounded-full">
                                    <Users className="w-4 h-4 text-navy" />
                                    <span className="text-sm font-bold text-navy">Missouri Licensed</span>
                                </div>
                            </div>
                        </WarmCard>

                        <WarmCard className="p-8 md:p-10">
                            <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-3">
                                <Users className="w-6 h-6 text-navy" />
                                Family First
                            </h3>
                            <p className="text-text-muted">
                                Whether you are hiring your own family member through our <strong className="text-text-primary">Consumer Directed Services</strong> program
                                or welcoming one of our nurses, our philosophy is the same: <em className="text-navy">Treat every patient like our own grandparent.</em>
                            </p>
                        </WarmCard>
                    </div>

                    {/* Right: The Promise (Mission) */}
                    <div className="space-y-8">
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-[#E5E5E5]">
                            {/* Placeholder for Team Photo */}
                            <div className="absolute inset-0 flex items-center justify-center text-text-muted/30 font-display text-lg">
                                [Team Photo: Smiling Staff in Florissant Office]
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-display font-bold text-text-primary">Where We Serve</h2>
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-navy/10">
                                <MapPin className="w-6 h-6 text-navy flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-text-primary">St. Louis Metro Area</h4>
                                    <p className="text-text-muted text-sm mt-1">
                                        Proudly serving St. Louis City &amp; County, Jefferson County, and St. Charles County.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link href="/contact" className="w-full btn-primary flex items-center justify-center gap-2 py-4 rounded-xl text-lg shadow-lg">
                                <span>Contact Our Team</span>
                                <Phone className="w-5 h-5" />
                            </Link>
                            <p className="text-center text-sm text-text-muted">
                                Questions? Call us 24/7 at <strong className="text-navy">(314) 381-0321</strong>
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
