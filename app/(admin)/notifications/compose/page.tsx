"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Send, Loader2, Users, Search, CheckCircle2, ArrowLeft, MessageSquare, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { composeNotification } from "@/lib/actions/notifications"
import { getContacts, type Contact } from "@/lib/actions/contacts"

export default function ComposeNotificationPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [contacts, setContacts] = useState<Contact[]>([])
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
    const [searchTerm, setSearchTerm] = useState("")
    const [loadingContacts, setLoadingContacts] = useState(true)
    const router = useRouter()

    // Form State
    const [channel, setChannel] = useState<"sms" | "email">("sms")
    const [recipientMode, setRecipientMode] = useState<"all" | "type" | "select">("all")
    const [recipientType, setRecipientType] = useState("staff")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")

    // Load contacts
    useEffect(() => {
        async function loadContacts() {
            setLoadingContacts(true)
            try {
                const result = await getContacts(1, 500) // Load up to 500 contacts
                setContacts(result.contacts)
                setFilteredContacts(result.contacts)
            } catch {
                toast.error("Failed to load contacts")
            } finally {
                setLoadingContacts(false)
            }
        }
        loadContacts()
    }, [])

    // Filter contacts based on search and channel
    useEffect(() => {
        let filtered = contacts

        // Filter by channel capability
        if (channel === 'sms') {
            filtered = filtered.filter(c => c.phone && (c.notification_pref === 'sms' || c.notification_pref === 'both'))
        } else {
            filtered = filtered.filter(c => c.email && (c.notification_pref === 'email' || c.notification_pref === 'both'))
        }

        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase()
            filtered = filtered.filter(c =>
                c.first_name.toLowerCase().includes(term) ||
                c.last_name.toLowerCase().includes(term) ||
                c.email?.toLowerCase().includes(term) ||
                c.phone?.includes(term)
            )
        }

        setFilteredContacts(filtered)
    }, [contacts, channel, searchTerm])

    // Toggle contact selection
    function toggleContact(id: string) {
        const newSelected = new Set(selectedIds)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedIds(newSelected)
    }

    // Select all visible contacts
    function selectAllVisible() {
        const newSelected = new Set(selectedIds)
        filteredContacts.forEach(c => newSelected.add(c.id))
        setSelectedIds(newSelected)
    }

    // Clear selection
    function clearSelection() {
        setSelectedIds(new Set())
    }

    // Select by type
    function selectByType(type: string) {
        const newSelected = new Set(selectedIds)
        filteredContacts.filter(c => c.type === type).forEach(c => newSelected.add(c.id))
        setSelectedIds(newSelected)
    }

    async function handleSend() {
        if (!body) return toast.error("Message body is required")
        if (channel === "email" && !subject) return toast.error("Subject is required for emails")

        if (recipientMode === 'select' && selectedIds.size === 0) {
            return toast.error("Please select at least one contact")
        }

        setIsLoading(true)
        try {
            const result = await composeNotification({
                channel,
                body,
                subject: channel === 'email' ? subject : undefined,
                recipientFilter: recipientMode === 'select'
                    ? { ids: Array.from(selectedIds) }
                    : recipientMode === 'type'
                        ? { type: recipientType as 'staff' | 'client' | 'vendor' | 'referral_source' | 'other' }
                        : { type: 'all' }
            })

            if (result.success) {
                toast.success(`Successfully queued ${result.queuedCount} notifications.`)
                router.push('/notifications/history')
            } else {
                toast.error("Failed to send", { description: result.error })
            }
        } catch {
            toast.error("System Error")
        } finally {
            setIsLoading(false)
        }
    }

    // Count eligible contacts
    const eligibleCount = recipientMode === 'select'
        ? selectedIds.size
        : recipientMode === 'type'
            ? filteredContacts.filter(c => c.type === recipientType).length
            : filteredContacts.length

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-navy/5">
                    <ArrowLeft className="h-5 w-5 text-navy" />
                </Button>
                <div>
                    <h1 className="text-2xl font-display font-bold text-navy tracking-tight">Compose Notification</h1>
                    <p className="text-text-muted text-sm">Send a new message to your network.</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Left: Message Composition */}
                <Card className="border-none shadow-md shadow-navy/5 flex flex-col h-full">
                    <CardHeader className="pb-3 border-b border-navy/5">
                        <CardTitle className="flex items-center gap-2 text-navy">
                            <span className="p-2 bg-navy/5 rounded-lg">
                                {channel === 'sms' ? <MessageSquare className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
                            </span>
                            Message Details
                        </CardTitle>
                        <CardDescription>Compose your {channel.toUpperCase()} notification.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6 flex-1">
                        <div className="space-y-2">
                            <Label className="text-navy font-semibold">Channel</Label>
                            <Select value={channel} onValueChange={(v: "sms" | "email") => setChannel(v)}>
                                <SelectTrigger className="bg-bg-base/50 focus:bg-white transition-colors h-12">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sms">SMS (Text Message)</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {channel === 'email' && (
                            <div className="space-y-2">
                                <Label className="text-navy font-semibold">Subject</Label>
                                <Input
                                    placeholder="e.g. Important Service Update"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="bg-bg-base/50 focus:bg-white transition-colors"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label className="text-navy font-semibold">Message Body</Label>
                            <Textarea
                                className="h-48 resize-none bg-bg-base/50 focus:bg-white transition-colors p-4"
                                placeholder={channel === 'sms' ? "Keep it short (160 chars ideal)..." : "Write your message here..."}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            {channel === 'sms' && (
                                <div className="flex justify-end">
                                    <span className={`text-xs font-mono font-medium px-2 py-1 rounded-full ${body.length > 160 ? 'bg-red-100 text-red-600' : 'bg-navy/5 text-navy/60'
                                        }`}>
                                        {body.length} / 160 {body.length > 160 && '(multi-part)'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Right: Recipient Selection */}
                <Card className="border-none shadow-md shadow-navy/5 flex flex-col h-full">
                    <CardHeader className="pb-3 border-b border-navy/5">
                        <CardTitle className="flex items-center gap-2 text-navy">
                            <span className="p-2 bg-navy/5 rounded-lg">
                                <Users className="h-5 w-5" />
                            </span>
                            Recipients
                        </CardTitle>
                        <CardDescription>
                            Choose who receives this notification.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6 flex-1">
                        <div className="space-y-2">
                            <Label className="text-navy font-semibold">Send To</Label>
                            <Select value={recipientMode} onValueChange={(v: "all" | "type" | "select") => setRecipientMode(v)}>
                                <SelectTrigger className="bg-bg-base/50 focus:bg-white transition-colors h-12">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Eligible Contacts</SelectItem>
                                    <SelectItem value="type">By Contact Type</SelectItem>
                                    <SelectItem value="select">Select Individually</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {recipientMode === 'type' && (
                            <div className="space-y-2">
                                <Label className="text-navy font-semibold">Contact Type</Label>
                                <Select value={recipientType} onValueChange={setRecipientType}>
                                    <SelectTrigger className="bg-bg-base/50 focus:bg-white transition-colors">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="staff">Staff Only</SelectItem>
                                        <SelectItem value="client">Clients Only</SelectItem>
                                        <SelectItem value="vendor">Vendors Only</SelectItem>
                                        <SelectItem value="referral_source">Referral Sources</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {recipientMode === 'select' && (
                            <div className="space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search contacts..."
                                        className="pl-9 bg-bg-base/50 focus:bg-white transition-colors"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Button type="button" variant="outline" size="sm" onClick={selectAllVisible} className="text-xs h-7">
                                        Select All
                                    </Button>
                                    <Button type="button" variant="outline" size="sm" onClick={() => selectByType('staff')} className="text-xs h-7">
                                        + Staff
                                    </Button>
                                    <Button type="button" variant="outline" size="sm" onClick={() => selectByType('client')} className="text-xs h-7">
                                        + Clients
                                    </Button>
                                    <Button type="button" variant="ghost" size="sm" onClick={clearSelection} className="text-xs h-7 text-red-500 hover:text-red-700 hover:bg-red-50">
                                        Clear
                                    </Button>
                                </div>

                                <ScrollArea className="h-[250px] rounded-md border border-navy/10 p-2 bg-bg-base/30">
                                    {loadingContacts ? (
                                        <div className="flex items-center justify-center h-full text-muted-foreground flex-col gap-2">
                                            <Loader2 className="h-6 w-6 animate-spin text-navy/40" />
                                            <span className="text-sm">Loading contacts...</span>
                                        </div>
                                    ) : filteredContacts.length === 0 ? (
                                        <div className="text-center text-muted-foreground py-10 flex flex-col items-center gap-2">
                                            <Users className="h-8 w-8 text-navy/20" />
                                            <span className="text-sm">No eligible contacts found.</span>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {filteredContacts.map((contact) => (
                                                <label
                                                    key={contact.id}
                                                    className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${selectedIds.has(contact.id)
                                                            ? 'bg-navy/10 border-navy/20'
                                                            : 'hover:bg-white hover:shadow-sm border border-transparent'
                                                        }`}
                                                >
                                                    <Checkbox
                                                        checked={selectedIds.has(contact.id)}
                                                        onCheckedChange={() => toggleContact(contact.id)}
                                                        className="data-[state=checked]:bg-navy data-[state=checked]:border-navy"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-navy truncate">
                                                            {contact.first_name} {contact.last_name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground truncate">
                                                            {channel === 'sms' ? contact.phone : contact.email}
                                                        </p>
                                                    </div>
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${contact.type === 'staff' ? 'bg-navy/10 text-navy' : 'bg-gold/20 text-navy'
                                                        }`}>
                                                        {contact.type}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </ScrollArea>
                            </div>
                        )}

                        {/* Recipient Count Summary */}
                        <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl mt-auto">
                            <div className="bg-white p-2 rounded-full shadow-sm text-green-600">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <span className="text-sm font-medium text-navy block">
                                    Ready to send
                                </span>
                                <span className="text-xs text-muted-foreground block">
                                    <strong>{eligibleCount}</strong> recipient{eligibleCount !== 1 ? 's' : ''} selected
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => router.back()} className="rounded-full px-8 h-12">Cancel</Button>
                <Button
                    onClick={handleSend}
                    disabled={isLoading || eligibleCount === 0}
                    className="bg-navy hover:bg-navy/90 text-white rounded-full px-8 h-12 shadow-lg shadow-navy/20 text-base font-semibold"
                >
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                    Send Notification
                </Button>
            </div>
        </div>
    )
}
