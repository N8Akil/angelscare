# Angels Care Home Health Website Rebuild
## Initial Diagnosis & Project Plan

**Project Manager:** Claude (Planning Lead)
**Implementation Review:** Gemini (Agent)
**Date:** December 10, 2025
**Client:** Angels Care Home Health Services (St. Louis, MO)
**Domain:** angelscare-homehealth.com

---

## Executive Summary

Angels Care Home Health Services requires a complete website rebuild to replace their current Vivial template site (angelscarehomehealth.com). The new site will be self-hosted on existing infrastructure and include an owner-managed admin dashboard for contact management, group notifications, and content editing. The architecture must leave endpoints open for future EHR/scheduling system integrations.

---

## Part 1: Current State Analysis

### Existing Site (angelscarehomehealth.com)

**Platform:** Vivial template-based website builder

**Business Information:**
- Company: Angels Care Home Health Services
- Established: 1996 (28+ years in operation)
- Address: 23 N Oaks Plz #245, Saint Louis, MO 63121
- Phone: (314) 381-0321
- Email: ecoffman50angelcare@gmail.com
- Service Area: St. Louis metro, Jefferson County, St. Charles County

**Current Navigation (11 items):**
1. Home
2. About Angels Care
3. Home Health Care
4. Consumer Directed Services
5. Personal Care
6. Elderly Home Care
7. FAQ
8. Resources
9. Career Opportunities
10. Gallery
11. Contact Us

**Services Offered:**
- Skilled Nursing (RN visits, ostomy/catheter care, medication management)
- Personal Care (bathing, dressing, hygiene assistance)
- Home Health Care (comprehensive in-home services)
- Consumer Directed Services (Missouri Medicaid program)
- Household Services (cleaning, laundry, cooking)
- Respite Care

**Identified Issues:**

| Issue | Severity | Notes |
|-------|----------|-------|
| Placeholder content visible | High | Slide title and Write your caption here text |
| No API architecture | High | Cannot integrate external systems |
| Template limitations | High | No customization control |
| Unprofessional email | Medium | Gmail address, inconsistent addresses |
| Navigation overload | Medium | 11 items exceeds mobile best practices |
| No trust signals | Medium | Missing certifications, reviews, ratings |
| No digital tools | High | No forms, portal, or scheduling |
| No SEO structure | Medium | Missing schema markup, meta optimization |

---

## Part 2: Infrastructure Assessment

### Available Server Resources

**Connection:**
- IP: 192.168.1.50
- User: n8
- Project Path: /mnt/extreme-pro/AngelsCare

**Hardware:**

| Component | Specification |
|-----------|---------------|
| CPU | AMD Ryzen 9 7950X3D (16-core/32-thread) |
| RAM | 64GB DDR5 |
| GPU | 2x NVIDIA RTX 5070 (12GB VRAM each) |
| Storage (OS) | 98GB NVMe (36GB free) |
| Storage (Data) | 3.6TB SSD (3.4TB free) |

**Software Stack:**

| Software | Version |
|----------|---------|
| OS | Ubuntu 24.04.3 LTS |
| Node.js | 22.17.1 LTS |
| PostgreSQL | 16.11 |
| PM2 | 6.0.11 |
| Nginx | 1.24.0 |
| Cloudflared | 2025.11.1 |

**Existing Routing Pattern:**
Cloudflare DNS -> Cloudflare Tunnel -> localhost:PORT -> PM2 -> Next.js App

**Current PM2 Processes:**

| Name | Port | Status |
|------|------|--------|
| enclave-tunnel | - | online |
| ienclave-frontend | 3004 | online |
| king-blvd | 3005 | online |
| queen-blvd | 3006 | online |

**Available Port:** 3007

---

## Part 3: Project Requirements

### Primary Objectives

1. Replace existing template website with modern, accessible, self-hosted solution
2. Create owner-managed admin dashboard for ongoing content updates
3. Implement contact management system for staff and client records
4. Build group notification system for SMS/email broadcasts (non-PHI)
5. Prepare API architecture for future system integrations

### Functional Requirements

**Public Website:**
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1 AA) for elderly users
- SEO-optimized with schema markup
- Core Web Vitals performance targets
- Click-to-call phone functionality
- Contact form with validation

