"use client"

import { MoreHorizontal, FileText, CheckCircle, XCircle, Trash } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { toggleTestimonialPublished, deleteTestimonial, Testimonial } from "@/lib/actions/testimonials"

export function TestimonialActions({ testimonial }: { testimonial: Testimonial }) {
    const router = useRouter()

    async function handleToggle() {
        try {
            const result = await toggleTestimonialPublished(testimonial.id, !testimonial.is_published)
            if (result.success) {
                toast.success(testimonial.is_published ? "Testimonial hidden" : "Testimonial approved")
                router.refresh()
            } else {
                toast.error("Failed to update status")
            }
        } catch {
            toast.error("Error updating status")
        }
    }

    async function handleDelete() {
        if (!confirm("Are you sure you want to delete this testimonial?")) return
        try {
            const result = await deleteTestimonial(testimonial.id)
            if (result.success) {
                toast.success("Testimonial deleted")
                router.refresh()
            } else {
                toast.error("Failed to delete")
            }
        } catch {
            toast.error("Error deleting testimonial")
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleToggle}>
                    {testimonial.is_published ? (
                        <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject / Hide
                        </>
                    ) : (
                        <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve / Publish
                        </>
                    )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
