'use server'

import { revalidatePath } from 'next/cache'
import { query, queryOne, getCount, paginate } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/auth'

export interface Contact {
  id: string
  type: string
  first_name: string
  last_name: string
  phone: string | null
  email: string | null
  city: string | null
  state: string | null
  notification_pref: string
  is_active: boolean
  created_at: string
}

export interface ContactsResult {
  contacts: Contact[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Fetch contacts with pagination and optional filters
 */
export async function getContacts(
  page: number = 1,
  limit: number = 20,
  search?: string,
  type?: string
): Promise<ContactsResult> {
  const { offset, limit: safeLimit } = paginate(page, limit)

  let whereClause = 'is_active = true'
  const params: unknown[] = []
  let paramIndex = 1

  if (search) {
    whereClause += ` AND (first_name ILIKE $${paramIndex} OR last_name ILIKE $${paramIndex} OR email ILIKE $${paramIndex} OR phone ILIKE $${paramIndex})`
    params.push(`%${search}%`)
    paramIndex++
  }

  if (type) {
    whereClause += ` AND type = $${paramIndex}`
    params.push(type)
    paramIndex++
  }

  const total = await getCount('contacts', whereClause, params)

  const contacts = await query<Contact>(
    `SELECT id, type, first_name, last_name, phone, email, city, state, notification_pref, is_active, created_at
     FROM contacts
     WHERE ${whereClause}
     ORDER BY created_at DESC
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, safeLimit, offset]
  )

  return {
    contacts,
    total,
    page,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit),
  }
}

/**
 * Get a single contact by ID
 */
export async function getContactById(id: string): Promise<Contact | null> {
  return queryOne<Contact>(
    `SELECT id, type, first_name, last_name, phone, email, city, state, notification_pref, is_active, created_at
     FROM contacts
     WHERE id = $1`,
    [id]
  )
}

/**
 * Create a new contact
 */
export async function createContact(data: {
  type: string
  first_name: string
  last_name: string
  phone?: string
  email?: string
  city?: string
  state?: string
  notification_pref?: string
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    const result = await queryOne<{ id: string }>(
      `INSERT INTO contacts (type, first_name, last_name, phone, email, city, state, notification_pref)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        data.type || 'client',
        data.first_name,
        data.last_name,
        data.phone || null,
        data.email || null,
        data.city || null,
        data.state || 'MO',
        data.notification_pref || 'both',
      ]
    )

    // Audit log
    if (admin && result) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'create', 'contact', result.id, JSON.stringify({ first_name: data.first_name, last_name: data.last_name })]
      )
    }

    revalidatePath('/admin/contacts')
    return { success: true, id: result?.id }
  } catch (error) {
    console.error('Create contact error:', error)
    return { success: false, error: 'Failed to create contact' }
  }
}

/**
 * Delete (soft) a contact
 */
export async function deleteContact(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      'UPDATE contacts SET is_active = false, updated_at = NOW() WHERE id = $1',
      [id]
    )

    // Audit log
    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id)
         VALUES ($1, $2, $3, $4)`,
        [admin.id, 'delete', 'contact', id]
      )
    }

    revalidatePath('/admin/contacts')
    return { success: true }
  } catch (error) {
    console.error('Delete contact error:', error)
    return { success: false, error: 'Failed to delete contact' }
  }
}

/**
 * Update an existing contact
 */
export async function updateContact(id: string, data: {
  type: string
  first_name: string
  last_name: string
  phone?: string
  email?: string
  city?: string
  state?: string
  notification_pref?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      `UPDATE contacts 
       SET type = $1, first_name = $2, last_name = $3, phone = $4, email = $5, city = $6, state = $7, notification_pref = $8, updated_at = NOW()
       WHERE id = $9`,
      [
        data.type,
        data.first_name,
        data.last_name,
        data.phone || null,
        data.email || null,
        data.city || null,
        data.state || 'MO',
        data.notification_pref,
        id
      ]
    )

    // Audit log
    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'update', 'contact', id, JSON.stringify(data)]
      )
    }

    revalidatePath('/admin/contacts')
    // Also revalidate the specific page
    revalidatePath(`/admin/contacts/${id}/edit`)
    return { success: true }
  } catch (error) {
    console.error('Update contact error:', error)
    return { success: false, error: 'Failed to update contact' }
  }
}
