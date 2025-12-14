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
        <main className="bg-[#FAF7F5] min-h-screen text-[#3A151C]">
            {/* Hero Section (Light Theme) */}
            <section className="relative pt-32 pb-20 px-6 container mx-auto text-center">
                <h1 className="text-display text-5xl md:text-6xl font-bold mb-6 text-[#3A151C]">
                    Our Story is <span className="text-[#D4AF37] italic">Your Story.</span>
                </h1>
                <p className="text-xl text-[#4A5568] max-w-2xl mx-auto leading-relaxed">
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
                                <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
                                Verified Trust
                            </h3>
                            <p className="text-[#4A5568] mb-6">
                                We know that inviting someone into your home requires immense trust. That&apos;s why we go beyond the basics.
                                Angel&apos;s Care is fully <strong>State Licensed</strong> and <strong>Medicare Certified</strong>.
                            </p>
                            {/* Badges in Light Mode context */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-white/50 border border-[#6B3A5B]/10 px-3 py-2 rounded-full">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-sm font-bold text-[#3A151C]">Medicare Certified</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/50 border border-[#6B3A5B]/10 px-3 py-2 rounded-full">
                                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                                    <span className="text-sm font-bold text-[#3A151C]">Missouri Licensed</span>
                                </div>
                            </div>
                        </WarmCard>

                        <WarmCard className="p-8 md:p-10">
                            <h3 className="text-2xl font-display font-bold mb-4 flex items-center gap-3">
                                <Users className="w-6 h-6 text-[#D4AF37]" />
                                Family First
                            </h3>
                            <p className="text-[#4A5568]">
                                Whether you are hiring your own family member through our <strong>Consumer Directed Services</strong> program
                                or welcoming one of our nurses, our philosophy is the same: <em>Treat every patient like our own grandparent.</em>
                            </p>
                        </WarmCard>
                    </div>

                    {/* Right: The Promise (Mission) */}
                    <div className="space-y-8">
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-[#6B3A5B]/10 bg-[#E8D5C4]">
                            {/* Placeholder for Team Photo */}
                            <div className="absolute inset-0 flex items-center justify-center text-[#3A151C]/30 font-display text-lg">
                                [Team Photo: Smiling Staff in Florissant Office]
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-display font-bold text-[#3A151C]">Where We Serve</h2>
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#6B3A5B]/10">
                                <MapPin className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                                <div>
                                    <h4 className="font-bold text-[#3A151C]">St. Louis Metro Area</h4>
                                    <p className="text-[#4A5568] text-sm mt-1">
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
                            <p className="text-center text-sm text-[#4A5568]">
                                Questions? Call us 24/7 at <strong>(314) 381-0321</strong>
                            </p>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
