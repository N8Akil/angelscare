import { AdminContactForm } from "@/components/forms/admin-contact-form"

export const metadata = {
    title: "Add Contact | Angel's Care Admin",
}

export default function AddContactPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Add New Contact</h1>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                <AdminContactForm />
            </div>
        </div>
    )
}
