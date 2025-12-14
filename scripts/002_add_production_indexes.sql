-- Angels Care - Production Optimization Indexes
-- Migration: 002_add_production_indexes.sql
-- Created: December 10, 2025
-- Purpose: Add indexes for production performance

-- ============================================
-- CONTACTS - Additional Indexes
-- ============================================

-- Email lookup for notifications
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email) WHERE email IS NOT NULL;

-- Phone lookup for SMS notifications
CREATE INDEX IF NOT EXISTS idx_contacts_phone ON contacts(phone) WHERE phone IS NOT NULL;

-- Notification preference filtering (for composing notifications)
CREATE INDEX IF NOT EXISTS idx_contacts_notif_pref ON contacts(notification_pref) WHERE is_active = true;

-- Combined filter for notification recipient selection
CREATE INDEX IF NOT EXISTS idx_contacts_type_active_notif
ON contacts(type, notification_pref)
WHERE is_active = true;

-- ============================================
-- NOTIFICATION QUEUE - Additional Indexes
-- ============================================

-- Status lookup for queue monitoring
CREATE INDEX IF NOT EXISTS idx_notification_queue_status ON notification_queue(status);

-- Contact lookup for queue items
CREATE INDEX IF NOT EXISTS idx_notification_queue_contact ON notification_queue(contact_id);

-- Failed items for retry UI
CREATE INDEX IF NOT EXISTS idx_notification_queue_failed
ON notification_queue(created_at DESC)
WHERE status = 'failed';

-- Processing items (to detect stuck items)
CREATE INDEX IF NOT EXISTS idx_notification_queue_processing
ON notification_queue(created_at)
WHERE status = 'processing';

-- ============================================
-- NOTIFICATION LOGS - Additional Indexes
-- ============================================

-- Filter by channel
CREATE INDEX IF NOT EXISTS idx_notification_logs_channel ON notification_logs(channel);

-- Filter by status
CREATE INDEX IF NOT EXISTS idx_notification_logs_status ON notification_logs(status);

-- Date range queries
CREATE INDEX IF NOT EXISTS idx_notification_logs_sent_at ON notification_logs(sent_at DESC);

-- ============================================
-- FAQ ITEMS - Category Index
-- ============================================

-- Category filtering (for grouped FAQ display)
CREATE INDEX IF NOT EXISTS idx_faq_category ON faq_items(category) WHERE is_published = true;

-- ============================================
-- GALLERY ITEMS - Media Type Index
-- ============================================

-- Filter by media type (images vs videos)
CREATE INDEX IF NOT EXISTS idx_gallery_media_type
ON gallery_items(media_type, display_order)
WHERE is_published = true;

-- ============================================
-- JOB POSTINGS - Additional Indexes
-- ============================================

-- Active jobs with expiry check
CREATE INDEX IF NOT EXISTS idx_jobs_active_expires
ON job_postings(is_active, expires_at)
WHERE is_active = true;

-- Employment type filter
CREATE INDEX IF NOT EXISTS idx_jobs_employment_type
ON job_postings(employment_type)
WHERE is_active = true;

-- ============================================
-- ADMIN USERS - Login lookup
-- ============================================

-- Email lookup for login (already UNIQUE, but explicit index helps)
CREATE INDEX IF NOT EXISTS idx_admin_email_active
ON admin_users(email)
WHERE is_active = true;

-- ============================================
-- CONTACT SUBMISSIONS - Date filtering
-- ============================================

-- New submissions for admin dashboard
CREATE INDEX IF NOT EXISTS idx_submissions_new
ON contact_submissions(created_at DESC)
WHERE status = 'new';

-- ============================================
-- ANALYZE TABLES
-- ============================================

-- Update statistics for query planner
ANALYZE contacts;
ANALYZE notification_queue;
ANALYZE notification_logs;
ANALYZE faq_items;
ANALYZE gallery_items;
ANALYZE job_postings;
ANALYZE testimonials;
ANALYZE admin_users;
ANALYZE contact_submissions;
ANALYZE admin_audit_log;

-- ============================================
-- SUMMARY
-- ============================================
-- This migration adds 18 new indexes optimized for:
-- 1. Notification recipient filtering
-- 2. Queue status monitoring
-- 3. Admin dashboard queries
-- 4. Public page content filtering
-- 5. Login performance
