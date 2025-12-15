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
import { ContactTypeFilter } from "@/components/admin/contact-type-filter"
import { DeleteContactButton } from "@/components/admin/delete-contact-button"

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
                <div>
                    <h1 className="text-3xl font-display font-bold text-navy tracking-tight">Contacts</h1>
                    <p className="text-text-muted mt-1">Manage your clients, staff, and vendors.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div><ImportContactsDialog /></div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Upload .xlsx or .csv files to bulk add contacts.</p>
                        </TooltipContent>
                    </Tooltip>

                    <Button className="gap-2 bg-navy text-white hover:bg-navy/90 rounded-full shadow-md shadow-navy/20 px-6" asChild>
                        <Link href="/contacts/add">
                            <Plus className="h-4 w-4 text-gold" />
                            Add Contact
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Search and Filter Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <form className="flex items-center gap-2 flex-1">
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
                    {/* Preserve type filter in search */}
                    {type && <input type="hidden" name="type" value={type} />}
                    <Button type="submit" variant="secondary">Search</Button>
                </form>

                {/* Type Filter Dropdown */}
                <ContactTypeFilter currentType={type} currentSearch={search} />
            </div>

            <div className="rounded-md border bg-background">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-navy/10">
                            <TableHead className="w-[250px] font-bold text-navy">Name</TableHead>
                            <TableHead className="font-bold text-navy">Email</TableHead>
                            <TableHead className="font-bold text-navy">Phone</TableHead>
                            <TableHead className="font-bold text-navy">Type</TableHead>
                            <TableHead className="font-bold text-navy">Notify Via</TableHead>
                            <TableHead className="text-right font-bold text-navy">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contacts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center text-muted-foreground bg-white/50">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="h-12 w-12 rounded-full bg-navy/5 flex items-center justify-center mb-2">
                                            <Search className="h-6 w-6 text-navy/40" />
                                        </div>
                                        <p className="font-medium text-navy">No contacts found</p>
                                        <p className="text-sm text-text-muted">Get started by adding a new contact.</p>
                                        <Button variant="link" asChild className="text-navy font-bold mt-2">
                                            <Link href="/contacts/add">Add Contact</Link>
                                        </Button>
                                    </div>
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
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${contact.type === 'staff'
                                                ? 'bg-navy/10 text-navy'
                                                : contact.type === 'client'
                                                    ? 'bg-gold/10 text-navy border border-gold/20'
                                                    : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {contact.type.charAt(0).toUpperCase() + contact.type.slice(1).replace('_', ' ')}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-xs text-muted-foreground">
                                            {contact.notification_pref === 'both' ? 'SMS & Email' :
                                                contact.notification_pref === 'sms' ? 'SMS' :
                                                    contact.notification_pref === 'email' ? 'Email' : 'None'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/contacts/${contact.id}/edit`}>Edit</Link>
                                            </Button>
                                            <DeleteContactButton
                                                contactId={contact.id}
                                                contactName={`${contact.first_name} ${contact.last_name}`}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between py-4">
                <p className="text-sm text-muted-foreground">
                    Showing {contacts.length} of {total} contacts
                    {type && <span className="ml-1">(filtered by {type})</span>}
                </p>
                {totalPages > 1 && (
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={page <= 1}
                            asChild={page > 1}
                        >
                            {page > 1 ? (
                                <Link href={`/contacts?page=${page - 1}${search ? `&search=${search}` : ''}${type ? `&type=${type}` : ''}`}>
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
                                <Link href={`/contacts?page=${page + 1}${search ? `&search=${search}` : ''}${type ? `&type=${type}` : ''}`}>
                                    Next
                                </Link>
                            ) : (
                                'Next'
                            )}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
