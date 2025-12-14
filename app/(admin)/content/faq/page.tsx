import { Plus } from "lucide-react"

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

import { getFaqItems } from "@/lib/actions/faq"
import { FaqDialog } from "@/components/content/faq-dialog"
import { FaqActions } from "@/components/content/faq-actions"

export default async function FaqPage() {
    const { items } = await getFaqItems(1, 100)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">FAQ</h1>
                <FaqDialog />
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="max-w-[400px]">Question</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No FAQs found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Badge variant={item.is_published ? "outline" : "secondary"}>
                                            {item.is_published ? "Published" : "Draft"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="capitalize">{item.category || "General"}</TableCell>
                                    <TableCell className="font-medium">{item.question}</TableCell>
                                    <TableCell className="text-right">
                                        <FaqActions item={item} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
