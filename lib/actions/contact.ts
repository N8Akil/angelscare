'use server'

import { headers } from 'next/headers'
import { query } from '@/lib/db'
import { contactFormSchema, ContactFormValues } from '@/lib/schemas'

export type ContactFormResult = {
  success: boolean
  message: string
  id?: string
}

/**
 * Server action to submit contact form
 * Saves to contact_submissions table
 */
export async function submitContactForm(data: ContactFormValues): Promise<ContactFormResult> {
  try {
    // Validate input
    const validated = contactFormSchema.safeParse(data)
    if (!validated.success) {
      return {
        success: false,
        message: 'Please check your form inputs and try again.',
      }
    }

    // Get request metadata
    const headersList = await headers()
    const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0] ||
                      headersList.get('x-real-ip') ||
                      null
    const userAgent = headersList.get('user-agent') || null

    // Insert into database
    const result = await query<{ id: string }>(
      `INSERT INTO contact_submissions (name, phone, email, service_type, message, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        validated.data.name,
        validated.data.phone,
        validated.data.email,
        validated.data.serviceType,
        validated.data.message || null,
        ipAddress,
        userAgent,
      ]
    )

    if (result.length === 0) {
      throw new Error('Failed to insert contact submission')
    }

    // TODO: Send email notification to admin
    // await sendAdminNotification(validated.data)

    return {
      success: true,
      message: 'Thank you for contacting us! We will be in touch shortly.',
      id: result[0].id,
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    return {
      success: false,
      message: 'Something went wrong. Please try again or call us at (314) 381-0321.',
    }
  }
}
