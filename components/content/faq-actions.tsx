"use client"

import { MoreHorizontal, Pencil, Trash, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FaqItem, deleteFaqItem, toggleFaqItemPublished } from "@/lib/actions/faq"
import { FaqDialog } from "./faq-dialog"

export function FaqActions({ item }: { item: FaqItem }) {
    const router = useRouter()

    async function handleToggle() {
        try {
            await toggleFaqItemPublished(item.id, !item.is_published)
            router.refresh()
            toast.success("Status updated")
        } catch {
            toast.error("Error updating status")
        }
    }

    async function handleDelete() {
        if (!confirm("Delete this FAQ?")) return
        try {
            await deleteFaqItem(item.id)
            router.refresh()
            toast.success("FAQ deleted")
        } catch {
            toast.error("Error deleting FAQ")
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

                {/* Trick to nest Dialog trigger inside Dropdown */}
                <span onClick={(e) => e.preventDefault()}>
                    <FaqDialog
                        initialData={item}
                        trigger={
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                        }
                    />
                </span>

                <DropdownMenuItem onClick={handleToggle}>
                    {item.is_published ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                    {item.is_published ? "Unpublish" : "Publish"}
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
