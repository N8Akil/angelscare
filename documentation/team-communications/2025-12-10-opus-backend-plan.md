# Implementation Plan - Angels Care Home Health (Backend Focus)

**Role:** Claude Opus (Backend Lead)
**Dependencies:** Frontend (Gemini)
**Database:** PostgreSQL 16
**Data Access:** Raw SQL via `pg` Pool

---

## Goal

Build the backend API, database schema, authentication system, and notification infrastructure for `angelscare-homehealth.com` using Next.js 15 API routes with raw SQL.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 15 App                           │
├─────────────────────────────────────────────────────────────┤
│  Public Pages (Gemini)  │  Admin Dashboard (Gemini)         │
├─────────────────────────┼───────────────────────────────────┤
│                    API Routes (Opus)                        │
│  /api/auth/*  │  /api/contacts/*  │  /api/notifications/*   │
│  /api/content/*  │  /api/uploads/*  │  /api/google/*        │
├─────────────────────────────────────────────────────────────┤
│                    Database Layer (Opus)                    │
│  lib/db.ts (pg Pool)  │  Raw SQL Queries                    │
├─────────────────────────────────────────────────────────────┤
│                    PostgreSQL 16                            │
│  Database: angelscare                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Foundation (Backend)

### Database Setup

#### [NEW] `scripts/001_init_database.sql`
```sql
-- Create database (run manually)
-- CREATE DATABASE angelscare;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

#### [NEW] `scripts/002_create_tables.sql`

**Admin Users Table:**
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  last_login TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Contacts Table:**
```sql
CREATE TYPE contact_type AS ENUM ('staff', 'client', 'vendor', 'referral_source', 'other');
CREATE TYPE notification_pref AS ENUM ('sms', 'email', 'both', 'none');

CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type contact_type NOT NULL DEFAULT 'client',
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(2) DEFAULT 'MO',
  zip VARCHAR(10),
  notification_pref notification_pref DEFAULT 'both',
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contacts_type ON contacts(type);
CREATE INDEX idx_contacts_name ON contacts(last_name, first_name);
```

**Content Tables:**
```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  source VARCHAR(50) DEFAULT 'manual', -- 'manual', 'google'
  google_review_id VARCHAR(255),
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255),
  description TEXT,
  file_path VARCHAR(500) NOT NULL,
  thumbnail_path VARCHAR(500),
  media_type VARCHAR(50) DEFAULT 'image', -- 'image', 'video'
  alt_text VARCHAR(255),
  is_published BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE faq_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(100),
  is_published BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  location VARCHAR(255) DEFAULT 'St. Louis, MO',
  employment_type VARCHAR(50) DEFAULT 'full-time', -- 'full-time', 'part-time', 'contract'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug VARCHAR(100) NOT NULL,
  section_key VARCHAR(100) NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by UUID REFERENCES admin_users(id),
  UNIQUE(page_slug, section_key)
);

CREATE TABLE hero_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_slug VARCHAR(100) NOT NULL,
  image_path VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  headline VARCHAR(255),
  subheadline TEXT,
  cta_text VARCHAR(100),
  cta_link VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Notification Tables:**
```sql
CREATE TYPE notification_channel AS ENUM ('sms', 'email');
CREATE TYPE notification_status AS ENUM ('pending', 'processing', 'sent', 'failed');

CREATE TABLE notification_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_users(id),
  recipient_filter JSONB, -- {"type": "staff"} or {"ids": [...]}
  recipient_count INTEGER NOT NULL,
  channel notification_channel NOT NULL,
  subject VARCHAR(255),
  body TEXT NOT NULL,
  status notification_status DEFAULT 'sent',
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE notification_queue (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contact_id UUID REFERENCES contacts(id),
  channel notification_channel NOT NULL,
  subject VARCHAR(255),
  body TEXT NOT NULL,
  status notification_status DEFAULT 'pending',
  attempts INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 3,
  error_message TEXT,
  scheduled_for TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notification_queue_pending
ON notification_queue(scheduled_for)
WHERE status = 'pending';
```

**Audit Log Table:**
```sql
CREATE TABLE admin_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID REFERENCES admin_users(id),
  action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'login', 'logout', 'export', 'import', 'send_notification'
  entity_type VARCHAR(50) NOT NULL, -- 'contact', 'testimonial', 'job_posting', etc.
  entity_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_admin ON admin_audit_log(admin_id);
CREATE INDEX idx_audit_log_date ON admin_audit_log(created_at DESC);
```

**Contact Form Submissions:**
```sql
CREATE TYPE submission_status AS ENUM ('new', 'read', 'replied', 'archived');

CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  service_needed VARCHAR(100),
  message TEXT NOT NULL,
  status submission_status DEFAULT 'new',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_status ON contact_submissions(status);
```

---

### Database Connection Layer

#### [NEW] `lib/db.ts`
```typescript
import { Pool, QueryResult } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<T[]> {
  const result: QueryResult<T> = await pool.query(text, params)
  return result.rows
}

export async function queryOne<T = any>(
  text: string,
  params?: any[]
): Promise<T | null> {
  const rows = await query<T>(text, params)
  return rows[0] || null
}

export async function transaction<T>(
  callback: (client: any) => Promise<T>
): Promise<T> {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await callback(client)
    await client.query('COMMIT')
    return result
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

export { pool }
```

---

## Phase 2: Authentication System

### API Routes

#### [NEW] `app/api/auth/login/route.ts`
- POST: Verify email/password, create JWT, set httpOnly cookie
- Rate limiting: 5 attempts per 15 minutes
- Audit log: Record login attempt

#### [NEW] `app/api/auth/logout/route.ts`
- POST: Clear auth cookie
- Audit log: Record logout

#### [NEW] `app/api/auth/me/route.ts`
- GET: Return current admin user (from JWT)
- Used for session validation

#### [NEW] `lib/auth.ts`
```typescript
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET!
const COOKIE_NAME = 'angelscare_admin_token'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function createToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  })
}

export async function getAuthCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value || null
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
```

#### [NEW] `middleware.ts`
- Protect `/admin/*` routes
- Verify JWT from cookie
- Redirect to login if invalid
- Add user info to request headers

---

## Phase 3: Contact Management API

#### [NEW] `app/api/contacts/route.ts`
- GET: List contacts with pagination, filtering, sorting
  - Query params: `?type=staff&page=1&limit=20&search=john`
- POST: Create single contact
- Audit log: Record create

#### [NEW] `app/api/contacts/[id]/route.ts`
- GET: Single contact by ID
- PUT: Update contact
- DELETE: Soft delete (set is_active = false)
- Audit log: Record update/delete

#### [NEW] `app/api/contacts/import/route.ts`
- POST: Accept multipart form with Excel/CSV file
- Parse server-side with `xlsx` library
- Validate all rows before inserting
- Return: { success: number, failed: number, errors: [] }
- Audit log: Record import with count

#### [NEW] `app/api/contacts/export/route.ts`
- GET: Export contacts as CSV
- Query params: `?type=staff` (optional filter)
- Audit log: Record export

---

## Phase 4: Content Management API

#### [NEW] `app/api/testimonials/route.ts`
- GET: List testimonials (public: published only, admin: all)
- POST: Create testimonial

#### [NEW] `app/api/testimonials/[id]/route.ts`
- GET, PUT, DELETE

#### [NEW] `app/api/gallery/route.ts`
- GET: List gallery items
- POST: Create with file upload

#### [NEW] `app/api/gallery/[id]/route.ts`
- GET, PUT, DELETE

#### [NEW] `app/api/faq/route.ts`
- GET: List FAQ items
- POST: Create FAQ

#### [NEW] `app/api/faq/[id]/route.ts`
- GET, PUT, DELETE

#### [NEW] `app/api/jobs/route.ts`
- GET: List job postings (public: active only)
- POST: Create job posting

#### [NEW] `app/api/jobs/[id]/route.ts`
- GET, PUT, DELETE

#### [NEW] `app/api/content/[pageSlug]/[sectionKey]/route.ts`
- GET: Get editable content block
- PUT: Update content block

#### [NEW] `app/api/hero/[pageSlug]/route.ts`
- GET: Get hero images for page
- POST: Add hero image
- PUT: Update hero
- DELETE: Remove hero

---

## Phase 5: File Upload System

#### [NEW] `app/api/uploads/route.ts`
- POST: Handle file uploads
- Validate: mime type (images only for public), file size (10MB max)
- Generate UUID filename
- Save to `/mnt/extreme-pro/AngelsCare/uploads/`
- Return: { path: '/uploads/gallery/uuid.jpg' }

#### [NEW] `lib/uploads.ts`
```typescript
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'

const UPLOAD_DIR = '/mnt/extreme-pro/AngelsCare/uploads'

const ALLOWED_MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
}

export async function saveUpload(
  file: File,
  subdir: string = 'general'
): Promise<string> {
  const mimeType = file.type
  const ext = ALLOWED_MIME_TYPES[mimeType as keyof typeof ALLOWED_MIME_TYPES]

  if (!ext) {
    throw new Error('Invalid file type')
  }

  const filename = `${uuidv4()}.${ext}`
  const dir = join(UPLOAD_DIR, subdir)
  const filepath = join(dir, filename)

  await mkdir(dir, { recursive: true })

  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(filepath, buffer)

  return `/uploads/${subdir}/${filename}`
}
```

---

## Phase 6: Notification System

#### [NEW] `app/api/notifications/compose/route.ts`
- POST: Queue notifications for sending
- Body: { channel: 'sms'|'email', recipientFilter: {...}, subject?, body }
- Create notification_log entry
- Queue individual messages in notification_queue

#### [NEW] `app/api/notifications/history/route.ts`
- GET: List sent notifications with pagination

#### [NEW] `lib/notifications/sms.ts`
- Twilio integration for SMS sending
- Rate limiting per contact

#### [NEW] `lib/notifications/email.ts`
- Resend integration for email sending
- Template support

#### [NEW] `scripts/process-notification-queue.ts`
- Standalone script to process queue
- Run via PM2 cron every 30 seconds
- Process batch of 10 messages
- Update status, increment attempts
- Log errors

---

## Phase 7: Public Contact Form

#### [NEW] `app/api/contact/route.ts`
- POST: Receive contact form submission
- Validate with Zod schema
- Rate limit: 3 submissions per IP per hour
- Optional: Send notification to admin email
- Store in contact_submissions table

---

## Phase 8: Google Reviews Integration

#### [NEW] `app/api/google/reviews/route.ts`
- GET: Fetch reviews from Google Places API
- Cache results for 24 hours
- Transform to testimonial format

#### [NEW] `app/api/google/sync/route.ts`
- POST: Sync Google reviews to testimonials table
- Mark source as 'google'
- Skip duplicates by google_review_id

---

## Phase 9: Backup System

#### [NEW] `scripts/backup.sh`
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/mnt/extreme-pro/backups/angelscare

mkdir -p $BACKUP_DIR

# Database backup
PGPASSWORD=postgres pg_dump -U postgres angelscare | gzip > "$BACKUP_DIR/db-$DATE.sql.gz"

# Uploads backup
tar -czf "$BACKUP_DIR/uploads-$DATE.tar.gz" /mnt/extreme-pro/AngelsCare/uploads

# Retain 30 days
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

#### [NEW] PM2 Cron Configuration
```bash
# Add to crontab or PM2 ecosystem
0 3 * * * /mnt/extreme-pro/AngelsCare/scripts/backup.sh
```

---

## Environment Variables Required

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/angelscare

# Authentication
JWT_SECRET=<generate-secure-random-string>

# Twilio (SMS)
TWILIO_ACCOUNT_SID=<account-sid>
TWILIO_AUTH_TOKEN=<auth-token>
TWILIO_PHONE_NUMBER=<phone-number>

# Resend (Email)
RESEND_API_KEY=<api-key>
RESEND_FROM_EMAIL=noreply@angelscare-homehealth.com

# Google Places API (Reviews)
GOOGLE_PLACES_API_KEY=<api-key>
GOOGLE_PLACE_ID=<place-id>

# File Storage
UPLOAD_DIR=/mnt/extreme-pro/AngelsCare/uploads
```

---

## API Response Standards

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**List Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": { ... }
  }
}
```

---

## Verification Plan (Backend)

### Database
- [ ] All migrations run successfully
- [ ] Indexes created for query performance
- [ ] Enums match expected values

### Authentication
- [ ] Login creates valid JWT
- [ ] Invalid credentials return 401
- [ ] Protected routes reject unauthenticated requests
- [ ] Session timeout after 24 hours

### CRUD Operations
- [ ] Contacts: Create, Read, Update, Delete (soft)
- [ ] Import: Excel parsing, validation, bulk insert
- [ ] Export: CSV generation with proper encoding

### Notifications
- [ ] SMS sends via Twilio
- [ ] Email sends via Resend
- [ ] Queue processes in background
- [ ] Failed messages retry up to max_attempts

### Audit Trail
- [ ] All admin actions logged
- [ ] IP address captured
- [ ] Timestamps accurate

### File Uploads
- [ ] Images save to correct directory
- [ ] Invalid file types rejected
- [ ] File size limits enforced

---

## Frontend Integration Points

| Frontend Component | Backend API | Notes |
|--------------------|-------------|-------|
| Contact Form | `POST /api/contact` | Zod validation shared |
| Admin Login | `POST /api/auth/login` | Returns JWT in cookie |
| Contact Table | `GET /api/contacts` | Pagination, filters |
| Import Dialog | `POST /api/contacts/import` | Multipart form |
| Testimonial Editor | `/api/testimonials/*` | CRUD |
| Gallery Manager | `/api/gallery/*` | With file upload |
| Notification Composer | `POST /api/notifications/compose` | Queue-based |

---

**Document Status:** Implementation Plan Complete - Pending Approval
**Next Action:** Await greenlight to begin Phase 1 (Database Setup)
**Prepared By:** Claude Opus (Backend Lead)
