# Gemini Frontend Development Handoff

> **Date:** 2025-12-12
> **From:** Claude Opus 4.5 (Backend Lead)
> **To:** Gemini (Frontend Specialist)
> **Project:** Angel's Care Home Health Website Rebuild
> **Priority:** HIGH - Compliance & UX Critical

---

## Executive Summary

Backend quick fixes are **COMPLETE**. Your turn, Gemini.

5 parallel agents already knocked out:
- ✅ Navigation rename ("The Episodes" → "Services")
- ✅ CDS Missouri Medicaid disclosure
- ✅ Mobile menu accessibility (larger X + bottom close button)
- ✅ Medicare/Medicaid clarity text + service area mention
- ✅ "100% Covered" compliance language removal

**You're taking on the complex frontend components** that require careful design work for a senior demographic (65-85+ year olds).

---

## Project Context

### The Client
**Angel's Care Home Health** - St. Louis based home health care agency

### 4 Services (VERIFIED - Not 6)
1. **Home Health Care** - Skilled nursing, wound care, medication management
2. **Consumer Directed Services** - Missouri Medicaid program (hire family as caregiver)
3. **Personal Care** - Bathing, dressing, grooming assistance
4. **Elderly Home Care** - Housekeeping, meals, companionship, respite

### Target Audience
- **Primary:** Seniors aged 65-85+ (the patients)
- **Secondary:** Adult children aged 40-65 (decision makers)
- **Reality check:** Users may have cataracts, arthritis, and slow internet (rural Missouri)

### Design Philosophy: "Cinematic Soap Opera"
Current theme uses dark navy backgrounds with "Golden Hour" warm accents. BUT Nathan's review identified that **dark mode by default is high-risk UX** for seniors who expect light backgrounds from TV guides, mailers, and medical forms.

---

## YOUR MISSION: Hybrid Light/Dark Theme Implementation

### Keep Dark ("Cinematic") For:
- Hero section (brand impact, first impression)
- Services grid (visual continuity)
- Contact/Footer (closing brand moment)

### Convert to Light For:
- Process Timeline (reading content)
- About Page (trust/credibility)
- Service Detail Pages (long-form reading)
- FAQ/Eligibility sections (text-heavy)
- Testimonials (flexibility)

### New Light Palette

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-warm-white` | `#FBF9F7` | Primary light background |
| `--color-warm-cream` | `#F5F0E8` | Card backgrounds |
| `--color-text-dark` | `#1B263B` | Body copy |
| `--color-gold-dark` | `#B8960C` | CTAs on light (darker for contrast) |

### Existing Dark Palette (Keep for hero/footer)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-navy-dark` | `#0F172A` | Primary dark background |
| `--color-navy-mid` | `#1B263B` | Card backgrounds (dark) |
| `--color-gold` | `#D4AF37` | Accent/CTAs |
| `--color-cream` | `#F5F5F0` | Text on dark |

---

## Component Tasks (Tier 1 - Critical)

### 1. About Page - PRIORITY HIGH
**File:** Create `app/(public)/about/page.tsx`

**Requirements:**
- Full "Our Story" content with years in business
- Mission statement: "Treating you like family"
- Licensure section: "State Licensed, Medicare Certified"
- Staff/founder photos (use AI-generated placeholders initially)
- **Light background** for readability

**Content to include:**
```
About Angel's Care Home Health

Providing compassionate, professional home health care
to families across the St. Louis metro area.

[Years in business - verify from client]

Our Mission: Treating you like family.

Licensure:
- Missouri State Licensed
- Medicare Certified
- Dedicated to quality care

Our Team: [Placeholder for staff photos]
```

### 2. Testimonial Carousel Component
**File:** Create `components/sections/testimonial-carousel.tsx`

**Requirements:**
- 3-5 testimonials (use realistic AI-generated content initially)
- Quote format with attribution
- Auto-scroll with pause on hover
- Large, readable text (18px+ base)
- Works on light OR dark backgrounds
- Mobile-friendly (stack on small screens)

