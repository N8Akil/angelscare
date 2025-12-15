import { Plus, HelpCircle } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { getFaqItems } from "@/lib/actions/faq"
import { FaqDialog } from "@/components/content/faq-dialog"
import { FaqActions } from "@/components/content/faq-actions"

export default async function FaqPage() {
    const { items } = await getFaqItems(1, 100)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-display font-bold text-navy tracking-tight">FAQ Manager</h1>
                    <p className="text-text-muted mt-1">Curate frequently asked questions for the website.</p>
                </div>
                <div className="shadow-md shadow-navy/20 rounded-full">
                    <FaqDialog />
                </div>
            </div>

            <Card className="border-none shadow-md shadow-navy/5 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-navy/5 hover:bg-navy/5 border-navy/10">
                            <TableHead className="w-[100px] font-bold text-navy">Status</TableHead>
                            <TableHead className="font-bold text-navy">Category</TableHead>
                            <TableHead className="max-w-[400px] font-bold text-navy">Question</TableHead>
                            <TableHead className="text-right font-bold text-navy">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-64 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="rounded-full bg-navy/5 p-4 mb-2">
                                            <HelpCircle className="h-8 w-8 text-navy/40" />
                                        </div>
                                        <p className="font-medium text-navy">No FAQs found</p>
                                        <p className="text-sm text-text-muted">Start by adding your first question.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item) => (
                                <TableRow key={item.id} className="hover:bg-navy/5 border-navy/10 transition-colors">
                                    <TableCell>
                                        <Badge variant={item.is_published ? "outline" : "secondary"} className={item.is_published ? "border-green-600 text-green-700 bg-green-50" : "bg-bg-base text-navy/60"}>
                                            {item.is_published ? "Published" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="capitalize font-medium text-navy/80">{item.category || "General"}</TableCell>
                                    <TableCell className="font-medium text-navy">{item.question}</TableCell>
                                    <TableCell className="text-right">
                                        <FaqActions item={item} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
