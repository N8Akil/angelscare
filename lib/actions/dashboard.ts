'use server'

import { query, queryOne } from '@/lib/db'

export interface DashboardStats {
  totalContacts: number
  contactsLastMonth: number
  unreadMessages: number
  activeJobs: number
  totalTestimonials: number
  avgRating: number
  contactsByType: { type: string; count: number }[]
}

export interface RecentActivity {
  id: string
  type: 'contact' | 'testimonial' | 'job' | 'notification' | 'system'
  text: string
  time: string
  created_at: string
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  // Total active contacts
  const totalContactsResult = await queryOne<{ count: string }>(
    'SELECT COUNT(*) as count FROM contacts WHERE is_active = true'
  )
  const totalContacts = parseInt(totalContactsResult?.count || '0', 10)

  // Contacts added last month
  const lastMonthResult = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM contacts
     WHERE is_active = true
     AND created_at >= NOW() - INTERVAL '30 days'`
  )
  const contactsLastMonth = parseInt(lastMonthResult?.count || '0', 10)

  // Unread messages (contacts that haven't been responded to - using created_at as proxy)
  const unreadResult = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM contacts
     WHERE is_active = true
     AND created_at >= NOW() - INTERVAL '7 days'`
  )
  const unreadMessages = parseInt(unreadResult?.count || '0', 10)

  // Active job postings
  const activeJobsResult = await queryOne<{ count: string }>(
    `SELECT COUNT(*) as count FROM job_postings
     WHERE is_active = true
     AND (expires_at IS NULL OR expires_at > NOW())`
  )
  const activeJobs = parseInt(activeJobsResult?.count || '0', 10)

  // Total testimonials and average rating
  const testimonialStats = await queryOne<{ count: string; avg_rating: string }>(
    `SELECT COUNT(*) as count, COALESCE(AVG(rating), 0) as avg_rating
     FROM testimonials
     WHERE is_published = true`
  )
  const totalTestimonials = parseInt(testimonialStats?.count || '0', 10)
  const avgRating = parseFloat(testimonialStats?.avg_rating || '0')

  // Contacts by type
  const contactsByType = await query<{ type: string; count: string }>(
    `SELECT type, COUNT(*) as count
     FROM contacts
     WHERE is_active = true
     GROUP BY type
     ORDER BY count DESC`
  )

  return {
    totalContacts,
    contactsLastMonth,
    unreadMessages,
    activeJobs,
    totalTestimonials,
    avgRating: Math.round(avgRating * 10) / 10,
    contactsByType: contactsByType.map(c => ({ type: c.type, count: parseInt(c.count, 10) })),
  }
}

/**
 * Get recent activity from audit log and other sources
 */
export async function getRecentActivity(limit: number = 10): Promise<RecentActivity[]> {
  const activities: RecentActivity[] = []

  // Get recent contacts
  const recentContacts = await query<{ id: string; first_name: string; last_name: string; created_at: string }>(
    `SELECT id, first_name, last_name, created_at
     FROM contacts
     WHERE is_active = true
     ORDER BY created_at DESC
     LIMIT 3`
  )

  for (const contact of recentContacts) {
    activities.push({
      id: contact.id,
      type: 'contact',
      text: `New contact added: ${contact.first_name} ${contact.last_name}`,
      time: getRelativeTime(new Date(contact.created_at)),
      created_at: contact.created_at,
    })
  }

  // Get recent testimonials
  const recentTestimonials = await query<{ id: string; client_name: string; is_published: boolean; created_at: string }>(
    `SELECT id, client_name, is_published, created_at
     FROM testimonials
     ORDER BY created_at DESC
     LIMIT 3`
  )

  for (const testimonial of recentTestimonials) {
    activities.push({
      id: testimonial.id,
      type: 'testimonial',
      text: testimonial.is_published
        ? `Testimonial approved: ${testimonial.client_name}`
        : `New testimonial from: ${testimonial.client_name}`,
      time: getRelativeTime(new Date(testimonial.created_at)),
      created_at: testimonial.created_at,
    })
  }

  // Get recent job postings
  const recentJobs = await query<{ id: string; title: string; created_at: string }>(
    `SELECT id, title, created_at
     FROM job_postings
     ORDER BY created_at DESC
     LIMIT 2`
  )

  for (const job of recentJobs) {
    activities.push({
      id: job.id,
      type: 'job',
      text: `Job posting created: ${job.title}`,
      time: getRelativeTime(new Date(job.created_at)),
      created_at: job.created_at,
    })
  }

  // Get recent notifications sent
  const recentNotifications = await query<{ id: string; channel: string; recipient_count: number; sent_at: string }>(
    `SELECT id, channel, recipient_count, sent_at
     FROM notification_logs
     WHERE status = 'sent'
     ORDER BY sent_at DESC
     LIMIT 2`
  )

  for (const notification of recentNotifications) {
    activities.push({
      id: notification.id,
      type: 'notification',
      text: `${notification.channel.toUpperCase()} sent to ${notification.recipient_count} recipient${notification.recipient_count !== 1 ? 's' : ''}`,
      time: getRelativeTime(new Date(notification.sent_at)),
      created_at: notification.sent_at,
    })
  }

  // Sort by created_at descending and limit
  return activities
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit)
}

/**
 * Helper to get relative time string
 */
function getRelativeTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}