**Admin Dashboard:**
- Secure authentication (owner access only)
- Contact management with single entry and bulk Excel import
- Notification composer (SMS and/or email)
- Content editors for: testimonials, gallery, FAQ, job postings, hero images, service descriptions
- Export functionality for contact lists

**Technical:**
- Self-hosted on existing infrastructure
- PostgreSQL database
- Local file storage for uploads
- Cloudflare Tunnel routing
- API endpoint placeholders for future integrations

### Non-Functional Requirements

| Requirement | Specification |
|-------------|---------------|
| Font Size | 18px minimum body text |
| Touch Targets | 48x48px minimum |
| Color Contrast | 4.5:1 minimum |
| Phone Display | 20-24px, prominent placement |
| Page Load (LCP) | <= 2.5 seconds |
| Mobile Responsive | All breakpoints |

---

## Part 4: Proposed Architecture

### Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Next.js 15 (App Router) | Matches existing apps, SSR/SSG flexibility |
| Language | TypeScript | Type safety, better DX |
| Styling | Tailwind CSS v4 | Rapid development, consistent design |
| Database | PostgreSQL 16 | Already installed, reliable |
| ORM | Prisma | Type-safe queries, migrations |
| Auth | NextAuth.js | Simple admin authentication |
| File Storage | Local filesystem | /mnt/extreme-pro/AngelsCare/uploads |
| SMS Provider | Twilio or Telnyx | Reliable APIs, reasonable cost |
| Email Provider | Resend or SendGrid | Developer-friendly, deliverability |
| Process Manager | PM2 | Matches existing pattern |
| Routing | Cloudflare Tunnel | Matches existing pattern |

### Database Schema

**Tables Required:**

| Table | Purpose |
|-------|---------|
| contacts | Staff and client records |
| testimonials | Client reviews |
| gallery_items | Photos and videos |
| faq_items | Questions and answers |
| job_postings | Career listings |
| site_content | Editable text content |
| hero_images | Banner images per page |
| notification_logs | Sent message history |
| admin_users | Admin authentication |

### Routing Configuration

**Cloudflare Tunnel Addition:**
- hostname: angelscare-homehealth.com -> http://127.0.0.1:3007
- hostname: www.angelscare-homehealth.com -> http://127.0.0.1:3007

**PM2 Process:**
- Name: angelscare
- Port: 3007

---

## Part 5: Site Structure & Content

### Navigation (Simplified from 11 to 6)

**Primary Navigation:**
Services | About | Locations | Resources | Careers | Contact

**Utility Navigation:**
(314) 381-0321 | Admin Login

### Page Inventory

| Page | Route | Purpose |
|------|-------|---------|
| Homepage | / | Primary landing |
| About | /about | Company story, team |
| Services Hub | /services | Service overview |
| Skilled Nursing | /services/skilled-nursing | Service detail |
| Home Health Care | /services/home-health-care | Service detail |
| Consumer Directed | /services/consumer-directed-services | Service detail |
| Personal Care | /services/personal-care | Service detail |
| Elderly Home Care | /services/elderly-home-care | Service detail |
| Locations | /locations | Service area map |
| FAQ | /resources/faq | Questions |
| Careers | /careers | Job listings |
| Gallery | /gallery | Photos/videos |
| Contact | /contact | Contact form |
| Privacy Policy | /legal/privacy-policy | Legal |
| Accessibility | /legal/accessibility | Legal |

**Total Public Pages:** 15

### Admin Dashboard Pages

| Section | Route | Functionality |
|---------|-------|---------------|
| Dashboard | /admin/dashboard | Overview, quick stats |
| Contact List | /admin/contacts | View, search, filter contacts |
| Add Contact | /admin/contacts/add | Single entry form |
| Import Contacts | /admin/contacts/import | Excel/CSV upload |
| Compose Notification | /admin/notifications/compose | SMS/email builder |
| Notification History | /admin/notifications/history | Sent message log |
| Testimonials | /admin/content/testimonials | Manage reviews |
| Gallery | /admin/content/gallery | Manage media |
| FAQ | /admin/content/faq | Manage Q&A |
| Careers | /admin/content/careers | Manage job postings |
| Hero Images | /admin/content/hero-images | Manage banners |
| Service Content | /admin/content/services | Edit service pages |
| Settings | /admin/settings | Company info, API keys |

