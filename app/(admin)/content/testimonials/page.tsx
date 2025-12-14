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
import { MoreHorizontal, FileText } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { getTestimonials } from "@/lib/actions/testimonials"
import { TestimonialActions } from "@/components/content/testimonial-actions"

export default async function TestimonialsPage() {
    const { testimonials } = await getTestimonials(1, 100)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead className="max-w-[400px]">Content</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                                    No testimonials found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            testimonials.map((t) => (
                                <TableRow key={t.id}>
                                    <TableCell>
                                        <Badge variant={t.is_published ? "default" : "secondary"}>
                                            {t.is_published ? "Approved" : "Pending"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-medium">{t.client_name}</TableCell>
                                    <TableCell className="max-w-[400px] truncate text-muted-foreground">
                                        {t.content}
                                    </TableCell>
                                    <TableCell>{t.rating ? "⭐".repeat(t.rating) : "-"}</TableCell>
                                    <TableCell className="capitalize">{t.source}</TableCell>
                                    <TableCell className="text-right">
                                        <TestimonialActions testimonial={t} />
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
