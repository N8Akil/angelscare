# Angel's Care Admin Panel - UI/UX Polish Handoff

## Project Overview

**Project**: Angel's Care Home Health - Admin Dashboard
**Location**: `/mnt/extreme-pro/angelscare`
**Dev Server**: `http://localhost:3007`
**PM2 Process**: `angelscare`

This is a Next.js 15 admin panel for a home health care agency. The functionality is complete - we need UI/UX polish to make it feel premium, warm, and professional.

---

## Design System (Already Applied)

### Colors
```css
--navy: #1B3B5F;        /* Primary - headings, buttons, brand */
--gold: #D4A373;        /* Accent - badges, hover states, highlights */
--bg-base: #F5F2EA;     /* Background - warm beige */
--text-primary: #2C2C2C; /* Body text */
--text-muted: #6B6B6B;   /* Secondary text */
```

### Typography
- **Headings**: Merriweather (serif) - `font-display`
- **Body**: Inter (sans-serif) - `font-sans`
- **Emotional text**: Dancing Script - `text-script` (for taglines)

### Components
- shadcn/ui base components
- Cards with `shadow-lg shadow-navy/5`
- Buttons: Pill-shaped (`rounded-full`), matte finish
- Hover states: `hover:bg-gold/10`

---

## Pages to Polish

### 1. Dashboard (`/dashboard`)
**Current**: Placeholder stats cards + "Recent Activity Placeholder"
**Needs**:
- Real-looking placeholder data or skeleton loaders
- Better visual hierarchy
- Quick action buttons
- Welcoming header ("Good morning, Admin")

### 2. Contacts (`/contacts`)
**Current**: Functional table with search, filter, pagination
**Needs**:
- Better empty state illustration
- Row hover effects
- Type badges with distinct colors (Staff=navy, Client=gold, Vendor=gray)
- Bulk action toolbar when selecting

### 3. Add/Edit Contact (`/contacts/add`, `/contacts/[id]/edit`)
**Current**: Functional form with validation
**Needs**:
- Better form layout (2-column on desktop)
- Visual grouping of related fields
- Success animation on save

### 4. Notifications Hub (`/notifications`)
**Current**: Queue stats + action cards
**Needs**:
- Better card visuals (icons, gradients)
- Animated counters for stats
- More inviting "Compose" call-to-action

### 5. Compose Notification (`/notifications/compose`)
**Current**: 2-column layout with message + recipients
**Needs**:
- Better visual separation between panels
- Contact selection list polish (avatars, better badges)
- Preview mode before sending
- Character counter styling for SMS

### 6. Notification History (`/notifications/history`)
**Current**: Basic table
**Needs**:
- Status badges with icons (sent=green check, failed=red x)
- Expandable rows for message content
- Filter chips (All, SMS, Email, Failed)

### 7. Content Pages (`/content/careers`, `/content/testimonials`, `/content/faq`, `/content/gallery`)
**Status**: Need to verify these exist and what state they're in

### 8. Settings (`/settings`)
**Status**: Need to verify what exists

### 9. Login (`/login`)
**Current**: Basic form
**Needs**:
- Branded header/logo
- Warm, welcoming design
- Remember me checkbox styling

---

## Navigation (Just Updated)

The sidebar now has grouped navigation:

```
MAIN
├── Dashboard
├── Contacts
└── Notifications

CONTENT
├── Careers
├── Testimonials
├── FAQ
└── Gallery

SYSTEM
└── Settings

[Sign Out]
```

**Polish needed**:
- Active state indicator (gold left border or background)
- Subtle hover animations
- Collapsible groups on mobile

---

## Key Files

| Component | Location |
|-----------|----------|
| Admin Layout | `app/(admin)/layout.tsx` |
| Dashboard | `app/(admin)/dashboard/page.tsx` |
| Contacts List | `app/(admin)/contacts/page.tsx` |
| Contact Form | `components/forms/admin-contact-form.tsx` |
| Notifications Hub | `app/(admin)/notifications/page.tsx` |
| Compose Page | `app/(admin)/notifications/compose/page.tsx` |
| Type Filter | `components/admin/contact-type-filter.tsx` |
| Delete Button | `components/admin/delete-contact-button.tsx` |
| Import Dialog | `components/admin/import-dialog.tsx` |
| Global CSS | `app/globals.css` |

---

## Do NOT Change

1. **Server actions** in `lib/actions/` - These handle database operations
2. **Route structure** - The (admin) route group works correctly
3. **Database queries** - All in `lib/db.ts`
4. **Core functionality** - Forms, filters, delete, import all work

---

## Build & Test Commands

```bash
cd /mnt/extreme-pro/angelscare

# Development
npm run dev

# Build
npm run build

# Restart production
pm2 restart angelscare

# Screenshot any page
npx playwright screenshot --viewport-size="1920,1080" "http://localhost:3007/contacts" /tmp/screenshot.png
```

---

## Success Criteria

After polish, the admin panel should feel:
- **Warm** - Not clinical or cold
- **Professional** - Trustworthy for healthcare
- **Efficient** - Easy to scan, quick actions accessible
- **Consistent** - Same patterns across all pages
- **Responsive** - Works on tablet (staff may use iPad)

---

## Reference Screenshots

Take fresh screenshots before starting:
```bash
npx playwright screenshot "http://localhost:3007/dashboard" /tmp/before-dashboard.png
npx playwright screenshot "http://localhost:3007/contacts" /tmp/before-contacts.png
npx playwright screenshot "http://localhost:3007/notifications" /tmp/before-notifications.png
npx playwright screenshot "http://localhost:3007/notifications/compose" /tmp/before-compose.png
```
