'use server'

import { revalidatePath } from 'next/cache'
import { query, queryOne, getCount, paginate } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/auth'
import { writeFile, unlink, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export interface GalleryItem {
  id: string
  title: string | null
  description: string | null
  file_path: string
  thumbnail_path: string | null
  media_type: 'image' | 'video'
  alt_text: string | null
  is_published: boolean
  display_order: number
  created_at: string
}

export interface GalleryResult {
  items: GalleryItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Upload directory configuration
const UPLOAD_DIR = process.env.UPLOAD_DIR || '/mnt/extreme-pro/angelscare/public/uploads/gallery'
const PUBLIC_PATH = '/uploads/gallery'

/**
 * Ensure upload directory exists
 */
async function ensureUploadDir(): Promise<void> {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true })
  }
}

/**
 * Fetch gallery items with pagination
 */
export async function getGalleryItems(
  page: number = 1,
  limit: number = 20,
  publishedOnly: boolean = false,
  mediaType?: 'image' | 'video'
): Promise<GalleryResult> {
  const { offset, limit: safeLimit } = paginate(page, limit)

  let whereClause = '1=1'
  const params: unknown[] = []
  let paramIndex = 1

  if (publishedOnly) {
    whereClause += ` AND is_published = true`
  }

  if (mediaType) {
    whereClause += ` AND media_type = $${paramIndex}`
    params.push(mediaType)
    paramIndex++
  }

  const total = await getCount('gallery_items', whereClause, params)

  const items = await query<GalleryItem>(
    `SELECT id, title, description, file_path, thumbnail_path, media_type, alt_text, is_published, display_order, created_at
     FROM gallery_items
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
 * Get published gallery items for public display
 */
export async function getPublishedGalleryItems(mediaType?: 'image' | 'video'): Promise<GalleryItem[]> {
  let query_str = `SELECT id, title, description, file_path, thumbnail_path, media_type, alt_text, created_at
     FROM gallery_items
     WHERE is_published = true`

  const params: unknown[] = []

  if (mediaType) {
    query_str += ` AND media_type = $1`
    params.push(mediaType)
  }

  query_str += ` ORDER BY display_order ASC, created_at DESC`

  return query<GalleryItem>(query_str, params)
}

/**
 * Get a single gallery item by ID
 */
export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  return queryOne<GalleryItem>(
    `SELECT id, title, description, file_path, thumbnail_path, media_type, alt_text, is_published, display_order, created_at
     FROM gallery_items
     WHERE id = $1`,
    [id]
  )
}

/**
 * Upload and create a gallery item
 */
export async function uploadGalleryItem(formData: FormData): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const admin = await getCurrentAdmin()
    await ensureUploadDir()

    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const alt_text = formData.get('alt_text') as string
    const is_published = formData.get('is_published') === 'true'

    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm']
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Invalid file type. Allowed: JPG, PNG, GIF, WebP, MP4, WebM' }
    }

    // Determine media type
    const media_type = file.type.startsWith('video/') ? 'video' : 'image'

    // Generate unique filename
    const timestamp = Date.now()
    const ext = file.name.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`
    const filepath = join(UPLOAD_DIR, filename)

    // Write file to disk
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filepath, buffer)

    const file_path = `${PUBLIC_PATH}/${filename}`

    // Insert into database
    const result = await queryOne<{ id: string }>(
      `INSERT INTO gallery_items (title, description, file_path, media_type, alt_text, is_published)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        title || null,
        description || null,
        file_path,
        media_type,
        alt_text || null,
        is_published,
      ]
    )

    if (admin && result) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'create', 'gallery_item', result.id, JSON.stringify({ title, file_path })]
      )
    }

    revalidatePath('/admin/content/gallery')
    revalidatePath('/gallery')
    return { success: true, id: result?.id }
  } catch (error) {
    console.error('Upload gallery item error:', error)
    return { success: false, error: 'Failed to upload file' }
  }
}

/**
 * Create gallery item with external URL (for videos)
 */
export async function createGalleryItem(data: {
  title?: string
  description?: string
  file_path: string
  thumbnail_path?: string
  media_type: 'image' | 'video'
  alt_text?: string
  is_published?: boolean
  display_order?: number
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    const result = await queryOne<{ id: string }>(
      `INSERT INTO gallery_items (title, description, file_path, thumbnail_path, media_type, alt_text, is_published, display_order)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id`,
      [
        data.title || null,
        data.description || null,
        data.file_path,
        data.thumbnail_path || null,
        data.media_type,
        data.alt_text || null,
        data.is_published ?? false,
        data.display_order ?? 0,
      ]
    )

    if (admin && result) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'create', 'gallery_item', result.id, JSON.stringify({ title: data.title })]
      )
    }

    revalidatePath('/admin/content/gallery')
    revalidatePath('/gallery')
    return { success: true, id: result?.id }
  } catch (error) {
    console.error('Create gallery item error:', error)
    return { success: false, error: 'Failed to create gallery item' }
  }
}

/**
 * Update a gallery item
 */
export async function updateGalleryItem(id: string, data: {
  title?: string
  description?: string
  alt_text?: string
  is_published?: boolean
  display_order?: number
}): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      `UPDATE gallery_items
       SET title = $1, description = $2, alt_text = $3, is_published = $4, display_order = $5
       WHERE id = $6`,
      [
        data.title || null,
        data.description || null,
        data.alt_text || null,
        data.is_published ?? false,
        data.display_order ?? 0,
        id
      ]
    )

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'update', 'gallery_item', id, JSON.stringify(data)]
      )
    }

    revalidatePath('/admin/content/gallery')
    revalidatePath('/gallery')
    return { success: true }
  } catch (error) {
    console.error('Update gallery item error:', error)
    return { success: false, error: 'Failed to update gallery item' }
  }
}

/**
 * Toggle gallery item published status
 */
export async function toggleGalleryItemPublished(id: string, is_published: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      'UPDATE gallery_items SET is_published = $1 WHERE id = $2',
      [is_published, id]
    )

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, is_published ? 'publish' : 'unpublish', 'gallery_item', id, JSON.stringify({ is_published })]
      )
    }

    revalidatePath('/admin/content/gallery')
    revalidatePath('/gallery')
    return { success: true }
  } catch (error) {
    console.error('Toggle gallery item error:', error)
    return { success: false, error: 'Failed to update gallery item status' }
  }
}

/**
 * Delete a gallery item and its file
 */
export async function deleteGalleryItem(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    // Get the file path before deleting
    const item = await queryOne<{ file_path: string; thumbnail_path: string | null }>(
      'SELECT file_path, thumbnail_path FROM gallery_items WHERE id = $1',
      [id]
    )

    // Delete from database
    await query('DELETE FROM gallery_items WHERE id = $1', [id])

    // Try to delete the file from disk
    if (item?.file_path) {
      const filename = item.file_path.split('/').pop()
      if (filename) {
        const filepath = join(UPLOAD_DIR, filename)
        try {
          await unlink(filepath)
        } catch {
          // File may not exist or already deleted
        }
      }
    }

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'delete', 'gallery_item', id, JSON.stringify({ file_path: item?.file_path })]
      )
    }

    revalidatePath('/admin/content/gallery')
    revalidatePath('/gallery')
    return { success: true }
  } catch (error) {
    console.error('Delete gallery item error:', error)
    return { success: false, error: 'Failed to delete gallery item' }
  }
}

/**
 * Reorder gallery items
 */
export async function reorderGalleryItems(orderedIds: string[]): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    for (let i = 0; i < orderedIds.length; i++) {
      await query(
        'UPDATE gallery_items SET display_order = $1 WHERE id = $2',
        [i, orderedIds[i]]
      )
    }

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, details)
         VALUES ($1, $2, $3, $4)`,
        [admin.id, 'reorder', 'gallery_item', JSON.stringify({ order: orderedIds })]
      )
    }

    revalidatePath('/admin/content/gallery')
    revalidatePath('/gallery')
    return { success: true }
  } catch (error) {
    console.error('Reorder gallery items error:', error)
    return { success: false, error: 'Failed to reorder gallery items' }
  }
}
