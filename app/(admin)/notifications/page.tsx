import Link from "next/link"
import { Send, History, Bell, Users, Mail, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getQueueStats } from "@/lib/actions/notifications"

export default async function NotificationsPage() {
    const stats = await getQueueStats()

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-navy tracking-tight">Notifications Hub</h1>
                    <p className="text-text-muted mt-1">Manage communications with your staff and clients.</p>
                </div>
                <Button asChild className="bg-navy text-white hover:bg-navy/90 rounded-full shadow-md shadow-navy/20 px-6">
                    <Link href="/notifications/compose">
                        <Send className="mr-2 h-4 w-4 text-gold" />
                        Compose New
                    </Link>
                </Button>
            </div>

            {/* Queue Status Cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border-none shadow-md shadow-navy/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Bell className="w-16 h-16 text-navy" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy/70">Pending</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-display font-bold text-navy">{stats.pending}</div>
                        <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-gold">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                            </span>
                            Awaiting send
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md shadow-navy/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <MessageSquare className="w-16 h-16 text-blue-500" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy/70">Processing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-display font-bold text-navy">{stats.processing}</div>
                        <p className="text-xs text-text-muted mt-1 font-medium">Currently sending</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md shadow-navy/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CheckCircle2 className="w-16 h-16 text-green-500" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy/70">Sent</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-display font-bold text-navy">{stats.sent}</div>
                        <p className="text-xs text-green-600 mt-1 font-bold">Successfully delivered</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md shadow-navy/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertCircle className="w-16 h-16 text-red-500" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-wider text-navy/70">Failed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-display font-bold text-navy">{stats.failed}</div>
                        <p className="text-xs text-red-500 mt-1 font-bold">Needs attention</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-2">
                <Link href="/notifications/compose" className="group">
                    <Card className="h-full border-none shadow-md hover:shadow-xl hover:shadow-navy/10 transition-all duration-300 bg-white group-hover:scale-[1.01]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-navy">
                                <div className="p-2 rounded-lg bg-navy/5 group-hover:bg-navy/10 transition-colors">
                                    <Send className="h-6 w-6 text-navy" />
                                </div>
                                Compose Notification
                            </CardTitle>
                            <CardDescription className="text-text-muted text-base">
                                Send SMS or email updates to your staff, clients, or vendors.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 text-sm font-medium text-navy/60">
                                <span className="flex items-center gap-1.5 bg-bg-base px-3 py-1 rounded-full">
                                    <MessageSquare className="h-4 w-4" /> SMS
                                </span>
                                <span className="flex items-center gap-1.5 bg-bg-base px-3 py-1 rounded-full">
                                    <Mail className="h-4 w-4" /> Email
                                </span>
                                <span className="flex items-center gap-1.5 bg-bg-base px-3 py-1 rounded-full">
                                    <Users className="h-4 w-4" /> Bulk Actions
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/notifications/history" className="group">
                    <Card className="h-full border-none shadow-md hover:shadow-xl hover:shadow-navy/10 transition-all duration-300 bg-white group-hover:scale-[1.01]">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-navy">
                                <div className="p-2 rounded-lg bg-gold/10 group-hover:bg-gold/20 transition-colors">
                                    <History className="h-6 w-6 text-navy" />
                                </div>
                                Notification History
                            </CardTitle>
                            <CardDescription className="text-text-muted text-base">
                                Review past messages, delivery receipts, and communication logs.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-4 text-sm font-medium text-navy/60">
                                <span className="flex items-center gap-1.5 bg-bg-base px-3 py-1 rounded-full">
                                    View sent items
                                </span>
                                <span className="flex items-center gap-1.5 bg-bg-base px-3 py-1 rounded-full">
                                    Track delivery
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            {/* Provider Status Info */}
            <div className="rounded-xl bg-navy/5 border border-navy/10 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                    <h3 className="font-bold text-navy flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        System Configuration
                    </h3>
                    <p className="text-sm text-text-muted">
                        Ensure your email (SendGrid/SMTP) and SMS (Twilio) providers are correctly configured in environment variables.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        System Active
                    </span>
                </div>
            </div>
        </div>
    )
}
