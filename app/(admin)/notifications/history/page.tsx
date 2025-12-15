import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { History, Mail, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"

import { getNotificationLogs } from "@/lib/actions/notifications"

export default async function NotificationHistoryPage() {
    const { logs: notifications } = await getNotificationLogs(1, 100)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-navy tracking-tight">Notification History</h1>
                    <p className="text-text-muted mt-1">Audit log of all sent messages.</p>
                </div>
            </div>

            <Card className="border-none shadow-md shadow-navy/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-navy/5 hover:bg-navy/5 border-navy/10">
                            <TableHead className="w-[100px] font-bold text-navy">Status</TableHead>
                            <TableHead className="font-bold text-navy">Channel</TableHead>
                            <TableHead className="font-bold text-navy">Recipient</TableHead>
                            <TableHead className="max-w-[400px] font-bold text-navy">Content</TableHead>
                            <TableHead className="font-bold text-navy">Sent At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {notifications.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-64 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="rounded-full bg-navy/5 p-4 mb-2">
                                            <History className="h-8 w-8 text-navy/40" />
                                        </div>
                                        <p className="font-medium text-navy">No notification history found</p>
                                        <p className="text-sm text-text-muted">Sent messages will form an audit trail here.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            notifications.map((n) => (
                                <TableRow key={n.id} className="hover:bg-navy/5 border-navy/10 transition-colors">
                                    <TableCell>
                                        <Badge variant={n.status === 'sent' ? 'default' : n.status === 'failed' ? 'destructive' : 'secondary'}
                                            className={n.status === 'sent' ? 'bg-green-600 hover:bg-green-700' :
                                                n.status === 'failed' ? 'bg-red-600' : 'bg-bg-base text-navy/60'}>
                                            {n.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-navy font-medium">
                                            {n.channel === 'sms' ? <MessageSquare className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                                            <span className="capitalize">{n.channel}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-navy">{n.admin_name || 'System'}</TableCell>
                                    <TableCell className="max-w-[400px] truncate text-muted-foreground">
                                        {n.subject ? <span className="font-bold text-navy block">{n.subject}</span> : null}
                                        {n.body}
                                    </TableCell>
                                    <TableCell className="text-navy/60 text-sm">
                                        {new Date(n.sent_at).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
