import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { getPublishedFaqItems, getFaqCategories } from "@/lib/actions/faq"

export default async function FaqPage() {
    const [items, categories] = await Promise.all([
        getPublishedFaqItems(),
        getFaqCategories()
    ])

    // Group items by category, matching the logic in the prompt
    // Ideally the backend might return this grouped, but client-side group is fine for now
    const grouped: { category: string; items: typeof items }[] = []

    // First, handle known categories
    categories.forEach(cat => {
        const catItems = items.filter(i => i.category === cat)
        if (catItems.length) {
            grouped.push({ category: cat, items: catItems })
        }
    })

    // Then handle uncategorized or "general" fallback if not in list
    const others = items.filter(i => !i.category || !categories.includes(i.category))
    if (others.length) {
        // If "general" already exists, append? Or just allow another block.
        // Let's just add it as "General Questions"
        grouped.push({ category: "General Questions", items: others })
    }

    return (
        <div className="flex flex-col min-h-screen pb-24">
            <div className="bg-muted/30 py-24 text-center mb-12">
                <div className="container px-4">
                    <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Find answers to common questions about home health care and our services.
                    </p>
                </div>
            </div>

            <div className="container px-4 max-w-4xl mx-auto">
                {grouped.length === 0 ? (
                    <div className="text-center py-12">
                        <p>No FAQs available at the moment.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {grouped.map((group) => (
                            <div key={group.category}>
                                <h2 className="text-2xl font-bold mb-6 text-primary capitalize">{group.category}</h2>
                                <Accordion type="single" collapsible className="w-full">
                                    {group.items.map((item) => (
                                        <AccordionItem key={item.id} value={item.id}>
                                            <AccordionTrigger className="text-left font-medium text-lg">
                                                {item.question}
                                            </AccordionTrigger>
                                            <AccordionContent className="text-muted-foreground whitespace-pre-line text-base">
                                                {item.answer}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
