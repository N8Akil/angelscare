'use server'

import { revalidatePath } from 'next/cache'
import { query, queryOne, getCount, paginate } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/auth'

export interface JobPosting {
  id: string
  title: string
  description: string
  requirements: string | null
  location: string
  employment_type: 'full-time' | 'part-time' | 'contract'
  is_active: boolean
  created_at: string
  expires_at: string | null
}

export interface JobsResult {
  jobs: JobPosting[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Fetch job postings with pagination
 */
export async function getJobPostings(
  page: number = 1,
  limit: number = 20,
  activeOnly: boolean = false,
  employmentType?: 'full-time' | 'part-time' | 'contract'
): Promise<JobsResult> {
  const { offset, limit: safeLimit } = paginate(page, limit)

  let whereClause = '1=1'
  const params: unknown[] = []
  let paramIndex = 1

  if (activeOnly) {
    whereClause += ` AND is_active = true AND (expires_at IS NULL OR expires_at > NOW())`
  }

  if (employmentType) {
    whereClause += ` AND employment_type = $${paramIndex}`
    params.push(employmentType)
    paramIndex++
  }

  const total = await getCount('job_postings', whereClause, params)

  const jobs = await query<JobPosting>(
    `SELECT id, title, description, requirements, location, employment_type, is_active, created_at, expires_at
     FROM job_postings
     WHERE ${whereClause}
     ORDER BY created_at DESC
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, safeLimit, offset]
  )

  return {
    jobs,
    total,
    page,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit),
  }
}

/**
 * Get active job postings for public careers page
 */
export async function getActiveJobPostings(): Promise<JobPosting[]> {
  return query<JobPosting>(
    `SELECT id, title, description, requirements, location, employment_type, created_at
     FROM job_postings
     WHERE is_active = true AND (expires_at IS NULL OR expires_at > NOW())
     ORDER BY created_at DESC`
  )
}

/**
 * Get a single job posting by ID
 */
export async function getJobPostingById(id: string): Promise<JobPosting | null> {
  return queryOne<JobPosting>(
    `SELECT id, title, description, requirements, location, employment_type, is_active, created_at, expires_at
     FROM job_postings
     WHERE id = $1`,
    [id]
  )
}

/**
 * Create a new job posting
 */
export async function createJobPosting(data: {
  title: string
  description: string
  requirements?: string
  location?: string
  employment_type?: 'full-time' | 'part-time' | 'contract'
  is_active?: boolean
  expires_at?: string
}): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    const result = await queryOne<{ id: string }>(
      `INSERT INTO job_postings (title, description, requirements, location, employment_type, is_active, expires_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        data.title,
        data.description,
        data.requirements || null,
        data.location || 'St. Louis, MO',
        data.employment_type || 'full-time',
        data.is_active ?? true,
        data.expires_at ? new Date(data.expires_at) : null,
      ]
    )

    if (admin && result) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'create', 'job_posting', result.id, JSON.stringify({ title: data.title })]
      )
    }

    revalidatePath('/admin/content/careers')
    revalidatePath('/careers')
    return { success: true, id: result?.id }
  } catch (error) {
    console.error('Create job posting error:', error)
    return { success: false, error: 'Failed to create job posting' }
  }
}

/**
 * Update a job posting
 */
export async function updateJobPosting(id: string, data: {
  title: string
  description: string
  requirements?: string
  location?: string
  employment_type?: 'full-time' | 'part-time' | 'contract'
  is_active?: boolean
  expires_at?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      `UPDATE job_postings
       SET title = $1, description = $2, requirements = $3, location = $4, employment_type = $5, is_active = $6, expires_at = $7
       WHERE id = $8`,
      [
        data.title,
        data.description,
        data.requirements || null,
        data.location || 'St. Louis, MO',
        data.employment_type || 'full-time',
        data.is_active ?? true,
        data.expires_at ? new Date(data.expires_at) : null,
        id
      ]
    )

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'update', 'job_posting', id, JSON.stringify({ title: data.title })]
      )
    }

    revalidatePath('/admin/content/careers')
    revalidatePath('/careers')
    return { success: true }
  } catch (error) {
    console.error('Update job posting error:', error)
    return { success: false, error: 'Failed to update job posting' }
  }
}

/**
 * Toggle job posting active status
 */
export async function toggleJobPostingActive(id: string, is_active: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      'UPDATE job_postings SET is_active = $1 WHERE id = $2',
      [is_active, id]
    )

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, is_active ? 'activate' : 'deactivate', 'job_posting', id, JSON.stringify({ is_active })]
      )
    }

    revalidatePath('/admin/content/careers')
    revalidatePath('/careers')
    return { success: true }
  } catch (error) {
    console.error('Toggle job posting error:', error)
    return { success: false, error: 'Failed to update job posting status' }
  }
}

/**
 * Delete a job posting
 */
export async function deleteJobPosting(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    // Get title before deleting for audit log
    const job = await queryOne<{ title: string }>('SELECT title FROM job_postings WHERE id = $1', [id])

    await query('DELETE FROM job_postings WHERE id = $1', [id])

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'delete', 'job_posting', id, JSON.stringify({ title: job?.title })]
      )
    }

    revalidatePath('/admin/content/careers')
    revalidatePath('/careers')
    return { success: true }
  } catch (error) {
    console.error('Delete job posting error:', error)
    return { success: false, error: 'Failed to delete job posting' }
  }
}

/**
 * Duplicate a job posting (for creating similar listings)
 */
export async function duplicateJobPosting(id: string): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    const original = await getJobPostingById(id)
    if (!original) {
      return { success: false, error: 'Job posting not found' }
    }

    const result = await queryOne<{ id: string }>(
      `INSERT INTO job_postings (title, description, requirements, location, employment_type, is_active)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        `${original.title} (Copy)`,
        original.description,
        original.requirements,
        original.location,
        original.employment_type,
        false, // Start as inactive
      ]
    )

    if (admin && result) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [admin.id, 'duplicate', 'job_posting', result.id, JSON.stringify({ original_id: id })]
      )
    }

    revalidatePath('/admin/content/careers')
    return { success: true, id: result?.id }
  } catch (error) {
    console.error('Duplicate job posting error:', error)
    return { success: false, error: 'Failed to duplicate job posting' }
  }
}