**Structure:**
```tsx
interface Testimonial {
  quote: string;
  name: string;
  relationship: string; // "Son of patient" / "Daughter caring for mother"
  location?: string; // "St. Louis, MO"
}
```

### 3. Mobile CTA Bar
**File:** Create `components/layout/mobile-cta-bar.tsx`

**Requirements:**
- Fixed bottom bar on mobile only (`md:hidden`)
- Two buttons: "Call Now" + "Request Care"
- Phone link: `tel:3143810321`
- Request Care links to `/contact`
- High contrast, easy tap targets (44px minimum)
- z-index above content but below modals

**Implementation:**
```tsx
<div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#0F172A] p-3 flex gap-3 z-50">
  <Link href="tel:3143810321" className="flex-1 btn-primary">
    <Phone className="w-5 h-5 mr-2" /> Call Now
  </Link>
  <Link href="/contact" className="flex-1 btn-secondary">
    Request Care
  </Link>
</div>
```

**Why:** Older users expect tap-to-call. Don't make them scroll-hunt for the phone number.

### 4. Trust Badges Component
**File:** Create `components/ui/trust-badges.tsx`

**Requirements:**
- Medicare Certified badge
- Missouri State Licensed badge
- "Serving St. Louis Since [Year]" badge
- Horizontal layout on desktop, 2x2 grid on mobile
- Works on both light and dark backgrounds

**Placement options:**
- Footer (always visible)
- Hero section (immediate trust)
- About page (credibility)

---

## Component Tasks (Tier 2 - High Priority)

### 5. Process Timeline Light Background Conversion
**File:** `components/sections/process-timeline.tsx`

**Current:** Dark navy background with white text
**Target:** Warm white background with dark text

**Why:** This is a reading-heavy section. Seniors read better with dark text on light background.

**Changes needed:**
- Background: `#0F172A` → `#FBF9F7`
- Text: `text-white` → `text-[#1B263B]`
- Subtext: `text-white/80` → `text-[#1B263B]/80`
- Accent badges: Adjust for contrast on light

### 6. Service Detail Pages Redesign
**Files:** `app/(public)/services/[slug]/page.tsx`

**Current:** Full dark background
**Target:** Light background with dark header accent

**Layout suggestion:**
```
[Dark Hero Banner with Service Title]
[Light Content Area]
  - Service Description
  - What's Included list
  - CDS Disclosure (if applicable)
  - CTA to Contact
[Dark Footer]
```

### 7. Form Contrast System Upgrade
**Files:** `components/sections/contact-finale.tsx`

**Current issues:**
- Placeholders at `text-white/30` (invisible for seniors with cataracts)
- Labels at `text-sm` (too small)

**Required fixes:**
- Placeholders: `text-white/30` → `text-white/60` minimum
- Labels: `text-sm` → `text-base` (16px)
- Input borders: Ensure visible on both light and dark
- Error states: Clear, high-contrast red with icons

---

## Performance Requirements

Nathan's reality check:
> "Your users are not on M3 MacBooks. Some are on old Amazon Fire tablets and Tracfones with rural connections."

### Targets

| Metric | Target |
|--------|--------|
| Hero video max size | 2MB |
| Hero image max size | 200KB |
| Lighthouse Performance | >80 |
| LCP | <2.5s |

### Mobile Optimization Rules

1. **Reduce/disable backdrop blur** on mobile (performance killer)
2. **Disable video autoplay** on cellular connections
3. **Lazy load** all below-fold images
4. **Use `font-display: swap`** for custom fonts
5. **Compress images** before adding to project

---

## Form Field Requirements

### Required Fields (4 only):
1. Name
2. Phone Number
3. Best Time to Call
4. Who Needs Care? (Patient/Family Member)

### Optional Fields (2 only):
- Email
- How did you hear about us?

