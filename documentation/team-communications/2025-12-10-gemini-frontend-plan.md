# Implementation Plan - Angels Care Home Health (Frontend Focus)

**Role:** Gemini (Frontend Lead)
**Dependencies:** Backend Core (Opus)

## Goal
Build the accessible, mobile-first frontend for `angelscare-homehealth.com` using Next.js 15, Tailwind CSS v4, and shadcn/ui.

## User Review Required

> [!IMPORTANT]
> **Visual Identity Confirmation:**
> -   **Primary Color:** `#1E40AF` (Medical Trust Blue)
> -   **Secondary Color:** `#D4A853` (Warm Gold)
> -   **Font Body:** 18px minimum size (Accessibility)
> -   **Icons:** Lucide React (Standard) with 'HelpCircle' for admin guidance.

## Proposed Changes

### Phase 1: Foundation (Frontend)

#### [NEW] `app/globals.css` (Tailwind v4)
-   Define CSS variables for the design system (Shadcn + Brand Colors).
-   `@theme` configuration for custom colors (`--color-primary`, `--color-secondary`).
-   Global Styles:
    -   `body { font-size: 18px; }` (Accessibility Policy).

#### [NEW] `components.json`
-   Shadcn UI configuration:
    -   Style: `default`
    -   Base Color: `slate`
    -   CSS Variables: `true`

#### [NEW] `components/ui/*`
-   **Install Core Components:**
    -   `button`, `input`, `textarea`, `label`, `card`
    -   `table`, `dialog`, `sheet` (for mobile nav)
    -   `tooltip` (Critical for Admin UX)
    -   `toast` (for feedback)

#### [NEW] `components/layout/main-nav.tsx`
-   Public navigation bar.
-   Sticky Header with "Call Now: (314) 381-0321".
-   Desktop: Horizontal list (Home, Services, About, Contact).
-   Mobile: Hamburger menu (Sheet component).

### Phase 2: Public Pages (Frontend)

#### [NEW] `app/(public)/page.tsx` (Home)
-   **Hero Section:** High-quality image, "Compassionate Care" headline, "Request Care" CTA (Gold).
-   **Services Grid:** 6 cards with icons summarizing core offerings.
-   **Trust Signals:** "Serving St. Louis since 1996", A+ BBB Badge placeholder.
-   **Reviews Method:** Carousel component for Testimonials.

#### [NEW] `app/(public)/services/page.tsx`
-   Detailed list of services.
-   Content sections for "Skilled Nursing", "Personal Care", "CDS".

#### [NEW] `app/(public)/contact/page.tsx`
-   Contact Form (React Hook Form + Zod).
-   Fields: Name, Phone, Email, Service Needed, Message.
-   Submit Action: Calls Backend API (Opus).

### Phase 3: Admin Dashboard UX (Frontend)

#### [NEW] `app/(admin)/layout.tsx`
-   **Sidebar:** Navigation (Dashboard, Contacts, Content, Settings).
-   **Header:** User profile, Logout.
-   **Providers:** `TooltipProvider` (Global).

#### [NEW] `app/(admin)/dashboard/page.tsx`
-   Stats Cards: Total Contacts, Recent Messages.
-   "Quick Actions" area.

#### [NEW] `app/(admin)/contacts/page.tsx`
-   **DataTable Component:**
    -   Sortable columns (Name, Type, Date).
    -   Pagination controls.
    -   Filter input.
-   **Import Button:** Triggers `ImportDialog`.
-   **Help System:**
    -   `<Tooltip>` on all action buttons.
    -   `HelpCircle` icon next to "Import" explaining the Excel format.

#### [NEW] `app/not-found.tsx`
-   Custom 404 page redirecting to Home.

## Verification Plan (Frontend)

### Visual Quality
-   **Mobile Check:** Verify Hamburger menu works on < 768px.
-   **Touch Targets:** Ensure all buttons are at least 48px height.
-   **Contrast:** Verify Blue/Gold text meets WCAG AA on white background.

### Interactions
-   **Forms:** Submit contact form, verify distinct "Loading" and "Success" states (Toast).
-   **Tooltips:** Hover over Admin buttons to verify help text appears.
-   **Navigation:** Verify active states on links.

### Automated
-   `npx playwright test` (Focus on rendering and navigation flows).
