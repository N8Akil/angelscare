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
import { MoreHorizontal, FileText, Search } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"

import { getTestimonials } from "@/lib/actions/testimonials"
import { TestimonialActions } from "@/components/content/testimonial-actions"

export default async function TestimonialsPage() {
    const { testimonials } = await getTestimonials(1, 100)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-navy tracking-tight">Testimonials</h1>
                    <p className="text-text-muted mt-1">Manage client reviews and website testimonials.</p>
                </div>
            </div>

            <Card className="border-none shadow-md shadow-navy/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-navy/5 hover:bg-navy/5 border-navy/10">
                            <TableHead className="w-[100px] font-bold text-navy">Status</TableHead>
                            <TableHead className="font-bold text-navy">Client</TableHead>
                            <TableHead className="max-w-[400px] font-bold text-navy">Content</TableHead>
                            <TableHead className="font-bold text-navy">Rating</TableHead>
                            <TableHead className="font-bold text-navy">Source</TableHead>
                            <TableHead className="text-right font-bold text-navy">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="rounded-full bg-navy/5 p-4 mb-2">
                                            <FileText className="h-8 w-8 text-navy/40" />
                                        </div>
                                        <p className="font-medium text-navy">No testimonials found</p>
                                        <p className="text-sm text-text-muted">New reviews will appear here.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            testimonials.map((t) => (
                                <TableRow key={t.id} className="hover:bg-navy/5 border-navy/10 transition-colors">
                                    <TableCell>
                                        <Badge variant={t.is_published ? "default" : "secondary"} className={t.is_published ? "bg-green-600 hover:bg-green-700" : "bg-bg-base text-navy hover:bg-bg-base/80"}>
                                            {t.is_published ? "Approved" : "Pending"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium text-navy">{t.client_name}</TableCell>
                                    <TableCell className="max-w-[400px] truncate text-muted-foreground">
                                        {t.content}
                                    </TableCell>
                                    <TableCell className="text-gold">{t.rating ? "⭐".repeat(t.rating) : "-"}</TableCell>
                                    <TableCell className="capitalize text-navy/70">{t.source}</TableCell>
                                    <TableCell className="text-right">
                                        <TestimonialActions testimonial={t} />
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
