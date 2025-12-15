'use client'

import { TooltipProvider } from "@/components/ui/tooltip"
import Link from "next/link"
import {
    Users,
    LayoutDashboard,
    Settings,
    LogOut,
    Menu,
    Bell,
    Briefcase,
    MessageSquareQuote,
    HelpCircle,
    Images,
    ChevronRight
} from "lucide-react"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

// Grouped navigation structure
const navGroups = [
    {
        label: "Main",
        items: [
            { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { href: "/contacts", label: "Contacts", icon: Users },
            { href: "/notifications", label: "Notifications", icon: Bell },
        ]
    },
    {
        label: "Content",
        items: [
            { href: "/content/careers", label: "Careers", icon: Briefcase },
            { href: "/content/testimonials", label: "Testimonials", icon: MessageSquareQuote },
            { href: "/content/faq", label: "FAQ", icon: HelpCircle },
            { href: "/content/gallery", label: "Gallery", icon: Images },
        ]
    },
    {
        label: "System",
        items: [
            { href: "/settings", label: "Settings", icon: Settings },
        ]
    }
]

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const router = useRouter();

    function handleSignOut() {
        // Clear the auth cookie by setting it to expire
        document.cookie = 'angelscare_admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        router.push('/');
    }

    return (
        <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col bg-bg-base md:flex-row font-sans text-text-primary">
                {/* Mobile Header + Sheet Menu */}
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-navy/10 bg-white/80 backdrop-blur-md px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs bg-background">
                            <SheetHeader>
                                <SheetTitle className="text-left text-navy">Angel&apos;s Care Admin</SheetTitle>
                            </SheetHeader>
                            <nav className="mt-6 space-y-6">
                                {navGroups.map((group) => (
                                    <div key={group.label}>
                                        <p className="px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-2">
                                            {group.label}
                                        </p>
                                        <div className="space-y-1">
                                            {group.items.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground hover:text-navy hover:bg-gold/10 transition-colors"
                                                >
                                                    <item.icon className="h-5 w-5" />
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                {/* Sign Out in mobile */}
                                <div className="border-t pt-4">
                                    <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive">
                                        <LogOut className="h-5 w-5" />
                                        Sign Out
                                    </Button>
                                </div>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="flex-1 text-lg font-semibold text-navy">Angel&apos;s Care</div>
                </header>

                {/* Desktop Sidebar */}
                <aside className="hidden w-64 flex-col border-r bg-background md:flex">
                    {/* Logo/Brand */}
                    <div className="flex h-16 items-center border-b px-6">
                        <Link href="/dashboard" className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy text-white font-bold text-sm">
                                AC
                            </div>
                            <span className="font-semibold text-navy">Angel&apos;s Care</span>
                        </Link>
                    </div>

                    {/* Navigation Groups */}
                    <nav className="flex-1 overflow-auto py-6 px-4 space-y-8">
                        {navGroups.map((group) => (
                            <div key={group.label}>
                                <h3 className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-navy/40 font-display">
                                    {group.label}
                                </h3>
                                <ul className="space-y-1">
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "group flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200",
                                                        isActive
                                                            ? "bg-navy text-white shadow-md shadow-navy/20"
                                                            : "text-text-muted hover:bg-gold/10 hover:text-navy"
                                                    )}
                                                >
                                                    <item.icon className={cn("h-4 w-4", isActive ? "text-gold" : "text-navy/60 group-hover:text-navy")} />
                                                    {item.label}
                                                    {isActive && <ChevronRight className="ml-auto h-3 w-3 text-gold/80" />}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>

                    {/* Sign Out Footer */}
                    <div className="p-3 border-t">
                        <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start gap-3 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 sm:px-8 sm:py-8 md:p-10 overflow-y-auto">
                    {children}
                </main>
            </div>
        </TooltipProvider>
    );
}