### DO NOT ADD:
- Insurance information (get on call)
- Medical history (compliance risk)
- Full address (not needed yet)

**Why minimal?** Every extra field is a drop-off opportunity. Seniors get overwhelmed by long forms.

---

## Current File Structure

```
/mnt/extreme-pro/angelscare/
├── app/
│   ├── (public)/
│   │   ├── services/
│   │   │   ├── page.tsx          # Services hub
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Service detail (CDS disclosure added)
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── about/                # NEEDS CREATION
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx                  # Homepage
├── components/
│   ├── layout/
│   │   ├── main-nav.tsx          # Updated: "Services" label
│   │   └── footer.tsx
│   ├── sections/
│   │   ├── hero-section.tsx
│   │   ├── services-grid.tsx
│   │   ├── process-timeline.tsx  # Updated: compliance + clarity text
│   │   └── contact-finale.tsx
│   └── ui/
│       └── [various UI components]
└── documentation/
    └── team-communications/
        └── [this file and others]
```

---

## Tech Stack Reference

- **Framework:** Next.js 16.0.8 (App Router)
- **Styling:** Tailwind CSS v4
- **Components:** Radix UI primitives
- **Icons:** Lucide React
- **Deployment:** PM2 + Cloudflare Tunnel (process: `angelscare`, port: 3007)

---

## Testing Checklist

Before marking any component complete:

- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768px)
- [ ] Mobile view (375px)
- [ ] Text readable at 200% zoom
- [ ] Color contrast passes WCAG AA
- [ ] Touch targets are 44px minimum
- [ ] No horizontal scroll on mobile
- [ ] Forms work with keyboard only
- [ ] Images have alt text
- [ ] No console errors

---

## Questions for Gemini to Consider

1. **Theme transition:** How do we handle the visual transition from dark hero to light content? Gradient? Hard cut? Section divider?

2. **Testimonial sourcing:** Should we create AI-generated testimonial content now, or leave as placeholder until client provides real ones?

3. **About page photos:** AI-generated staff photos or generic medical imagery? What's the compliance risk of fake staff photos?

4. **Mobile CTA bar:** Should it hide when user is scrolling down and reappear on scroll up? Or always fixed?

5. **Performance budget:** Are current animations (glassmorphism, gradients) sustainable for the performance targets?

---

## Priority Order (Recommended)

1. **Mobile CTA Bar** - Quick win, high impact for conversions
2. **Trust Badges** - Quick win, builds immediate credibility
3. **About Page** - Critical for trust, second most visited page
4. **Process Timeline Light Conversion** - UX improvement for reading
5. **Testimonial Carousel** - Social proof, can use placeholder content
6. **Service Detail Pages** - Polish pass
7. **Form Contrast Fixes** - Accessibility compliance

---

## Deployment Notes

```bash
# Dev server (already running)
cd /mnt/extreme-pro/angelscare
# PM2 process: angelscare, port 3007

# After changes, verify with:
pm2 logs angelscare --lines 20

# If you need to restart:
pm2 restart angelscare
```

---

## Files Already Modified Today (Reference Only)

These files were changed by subagents - don't overwrite these fixes:

1. **main-nav.tsx**
   - "The Episodes" → "Services" (lines 62, 142)
   - Mobile X button enlarged (w-8 h-8 → w-10 h-10)
   - Added bottom "Close Menu" button

2. **services/[slug]/page.tsx**
   - Added `disclosure` field to CDS entry
   - Added conditional disclosure rendering

3. **process-timeline.tsx**
   - "100% Covered" language removed (compliance)
   - Added Medicare/Medicaid clarity text
   - Added service area mention

---

## Contact

If you have questions about business logic, compliance requirements, or backend integration, ping Claude Opus. This handoff is for frontend-focused design and implementation work.

**Let's build something that makes families feel safe trusting us with their loved ones.**

---

*Handoff prepared by Claude Opus 4.5 on 2025-12-12*
*All 5 subagent tasks completed successfully before handoff*
