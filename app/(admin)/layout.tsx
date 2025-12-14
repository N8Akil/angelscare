import { TooltipProvider } from "@/components/ui/tooltip"
import Link from "next/link"
import { Users, LayoutDashboard, FileText, Settings, LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const adminNav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/contacts", label: "Contacts", icon: Users },
    { href: "/admin/content", label: "Content", icon: FileText },
    { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40 md:flex-row">
                {/* Mobile Sidebar (Sheet) */}
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="outline" className="sm:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <SheetHeader>
                                <SheetTitle>Admin Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="grid gap-6 text-lg font-medium mt-8">
                                <Link
                                    href="/admin/dashboard"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <span className="sr-only">Angel&apos;s Care Admin</span>
                                    AC
                                </Link>
                                {adminNav.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="flex-1 text-lg font-semibold text-primary">Angel&apos;s Care Admin</div>
                </header>

                {/* Desktop Sidebar */}
                <aside className="hidden w-64 flex-col border-r bg-background md:flex">
                    <div className="flex h-14 items-center border-b px-6 font-semibold lg:h-[60px] text-primary">
                        Angel&apos;s Care Admin
                    </div>
                    <nav className="flex-1 overflow-auto py-4">
                        <ul className="grid items-start px-4 text-sm font-medium lg:px-6 gap-2">
                            {adminNav.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted"
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="mt-auto p-4 border-t">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive">
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-4 sm:px-6 sm:py-0 md:p-8 bg-muted/40 overflow-y-auto">
                    {children}
                </main>
            </div>
        </TooltipProvider>
    );
}
