"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import { Menu, X, Phone, ChevronDown, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

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
            {/* The Floating Pill - Light background with royal blue accents */}
            <div className="rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto shadow-2xl relative bg-white/90 backdrop-blur-xl border border-royal/10 transition-all duration-300">

                {/* Brand */}
                <Link href="/" className="flex items-center gap-3 z-20 hover:opacity-90 transition-opacity">
                    <img
                        src="/ACLOGO.png"
                        alt="Angel's Care Home Health"
                        className="h-14 w-auto flex-shrink-0 object-contain"
                    />
                    <div className="flex flex-col">
                        <span className="font-display text-xl font-bold text-navy leading-tight">Angel&apos;s Care</span>
                        <span className="font-sans font-thin text-sm text-navy/70 tracking-wide">Home Health</span>
                    </div>
                </Link>

                {/* Desktop Navigation (Radix) */}
                <div className="hidden md:block">
                    <NavigationMenu.Root className="relative flex justify-center z-10">
                        <NavigationMenu.List className="center flex list-none items-center gap-8">

                            <NavigationMenu.Item>
                                <Link
                                    href="/"
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-navy outline-none focus:text-navy",
                                        pathname === "/" ? "text-navy" : "text-charcoal/80"
                                    )}
                                >
                                    Home
                                </Link>
                            </NavigationMenu.Item>

                            <NavigationMenu.Item>
                                <NavigationMenu.Trigger
                                    className={cn(
                                        "group flex items-center gap-1 text-sm font-medium transition-colors hover:text-navy outline-none focus:text-navy",
                                        pathname.startsWith("/services") ? "text-navy" : "text-charcoal/80"
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
                                                    className="block p-3 rounded-lg text-sm text-charcoal/80 hover:text-navy hover:bg-navy/5 transition-all font-medium"
                                                >
                                                    {service.label}
                                                </Link>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-navy/10 text-center">
                                            <Link href="/services" className="text-xs text-navy/70 hover:text-navy uppercase tracking-widest font-bold">
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
                                        "text-sm font-medium transition-colors hover:text-navy outline-none focus:text-navy",
                                        pathname === "/about" ? "text-navy" : "text-charcoal/80"
                                    )}
                                >
                                    Our Story
                                </Link>
                            </NavigationMenu.Item>

                        </NavigationMenu.List>

                        {/* Viewport for smooth transitions */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 flex justify-center perspective-[2000px]">
                            <NavigationMenu.Viewport className="relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top-center overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-navy/10 shadow-[0_0_50px_rgba(27,59,95,0.1)] transition-[width,height] duration-300 data-[state=open]:animate-scale-in-content data-[state=closed]:animate-scale-out-content" />
                        </div>
                    </NavigationMenu.Root>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 z-20">
                    <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-medium text-charcoal/70 hover:text-navy transition-colors">
                        <Lock className="w-4 h-4" />
                        <span>Admin</span>
                    </Link>
                    <Link href="tel:3143810321" className="hidden md:flex btn-primary rounded-full px-6 py-2 text-sm">
                        <Phone className="w-4 h-4 fill-current" />
                        <span>Call Now</span>
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileOpen(true)}
                        className="md:hidden text-charcoal/90 hover:text-navy transition-colors"
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

                    {/* Side Sheet - Deep Navy gradient */}
                    <div className="fixed inset-y-0 right-0 z-[61] w-full sm:w-[450px] bg-navy shadow-2xl border-l border-white/10 animate-slide-in-from-right p-8 flex flex-col pointer-events-auto">

                        {/* Header: Logo & Close */}
                        <div className="flex items-center justify-between mb-12">
                            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileOpen(false)}>
                                <img
                                    src="/ACLOGO.png"
                                    alt="Angel's Care"
                                    className="h-10 w-auto object-contain brightness-0 invert"
                                />
                                <div className="flex flex-col">
                                    <span className="font-display text-xl font-bold text-white leading-tight">Angel&apos;s Care</span>
                                    <span className="font-sans font-thin text-sm text-white/70 tracking-wide">Home Health</span>
                                </div>
                            </Link>

                            <button
                                onClick={() => setIsMobileOpen(false)}
                                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Nav Links */}
                        <nav className="flex flex-col gap-6 flex-1 overflow-y-auto relative z-10">
                            <Link
                                href="/"
                                className="text-3xl font-display font-medium text-white hover:text-gold transition-colors flex items-center gap-4 group"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <span className="w-1 h-8 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                Home
                            </Link>

                            {/* Services Accordion */}
                            <div className="flex flex-col">
                                <button
                                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                    className="text-3xl font-display font-medium text-white hover:text-gold transition-colors flex items-center justify-between w-full group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className={cn("w-1 h-8 bg-gold rounded-full transition-opacity", isMobileServicesOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
                                        Services
                                    </div>
                                    <ChevronDown className={cn(
                                        "w-6 h-6 transition-transform duration-300 text-white/50",
                                        isMobileServicesOpen && "rotate-180 text-gold"
                                    )} />
                                </button>

                                <div className={cn(
                                    "flex flex-col gap-3 pl-8 overflow-hidden transition-all duration-300",
                                    isMobileServicesOpen ? "max-h-[500px] mt-6 opacity-100" : "max-h-0 opacity-0"
                                )}>
                                    <Link href="/services" className="text-lg text-gold font-medium hover:text-gold/80 transition-colors font-sans block mb-2" onClick={() => setIsMobileOpen(false)}>
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
                                className="text-3xl font-display font-medium text-white hover:text-gold transition-colors flex items-center gap-4 group"
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <span className="w-1 h-8 bg-gold rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                Our Story
                            </Link>
                        </nav>

                        {/* Footer / CTA */}
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <Link href="tel:3143810321" className="flex items-center justify-center gap-3 btn-primary bg-white text-navy hover:bg-white/90 font-semibold rounded-full w-full py-4 text-xl shadow-xl transition-colors">
                                <Phone className="w-6 h-6 fill-current" />
                                <span>Call (314) 381-0321</span>
                            </Link>
                            <Link href="/login" className="flex items-center justify-center gap-2 text-white/50 hover:text-white transition-colors mt-4 text-sm" onClick={() => setIsMobileOpen(false)}>
                                <Lock className="w-4 h-4" />
                                <span>Admin Login</span>
                            </Link>
                            <p className="text-center text-white/30 text-xs mt-4 font-sans">
                                Available 24/7 for your family.
                            </p>
                        </div>
                    </div>
                </>
            )}
        </header>
    )
}
