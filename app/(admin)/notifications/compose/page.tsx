"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Send, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { composeNotification } from "@/lib/actions/notifications"

export default function ComposeNotificationPage() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    // Form State
    const [channel, setChannel] = useState<"sms" | "email">("sms")
    const [recipientType, setRecipientType] = useState("all")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")

    async function handleSend() {
        if (!body) return toast.error("Message body is required")
        if (channel === "email" && !subject) return toast.error("Subject is required for emails")

        setIsLoading(true)
        try {
            const result = await composeNotification({
                channel,
                body,
                subject: channel === 'email' ? subject : undefined,
                recipientFilter: {
                    type: recipientType as any // cast to enum
                }
            })

            if (result.success) {
                toast.success(`Succesfully queued ${result.queuedCount} notifications.`)
                router.push('/admin/notifications/history')
            } else {
                toast.error("Failed to send", { description: result.error })
            }
        } catch {
            toast.error("System Error")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Compose Notification</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>New Message</CardTitle>
                    <CardDescription>Send SMS or Email updates to your contacts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Channel</Label>
                        <Select value={channel} onValueChange={(v: any) => setChannel(v)}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sms">SMS (Text Message)</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Recipients</Label>
                        <Select value={recipientType} onValueChange={setRecipientType}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Contacts</SelectItem>
                                <SelectItem value="staff">Staff Only</SelectItem>
                                <SelectItem value="client">Clients Only</SelectItem>
                                <SelectItem value="vendor">Vendors</SelectItem>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            Only contacts with valid {channel === 'sms' ? 'phone numbers' : 'emails'} and correct preferences will receive this.
                        </p>
                    </div>

                    {channel === 'email' && (
                        <div className="space-y-2">
                            <Label>Subject</Label>
                            <Input
                                placeholder="e.g. Important Service Update"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label>Message Body</Label>
                        <Textarea
                            className="h-32"
                            placeholder={channel === 'sms' ? "Keep it short..." : "Write your message here..."}
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        {channel === 'sms' && (
                            <p className="text-xs text-muted-foreground text-right">{body.length} characters</p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button onClick={handleSend} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        Send Notification
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
