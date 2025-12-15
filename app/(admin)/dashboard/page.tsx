import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Users, MessageSquare, Briefcase, Calendar, Star, FileText, PlusCircle, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
    title: "Admin Dashboard | Angel's Care",
}

export default function DashboardPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-navy tracking-tight">Good morning, Admin</h1>
                    <p className="text-text-muted mt-1">Here&apos;s what&apos;s happening at Angel&apos;s Care today.</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-navy/70 bg-white px-4 py-2 rounded-full border border-navy/5 shadow-sm">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-none shadow-lg shadow-navy/5 hover:shadow-xl hover:shadow-navy/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold text-navy uppercase tracking-wider">Total Contacts</CardTitle>
                        <div className="p-2 rounded-full bg-navy/5 text-navy">
                            <Users className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-display font-bold text-navy">124</div>
                        <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                            <span className="text-green-600 font-bold flex items-center">
                                <ArrowUpRight className="w-3 h-3" /> +4
                            </span>
                            from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-navy/5 hover:shadow-xl hover:shadow-navy/10 transition-all duration-300 group cursor-pointer border-l-4 border-l-gold">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold text-navy uppercase tracking-wider">Unread Messages</CardTitle>
                        <div className="p-2 rounded-full bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                            <MessageSquare className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-display font-bold text-navy">3</div>
                        <p className="text-xs text-gold font-bold mt-1">Needs attention</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-navy/5 hover:shadow-xl hover:shadow-navy/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold text-navy uppercase tracking-wider">Active Apps</CardTitle>
                        <div className="p-2 rounded-full bg-navy/5 text-navy">
                            <Briefcase className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-display font-bold text-navy">12</div>
                        <p className="text-xs text-text-muted mt-1">7 skilled nursing</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg shadow-navy/5 hover:shadow-xl hover:shadow-navy/10 transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold text-navy uppercase tracking-wider">Testimonials</CardTitle>
                        <div className="p-2 rounded-full bg-navy/5 text-navy">
                            <Star className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-display font-bold text-navy">28</div>
                        <p className="text-xs text-text-muted mt-1">4.9 average rating</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid: Quick Actions & Recent Activity */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">

                {/* Left Column: Quick Actions (3 cols) */}
                <div className="lg:col-span-3 space-y-6">
                    <Card className="border-none shadow-md h-full">
                        <CardHeader>
                            <CardTitle className="font-display text-xl text-navy">Quick Actions</CardTitle>
                            <CardDescription>Common tasks you perform daily.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <Link href="/contacts/add">
                                <Button className="w-full justify-start gap-3 bg-navy text-white hover:bg-navy/90 h-12 text-base rounded-xl shadow-md shadow-navy/20">
                                    <PlusCircle className="w-5 h-5 text-gold" />
                                    Add New Contact
                                </Button>
                            </Link>

                            <Link href="/notifications/compose">
                                <Button variant="outline" className="w-full justify-start gap-3 border-navy/10 text-navy hover:bg-navy/5 h-12 text-base rounded-xl">
                                    <MessageSquare className="w-5 h-5 text-navy/60" />
                                    Compose Message
                                </Button>
                            </Link>

                            <Link href="/content/testimonials">
                                <Button variant="outline" className="w-full justify-start gap-3 border-navy/10 text-navy hover:bg-navy/5 h-12 text-base rounded-xl">
                                    <Star className="w-5 h-5 text-navy/60" />
                                    Manage Testimonials
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Recent Activity Placeholders (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-md h-full">
                        <CardHeader>
                            <CardTitle className="font-display text-xl text-navy">Recent Activity</CardTitle>
                            <CardDescription>Latest updates from the system.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-3.5 top-2 bottom-2 w-px bg-navy/10" />

                                {/* Activity Items */}
                                {[
                                    { text: "New contact added: Sarah Jenkins", time: "2 hours ago", icon: Users, color: "bg-green-100 text-green-700" },
                                    { text: "Testimonial approved: Mark D.", time: "5 hours ago", icon: Star, color: "bg-gold/20 text-navy" },
                                    { text: "Application submitted: Nurse Position", time: "Yesterday", icon: Briefcase, color: "bg-blue-100 text-blue-700" },
                                    { text: "System backup completed", time: "2 days ago", icon: FileText, color: "bg-gray-100 text-gray-600" }
                                ].map((item, i) => (
                                    <div key={i} className="relative flex gap-4 pl-2 items-start group">
                                        <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white shadow-sm ${item.color}`}>
                                            <item.icon className="h-3.5 w-3.5" />
                                        </div>
                                        <div className="flex flex-col gap-1 -mt-0.5">
                                            <p className="text-sm font-medium text-navy">{item.text}</p>
                                            <p className="text-xs text-text-muted">{item.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
