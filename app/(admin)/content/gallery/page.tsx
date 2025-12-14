import Link from "next/link"
import { getGalleryItems } from "@/lib/actions/gallery"
import { GalleryGrid } from "@/components/content/gallery-grid"
import { GalleryUploadButton } from "@/components/content/gallery-upload-button"

export default async function GalleryPage() {
    const { items } = await getGalleryItems(1, 100)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Gallery</h1>
                <GalleryUploadButton />
            </div>

            <GalleryGrid items={items} />
        </div>
    )
}
