import { GlassCard } from "@/components/ui/glass-card";
import { Phone, Check, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ServicesEnsemble } from "@/components/sections/services-ensemble";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ContactFinale } from "@/components/sections/contact-finale";
import { TestimonialCarousel } from "@/components/sections/testimonial-carousel";
import { TrustBadges } from "@/components/ui/trust-badges";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        {/*
              Slow Motion AI Video Placeholder
              TODO: Replace with actual video file (e.g., <video autoPlay loop muted ... />)
            */}
        <div className="absolute inset-0 w-full h-full bg-bg-base z-0 select-none">
          {/* Hero Overlay */}
          <div className="absolute inset-0 hero-overlay opacity-100 z-10" />
        </div>

        {/* Decorative accent - Navy sidebar strip */}
        <div className="absolute left-0 top-0 bottom-0 w-2 md:w-3 bg-navy z-10" />

        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center h-full pt-20">
          <div className="w-full md:w-2/3 lg:w-1/2 space-y-8 animate-fade-in-up">
            {/* Headline Group */}
            <div className="space-y-4">
              <h1 className="text-display text-5xl md:text-7xl font-bold text-navy leading-[1.1]">
                Where Compassion <br />
                <span className="text-gold italic">Comes Home.</span>
              </h1>
              <p className="text-lg md:text-xl text-navy/80 font-light max-w-xl leading-relaxed">
                Skilled nursing and therapy that treats your loved ones like the stars of their own story.
                Serving <span className="font-medium text-navy">St. Louis</span>, <span className="font-medium text-navy">Jefferson County</span> & <span className="font-medium text-navy">St. Charles County</span>.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact" className="group">
                <button className="btn-primary px-8 py-4 rounded-full text-lg flex items-center gap-3 w-full sm:w-auto justify-center hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 fill-current" />
                  <span>Start Care Now</span>
                </button>
              </Link>

              <Link href="/contact">
                <button className="btn-secondary px-8 py-4 rounded-full text-lg w-full sm:w-auto justify-center flex items-center gap-2">
                  <span>See If You Qualify</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-navy/10 w-full">
              <TrustBadges className="bg-transparent border-none p-0" />
            </div>
          </div>

          {/* Right Side / Spacer for visual balance in cinematic 2-column layout */}
          <div className="hidden md:block w-1/3 lg:w-1/2 h-full" />
        </div>

        {/* Bottom fade for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-bg-base to-transparent z-20" />
      </main>

      {/* Trust Signals Section */}
      <section className="py-12 bg-white border-b border-navy/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-text-muted">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-navy" />
              <span className="font-semibold">Medicare Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-navy" />
              <span className="font-semibold">BBB A+ Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-navy" />
              <span className="font-semibold">Licensed & Bonded</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Ensemble Section */}
      <ServicesEnsemble />

      {/* Process Timeline Section */}
      <ProcessTimeline />

      {/* Testimonials Section */}
      <TestimonialCarousel />

      {/* Contact Finale Section */}
      <ContactFinale />
    </div>
  );
}
