import Link from "next/link"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { getContacts } from "@/lib/actions/contacts"
import { ImportContactsDialog } from "@/components/admin/import-dialog"

interface ContactsPageProps {
    searchParams: Promise<{ page?: string; search?: string; type?: string }>
}

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
    const params = await searchParams
    const page = parseInt(params.page || '1', 10)
    const search = params.search || undefined
    const type = params.type || undefined

    const { contacts, total, totalPages } = await getContacts(page, 20, search, type)

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold tracking-tight">Contacts</h1>
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div><ImportContactsDialog /></div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Upload .xlsx or .csv files to bulk add contacts.</p>
                        </TooltipContent>
                    </Tooltip>

                    <Button className="gap-2" asChild>
                        <Link href="/admin/contacts/add">
                            <Plus className="h-4 w-4" />
                            Add Contact
                        </Link>
                    </Button>
                </div>
            </div>

            <form className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        name="search"
                        placeholder="Search contacts..."
                        className="pl-8"
                        defaultValue={search}
                    />
                </div>
                <Button type="submit" variant="secondary">Search</Button>
            </form>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No contacts found. <Link href="/admin/contacts/add" className="text-primary underline">Add your first contact</Link> or import from Excel.
                                </TableCell>
                            </TableRow>
                        ) : (
                            contacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell className="font-medium">
                                        {contact.first_name} {contact.last_name}
                                    </TableCell>
                                    <TableCell>{contact.email || '-'}</TableCell>
                                    <TableCell>{contact.phone || '-'}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${contact.type === 'staff'
                                                ? 'border-transparent bg-primary text-primary-foreground'
                                                : 'border-transparent bg-secondary text-secondary-foreground'
                                            }`}>
                                            {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild>
                                            <Link href={`/admin/contacts/${contact.id}/edit`}>Edit</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-between py-4">
                    <p className="text-sm text-muted-foreground">
                        Showing {contacts.length} of {total} contacts
                    </p>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page <= 1}
                            asChild={page > 1}
                        >
                            {page > 1 ? (
                                <Link href={`/admin/contacts?page=${page - 1}${search ? `&search=${search}` : ''}`}>
                                    Previous
                                </Link>
                            ) : (
                                'Previous'
                            )}
                        </Button>
                        <span className="text-sm">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page >= totalPages}
                            asChild={page < totalPages}
                        >
                            {page < totalPages ? (
                                <Link href={`/admin/contacts?page=${page + 1}${search ? `&search=${search}` : ''}`}>
                                    Next
                                </Link>
                            ) : (
                                'Next'
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
