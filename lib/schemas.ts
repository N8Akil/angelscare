import { z } from "zod"

export const contactFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    phone: z.string().min(10, "Phone number must be at least 10 digits."),
    email: z.string().email("Please enter a valid email address."),
    serviceType: z.string().min(1, "Please select a service."),
    message: z.string().optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const adminContactSchema = z.object({
    first_name: z.string().min(2, "First name is required"),
    last_name: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().optional(),
    type: z.enum(["staff", "client", "vendor", "referral_source", "other"]),
    notification_pref: z.enum(["sms", "email", "both", "none"]),
    city: z.string().optional(),
    state: z.string().optional(),
})

export type AdminContactValues = z.infer<typeof adminContactSchema>
