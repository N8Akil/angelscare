'use server'

import { revalidatePath } from 'next/cache'
import { query, queryOne, getCount, paginate } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/auth'

export interface FaqItem {
  id: string
  question: string
  answer: string
  category: string | null
  is_published: boolean
  display_order: number
  created_at: string
}

export interface FaqResult {
  items: FaqItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Fetch FAQ items with pagination
 */
export async function getFaqItems(
  page: number = 1,
  limit: number = 50,
  publishedOnly: boolean = false,
  category?: string
): Promise<FaqResult> {
  const { offset, limit: safeLimit } = paginate(page, limit)

  let whereClause = '1=1'
  const params: unknown[] = []
  let paramIndex = 1

  if (publishedOnly) {
    whereClause += ` AND is_published = true`
  }

  if (category) {
    whereClause += ` AND category = $${paramIndex}`
    params.push(category)
    paramIndex++
  }

  const total = await getCount('faq_items', whereClause, params)

  const items = await query<FaqItem>(
    `SELECT id, question, answer, category, is_published, display_order, created_at
     FROM faq_items
     WHERE ${whereClause}
     ORDER BY display_order ASC, created_at DESC
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, safeLimit, offset]
  )

  return {
    items,
    total,
    page,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit),
  }
}

/**
 * Get published FAQ items for public display
 */
export async function getPublishedFaqItems(category?: string): Promise<FaqItem[]> {
  let query_str = `SELECT id, question, answer, category, created_at
     FROM faq_items
     WHERE is_published = true`

  const params: unknown[] = []

  if (category) {
    query_str += ` AND category = $1`
    params.push(category)
  }

  query_str += ` ORDER BY display_order ASC, created_at DESC`

  return query<FaqItem>(query_str, params)
}

/**
 * Get all unique FAQ categories
 */
export async function getFaqCategories(): Promise<string[]> {
  const result = await query<{ category: string }>(
    `SELECT DISTINCT category FROM faq_items WHERE category IS NOT NULL ORDER BY category`
  )
  return result.map(r => r.category)
}

/**
 * Get a single FAQ item by ID
 */
export async function getFaqItemById(id: string): Promise<FaqItem | null> {
  return queryOne<FaqItem>(
    `SELECT id, question, answer, category, is_published, display_order, created_at
     FROM faq_items
     WHERE id = $1`,
    [id]
  )
}

/**
 * Create a new FAQ item
 */
export async function createFaqItem(data: {
  question: string
  answer: string
  category?: string
  is_published?: boolean
  display_order?: number
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    const result = await queryOne<{ id: string }>(
      `INSERT INTO faq_items (question, answer, category, is_published, display_order)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [
        data.question,
        data.answer,
        data.category || null,
        data.is_published ?? true,
        data.display_order ?? 0,
      ]
    )

    if (admin && result) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'create', 'faq_item', result.id, JSON.stringify({ question: data.question.substring(0, 50) })]
      )
    }

    revalidatePath('/admin/content/faq')
    revalidatePath('/resources/faq')
    return { success: true, id: result?.id }
  } catch (error) {
    console.error('Create FAQ item error:', error)
    return { success: false, error: 'Failed to create FAQ item' }
  }
}

/**
 * Update a FAQ item
 */
export async function updateFaqItem(id: string, data: {
  question: string
  answer: string
  category?: string
  is_published?: boolean
  display_order?: number
}): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      `UPDATE faq_items
       SET question = $1, answer = $2, category = $3, is_published = $4, display_order = $5
       WHERE id = $6`,
      [
        data.question,
        data.answer,
        data.category || null,
        data.is_published ?? true,
        data.display_order ?? 0,
        id
      ]
    )

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'update', 'faq_item', id, JSON.stringify({ question: data.question.substring(0, 50) })]
      )
    }

    revalidatePath('/admin/content/faq')
    revalidatePath('/resources/faq')
    return { success: true }
  } catch (error) {
    console.error('Update FAQ item error:', error)
    return { success: false, error: 'Failed to update FAQ item' }
  }
}

/**
 * Toggle FAQ item published status
 */
export async function toggleFaqItemPublished(id: string, is_published: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      'UPDATE faq_items SET is_published = $1 WHERE id = $2',
      [is_published, id]
    )

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, is_published ? 'publish' : 'unpublish', 'faq_item', id, JSON.stringify({ is_published })]
      )
    }

    revalidatePath('/admin/content/faq')
    revalidatePath('/resources/faq')
    return { success: true }
  } catch (error) {
    console.error('Toggle FAQ item error:', error)
    return { success: false, error: 'Failed to update FAQ item status' }
  }
}

/**
 * Delete a FAQ item
 */
export async function deleteFaqItem(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query('DELETE FROM faq_items WHERE id = $1', [id])

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id)
         VALUES ($1, $2, $3, $4)`,
        [admin.id, 'delete', 'faq_item', id]
      )
    }

    revalidatePath('/admin/content/faq')
    revalidatePath('/resources/faq')
    return { success: true }
  } catch (error) {
    console.error('Delete FAQ item error:', error)
    return { success: false, error: 'Failed to delete FAQ item' }
  }
}

/**
 * Reorder FAQ items
 */
export async function reorderFaqItems(orderedIds: string[]): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    for (let i = 0; i < orderedIds.length; i++) {
      await query(
        'UPDATE faq_items SET display_order = $1 WHERE id = $2',
        [i, orderedIds[i]]
      )
    }

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, details)
         VALUES ($1, $2, $3, $4)`,
        [admin.id, 'reorder', 'faq_item', JSON.stringify({ order: orderedIds })]
      )
    }

    revalidatePath('/admin/content/faq')
    revalidatePath('/resources/faq')
    return { success: true }
  } catch (error) {
    console.error('Reorder FAQ items error:', error)
    return { success: false, error: 'Failed to reorder FAQ items' }
  }
}
