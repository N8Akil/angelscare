"use client"

import Image from "next/image"
import { Trash, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { GalleryItem, toggleGalleryItemPublished, deleteGalleryItem } from "@/lib/actions/gallery"

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
    const router = useRouter()

    async function handleToggle(id: string, currentStatus: boolean) {
        try {
            await toggleGalleryItemPublished(id, !currentStatus)
            router.refresh()
            toast.success(currentStatus ? "Item hidden" : "Item published")
        } catch {
            toast.error("Failed to update status")
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure? This cannot be undone.")) return
        try {
            await deleteGalleryItem(id)
            router.refresh()
            toast.success("Item deleted")
        } catch {
            toast.error("Failed to delete")
        }
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border rounded-lg border-dashed text-muted-foreground">
                <p>No gallery items yet.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                    <div className="relative aspect-video bg-muted group">
                        {item.media_type === 'video' ? (
                            <div className="flex items-center justify-center h-full text-muted-foreground bg-slate-100">
                                <span className="text-sm font-medium">Video File</span>
                            </div>
                        ) : (
                            // Note: In production we need a real domain for next/image. 
                            // For localhost/filesystem serving, we use the regular img tag or configure domains.
                            // Since Opus served it via Nginx/public, we can try basic img first to avoid config overhead.
                            <img
                                src={item.file_path}
                                alt={item.alt_text || "Gallery Item"}
                                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                            />
                        )}
                        <div className="absolute top-2 right-2">
                            <Badge variant={item.is_published ? "default" : "destructive"}>
                                {item.is_published ? "Visible" : "Hidden"}
                            </Badge>
                        </div>
                    </div>
                    <CardContent className="p-4">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggle(item.id, item.is_published)}
                        >
                            {item.is_published ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                            {item.is_published ? "Hide" : "Show"}
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDelete(item.id)}
                        >
                            <Trash className="h-4 w-4" />
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
