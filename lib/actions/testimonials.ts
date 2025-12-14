'use server'

import { revalidatePath } from 'next/cache'
import { query, queryOne, getCount, paginate } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/auth'

export interface Testimonial {
  id: string
  client_name: string
  content: string
  rating: number | null
  source: string
  google_review_id: string | null
  is_published: boolean
  display_order: number
  created_at: string
}

export interface TestimonialsResult {
  testimonials: Testimonial[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Fetch testimonials with pagination and optional filters
 */
export async function getTestimonials(
  page: number = 1,
  limit: number = 20,
  publishedOnly: boolean = false
): Promise<TestimonialsResult> {
  const { offset, limit: safeLimit } = paginate(page, limit)

  let whereClause = '1=1'
  const params: unknown[] = []
  let paramIndex = 1

  if (publishedOnly) {
    whereClause += ` AND is_published = true`
  }

  const total = await getCount('testimonials', whereClause, params)

  const testimonials = await query<Testimonial>(
    `SELECT id, client_name, content, rating, source, google_review_id, is_published, display_order, created_at
     FROM testimonials
     WHERE ${whereClause}
     ORDER BY display_order ASC, created_at DESC
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, safeLimit, offset]
  )

  return {
    testimonials,
    total,
    page,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit),
  }
}

/**
 * Get published testimonials for public display
 */
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  return query<Testimonial>(
    `SELECT id, client_name, content, rating, source, created_at
     FROM testimonials
     WHERE is_published = true
     ORDER BY display_order ASC, created_at DESC`
  )
}

/**
 * Get a single testimonial by ID
 */
export async function getTestimonialById(id: string): Promise<Testimonial | null> {
  return queryOne<Testimonial>(
    `SELECT id, client_name, content, rating, source, google_review_id, is_published, display_order, created_at
     FROM testimonials
     WHERE id = $1`,
    [id]
  )
}

/**
 * Create a new testimonial
 */
export async function createTestimonial(data: {
  client_name: string
  content: string
  rating?: number
  source?: string
  is_published?: boolean
  display_order?: number
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    const result = await queryOne<{ id: string }>(
      `INSERT INTO testimonials (client_name, content, rating, source, is_published, display_order)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        data.client_name,
        data.content,
        data.rating || null,
        data.source || 'manual',
        data.is_published ?? false,
        data.display_order ?? 0,
      ]
    )

    if (admin && result) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'create', 'testimonial', result.id, JSON.stringify({ client_name: data.client_name })]
      )
    }

    revalidatePath('/admin/content/testimonials')
    revalidatePath('/') // Public homepage may show testimonials
    return { success: true, id: result?.id }
  } catch (error) {
    console.error('Create testimonial error:', error)
    return { success: false, error: 'Failed to create testimonial' }
  }
}

/**
 * Update a testimonial
 */
export async function updateTestimonial(id: string, data: {
  client_name: string
  content: string
  rating?: number
  source?: string
  is_published?: boolean
  display_order?: number
}): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      `UPDATE testimonials
       SET client_name = $1, content = $2, rating = $3, source = $4, is_published = $5, display_order = $6
       WHERE id = $7`,
      [
        data.client_name,
        data.content,
        data.rating || null,
        data.source || 'manual',
        data.is_published ?? false,
        data.display_order ?? 0,
        id
      ]
    )

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'update', 'testimonial', id, JSON.stringify(data)]
      )
    }

    revalidatePath('/admin/content/testimonials')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Update testimonial error:', error)
    return { success: false, error: 'Failed to update testimonial' }
  }
}

/**
 * Toggle testimonial published status (approve/reject)
 */
export async function toggleTestimonialPublished(id: string, is_published: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      'UPDATE testimonials SET is_published = $1 WHERE id = $2',
      [is_published, id]
    )

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, is_published ? 'approve' : 'reject', 'testimonial', id, JSON.stringify({ is_published })]
      )
    }

    revalidatePath('/admin/content/testimonials')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Toggle testimonial error:', error)
    return { success: false, error: 'Failed to update testimonial status' }
  }
}

/**
 * Delete a testimonial
 */
export async function deleteTestimonial(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query('DELETE FROM testimonials WHERE id = $1', [id])

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id)
         VALUES ($1, $2, $3, $4)`,
        [admin.id, 'delete', 'testimonial', id]
      )
    }

    revalidatePath('/admin/content/testimonials')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Delete testimonial error:', error)
    return { success: false, error: 'Failed to delete testimonial' }
  }
}

/**
 * Reorder testimonials
 */
export async function reorderTestimonials(orderedIds: string[]): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    for (let i = 0; i < orderedIds.length; i++) {
      await query(
        'UPDATE testimonials SET display_order = $1 WHERE id = $2',
        [i, orderedIds[i]]
      )
    }

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, details)
         VALUES ($1, $2, $3, $4)`,
        [admin.id, 'reorder', 'testimonial', JSON.stringify({ order: orderedIds })]
      )
    }

    revalidatePath('/admin/content/testimonials')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Reorder testimonials error:', error)
    return { success: false, error: 'Failed to reorder testimonials' }
  }
}
