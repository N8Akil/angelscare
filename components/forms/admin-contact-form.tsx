"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Loader2, ArrowLeft, Save, User, Mail, Phone, MapPin, Bell, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

import { adminContactSchema, AdminContactValues } from "@/lib/schemas"
import { createContact, updateContact } from "@/lib/actions/contacts"

interface AdminContactFormProps {
    contactId?: string
    initialData?: AdminContactValues
}

export function AdminContactForm({ contactId, initialData }: AdminContactFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    const form = useForm<AdminContactValues>({
        resolver: zodResolver(adminContactSchema),
        defaultValues: initialData || {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            type: "client",
            notification_pref: "both",
            city: "St. Louis",
            state: "MO",
        },
    })

    async function onSubmit(data: AdminContactValues) {
        setIsSubmitting(true)
        try {
            let result
            if (contactId) {
                result = await updateContact(contactId, data)
            } else {
                result = await createContact(data)
            }

            if (result.success) {
                toast.success(contactId ? "Contact updated" : "Contact created", {
                    description: contactId ? "The contact details have been updated." : "The contact has been added successfully."
                })
                router.push("/contacts")
            } else {
                toast.error("Error", {
                    description: result.error || "Failed to save contact"
                })
            }
        } catch (error) {
            toast.error("System Error", {
                description: "An unexpected error occurred."
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full hover:bg-navy/5">
                    <ArrowLeft className="h-5 w-5 text-navy" />
                </Button>
                <div>
                    <h1 className="text-2xl font-display font-bold text-navy">
                        {contactId ? `Edit Contact` : "Add New Contact"}
                    </h1>
                    <p className="text-text-muted text-sm">{contactId ? "Update contact details and preferences." : "Create a new contact in the system."}</p>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Column 1: Personal Info */}
                        <Card className="md:col-span-2 border-none shadow-md shadow-navy/5">
                            <CardHeader>
                                <div className="flex items-center gap-2 text-navy">
                                    <User className="h-5 w-5" />
                                    <CardTitle>Personal Information</CardTitle>
                                </div>
                                <CardDescription>Basic contact details and identification.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="first_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>First Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John" {...field} className="bg-bg-base/50 focus:bg-white transition-colors" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="last_name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Last Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Doe" {...field} className="bg-bg-base/50 focus:bg-white transition-colors" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input type="email" placeholder="john@example.com" className="pl-9 bg-bg-base/50 focus:bg-white transition-colors" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Phone</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input type="tel" placeholder="(314) 555-0123" className="pl-9 bg-bg-base/50 focus:bg-white transition-colors" {...field} />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="h-px bg-navy/5 my-6" />

                                <div className="flex items-center gap-2 text-navy mb-4 font-semibold text-sm">
                                    <MapPin className="h-4 w-4" />
                                    <span>Location</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="St. Louis" {...field} className="bg-bg-base/50 focus:bg-white transition-colors" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="MO" maxLength={2} {...field} className="bg-bg-base/50 focus:bg-white transition-colors" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Column 2: System Info */}
                        <div className="space-y-6">
                            <Card className="border-none shadow-md shadow-navy/5">
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-navy">
                                        <Briefcase className="h-5 w-5" />
                                        <CardTitle>Role & Type</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-bg-base/50">
                                                            <SelectValue placeholder="Select type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="client">Client</SelectItem>
                                                        <SelectItem value="staff">Staff</SelectItem>
                                                        <SelectItem value="vendor">Vendor</SelectItem>
                                                        <SelectItem value="referral_source">Referral Source</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md shadow-navy/5">
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-navy">
                                        <Bell className="h-5 w-5" />
                                        <CardTitle>Notifications</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="notification_pref"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Preference</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-bg-base/50">
                                                            <SelectValue placeholder="Select preference" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="both">Both (SMS & Email)</SelectItem>
                                                        <SelectItem value="sms">SMS Only</SelectItem>
                                                        <SelectItem value="email">Email Only</SelectItem>
                                                        <SelectItem value="none">None</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-navy/5">
                        <Button type="button" variant="outline" onClick={() => router.back()} className="rounded-full px-6">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="rounded-full px-6 bg-navy hover:bg-navy/90 text-white shadow-md shadow-navy/20">
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    {contactId ? "Update Contact" : "Create Contact"}
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
