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
import { createFaqItem, updateFaqItem } from "@/lib/actions/faq"

interface FaqDialogProps {
    // If provided, we are in Edit mode
    initialData?: any
    trigger?: React.ReactNode
}

export function FaqDialog({ initialData, trigger }: FaqDialogProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const isEdit = !!initialData

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const data = {
            question: formData.get('question') as string,
            answer: formData.get('answer') as string,
            category: formData.get('category') as string,
        }

        try {
            let result
            if (isEdit) {
                result = await updateFaqItem(initialData.id, data)
            } else {
                result = await createFaqItem(data)
            }

            if (result.success) {
                toast.success(isEdit ? "FAQ Updated" : "FAQ Created")
                setIsOpen(false)
                router.refresh()
            } else {
                toast.error("Error", { description: result.error })
            }
        } catch {
            toast.error("Error", { description: "An unexpected error occurred." })
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
                        Add FAQ
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
                    <DialogDescription>
                        Frequently asked questions.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="question">Question</Label>
                        <Input id="question" name="question" defaultValue={initialData?.question} required />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="answer">Answer</Label>
                        <Textarea id="answer" name="answer" defaultValue={initialData?.answer} required className="h-32" />
                    </div>

                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="category">Category</Label>
                        <Select name="category" defaultValue={initialData?.category || "general"}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="services">Services</SelectItem>
                                <SelectItem value="billing">Billing/Insurance</SelectItem>
                                <SelectItem value="employment">Employment</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEdit ? "Save Changes" : "Create"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
