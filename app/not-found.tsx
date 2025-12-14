import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4 text-primary">Page Not Found</h2>
            <p className="text-lg text-muted-foreground mb-8">Could not find requested resource.</p>
            <Button asChild size="lg">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    )
}
