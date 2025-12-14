import { GlassCard } from "@/components/ui/glass-card";
import { Phone, Check, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ServicesEnsemble } from "@/components/sections/services-ensemble";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ContactFinale } from "@/components/sections/contact-finale";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        {/*
              Slow Motion AI Video Placeholder
              TODO: Replace with actual video file (e.g., <video autoPlay loop muted ... />)
            */}
        <div className="absolute inset-0 w-full h-full bg-background z-0 select-none">
          {/* Subtle warm gradient for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/20 to-accent/40 opacity-100" />
        </div>

        {/* Decorative accent - plum/maroon sidebar strip */}
        <div className="absolute left-0 top-0 bottom-0 w-2 md:w-3 bg-gradient-to-b from-maroon via-plum to-maroon z-10" />

        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center h-full pt-20">
          <div className="w-full md:w-2/3 lg:w-1/2 space-y-8 animate-fade-in-up">
            {/* Headline Group */}
            <div className="space-y-4">
              <h1 className="text-display text-5xl md:text-7xl font-bold text-maroon-dark leading-[1.1]">
                Where Compassion <br />
                <span className="text-plum italic">Comes Home.</span>
              </h1>
              <p className="text-lg md:text-xl text-maroon/80 font-light max-w-xl leading-relaxed">
                Skilled nursing and therapy that treats your loved ones like the stars of their own story.
                Serving <span className="font-medium text-plum">St. Louis</span>, <span className="font-medium text-plum">Jefferson County</span> & <span className="font-medium text-plum">St. Charles County</span>.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/contact" className="group">
                <button className="btn-primary px-8 py-4 rounded-full text-lg flex items-center gap-3 shadow-lg w-full sm:w-auto justify-center hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5 fill-current" />
                  <span>Start Care Now</span>
                </button>
              </Link>

              <Link href="/contact">
                <button className="px-8 py-4 rounded-full text-lg font-medium text-[#3A151C] border border-[#3A151C]/20 bg-[#FDFBF7] shadow-md hover:shadow-lg hover:border-[#3A151C]/40 transition-all w-full sm:w-auto justify-center flex items-center gap-2">
                  <span>See If You Qualify</span>
                  <ArrowRight className="w-5 h-5 text-[#3A151C]" />
                </button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-plum/10 flex flex-wrap gap-6 text-sm md:text-base text-maroon/70">
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-plum/10 text-plum">
                  <Check className="w-4 h-4" />
                </div>
                <span>Medicare Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-full bg-plum/10 text-plum">
                  <Check className="w-4 h-4" />
                </div>
                <span>24/7 On-Call Support</span>
              </div>
            </div>
          </div>

          {/* Right Side / Spacer for visual balance in cinematic 2-column layout */}
          <div className="hidden md:block w-1/3 lg:w-1/2 h-full" />
        </div>

        {/* Bottom fade for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20" />
      </main>

      {/* Trust Signals Section */}
      <section className="py-12 bg-accent/10 border-b border-plum/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center text-maroon/60">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-plum" />
              <span className="font-semibold">Medicare Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-plum" />
              <span className="font-semibold">BBB A+ Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-plum" />
              <span className="font-semibold">Licensed & Bonded</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Ensemble Section */}
      <ServicesEnsemble />

      {/* Process Timeline Section */}
      <ProcessTimeline />

      {/* Contact Finale Section */}
      <ContactFinale />
    </div>
  );
}
