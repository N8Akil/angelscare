import { getPublishedGalleryItems } from "@/lib/actions/gallery"

export default async function GalleryPage() {
    const items = await getPublishedGalleryItems()

    return (
        <div className="min-h-screen pb-24">
            <div className="bg-muted/30 py-24 text-center mb-12">
                <div className="container px-4">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4">Our Community</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Moments of care, connection, and celebration at Angels Care.
                    </p>
                </div>
            </div>

            <div className="container px-4">
                {items.length === 0 ? (
                    <div className="text-center py-24">
                        <p className="text-muted-foreground">Gallery coming soon.</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {items.map((item) => (
                            <div key={item.id} className="relative break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                {item.media_type === 'video' ? (
                                    <video
                                        src={item.file_path}
                                        controls
                                        className="w-full h-auto"
                                        poster={item.thumbnail_path || undefined}
                                    />
                                ) : (
                                    <img
                                        src={item.file_path}
                                        alt={item.alt_text || item.title || "Gallery Image"}
                                        className="w-full h-auto object-cover"
                                        loading="lazy"
                                    />
                                )}
                                {(item.title || item.description) && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                                        {item.title && <h3 className="font-bold text-lg">{item.title}</h3>}
                                        {item.description && <p className="text-sm text-white/90">{item.description}</p>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