**Total Admin Pages:** 13

---

## Part 6: Implementation Phases

### Phase 1: Foundation
- Project initialization (Next.js 15, TypeScript, Tailwind)
- Database setup (PostgreSQL, Prisma schema)
- Authentication setup (NextAuth.js)
- Base component library
- Layout components (public header/footer, admin sidebar)

### Phase 2: Public Site
- Homepage
- About page
- All service pages (5)
- Locations page
- FAQ page
- Careers page (static initially)
- Gallery page (static initially)
- Contact page with form
- Legal pages
- SEO implementation (meta tags, schema markup)

### Phase 3: Admin Dashboard
- Admin authentication and protected routes
- Contact management (CRUD, list, search)
- Excel/CSV import functionality
- Content editors (testimonials, FAQ, gallery, jobs)
- Hero image management
- Service content editing

### Phase 4: Notification System
- Twilio/Telnyx integration for SMS
- Resend/SendGrid integration for email
- Notification composer UI
- Recipient selection (all staff, all clients, custom)
- Message history and logging

### Phase 5: Deployment & Polish
- PM2 configuration
- Cloudflare Tunnel setup
- Performance optimization
- Accessibility audit
- Testing and QA

### Phase 6: Future (Post-Launch)
- API integration endpoints for EHR systems
- AI chatbot (leveraging dual RTX 5070 GPUs)
- Patient portal (if needed)
- Online scheduling integration

---

## Part 7: Open Questions for Client

1. **Old Domain:** Will angelscarehomehealth.com (no hyphen) redirect to the new domain, or is it being abandoned?
2. **Professional Email:** Should we set up email on the new domain (e.g., info@angelscare-homehealth.com)?
3. **Staff Photos:** Does the owner want to display team member photos on the site?
4. **Notification Preferences:** Whats the expected volume of notifications (monthly)? This affects provider selection.
5. **Content Migration:** Is there any content from the old site to preserve, or is this a fresh start?
6. **Certifications:** Does Angels Care have Medicare certification, state licenses, or accreditations to display?
7. **Google Reviews:** Does the business have existing Google reviews to reference?

---

## Part 8: Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Content delay from client | Medium | High | Provide content templates, use placeholder content initially |
| SMS/Email delivery issues | Low | Medium | Use established providers (Twilio, SendGrid), test thoroughly |
| Admin user training | Medium | Medium | Create documentation, simple UI design |
| Performance on mobile | Low | High | Mobile-first development, Core Web Vitals monitoring |
| Database growth | Low | Low | PostgreSQL handles scale well, 3.4TB available |

---

## Part 9: Success Criteria

1. Functional website accessible at angelscare-homehealth.com
2. All 15 public pages rendering correctly on desktop and mobile
3. Admin dashboard allowing owner to manage contacts and content without developer assistance
4. Notification system successfully sending SMS and email to test recipients
5. Page load times under 2.5 seconds (LCP)
6. Accessibility compliance passing automated WCAG 2.1 AA checks
7. SEO foundation with proper meta tags and schema markup

---

## Handoff Notes for Gemini

Gemini, please review this diagnosis and plan. Specifically, I would like your recommendations on:

1. **Component library approach** - Build custom, use shadcn/ui, or other?
2. **Excel parsing** - Client-side (SheetJS) vs server-side approach for imports
3. **File upload handling** - Direct to filesystem vs presigned URLs vs other
4. **Notification queue** - Simple direct send vs background job queue
5. **Admin UI framework** - Custom build vs admin template
6. **Form handling** - React Hook Form + Zod vs alternatives
7. **State management** - Server components + Server Actions vs client state
8. **Testing strategy** - What level of testing for this project scope
9. **Any architectural concerns** with the proposed structure
10. **Implementation order** within phases - what to prioritize

Return your recommendations and I will review before finalizing the implementation plan.

---

**Document Status:** Initial Draft - Pending Agent Review
**Next Action:** Gemini review and recommendations
**Final Approval:** Claude (Planning Lead)
