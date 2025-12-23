"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import {
    Menu,
    X,
    Phone,
    ChevronDown,
    Lock,
    Home as HomeIcon,
    Stethoscope,
    Users,
    Heart,
    Building,
    MapPin,
    Mail,
    Clock,
    ChevronRight,
    Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

const SERVICES = [
    {
        href: "/services/home-health-care",
        label: "Home Health Care",
        icon: Stethoscope,
        description: "Skilled nursing visits"
    },
    {
        href: "/services/consumer-directed-services",
        label: "Consumer Directed Services",
        icon: Users,
        description: "Hire family as caregivers"
    },
    {
        href: "/services/personal-care",
        label: "Personal Care",
        icon: Heart,
        description: "Daily living assistance"
    },
    {
        href: "/services/elderly-home-care",
        label: "Elderly and Disabled Home Care",
        icon: Building,
        description: "Companionship & support"
    },
]

export function MainNav() {
    const pathname = usePathname()
    const [isMobileOpen, setIsMobileOpen] = React.useState(false)
    const [isMobileServicesOpen, setIsMobileServicesOpen] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    // Mount state for portal
    React.useEffect(() => {
        setMounted(true)
    }, [])

    // Close mobile menu when route changes
    React.useEffect(() => {
        setIsMobileOpen(false)
        setIsMobileServicesOpen(false)
    }, [pathname])

    // Prevent body scroll when menu is open
    React.useEffect(() => {
        if (isMobileOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileOpen])

    // Mobile menu content (rendered via portal)
    const mobileMenuContent = (
        <div className="mobile-menu-portal">
            {/* Backdrop with blur */}
            <div
                className="fixed inset-0 z-[9998] bg-brand-navy/40 backdrop-blur-md"
                onClick={() => setIsMobileOpen(false)}
            />

            {/* Full-screen Menu Panel */}
            <div className="fixed inset-0 z-[9999] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-[#0f2847]" />

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                {/* Content Container */}
                <div className="relative h-full flex flex-col p-6 sm:p-8 overflow-y-auto">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <img
                                src="/ACLOGO.png"
                                alt="Angel's Care"
                                className="h-12 w-auto object-contain brightness-0 invert"
                            />
                            <div className="flex flex-col">
                                <span className="font-display text-xl font-bold text-white">Angel&apos;s Care</span>
                                <span className="text-xs text-white/60 tracking-wider uppercase">Home Health</span>
                            </div>
                        </Link>

                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:rotate-90 duration-300"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2">
                        {/* Home Link */}
                        <Link
                            href="/"
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group",
                                pathname === "/"
                                    ? "bg-white/15 text-white"
                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                            )}
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <div className={cn(
                                "p-3 rounded-xl transition-colors",
                                pathname === "/" ? "bg-brand-gold text-brand-navy" : "bg-white/10 group-hover:bg-brand-gold/20"
                            )}>
                                <HomeIcon className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-display font-medium">Home</span>
                            {pathname === "/" && (
                                <ChevronRight className="w-5 h-5 ml-auto text-brand-gold" />
                            )}
                        </Link>

                        {/* Services Accordion */}
                        <div>
                            <button
                                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                                className={cn(
                                    "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group",
                                    pathname.startsWith("/services") || isMobileServicesOpen
                                        ? "bg-white/15 text-white"
                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                <div className={cn(
                                    "p-3 rounded-xl transition-colors",
                                    pathname.startsWith("/services") || isMobileServicesOpen
                                        ? "bg-brand-gold text-brand-navy"
                                        : "bg-white/10 group-hover:bg-brand-gold/20"
                                )}>
                                    <Stethoscope className="w-6 h-6" />
                                </div>
                                <span className="text-xl font-display font-medium">Services</span>
                                <ChevronDown className={cn(
                                    "w-5 h-5 ml-auto transition-transform duration-300",
                                    isMobileServicesOpen ? "rotate-180 text-brand-gold" : "text-white/50"
                                )} />
                            </button>

                            {/* Services Dropdown */}
                            <div className={cn(
                                "overflow-hidden transition-all duration-500 ease-out",
                                isMobileServicesOpen ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0"
                            )}>
                                <div className="pl-4 space-y-2">
                                    {/* View All Services */}
                                    <Link
                                        href="/services"
                                        className="flex items-center gap-3 p-3 rounded-xl bg-brand-gold/20 text-brand-gold hover:bg-brand-gold/30 transition-colors"
                                        onClick={() => setIsMobileOpen(false)}
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        <span className="font-semibold">View All Services</span>
                                        <ChevronRight className="w-4 h-4 ml-auto" />
                                    </Link>

                                    {/* Individual Services */}
                                    {SERVICES.map((service) => {
                                        const Icon = service.icon
                                        return (
                                            <Link
                                                key={service.href}
                                                href={service.href}
                                                className={cn(
                                                    "flex items-center gap-3 p-3 rounded-xl transition-all duration-300",
                                                    pathname === service.href
                                                        ? "bg-white/15 text-white"
                                                        : "text-white/70 hover:bg-white/10 hover:text-white"
                                                )}
                                                onClick={() => setIsMobileOpen(false)}
                                            >
                                                <div className="p-2 rounded-lg bg-white/10">
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <span className="block font-medium">{service.label}</span>
                                                    <span className="text-xs text-white/50">{service.description}</span>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Our Story Link */}
                        <Link
                            href="/about"
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group",
                                pathname === "/about"
                                    ? "bg-white/15 text-white"
                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                            )}
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <div className={cn(
                                "p-3 rounded-xl transition-colors",
                                pathname === "/about" ? "bg-brand-gold text-brand-navy" : "bg-white/10 group-hover:bg-brand-gold/20"
                            )}>
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-display font-medium">Our Story</span>
                            {pathname === "/about" && (
                                <ChevronRight className="w-5 h-5 ml-auto text-brand-gold" />
                            )}
                        </Link>

                        {/* Contact Link */}
                        <Link
                            href="/contact"
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group",
                                pathname === "/contact"
                                    ? "bg-white/15 text-white"
                                    : "text-white/80 hover:bg-white/10 hover:text-white"
                            )}
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <div className={cn(
                                "p-3 rounded-xl transition-colors",
                                pathname === "/contact" ? "bg-brand-gold text-brand-navy" : "bg-white/10 group-hover:bg-brand-gold/20"
                            )}>
                                <Mail className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-display font-medium">Contact Us</span>
                            {pathname === "/contact" && (
                                <ChevronRight className="w-5 h-5 ml-auto text-brand-gold" />
                            )}
                        </Link>
                    </nav>

                    {/* Quick Info Cards */}
                    <div className="grid grid-cols-2 gap-3 my-6">
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                            <Clock className="w-5 h-5 text-brand-gold mb-2" />
                            <p className="text-white font-medium text-sm">24/7 Available</p>
                            <p className="text-white/50 text-xs">For emergencies</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm">
                            <MapPin className="w-5 h-5 text-brand-gold mb-2" />
                            <p className="text-white font-medium text-sm">St. Louis Area</p>
                            <p className="text-white/50 text-xs">& surrounding counties</p>
                        </div>
                    </div>

                    {/* Footer CTA */}
                    <div className="pt-6 border-t border-white/10 space-y-4">
                        {/* Primary CTA - Call Button */}
                        <Link
                            href="tel:3143810321"
                            className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full bg-brand-gold text-brand-navy font-bold text-lg shadow-lg hover:bg-brand-gold/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Phone className="w-6 h-6 fill-current" />
                            <span>Call (314) 381-0321</span>
                        </Link>

                        {/* Admin Login */}
                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 text-white/50 hover:text-white transition-colors py-2"
                            onClick={() => setIsMobileOpen(false)}
                        >
                            <Lock className="w-4 h-4" />
                            <span className="text-sm">Admin Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl pointer-events-none">
                {/* The Floating Pill */}
                <div className="rounded-full px-6 py-3 flex items-center justify-between pointer-events-auto shadow-2xl relative bg-white/90 backdrop-blur-xl border border-brand-navy/10 transition-all duration-300">

                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3 z-20 hover:opacity-90 transition-opacity">
                        <img
                            src="/ACLOGO.png"
                            alt="Angel's Care Home Health"
                            className="h-14 w-auto flex-shrink-0 object-contain"
                        />
                        <div className="flex flex-col">
                            <span className="font-display text-xl font-bold text-brand-navy leading-tight">Angel&apos;s Care</span>
                            <span className="font-sans font-medium text-sm text-brand-navy tracking-wide">Home Health</span>
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
                                            "text-sm font-medium transition-colors hover:text-brand-navy outline-none focus:text-brand-navy",
                                            pathname === "/" ? "text-brand-navy" : "text-text-muted"
                                        )}
                                    >
                                        Home
                                    </Link>
                                </NavigationMenu.Item>

                                <NavigationMenu.Item>
                                    <NavigationMenu.Trigger
                                        className={cn(
                                            "group flex items-center gap-1 text-sm font-medium transition-colors hover:text-brand-navy outline-none focus:text-brand-navy",
                                            pathname.startsWith("/services") ? "text-brand-navy" : "text-text-muted"
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
                                                        className="block p-3 rounded-lg text-sm text-text-muted hover:text-brand-navy hover:bg-brand-navy/5 transition-all font-medium"
                                                    >
                                                        {service.label}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-brand-navy/10 text-center">
                                                <Link href="/services" className="text-xs text-brand-navy/70 hover:text-brand-navy uppercase tracking-widest font-bold">
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
                                            "text-sm font-medium transition-colors hover:text-brand-navy outline-none focus:text-brand-navy",
                                            pathname === "/about" ? "text-brand-navy" : "text-text-muted"
                                        )}
                                    >
                                        Our Story
                                    </Link>
                                </NavigationMenu.Item>

                            </NavigationMenu.List>

                            {/* Viewport for smooth transitions */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 flex justify-center perspective-[2000px]">
                                <NavigationMenu.Viewport className="relative mt-2 h-[var(--radix-navigation-menu-viewport-height)] w-[var(--radix-navigation-menu-viewport-width)] origin-top-center overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-brand-navy/10 shadow-[0_0_50px_rgba(27,59,95,0.1)] transition-[width,height] duration-300 data-[state=open]:animate-scale-in-content data-[state=closed]:animate-scale-out-content" />
                            </div>
                        </NavigationMenu.Root>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4 z-20">
                        <Link href="/login" className="hidden md:flex items-center gap-2 text-sm font-medium text-text-muted hover:text-brand-navy transition-colors">
                            <Lock className="w-4 h-4" />
                            <span>Admin</span>
                        </Link>
                        <Link
                            href="tel:3143810321"
                            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/50 text-brand-navy animate-pulse-glow"
                            aria-label="Call Angel's Care"
                        >
                            <Phone className="w-5 h-5 fill-current" />
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsMobileOpen(true)}
                            className="md:hidden p-2 rounded-full text-brand-navy hover:bg-brand-navy/5 transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Portal - Renders outside header to avoid z-index issues */}
            {mounted && isMobileOpen && createPortal(mobileMenuContent, document.body)}
        </>
    )
}
