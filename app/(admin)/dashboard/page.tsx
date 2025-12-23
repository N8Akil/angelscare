import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Users, MessageSquare, Briefcase, Star, FileText, PlusCircle, ArrowUpRight, Bell, Send } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDashboardStats, getRecentActivity } from "@/lib/actions/dashboard"

export const metadata = {
    title: "Admin Dashboard | Angel's Care",
}

// Force dynamic rendering for real-time data
export const dynamic = 'force-dynamic'

// Map activity types to icons and colors
const activityConfig = {
    contact: { icon: Users, color: "bg-green-100 text-green-700" },
    testimonial: { icon: Star, color: "bg-gold/20 text-navy" },
    job: { icon: Briefcase, color: "bg-blue-100 text-blue-700" },
    notification: { icon: Send, color: "bg-purple-100 text-purple-700" },
    system: { icon: FileText, color: "bg-gray-100 text-gray-600" },
}

export default async function DashboardPage() {
    const stats = await getDashboardStats()
    const recentActivity = await getRecentActivity(6)

    // Get greeting based on time of day
    const hour = new Date().getHours()
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening"

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-navy tracking-tight">{greeting}, Admin</h1>
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
                <Link href="/contacts">
                    <Card className="border-none shadow-lg shadow-navy/5 hover:shadow-xl hover:shadow-navy/10 transition-all duration-300 cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-navy uppercase tracking-wider">Total Contacts</CardTitle>
                            <div className="p-2 rounded-full bg-navy/5 text-navy">
                                <Users className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-display font-bold text-navy">{stats.totalContacts}</div>
                            {stats.contactsLastMonth > 0 && (
                                <p className="text-xs text-text-muted mt-1 flex items-center gap-1">
                                    <span className="text-green-600 font-bold flex items-center">
                                        <ArrowUpRight className="w-3 h-3" /> +{stats.contactsLastMonth}
                                    </span>
                                    from last month
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/contacts?filter=recent">
                    <Card className={`border-none shadow-lg shadow-navy/5 hover:shadow-xl hover:shadow-navy/10 transition-all duration-300 group cursor-pointer ${stats.unreadMessages > 0 ? 'border-l-4 border-l-gold' : ''}`}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-navy uppercase tracking-wider">New This Week</CardTitle>
                            <div className={`p-2 rounded-full ${stats.unreadMessages > 0 ? 'bg-gold/10 text-gold group-hover:bg-gold group-hover:text-white' : 'bg-navy/5 text-navy'} transition-colors`}>
                                <MessageSquare className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-display font-bold text-navy">{stats.unreadMessages}</div>
                            {stats.unreadMessages > 0 ? (
                                <p className="text-xs text-gold font-bold mt-1">Needs attention</p>
                            ) : (
                                <p className="text-xs text-text-muted mt-1">All caught up!</p>
                            )}
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/content/careers">
                    <Card className="border-none shadow-lg shadow-navy/5 hover:shadow-xl hover:shadow-navy/10 transition-all duration-300 cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-navy uppercase tracking-wider">Active Jobs</CardTitle>
                            <div className="p-2 rounded-full bg-navy/5 text-navy">
                                <Briefcase className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-display font-bold text-navy">{stats.activeJobs}</div>
                            <p className="text-xs text-text-muted mt-1">Open positions</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/content/testimonials">
                    <Card className="border-none shadow-lg shadow-navy/5 hover:shadow-xl hover:shadow-navy/10 transition-all duration-300 cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-bold text-navy uppercase tracking-wider">Testimonials</CardTitle>
                            <div className="p-2 rounded-full bg-navy/5 text-navy">
                                <Star className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-display font-bold text-navy">{stats.totalTestimonials}</div>
                            {stats.avgRating > 0 ? (
                                <p className="text-xs text-text-muted mt-1">{stats.avgRating} average rating</p>
                            ) : (
                                <p className="text-xs text-text-muted mt-1">Published reviews</p>
                            )}
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Contact Types Breakdown (if has data) */}
            {stats.contactsByType.length > 0 && (
                <Card className="border-none shadow-md">
                    <CardHeader>
                        <CardTitle className="font-display text-xl text-navy">Contacts by Type</CardTitle>
                        <CardDescription>Breakdown of your contact database.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            {stats.contactsByType.map((item) => (
                                <div key={item.type} className="flex items-center gap-2 bg-navy/5 px-4 py-2 rounded-full">
                                    <span className="text-sm font-medium text-navy capitalize">{item.type}</span>
                                    <span className="text-sm font-bold text-gold">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

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
                                    <Bell className="w-5 h-5 text-navy/60" />
                                    Send Notification
                                </Button>
                            </Link>

                            <Link href="/content/testimonials">
                                <Button variant="outline" className="w-full justify-start gap-3 border-navy/10 text-navy hover:bg-navy/5 h-12 text-base rounded-xl">
                                    <Star className="w-5 h-5 text-navy/60" />
                                    Manage Testimonials
                                </Button>
                            </Link>

                            <Link href="/content/careers">
                                <Button variant="outline" className="w-full justify-start gap-3 border-navy/10 text-navy hover:bg-navy/5 h-12 text-base rounded-xl">
                                    <Briefcase className="w-5 h-5 text-navy/60" />
                                    Job Postings
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Recent Activity (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="border-none shadow-md h-full">
                        <CardHeader>
                            <CardTitle className="font-display text-xl text-navy">Recent Activity</CardTitle>
                            <CardDescription>Latest updates from the system.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentActivity.length === 0 ? (
                                <div className="text-center py-8 text-text-muted">
                                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p className="font-medium">No recent activity</p>
                                    <p className="text-sm">Activity will appear here as you use the system.</p>
                                </div>
                            ) : (
                                <div className="space-y-6 relative">
                                    {/* Vertical Line */}
                                    <div className="absolute left-3.5 top-2 bottom-2 w-px bg-navy/10" />

                                    {/* Activity Items */}
                                    {recentActivity.map((item) => {
                                        const config = activityConfig[item.type]
                                        const Icon = config.icon
                                        return (
                                            <div key={`${item.type}-${item.id}`} className="relative flex gap-4 pl-2 items-start group">
                                                <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white shadow-sm ${config.color}`}>
                                                    <Icon className="h-3.5 w-3.5" />
                                                </div>
                                                <div className="flex flex-col gap-1 -mt-0.5">
                                                    <p className="text-sm font-medium text-navy">{item.text}</p>
                                                    <p className="text-xs text-text-muted">{item.time}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
