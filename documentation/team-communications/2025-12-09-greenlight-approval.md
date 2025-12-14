# Project Greenlight: Angels Care Home Health Website Rebuild

**Date:** December 9, 2025
**From:** Claude (Planning Lead)
**To:** Claude Opus (Server-Side Lead), Gemini (Frontend Lead)
**Status:** APPROVED FOR IMPLEMENTATION

---

## Executive Summary

After comprehensive review of all project documentation, technical recommendations, and implementation plans, I am issuing formal approval to proceed with the Angels Care Home Health website rebuild.

The team has demonstrated thorough analysis, sound technical decisions, realistic phasing, and appropriate consideration for healthcare context and elderly user accessibility.

**Proceed immediately with Phase 1: Foundation.**

---

## Approved Technical Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4.1.9 |
| Components | shadcn/ui |
| Database | PostgreSQL 16 |
| Data Access | Raw SQL (pg Pool) |
| Authentication | Custom JWT + httpOnly cookies |
| Forms | React Hook Form + Zod |
| File Storage | Local filesystem |
| SMS Provider | TBD (Twilio preferred) |
| Email Provider | TBD (Resend preferred) |
| Testing | Playwright E2E |
| Process Manager | PM2 (angelscare) |
| Routing | Cloudflare Tunnel (Port 3007) |

---

## Approved Design System

### Brand Identity
- **Official Name:** Angels Care Home Health Services (with apostrophe)
- **Tagline:** Compassionate Care Since 1996

### Color Palette
| Role | Hex | Usage |
|------|-----|-------|
| Primary | #1E40AF | Headers, buttons, links (Medical Trust Blue) |
| Secondary | #D4A853 | Accents, CTAs, highlights (Warm Gold) |
| Accent | #059669 | Success states, health indicators |
| Background | #F8FAFC | Page backgrounds |
| Text | #1E293B | Body copy |

### Typography and Accessibility
- Body Text: 18px minimum
- Phone Numbers: 20-24px, bold, prominent
- Touch Targets: 48x48px minimum
- Color Contrast: 4.5:1 minimum (WCAG AA)

### Logo
**Gemini:** Generate placeholder logo using Google Nano Banana:
- Minimalist design featuring subtle angel wing integrated with heart symbol
- Blue (#1E40AF) and gold (#D4A853) color scheme
- Create variations: full logo, icon-only, horizontal lockup

---

## Confirmed Contact Information

| Field | Value |
|-------|-------|
| Business Phone | (314) 381-0321 |
| Address | 23 N Oaks Plz #245, Saint Louis, MO 63121 |
| Hours | Mon-Fri 8:00 AM - 4:00 PM |

### Email Configuration
| Public Address | Forwards To |
|----------------|-------------|
| info@angelscare-homehealth.com | angelcareinc@sbcglobal.net |
| careers@angelscare-homehealth.com | angelcareinc@sbcglobal.net |
| care@angelscare-homehealth.com | angelcareinc@sbcglobal.net |

**Implementation:** Configure Cloudflare Email Routing to forward all @angelscare-homehealth.com addresses to angelcareinc@sbcglobal.net.

---

## Gap Analysis Summary

| Current Site Problem | New Site Solution |
|---------------------|-------------------|
| Vivial template (no control) | Self-hosted Next.js 15 |
| 11 navigation items | 6-item streamlined nav |
| Visible placeholder content | Custom + AI-generated content |
| Gmail email (unprofessional) | Domain email with forwarding |
| No lead capture forms | Validated contact form |
| No admin access | Full owner dashboard |
| No contact management | PostgreSQL CRM with import |
| No notification capability | SMS/Email broadcast system |
| Only 4 pages indexed | 15 pages + schema markup |
| No accessibility focus | WCAG 2.1 AA compliant |

---

## Approved Page Structure

### Public Site (15 pages)
/, /about, /services, /services/skilled-nursing, /services/home-health-care, /services/consumer-directed-services, /services/personal-care, /services/elderly-home-care, /locations, /resources/faq, /careers, /gallery, /contact, /legal/privacy-policy, /legal/accessibility

### Admin Dashboard (13 sections)
/admin/dashboard, /admin/contacts, /admin/contacts/add, /admin/contacts/import, /admin/notifications/compose, /admin/notifications/history, /admin/content/testimonials, /admin/content/gallery, /admin/content/faq, /admin/content/careers, /admin/content/hero-images, /admin/content/services, /admin/settings

---

## Implementation Phases

### Phase 1: Foundation
- Initialize Next.js 15 project
- Configure Tailwind v4 with brand colors
- Install shadcn/ui core components
- Create PostgreSQL database
- Build database schema
- Implement raw SQL utility layer
- Build custom JWT authentication
- Create layout components
- Configure Cloudflare Email Routing
- Generate placeholder logo (Gemini via Nano Banana)

### Phase 2: Admin Dashboard
- Admin authentication flow
- Contact management CRUD
- Excel/CSV import (server-side parsing)
- Audit logging system
- Tooltip help system

### Phase 3: Public Site
- All 15 public pages
- Contact form with validation
- SEO schema markup

### Phase 4: Content Management
- Testimonials, Gallery, FAQ, Careers editors
- Hero image management

### Phase 5: Notification System
- SMS/Email provider integration
- Notification composer and queue

### Phase 6: Deploy and Polish
- PM2, Cloudflare Tunnel, backups
- Performance and accessibility audits

---

## Assignments

### Opus (Server-Side Lead)
1. Initialize project and database
2. Build backend infrastructure
3. Implement contact management APIs
4. Build notification system
5. Configure deployment

### Gemini (Frontend Lead)
1. Configure Tailwind v4 design system
2. Install/customize shadcn/ui
3. Generate placeholder logo via Nano Banana
4. Build all page layouts
5. Build admin dashboard UI
6. Implement forms
7. Ensure accessibility compliance

---

## Success Criteria

- 15/15 public pages functional
- 13/13 admin sections functional
- Mobile responsive at all breakpoints
- LCP under 2.5 seconds
- WCAG 2.1 AA pass
- Contact form, admin login, Excel import, notifications all working

---

## Timeline

- Phase 1-2: 1 week
- Phase 3-4: 1 week
- Phase 5-6: 1 week
- **Estimated completion: 3 weeks**

---

## Approval

**Project:** Angels Care Home Health Website Rebuild
**Domain:** angelscare-homehealth.com
**Port:** 3007
**PM2 Process:** angelscare

GREENLIGHT ISSUED

*Approved by Claude (Planning Lead) - December 9, 2025*
