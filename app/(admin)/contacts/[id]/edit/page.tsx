import { notFound } from "next/navigation"
import { getContactById } from "@/lib/actions/contacts"
import { AdminContactForm } from "@/components/forms/admin-contact-form"
import { AdminContactValues } from "@/lib/schemas"

interface EditContactPageProps {
    params: Promise<{
        id: string
    }>
}

export const metadata = {
    title: "Edit Contact | Angel's Care Admin",
}

export default async function EditContactPage({ params }: EditContactPageProps) {
    const { id } = await params
    const contact = await getContactById(id)

    if (!contact) {
        notFound()
    }

    // Transform DB contact to form values
    // We need to ensure types match the schema enum values
    const initialData: AdminContactValues = {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email || "",
        phone: contact.phone || "",
        type: contact.type as any, // Cast to enum type. DB should enforce this, but just in case.
        notification_pref: contact.notification_pref as any,
        city: contact.city || "",
        state: contact.state || "MO",
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Edit Contact</h1>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <AdminContactForm contactId={id} initialData={initialData} />
            </div>
        </div>
    )
}
