"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteContact } from "@/lib/actions/contacts"

interface DeleteContactButtonProps {
    contactId: string
    contactName: string
}

export function DeleteContactButton({ contactId, contactName }: DeleteContactButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    async function handleDelete() {
        setIsDeleting(true)
        try {
            const result = await deleteContact(contactId)
            if (result.success) {
                toast.success("Contact deleted", {
                    description: `${contactName} has been removed.`
                })
                setIsOpen(false)
                router.refresh()
            } else {
                toast.error("Delete failed", {
                    description: result.error
                })
            }
        } catch {
            toast.error("Error", {
                description: "An unexpected error occurred."
            })
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Contact?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <strong>{contactName}</strong>?
                        This action cannot be undone. The contact will no longer receive notifications.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Delete"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
