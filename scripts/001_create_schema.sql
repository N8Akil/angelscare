-- Angels Care Home Health Database Schema
-- Created: December 10, 2025

-- Extensions (already created)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE contact_type AS ENUM ('staff', 'client', 'vendor', 'referral_source', 'other');
CREATE TYPE notification_pref AS ENUM ('sms', 'email', 'both', 'none');
CREATE TYPE notification_channel AS ENUM ('sms', 'email');
CREATE TYPE notification_status AS ENUM ('pending', 'processing', 'sent', 'failed');
CREATE TYPE submission_status AS ENUM ('new', 'read', 'replied', 'archived');
CREATE TYPE employment_type AS ENUM ('full-time', 'part-time', 'contract');
CREATE TYPE media_type AS ENUM ('image', 'video');

-- ============================================
-- ADMIN USERS
-- ============================================

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

-- ============================================
-- CONTACTS (CRM)
-- ============================================

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
CREATE INDEX idx_contacts_active ON contacts(is_active) WHERE is_active = true;

-- ============================================
-- CONTACT FORM SUBMISSIONS (Public)
-- ============================================

CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(255),
    service_type VARCHAR(100),
    message TEXT,
    status submission_status DEFAULT 'new',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_submissions_status ON contact_submissions(status);
CREATE INDEX idx_submissions_date ON contact_submissions(created_at DESC);

-- ============================================
-- TESTIMONIALS
-- ============================================

CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    source VARCHAR(50) DEFAULT 'manual',
    google_review_id VARCHAR(255),
    is_published BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_testimonials_published ON testimonials(is_published, display_order) WHERE is_published = true;

-- ============================================
-- GALLERY
-- ============================================

CREATE TABLE gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    description TEXT,
    file_path VARCHAR(500) NOT NULL,
    thumbnail_path VARCHAR(500),
    media_type media_type DEFAULT 'image',
    alt_text VARCHAR(255),
    is_published BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_gallery_published ON gallery_items(is_published, display_order) WHERE is_published = true;

-- ============================================
-- FAQ
-- ============================================

CREATE TABLE faq_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100),
    is_published BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_faq_published ON faq_items(is_published, display_order) WHERE is_published = true;

-- ============================================
-- JOB POSTINGS
-- ============================================

CREATE TABLE job_postings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    location VARCHAR(255) DEFAULT 'St. Louis, MO',
    employment_type employment_type DEFAULT 'full-time',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

CREATE INDEX idx_jobs_active ON job_postings(is_active) WHERE is_active = true;

-- ============================================
-- SITE CONTENT (Editable blocks)
-- ============================================

CREATE TABLE site_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_slug VARCHAR(100) NOT NULL,
    section_key VARCHAR(100) NOT NULL,
    content JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id),
    UNIQUE(page_slug, section_key)
);

-- ============================================
-- HERO IMAGES
-- ============================================

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

CREATE INDEX idx_hero_page ON hero_images(page_slug, is_active, display_order);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE notification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admin_users(id),
    recipient_filter JSONB,
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

-- ============================================
-- AUDIT LOG
-- ============================================

CREATE TABLE admin_audit_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES admin_users(id),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_log_admin ON admin_audit_log(admin_id);
CREATE INDEX idx_audit_log_date ON admin_audit_log(created_at DESC);
CREATE INDEX idx_audit_log_entity ON admin_audit_log(entity_type, entity_id);

-- ============================================
-- INITIAL ADMIN USER
-- Password: 'angelscare2025' (bcrypt hashed)
-- ============================================

INSERT INTO admin_users (email, password_hash, name) VALUES (
    'admin@angelscare-homehealth.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4qYUV5RzPfQHqXxW',
    'Admin User'
);

-- ============================================
-- SEED DATA: FAQ
-- ============================================

INSERT INTO faq_items (question, answer, category, display_order) VALUES
('What areas do you serve?', 'We serve St. Louis City/County, Jefferson County, and St. Charles County, including Jennings, Normandy, Dellwood, and Ferguson.', 'Services', 1),
('How long have you been in business?', 'Angel''s Care Home Health Services has been proudly serving the St. Louis community since 1996 - that''s over 29 years of compassionate care.', 'About Us', 2),
('What is Consumer Directed Services (CDS)?', 'CDS is a Missouri Medicaid program that allows eligible individuals to hire, train, and direct their own personal care attendants, including family members (except spouses). You must be 18+, eligible for MO HealthNet, and able to direct your own care.', 'Services', 3),
('How do I get started with your services?', 'Simply call us at (314) 381-0321 or fill out our contact form. We''ll schedule a free consultation to assess your needs and create a personalized care plan.', 'Getting Started', 4),
('Are your caregivers background checked?', 'Yes, all our caregivers undergo thorough background checks through the Family Care Safety Registry (FCSR) and are fully vetted before joining our team.', 'Safety', 5);

-- ============================================
-- SEED DATA: Testimonials
-- ============================================

INSERT INTO testimonials (client_name, content, rating, is_published, display_order) VALUES
('Margaret W.', 'The caregivers from Angel''s Care have been a blessing. They treat my mother with such respect and kindness. Highly recommend!', 5, true, 1),
('James T.', 'Professional, reliable, and genuinely caring staff. They helped my father maintain his independence at home.', 5, true, 2),
('Sandra M.', 'After trying several agencies, Angel''s Care stood out. They truly understand what families need during difficult times.', 5, true, 3);

COMMIT;
