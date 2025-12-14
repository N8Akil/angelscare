# Team Communication: Implementation Plan v2.1 - CRITICAL UPDATE

> **Date:** 2025-12-12
> **From:** Claude Opus 4.5 (incorporating Nathan's final review)
> **To:** Development Team
> **Priority:** HIGH - Contains compliance blockers
> **Subject:** Critical compliance fixes, hybrid theme strategy, mobile UX requirements

---

## Executive Summary

Nathan's review identified **real compliance and UX risks** that could have serious legal and business consequences. This update adds:

1. **Compliance blockers** - "100% Covered" language must be removed
2. **Hybrid light/dark theme** - Dark for hero only, light for content
3. **Persistent mobile CTA** - Call/Request buttons always visible
4. **Performance budgets** - Targets for slow devices and rural connections
5. **Form requirements** - Minimal fields, maximum accessibility

---

## COMPLIANCE BLOCKERS (Do First)

### The "100% Covered" Problem

**Current Risk:** The site uses phrases like "100% Covered by Medicare" which:
- Is not true in every scenario
- Can trigger regulatory scrutiny
- May result in patient complaints or legal issues

**Required Fix:**
```tsx
// BEFORE (compliance risk):
<Badge>100% Covered by Medicare</Badge>

// AFTER (safe):
<Badge>Often Covered by Medicare/Medicaid</Badge>
<p className="text-sm">Coverage varies. We help verify your benefits.</p>
```

**Files Affected:**
- `process-timeline.tsx` - Eligibility badge
- Any other coverage claims throughout the site

### CDS Missouri Disclosure

Consumer Directed Services page MUST include:
> "Consumer Directed Services (CDS) is a Missouri Medicaid program. To qualify, you must meet Missouri's Medicaid eligibility and disability criteria. Contact us to verify your eligibility."

### Clinical Sign-Off Required

Before launch, a clinical/administrative staff member must review:
- "primary medical team" language in Home Health Care description
- All feature lists for scope accuracy
- Any claims about what services include

---

## Theme Strategy Change

### The Problem

Nathan's insight:
> "Dark mode by default for 70-85 year olds is high-risk UX. Seniors expect light backgrounds with dark text from TV guides, mailers, medical forms."

### The Solution: Hybrid Approach

**Keep cinematic dark for:**
- Hero section (brand impact)
- Services grid (visual continuity)
- Contact/Footer (closing brand moment)

**Switch to light for:**
- Process Timeline (reading content)
- About Page (trust/credibility)
- Service Detail Pages (long-form reading)
- FAQ/Eligibility (text-heavy)
- Testimonials (flexibility)

### New Light Palette

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-warm-white` | `#FBF9F7` | Primary light background |
| `--color-warm-cream` | `#F5F0E8` | Card backgrounds |
| `--color-text-dark` | `#1B263B` | Body copy |
| `--color-gold-dark` | `#B8960C` | CTAs on light (darker for contrast) |

---

## Mobile UX Requirements

### Persistent CTA Bar

Add to ALL pages on mobile:
```tsx
<div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#0F172A] p-3 flex gap-3 z-50">
  <Link href="tel:3143810321" className="flex-1 btn-primary">
    <Phone /> Call Now
  </Link>
  <Link href="/contact" className="flex-1 btn-secondary">
    Request Care
  </Link>
</div>
```

**Why:** Older users expect tap-to-call. Don't make them scroll-hunt.

### Mobile Menu Accessibility

Current X button is top-right only. Add:
- Larger X button (w-10 h-10 instead of w-8 h-8)
- Bottom "Close Menu" text button

---

## Performance Budget

Nathan's reality check:
> "Your users are not on M3 MacBooks. Some are on old Amazon Fire tablets and Tracfones with rural connections."

### Targets

| Metric | Target |
|--------|--------|
| Hero video max size | 2MB |
| Hero image max size | 200KB |
| Lighthouse Performance | >80 |
| LCP | <2.5s |

### Mobile Rules

- Reduce/disable backdrop blur on mobile
- Disable video autoplay on cellular
- Lazy load below-fold images
- Use `font-display: swap`

---

## Form Requirements

### Keep It Simple

**Required (4 fields only):**
1. Name
2. Phone Number
3. Best Time to Call
4. Who Needs Care?

**Optional (2 fields):**
- Email
- How did you hear about us?

**DO NOT ADD:**
- Insurance info (get on call)
- Medical history (compliance risk)
- Full address (not needed yet)

---

## Navigation Fix

### User-Facing Labels

```
Home | Services | About | Contact
```

**NOT:**
- ~~"The Episodes"~~
- ~~"The Cast"~~
- ~~"The Finale"~~

Keep metaphors internal. Users need obvious labels.

---

## Delta List (Copy to Task Manager)

```
## BLOCKERS
- [ ] [COMPLIANCE] Remove "100% Covered" language
- [ ] [COMPLIANCE] Add Missouri Medicaid disclosure to CDS page
- [ ] [COMPLIANCE] Get clinical sign-off on scope claims

## TIER 1 - CRITICAL
- [ ] [NAV] Rename "The Episodes" to "Services"
- [ ] [PAGE] Build About page with licensure
- [ ] [COMPONENT] Create testimonial-carousel.tsx
- [ ] [A11Y] Fix form contrast
- [ ] [TRUST] Add trust badges
- [ ] [THEME] Convert content sections to light background
- [ ] [MOBILE] Create mobile-cta-bar.tsx

## TIER 2 - HIGH PRIORITY
- [ ] [CLEANUP] Remove "CINEMATIC" watermark
- [ ] [NAV] Fix "See If You Qualify" link
- [ ] [A11Y] Mobile menu close button
- [ ] [CONTENT] Medicare vs Medicaid clarity
- [ ] [CONTENT] Service area mention
- [ ] [CONTENT] Lite eligibility section
- [ ] [ASSETS] AI images for placeholders
```

---

## Files Updated

- `IMPLEMENTATION_PLAN.md` → v2.1

## Key Additions

1. **Section 0:** Compliance Alert (top of document)
2. **Section 1.2:** Hybrid Light/Dark Theme Strategy
3. **Section 2:** Light Palette added to Design System
4. **Section 7:** Tier 0 Compliance Blockers
5. **Section 8:** Performance Budget
6. **Section 9:** Form Requirements
7. **Section 14:** Delta List for task manager import

---

## Bottom Line

This goes from "very cool concept with some risk" to **"production-ready for real human families who are low-key freaking out about mom coming home from the hospital."**

The compliance fixes are non-negotiable. The theme and mobile UX changes are strongly recommended.

---

*Document prepared by Claude Opus 4.5 on 2025-12-12*
*Incorporating critical feedback from Nathan's final review*
