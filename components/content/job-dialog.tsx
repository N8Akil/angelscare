"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Plus, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createJobPosting, updateJobPosting } from "@/lib/actions/jobs"

interface JobDialogProps {
    initialData?: any
    trigger?: React.ReactNode
}

export function JobDialog({ initialData, trigger }: JobDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const isEdit = !!initialData

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const data: any = {
            title: formData.get('title') as string,
            employment_type: formData.get('employment_type') as string,
            location: formData.get('location') as string,
            description: formData.get('description') as string,
            requirements: formData.get('requirements') as string,
            expires_at: formData.get('expires_at') as string,
        }

        // Clean up empty strings
        if (!data.requirements) delete data.requirements
        if (!data.expires_at) delete data.expires_at

        try {
            let result
            if (isEdit) {
                result = await updateJobPosting(initialData.id, data)
            } else {
                result = await createJobPosting(data)
            }

            if (result.success) {
                toast.success(isEdit ? "Job Updated" : "Job Posted")
                setIsOpen(false)
                router.refresh()
            } else {
                toast.error("Error", { description: result.error })
            }
        } catch (e: any) {
            toast.error("Error", { description: e.message || "An unexpected error occurred." })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger ? trigger : (
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Post Job
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit Job Posting" : "Create Job Posting"}</DialogTitle>
                    <DialogDescription>
                        Post a new career opportunity.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Job Title</Label>
                            <Input id="title" name="title" defaultValue={initialData?.title} placeholder="e.g. Registered Nurse" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="employment_type">Type</Label>
                            <Select name="employment_type" defaultValue={initialData?.employment_type || "full-time"}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="full-time">Full-time</SelectItem>
                                    <SelectItem value="part-time">Part-time</SelectItem>
                                    <SelectItem value="contract">Contract (PRN)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" defaultValue={initialData?.location || "St. Louis, MO"} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" name="description" defaultValue={initialData?.description} required className="h-32" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="requirements">Requirements (Optional)</Label>
                        <Textarea id="requirements" name="requirements" defaultValue={initialData?.requirements} className="h-24" placeholder="- Must have RN license..." />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="expires_at">Expiration Date (Optional)</Label>
                        <div className="relative">
                            <Input
                                id="expires_at"
                                name="expires_at"
                                type="date"
                                defaultValue={initialData?.expires_at ? new Date(initialData.expires_at).toISOString().split('T')[0] : ""}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground">Job will automatically close after this date.</p>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEdit ? "Save Changes" : "Post Job"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
