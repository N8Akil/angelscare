'use server'

import { revalidatePath } from 'next/cache'
import { query, queryOne, getCount, paginate, transaction } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/auth'
import { sendEmail, sendSMS, getProviderStatus } from '@/lib/notifications/providers'
import type { PoolClient } from 'pg'

export interface NotificationLog {
  id: string
  admin_id: string | null
  recipient_filter: Record<string, unknown> | null
  recipient_count: number
  channel: 'sms' | 'email'
  subject: string | null
  body: string
  status: 'pending' | 'processing' | 'sent' | 'failed'
  sent_at: string
  admin_name?: string
}

export interface NotificationQueueItem {
  id: string
  contact_id: string
  channel: 'sms' | 'email'
  subject: string | null
  body: string
  status: 'pending' | 'processing' | 'sent' | 'failed'
  attempts: number
  max_attempts: number
  error_message: string | null
  scheduled_for: string
  sent_at: string | null
  created_at: string
  contact_name?: string
  contact_phone?: string
  contact_email?: string
}

export interface NotificationLogsResult {
  logs: NotificationLog[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface NotificationQueueResult {
  items: NotificationQueueItem[]
  total: number
  page: number
  limit: number
  totalPages: number
}

/**
 * Get notification logs (sent history)
 */
export async function getNotificationLogs(
  page: number = 1,
  limit: number = 20,
  channel?: 'sms' | 'email'
): Promise<NotificationLogsResult> {
  const { offset, limit: safeLimit } = paginate(page, limit)

  let whereClause = '1=1'
  const params: unknown[] = []
  let paramIndex = 1

  if (channel) {
    whereClause += ` AND nl.channel = $${paramIndex}`
    params.push(channel)
    paramIndex++
  }

  const total = await getCount('notification_logs nl', whereClause, params)

  const logs = await query<NotificationLog>(
    `SELECT nl.id, nl.admin_id, nl.recipient_filter, nl.recipient_count, nl.channel, nl.subject, nl.body, nl.status, nl.sent_at,
            au.name as admin_name
     FROM notification_logs nl
     LEFT JOIN admin_users au ON nl.admin_id = au.id
     WHERE ${whereClause}
     ORDER BY nl.sent_at DESC
     LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
    [...params, safeLimit, offset]
  )

  return {
    logs,
    total,
    page,
    limit: safeLimit,
    totalPages: Math.ceil(total / safeLimit),
  }
}

/**
 * Get notification queue items (pending/processing)
 */
export async function getNotificationQueue(
  page: number = 1,
  limit: number = 50,
  status?: 'pending' | 'processing' | 'sent' | 'failed'
): Promise<NotificationQueueResult> {
  const { offset, limit: safeLimit } = paginate(page, limit)

  let whereClause = '1=1'
  const params: unknown[] = []
  let paramIndex = 1

  if (status) {
    whereClause += ` AND nq.status = $${paramIndex}`
    params.push(status)
    paramIndex++
  }

  const total = await getCount('notification_queue nq', whereClause, params)

  const items = await query<NotificationQueueItem>(
    `SELECT nq.id, nq.contact_id, nq.channel, nq.subject, nq.body, nq.status, nq.attempts, nq.max_attempts,
            nq.error_message, nq.scheduled_for, nq.sent_at, nq.created_at,
            c.first_name || ' ' || c.last_name as contact_name, c.phone as contact_phone, c.email as contact_email
     FROM notification_queue nq
     LEFT JOIN contacts c ON nq.contact_id = c.id
     WHERE ${whereClause}
     ORDER BY nq.scheduled_for ASC
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
 * Get queue statistics
 */
export async function getQueueStats(): Promise<{
  pending: number
  processing: number
  sent: number
  failed: number
}> {
  const result = await query<{ status: string; count: string }>(
    `SELECT status, COUNT(*) as count FROM notification_queue GROUP BY status`
  )

  const stats = { pending: 0, processing: 0, sent: 0, failed: 0 }
  for (const row of result) {
    stats[row.status as keyof typeof stats] = parseInt(row.count)
  }

  return stats
}

/**
 * Compose and queue a notification to multiple recipients
 */
export async function composeNotification(data: {
  channel: 'sms' | 'email'
  subject?: string
  body: string
  recipientFilter: {
    type?: 'staff' | 'client' | 'vendor' | 'referral_source' | 'other' | 'all'
    ids?: string[] // Specific contact IDs
  }
  scheduledFor?: string
}): Promise<{ success: boolean; queuedCount?: number; error?: string }> {
  try {
    const admin = await getCurrentAdmin()
    if (!admin) {
      return { success: false, error: 'Unauthorized' }
    }

    return await transaction(async (client: PoolClient) => {
      // Build recipient query based on filter
      let recipientQuery = `SELECT id, phone, email, notification_pref FROM contacts WHERE is_active = true`
      const recipientParams: unknown[] = []

      if (data.recipientFilter.ids && data.recipientFilter.ids.length > 0) {
        // Specific contacts
        recipientQuery += ` AND id = ANY($1)`
        recipientParams.push(data.recipientFilter.ids)
      } else if (data.recipientFilter.type && data.recipientFilter.type !== 'all') {
        // Filter by type
        recipientQuery += ` AND type = $1`
        recipientParams.push(data.recipientFilter.type)
      }

      // Filter by notification preference
      if (data.channel === 'sms') {
        recipientQuery += ` AND notification_pref IN ('sms', 'both') AND phone IS NOT NULL`
      } else if (data.channel === 'email') {
        recipientQuery += ` AND notification_pref IN ('email', 'both') AND email IS NOT NULL`
      }

      const recipients = await client.query(recipientQuery, recipientParams)

      if (recipients.rows.length === 0) {
        return { success: false, error: 'No eligible recipients found' }
      }

      const scheduledFor = data.scheduledFor ? new Date(data.scheduledFor) : new Date()

      // Queue notifications for each recipient
      for (const recipient of recipients.rows) {
        await client.query(
          `INSERT INTO notification_queue (contact_id, channel, subject, body, scheduled_for)
           VALUES ($1, $2, $3, $4, $5)`,
          [recipient.id, data.channel, data.subject || null, data.body, scheduledFor]
        )
      }

      // Log the notification batch
      const logResult = await client.query(
        `INSERT INTO notification_logs (admin_id, recipient_filter, recipient_count, channel, subject, body, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id`,
        [
          admin.id,
          JSON.stringify(data.recipientFilter),
          recipients.rows.length,
          data.channel,
          data.subject || null,
          data.body,
          'pending'
        ]
      )

      // Audit log
      await client.query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id, details)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          admin.id,
          'compose',
          'notification',
          logResult.rows[0].id,
          JSON.stringify({ channel: data.channel, recipient_count: recipients.rows.length })
        ]
      )

      return { success: true, queuedCount: recipients.rows.length }
    })
  } catch (error) {
    console.error('Compose notification error:', error)
    return { success: false, error: 'Failed to queue notifications' }
  }
}

/**
 * Process pending notifications (to be called by cron/worker)
 * Uses real providers from lib/notifications/providers.ts
 */
export async function processNotificationQueue(batchSize: number = 10): Promise<{
  processed: number
  sent: number
  failed: number
  errors: string[]
  providerStatus: ReturnType<typeof getProviderStatus>
}> {
  const providerStatus = getProviderStatus()
  const result = { processed: 0, sent: 0, failed: 0, errors: [] as string[], providerStatus }

  try {
    // Get pending items that are ready to send
    const pending = await query<NotificationQueueItem>(
      `SELECT nq.id, nq.contact_id, nq.channel, nq.subject, nq.body, nq.attempts,
              c.phone as contact_phone, c.email as contact_email, c.first_name
       FROM notification_queue nq
       JOIN contacts c ON nq.contact_id = c.id
       WHERE nq.status = 'pending' AND nq.scheduled_for <= NOW()
       ORDER BY nq.scheduled_for ASC
       LIMIT $1`,
      [batchSize]
    )

    console.log(`[NotificationWorker] Processing ${pending.length} pending notifications`)

    for (const item of pending) {
      result.processed++

      // Mark as processing
      await query(
        `UPDATE notification_queue SET status = 'processing', attempts = attempts + 1 WHERE id = $1`,
        [item.id]
      )

      try {
        let sendResult: { success: boolean; messageId?: string; error?: string }

        if (item.channel === 'sms') {
          if (!item.contact_phone) {
            throw new Error('No phone number for contact')
          }
          sendResult = await sendSMS({
            to: item.contact_phone,
            body: item.body
          })
        } else {
          if (!item.contact_email) {
            throw new Error('No email address for contact')
          }
          sendResult = await sendEmail({
            to: item.contact_email,
            subject: item.subject || "Message from Angel's Care",
            body: item.body
          })
        }

        if (sendResult.success) {
          // Mark as sent
          await query(
            `UPDATE notification_queue SET status = 'sent', sent_at = NOW(), error_message = NULL WHERE id = $1`,
            [item.id]
          )
          result.sent++
          console.log(`[NotificationWorker] Sent ${item.channel} to ${item.contact_email || item.contact_phone}, messageId: ${sendResult.messageId}`)
        } else {
          throw new Error(sendResult.error || 'Send failed')
        }
      } catch (sendError) {
        const errorMsg = sendError instanceof Error ? sendError.message : 'Unknown error'
        result.errors.push(`${item.id}: ${errorMsg}`)
        console.error(`[NotificationWorker] Failed to send ${item.channel} to ${item.contact_email || item.contact_phone}: ${errorMsg}`)

        // Check if max attempts reached (3 attempts)
        if (item.attempts + 1 >= 3) {
          await query(
            `UPDATE notification_queue SET status = 'failed', error_message = $1 WHERE id = $2`,
            [errorMsg, item.id]
          )
          result.failed++
        } else {
          // Reset to pending for retry
          await query(
            `UPDATE notification_queue SET status = 'pending', error_message = $1 WHERE id = $2`,
            [errorMsg, item.id]
          )
        }
      }
    }

    // Update notification_logs status if all items for that log are processed
    await query(
      `UPDATE notification_logs nl
       SET status = 'sent'
       WHERE nl.status = 'pending'
       AND NOT EXISTS (
         SELECT 1 FROM notification_queue nq
         WHERE nq.status IN ('pending', 'processing')
         AND nq.created_at >= nl.sent_at - INTERVAL '1 minute'
         AND nq.created_at <= nl.sent_at + INTERVAL '1 minute'
       )`
    )

  } catch (error) {
    console.error('[NotificationWorker] Process queue error:', error)
  }

  console.log(`[NotificationWorker] Complete: ${result.sent} sent, ${result.failed} failed, ${result.errors.length} errors`)
  return result
}

/**
 * Get provider configuration status
 */
export async function getNotificationProviderStatus() {
  return getProviderStatus()
}

/**
 * Cancel a pending notification
 */
export async function cancelNotification(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    const result = await query(
      `DELETE FROM notification_queue WHERE id = $1 AND status = 'pending' RETURNING id`,
      [id]
    )

    if (result.length === 0) {
      return { success: false, error: 'Notification not found or already processed' }
    }

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id)
         VALUES ($1, $2, $3, $4)`,
        [admin.id, 'cancel', 'notification', id]
      )
    }

    revalidatePath('/admin/notifications')
    return { success: true }
  } catch (error) {
    console.error('Cancel notification error:', error)
    return { success: false, error: 'Failed to cancel notification' }
  }
}

/**
 * Retry a failed notification
 */
export async function retryNotification(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    await query(
      `UPDATE notification_queue
       SET status = 'pending', attempts = 0, error_message = NULL, scheduled_for = NOW()
       WHERE id = $1 AND status = 'failed'`,
      [id]
    )

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, entity_id)
         VALUES ($1, $2, $3, $4)`,
        [admin.id, 'retry', 'notification', id]
      )
    }

    revalidatePath('/admin/notifications')
    return { success: true }
  } catch (error) {
    console.error('Retry notification error:', error)
    return { success: false, error: 'Failed to retry notification' }
  }
}

/**
 * Clear all failed notifications
 */
export async function clearFailedNotifications(): Promise<{ success: boolean; cleared?: number; error?: string }> {
  try {
    const admin = await getCurrentAdmin()

    const result = await query(
      `DELETE FROM notification_queue WHERE status = 'failed' RETURNING id`
    )

    if (admin) {
      await query(
        `INSERT INTO admin_audit_log (admin_id, action, entity_type, details)
         VALUES ($1, $2, $3, $4)`,
        [admin.id, 'clear_failed', 'notification', JSON.stringify({ count: result.length })]
      )
    }

    revalidatePath('/admin/notifications')
    return { success: true, cleared: result.length }
  } catch (error) {
    console.error('Clear failed notifications error:', error)
    return { success: false, error: 'Failed to clear notifications' }
  }
}
