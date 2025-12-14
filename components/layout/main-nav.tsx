"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { Menu, X, Phone, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
// Reusing GlassCard styled logic but applied directly for custom shape
// or we can just use the utility classes.

const SERVICES = [
    { href: "/services/home-health-care", label: "Home Health Care" },
    { href: "/services/consumer-directed-services", label: "Consumer Directed Services" },
    { href: "/services/personal-care", label: "Personal Care" },
    { href: "/services/elderly-home-care", label: "Elderly Home Care" },
]

export function MainNav() {
    const pathname = usePathname()
    const [isMobileOpen, setIsMobileOpen] = React.useState(false)
    const [isMobileServicesOpen, setIsMobileServicesOpen] = React.useState(false)

    // Close mobile menu when route changes
    React.useEffect(() => {
        setIsMobileOpen(false)
        setIsMobileServicesOpen(false)
    }, [pathname])

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl pointer-events-none">
            {/* The Floating Pill */}
            <div className="rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto shadow-2xl relative bg-white/80 backdrop-blur-xl border border-[#6B3A5B]/10 transition-all duration-300">

                {/* Brand */}
                <Link href="/" className="flex items-center gap-3 z-20 hover:opacity-90 transition-opacity">
                    <img
                        src="/ACLOGO-transparent.png"
                        alt="Angel's Care Home Health"
                        className="h-14 w-14 flex-shrink-0 object-contain"
                    />
                    <span className="font-display text-xl font-bold text-[#3A151C]">Angel&apos;s Care</span>
                </Link>

                {/* Desktop Navigation (Radix) */}
                <div className="hidden md:block">
                    <NavigationMenu.Root className="relative flex justify-center z-10">
                        <NavigationMenu.List className="center flex list-none items-center gap-8">

                            <NavigationMenu.Item>
                                <Link
                                    href="/"
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-[#6B3A5B] outline-none focus:text-[#6B3A5B]",
                                        pathname === "/" ? "text-[#6B3A5B]" : "text-[#3A151C]/80"
                                    )}
                                >
                                    Home
                                </Link>
                            </NavigationMenu.Item>

                            <NavigationMenu.Item>
                                <NavigationMenu.Trigger
                                    className={cn(
                                        "group flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#6B3A5B] outline-none focus:text-[#6B3A5B]",
                                        pathname.startsWith("/services") ? "text-[#6B3A5B]" : "text-[#3A151C]/80"
                                    )}
                                >
                                    Services
                                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                </NavigationMenu.Trigger>

                                <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto data-[motion=from-start]:animate-enter-from-left data-[motion=from-end]:animate-enter-from-right data-[motion=to-start]:animate-exit-to-left data-[motion=to-end]:animate-exit-to-right">
                                    <div className="w-[400px] sm:w-[500px] p-6">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                                            {SERVICES.map((service) => (
                                                <Link
                                                    key={service.href}
                                                    href={service.href}
                                                    className="block p-3 rounded-lg text-sm text-[#3A151C]/80 hover:text-[#6B3A5B] hover:bg-[#6B3A5B]/5 transition-all font-medium"
                                                >
                                                    {service.label}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-[#6B3A5B]/10 text-center">
                                            <Link href="/services" className="text-xs text-[#6B3A5B]/70 hover:text-[#6B3A5B] uppercase tracking-widest font-bold">
                                                View All Services
                                            </Link>
                                        </div>
                                    </div>
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>

                            <NavigationMenu.Item>
                                <Link
                                    href="/about"
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-[#6B3A5B] outline-none focus:text-[#6B3A5B]",
                                        pathname === "/about" ? "text-[#6B3A5B]" : "text-[#3A151C]/80"
                                    )}
                                >
                                    Our Story
                                </Link>
                            </NavigationMenu.Item>

                        </NavigationMenu.List>

                        {/* Viewport for smooth transitions */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 flex justify-center perspective-[2000px]">
                            <NavigationMenu.Viewport className="relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top-center overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-[#6B3A5B]/10 shadow-[0_0_50px_rgba(0,0,0,0.1)] transition-[width,height] duration-300 data-[state=open]:animate-scale-in-content data-[state=closed]:animate-scale-out-content" />
                        </div>
                    </NavigationMenu.Root>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 z-20">
                    <Link href="tel:3143810321" className="hidden md:flex btn-primary rounded-full px-6 py-2 text-sm shadow-[0_4px_14px_0_rgba(107,58,91,0.3)]">
                        <Phone className="w-4 h-4 fill-current" />
                        <span>Call Now</span>
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(true)}
                        className="md:hidden text-[#3A151C]/90 hover:text-[#6B3A5B] transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                        <span className="sr-only">Open Menu</span>
                    </button>
                </div>
            </div>

            {/* Mobile Sheet Overlay */}
            {isMobileOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm animate-fade-in pointer-events-auto"
                        onClick={() => setIsMobileOpen(false)}
                    />

                    {/* Side Sheet */}
                    <div className="fixed inset-y-0 right-0 z-[61] w-full sm:w-[450px] bg-gradient-to-b from-[#3A151C] to-[#2A1015] shadow-2xl border-l border-[#FDFBF7]/10 animate-slide-in-from-right p-8 flex flex-col pointer-events-auto">

                        {/* Header: Logo & Close */}
                        <div className="flex items-center justify-between mb-12">
                            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
                                <img
                                    src="/ACLOGO-transparent.png"
                                    alt="Angel's Care"
                                    className="h-10 w-10 object-contain brightness-0 invert"
                                />
                                <span className="font-display text-xl font-bold text-[#FDFBF7]">Angel&apos;s Care</span>
                            </Link>

                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="p-2 rounded-full bg-[#FDFBF7]/10 text-[#FDFBF7] hover:bg-[#FDFBF7]/20 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <nav className="flex flex-col gap-6 flex-1 overflow-y-auto relative z-10">
                            <Link
                                href="/"
                                className="text-3xl font-display font-medium text-white hover:text-[#E8C84A] transition-colors flex items-center gap-4 group"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <span className="w-1 h-8 bg-[#E8C84A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                Home
                            </Link>

                            {/* Services Accordion */}
                            <div className="flex flex-col">
                                <button
                                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                    className="text-3xl font-display font-medium text-white hover:text-[#E8C84A] transition-colors flex items-center justify-between w-full group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={cn("w-1 h-8 bg-[#E8C84A] rounded-full transition-opacity", isMobileServicesOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
                                        Services
                                    </div>
                                    <ChevronDown className={cn(
                                        "w-6 h-6 transition-transform duration-300 text-white/50",
                                        isMobileServicesOpen && "rotate-180 text-[#E8C84A]"
                                    )} />
                                </button>

                                <div className={cn(
                                    "flex flex-col gap-3 pl-8 overflow-hidden transition-all duration-300",
                                    isMobileServicesOpen ? "max-h-[500px] mt-6 opacity-100" : "max-h-0 opacity-0"
                                )}>
                                    <Link href="/services" className="text-lg text-[#E8C84A] font-medium hover:text-[#E8C84A]/80 transition-colors font-sans block mb-2" onClick={() => setIsMobileOpen(false)}>
                                        View All Services
                                    </Link>
                                    {SERVICES.map((service) => (
                                        <Link
                                            key={service.href}
                                            href={service.href}
                                            className="text-lg text-white/70 hover:text-white transition-colors font-sans block py-1"
                                            onClick={() => setIsMobileOpen(false)}
                                        >
                                            {service.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href="/about"
                                className="text-3xl font-display font-medium text-white hover:text-[#E8C84A] transition-colors flex items-center gap-4 group"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <span className="w-1 h-8 bg-[#E8C84A] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                Our Story
                            </Link>
                        </nav>

                        {/* Footer / CTA */}
                        <div className="mt-8 pt-8 border-t border-[#FDFBF7]/10">
                            <Link href="tel:3143810321" className="flex items-center justify-center gap-3 btn-primary rounded-full w-full py-4 text-xl shadow-xl">
                                <Phone className="w-6 h-6 fill-current" />
                                <span>Call (314) 381-0321</span>
                            </Link>
                            <p className="text-center text-[#FDFBF7]/30 text-xs mt-4 font-sans">
                                Available 24/7 for your family.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </header>
    )
}
