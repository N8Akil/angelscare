import Link from "next/link"
import { Send, History, Bell, Users, Mail, MessageSquare, AlertCircle, CheckCircle2, Settings } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getQueueStats, getNotificationProviderStatus } from "@/lib/actions/notifications"

export const dynamic = 'force-dynamic'

export default async function NotificationsPage() {
    const stats = await getQueueStats()
    const providerStatus = await getNotificationProviderStatus()

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
            <Card className="border-none shadow-md shadow-navy/5">
                <CardHeader className="pb-3 border-b border-navy/5">
                    <CardTitle className="flex items-center gap-2 text-navy">
                        <Settings className="h-5 w-5" />
                        Provider Configuration
                    </CardTitle>
                    <CardDescription>
                        Status of your email and SMS delivery providers
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {/* Email Provider */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-base/50 border border-navy/5">
                            <div className={`p-3 rounded-xl ${providerStatus.email.configured ? 'bg-green-100' : 'bg-amber-100'}`}>
                                <Mail className={`h-6 w-6 ${providerStatus.email.configured ? 'text-green-600' : 'text-amber-600'}`} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-navy">Email</p>
                                <p className="text-sm text-text-muted">
                                    Provider: <span className="font-medium text-navy">{providerStatus.email.provider.toUpperCase()}</span>
                                </p>
                            </div>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                providerStatus.email.configured
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-amber-100 text-amber-800'
                            }`}>
                                {providerStatus.email.configured ? 'Active' : 'Mock Mode'}
                            </span>
                        </div>

                        {/* SMS Provider */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-base/50 border border-navy/5">
                            <div className={`p-3 rounded-xl ${providerStatus.sms.configured ? 'bg-green-100' : 'bg-amber-100'}`}>
                                <MessageSquare className={`h-6 w-6 ${providerStatus.sms.configured ? 'text-green-600' : 'text-amber-600'}`} />
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-navy">SMS</p>
                                <p className="text-sm text-text-muted">
                                    Provider: <span className="font-medium text-navy">{providerStatus.sms.provider.toUpperCase()}</span>
                                </p>
                            </div>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                providerStatus.sms.configured
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-amber-100 text-amber-800'
                            }`}>
                                {providerStatus.sms.configured ? 'Active' : 'Mock Mode'}
                            </span>
                        </div>
                    </div>

                    {(!providerStatus.email.configured || !providerStatus.sms.configured) && (
                        <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-200">
                            <p className="text-sm text-amber-800">
                                <strong>Mock Mode:</strong> Notifications are being logged to console but not actually sent.
                                Configure your provider credentials in <code className="bg-amber-100 px-1 rounded">.env.local</code> to enable real delivery.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
