import Link from "next/link"
import { getGalleryItems } from "@/lib/actions/gallery"
import { GalleryGrid } from "@/components/content/gallery-grid"
import { GalleryUploadButton } from "@/components/content/gallery-upload-button"

export default async function GalleryPage() {
    const { items } = await getGalleryItems(1, 100)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-navy tracking-tight">Gallery</h1>
                    <p className="text-text-muted mt-1">Showcase photos of your facilities and events.</p>
                </div>
                <div className="shadow-md shadow-navy/20 rounded-md">
                    <GalleryUploadButton />
                </div>
            </div>

            <GalleryGrid items={items} />
        </div>
    )
}
