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

import { getNotificationLogs } from "@/lib/actions/notifications"

export default async function NotificationHistoryPage() {
    const { logs } = await getNotificationLogs(1, 100)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Notification History</h1>
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead>Channel</TableHead>
                            <TableHead>Target</TableHead>
                            {/* Use first line of body or subject */}
                            <TableHead>Content</TableHead>
                            <TableHead>Recipients</TableHead>
                            <TableHead className="text-right">Sent Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No history found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            logs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell>
                                        <Badge variant={log.status === 'sent' ? "default" : log.status === 'failed' ? "destructive" : "secondary"}>
                                            {log.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="uppercase text-xs font-bold">{log.channel}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {/* Simplistic display of filter. Ideally parse JSON */}
                                        {(log.recipient_filter as any)?.type === 'all' ? 'All Contacts' :
                                            (log.recipient_filter as any)?.type ? `Type: ${(log.recipient_filter as any).type}` : 'Custom'}
                                    </TableCell>
                                    <TableCell className="max-w-[300px] truncate">
                                        {log.subject || log.body}
                                    </TableCell>
                                    <TableCell>{log.recipient_count}</TableCell>
                                    <TableCell className="text-right text-muted-foreground text-sm">
                                        {new Date(log.sent_at || Date.now()).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
