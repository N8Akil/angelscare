"use client"

import { MoreHorizontal, Pencil, Trash, Copy, Power, PowerOff } from "lucide-react"
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

import { JobPosting, deleteJobPosting, toggleJobPostingActive, duplicateJobPosting } from "@/lib/actions/jobs"
import { JobDialog } from "./job-dialog"

export function JobActions({ job }: { job: JobPosting }) {
    const router = useRouter()

    async function handleToggle() {
        try {
            await toggleJobPostingActive(job.id, !job.is_active)
            router.refresh()
            toast.success(job.is_active ? "Job closed" : "Job activated")
        } catch {
            toast.error("Error updating status")
        }
    }

    async function handleDuplicate() {
        try {
            const result = await duplicateJobPosting(job.id)
            if (result.success) {
                toast.success("Job duplicated", { description: "Created as 'Inactive' copy." })
                router.refresh()
            } else {
                toast.error("Failed to duplicate")
            }
        } catch {
            toast.error("Error duplicating job")
        }
    }

    async function handleDelete() {
        if (!confirm("Are you sure?")) return
        try {
            await deleteJobPosting(job.id)
            router.refresh()
            toast.success("Job deleted")
        } catch {
            toast.error("Error deleting job")
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

                <span onClick={(e) => e.preventDefault()}>
                    <JobDialog
                        initialData={job}
                        trigger={
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Pencil className="mr-2 h-4 w-4" /> Edit Details
                            </DropdownMenuItem>
                        }
                    />
                </span>

                <DropdownMenuItem onClick={handleDuplicate}>
                    <Copy className="mr-2 h-4 w-4" />
                    Duplicate
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleToggle}>
                    {job.is_active ? <PowerOff className="mr-2 h-4 w-4" /> : <Power className="mr-2 h-4 w-4" />}
                    {job.is_active ? "Close / Deactivate" : "Activate"}
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
