# IMPLEMENTATION PLAN: Angel's Care Home Health Rebuild

> **Source of Truth**
> Version: 2.1
> Last Updated: 2025-12-12
> **Revision Note:** Critical compliance fixes, hybrid light/dark theme strategy, mobile UX requirements, performance budgets

---

## COMPLIANCE ALERT: Coverage Language

**DO NOT USE:**
- ~~"100% Covered"~~
- ~~"Free for eligible patients"~~
- ~~"No cost to you"~~
- Any absolute coverage claims

**USE INSTEAD:**
> "Often covered by Medicare or Medicaid for those who qualify."
> "Covered by Medicare/Medicaid for eligible patients."
> "Coverage varies. We help verify your benefits."

**REQUIREMENT:** All coverage-related copy must be reviewed by clinical/administrative staff before publication.

---

## CRITICAL: Client's Actual Service Offerings

**The following 4 services are the ONLY services offered by Angel's Care Home Health:**

| Service | Description | Target Audience |
| :--- | :--- | :--- |
| **Home Health Care** | Skilled nursing visits, wound care, medication management, IV therapy, chronic disease monitoring by RNs and LPNs | Post-hospital patients, chronic illness management |
| **Consumer Directed Services** | Missouri Medicaid program allowing clients to hire their own caregiver (including family members). Agency handles payroll and paperwork. | Medicaid-eligible individuals wanting control over their care |
| **Personal Care** | Assistance with bathing, dressing, grooming, mobility, toileting, and feeding | Individuals needing daily living assistance |
| **Elderly Home Care** | Light housekeeping, meal preparation, grocery shopping, companionship, respite care, laundry services | Seniors aging in place |

**IMPORTANT:** The client does NOT offer:
- ~~Skilled Nursing~~ (as a separate service - it's part of Home Health Care)
- ~~Physical Therapy~~
- ~~Occupational Therapy~~
- ~~Speech Therapy~~
- ~~Home Health Aides~~ (as a separate service)
- ~~Medical Social Services~~

These were AI-generated assumptions that did not reflect the actual business offerings.

### CDS Compliance Note
Consumer Directed Services (CDS) requires **explicit Missouri Medicaid disclosure** on the detail page:

> "Consumer Directed Services (CDS) is a Missouri Medicaid program. To qualify, you must meet Missouri's Medicaid eligibility and disability criteria. Contact us to verify your eligibility."

---

## 1. The Vision Statement

**"The Cinematic Soap Opera"**

Our design philosophy treats the user experience not as a transaction, but as a **Story**.
-   **High Emotion:** We use warm lighting, "Golden Hour" gradients, and empathetic copy to reassure anxious relatives.
-   **Familiarity:** Staff are presented as an "Ensemble Cast" of characters in the user's life.
-   **Motion:** Slow, cinematic transitions mimic the high-production value of a TV drama opening sequence.
-   **Resolution:** The journey from "Referral" to "Independence" is the Season Arc.

**The "Dual Mode" Requirement:**
-   **High Drama:** For Relatives (aged 40-60), the site feels premium, emotional, and comforting ("Liquid Glass" aesthetic).
-   **Strict Accessibility:** For Seniors (aged 65+), the site retains high contrast, large touch targets, and WCAG AA compliance.

### CRITICAL: Hybrid Light/Dark Theme Strategy (v2.1)

**Problem Identified:** Dark mode by default is high-risk UX for 70-85 year old primary users. Seniors expect light backgrounds with dark text (familiar from TV guides, mailers, medical forms).

**Solution:** Cinematic dark for **hero + select accent bands only**. Long-form content on **warm light backgrounds**.

| Section Type | Background | Text Color | Rationale |
|--------------|------------|------------|-----------|
| Hero | Dark (`#0F172A`) | White/Gold | Brand impact, emotional hook |
| Services Grid | Dark (`#1B263B`) | White | Visual continuity from hero |
| Process Timeline | **Light** (`#FBF9F7`) | Dark (`#1B263B`) | Reading comfort for seniors |
| About Page | **Light** (`#FBF9F7`) | Dark | Trust/credibility content |
| Service Details | **Light** (`#FBF9F7`) | Dark | Long-form reading |
| Testimonials | **Light** or Dark accent | Appropriate contrast | Flexibility |
| Contact/Footer | Dark (`#0F172A`) | White/Gold | Closing brand moment |
| FAQ/Eligibility | **Light** (`#FBF9F7`) | Dark | Text-heavy content |

**Light Background Palette:**
| Variable | Name | Hex | Usage |
|----------|------|-----|-------|
| `--color-warm-white` | Warm Canvas | `#FBF9F7` | Primary light background |
| `--color-warm-cream` | Soft Cream | `#F5F0E8` | Card backgrounds on light |
| `--color-text-dark` | Reading Text | `#1B263B` | Body copy on light BG |
| `--color-text-muted` | Secondary | `#4A5568` | Captions on light BG |

**Mental Model Shift:**
> "Accessibility is the core experience. Cinematic is layered on top as brand spice."

### Text Contrast Rules

**On Dark Backgrounds:**
| Element | Allowed | Forbidden |
|---------|---------|-----------|
| Headings | `text-[#F5F5F0]`, `text-white` | `text-white/80` or lower |
| Body Copy | `text-white/90`, `text-[#F5F5F0]` | `text-white/70` or lower |
| Secondary Text | `text-white/80` | `text-white/60` or lower |
| Form Labels | `text-base` (16px), `text-white/90` | `text-sm`, `text-white/50` |
| Placeholders | `text-white/50` minimum | `text-white/30` |

**On Light Backgrounds:**
| Element | Allowed | Forbidden |
|---------|---------|-----------|
| Headings | `text-[#1B263B]` | Gray lighter than `#4A5568` |
| Body Copy | `text-[#1B263B]`, `text-gray-800` | `text-gray-500` or lighter |
| Secondary Text | `text-[#4A5568]`, `text-gray-600` | `text-gray-400` or lighter |

---

## 2. The Design System ("Golden Hour" Theme)

### Color Palette (Tailwind v4 Variables)

**Dark Palette (Hero/Accent Sections):**
| Variable | Name | Hex / Value | Usage |
| :--- | :--- | :--- | :--- |
| `--color-drama-navy` | **The Stage** | `#0F172A` / `#1B263B` | Deep backgrounds, creating depth and contrast. |
| `--color-angel-gold` | **The Accent** | `#D4AF37` | Buttons, highlights, icons, "Halo" effects. |
| `--color-angel-rose` | **The Emotion** | `#E8D5C4` | Subtle gradients, warm overlays. |
| `--color-glass-surface` | **The Texture** | `rgba(255, 255, 255, 0.05)` | Glassmorphism card backgrounds. |

**Light Palette (Content Sections):**
| Variable | Name | Hex | Usage |
|----------|------|-----|-------|
| `--color-warm-white` | **Warm Canvas** | `#FBF9F7` | Primary light background |
| `--color-warm-cream` | **Soft Cream** | `#F5F0E8` | Card backgrounds on light |
| `--color-text-dark` | **Reading Text** | `#1B263B` | Body copy on light BG |
| `--color-gold-dark` | **Gold on Light** | `#B8960C` | CTA buttons on light BG (darker for contrast) |

### Utility Classes
-   **`.glass-panel`** (Dark sections only):
    -   `backdrop-filter: blur(24px)`
    -   `background-color: var(--color-glass-surface)`
    -   `border: 1px solid rgba(255, 255, 255, 0.1)`
    -   `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36)`
-   **`.warm-card`** (Light sections):
    -   `background-color: var(--color-warm-cream)`
    -   `border: 1px solid rgba(27, 38, 59, 0.1)`
    -   `box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08)`
-   **`.halo-glow`**:
    -   Specific gold box-shadow settings for hover states (e.g., `box-shadow: 0 0 20px rgba(212, 175, 55, 0.4)`).
-   **`.text-display`**:
    -   Font Family: `Playfair Display`
    -   Usage: Headings, "Episode Titles," Emotional hooks.

---

## 3. Architecture & Component Map

| Component | File Path | Concept / Role | Background |
| :--- | :--- | :--- | :--- |
| **Glass Card** | `components/ui/glass-card.tsx` | Base primitive for dark sections. | Dark |
| **Warm Card** | `components/ui/warm-card.tsx` | **NEW** - Card for light sections. | Light |
| **Hero (Cinematic)** | `app/(public)/page.tsx` | "The Premiere" - Heavy video/visual intro. | Dark |
| **Services Ensemble** | `components/sections/services-ensemble.tsx` | "The Cast" - 2x2 grid of services. | Dark |
| **Process Timeline** | `components/sections/process-timeline.tsx` | "The Story Arc" - Vertical journey map. | **Light** |
| **Contact Finale** | `components/sections/contact-finale.tsx` | "The Season Finale" - Footer & CTA. | Dark |
| **Main Navigation** | `components/layout/main-nav.tsx` | "Liquid Pill" header with Radix dropdowns. | Glass |
| **Service Hub** | `app/(public)/services/page.tsx` | Services overview with 4 clickable cards. | **Light** |
| **Service Episodes** | `app/(public)/services/[slug]/page.tsx` | Dynamic detail pages for each service. | **Light** |
| **About Page** | `app/(public)/about/page.tsx` | "Our Story" with licensure & trust signals. | **Light** |
| **Testimonials** | `components/sections/testimonial-carousel.tsx` | Social proof carousel. | **Light** |
| **Mobile CTA Bar** | `components/layout/mobile-cta-bar.tsx` | **NEW** - Persistent phone/contact bar. | Dark accent |

---

## 4. The Development Roadmap

### Phase 1: The Foundation (COMPLETED)
**Objective:** Establish the visual language and core infrastructure.
-   [x] Global CSS & Tailwind v4 Setup ("Golden Hour" Variables).
-   [x] Typography setup (Playfair Display & Inter).
-   [x] Hero Section structure (in `app/(public)/page.tsx`).
-   [x] Base `GlassCard` component.

### Phase 2: The Ensemble (Services Grid) (COMPLETED)
**Objective:** Present the 4 client services as a humanized cast.
-   [x] `ServicesEnsemble` component (2x2 Grid Layout).
-   [x] "Cinematic Hover" effects (Scale & Glow).
-   [x] **CORRECTED:** Service Data updated to client's actual 4 services.
-   [x] Clickable cards linking to service detail pages.

### Phase 3: The Story Arc (Process Timeline) (COMPLETED)
**Objective:** Visualize the home health journey to reduce anxiety.
-   [x] `ProcessTimeline` component (Vertical Layout).
-   [x] Center "Story Thread" with pulsing gold line.
-   [x] ~~"Eligibility Badge" (100% Covered)~~ **COMPLIANCE FIX REQUIRED**

### Phase 4: The Season Finale (Contact Block) (COMPLETED)
**Objective:** Convert anxiety into action with a resolving CTA.
-   [x] `ContactFinale` component (Two-column layout).
-   [x] Integrated Footer ("Closing Credits").
-   [x] High-contrast accessible form fields.

### Phase 5: The Episodes (Dynamic Service Pages) (COMPLETED)
**Objective:** Deep dive into each service with rich storytelling.
-   [x] Created `app/(public)/services/[slug]/page.tsx` template.
-   [x] Defined "Script" layout: Hero -> Story Block -> Feature Grid.
-   [x] **CORRECTED:** 4 service slugs matching client offerings.
-   [x] `generateStaticParams()` for SSG.

### Phase 6: The Navigation (Radix Integration) (COMPLETED)
**Objective:** Intuitive, accessible navigation for the "Episodes".
-   [x] Implemented Radix UI Navigation Menu.
-   [x] ~~"The Episodes" Dropdown~~ **FIX REQUIRED: Rename to "Services"**
-   [x] Mobile Full-Screen Overlay with large touch targets.
-   [x] **CORRECTED:** Navigation links match client's actual services.

---

## Phase 7: UX/UI Remediation (POST-AUDIT)

> **Source:** Consolidated UX Audit (Opus + Gemini + Nathan Review)
> **Date:** 2025-12-12
> **Status:** IN PROGRESS

### Tier 0: COMPLIANCE BLOCKERS (Do First)

| # | Issue | Effort | File(s) | Status |
|---|-------|--------|---------|--------|
| 0a | **Kill "100% Covered" language** | Low | `process-timeline.tsx`, any coverage claims | [ ] **BLOCKER** |
| 0b | **Add CDS Missouri disclosure** | Low | `/services/consumer-directed-services` page | [ ] **BLOCKER** |
| 0c | **Clinical sign-off on scope claims** | N/A | Review "primary medical team" and feature lists | [ ] **BLOCKER** |

**Replacement Coverage Language:**
```tsx
// BEFORE (compliance risk):
<Badge>100% Covered by Medicare</Badge>

// AFTER (safe):
<Badge>Often Covered by Medicare/Medicaid</Badge>
<p className="text-sm">Coverage varies. We help verify your benefits.</p>
```

### Tier 1: Critical Fixes (Before Launch)

| # | Issue | Effort | File(s) | Status |
|---|-------|--------|---------|--------|
| 1 | **Rename "The Episodes" to "Services"** | Low | `main-nav.tsx` (lines 62, 142) | [ ] Pending |
| 2 | **Build About Page** ("Our Story") | Medium | Create `app/(public)/about/page.tsx` | [ ] Pending |
| 3 | **Add Testimonials Section** | Medium | Create `components/sections/testimonial-carousel.tsx` | [ ] Pending |
| 4 | **Fix Form Contrast** | Low | `contact-finale.tsx` | [ ] Pending |
| 5 | **Add Trust Badges** | Low | Footer + Hero area | [ ] Pending |
| 6 | **Implement Light Background Sections** | Medium | Process Timeline, Service Details, About | [ ] Pending |
| 7 | **Add Persistent Mobile CTA Bar** | Medium | Create `mobile-cta-bar.tsx` | [ ] Pending |

**About Page Requirements (Non-Negotiable):**
- "Serving St. Louis families since [YEAR]" (verify with client)
- Owned/operated by [founder/ownership type]
- **Explicit:** "State Licensed & Medicare Certified"
- Real address + phone, large and obvious
- Service area: St. Louis & Florissant, Missouri
- 1-2 "why we exist" paragraphs in plain language
- Contact information with large tap targets (44px minimum)

**Testimonial Requirements:**
- Minimum 3 testimonials
- Format: Quote + Name + Relationship + Location
  - Example: *"They helped my mom come home after her surgery and kept us from panicking about her meds."* — **Maria R., Daughter of patient in North St. Louis**
- Short and specific (not generic praise)
- Carousel or static grid layout
- Photo optional (AI-generated acceptable)

**Mobile CTA Bar:**
```tsx
// Sticky bottom bar on mobile (visible on all pages)
<div className="fixed bottom-0 left-0 right-0 md:hidden bg-[#0F172A] border-t border-white/10 p-3 flex gap-3 z-50">
  <Link href="tel:3143810321" className="flex-1 btn-primary">
    <Phone /> Call Now
  </Link>
  <Link href="/contact" className="flex-1 btn-secondary">
    <FileText /> Request Care
  </Link>
</div>
```

### Tier 2: High Priority (Sprint 1)

| # | Issue | Effort | File(s) | Status |
|---|-------|--------|---------|--------|
| 8 | **Remove "CINEMATIC" watermark** | Trivial | `app/(public)/page.tsx` hero section | [ ] Pending |
| 9 | **Fix "See If You Qualify" link** | Low | Connect to `/contact` or eligibility section | [ ] Pending |
| 10 | **Mobile close button accessibility** | Low | `main-nav.tsx` - enlarge X + add bottom close | [ ] Pending |
| 11 | **Medicare vs Medicaid clarity** | Low | `process-timeline.tsx` | [ ] Pending |
| 12 | **Add Service Area mention** | Low | Hero or Process Timeline section | [ ] Pending |
| 13 | **Populate image placeholders** | Medium | AI content generation | [ ] Pending |
| 14 | **Build lite Eligibility section** | Medium | Add to Services Hub or Home | [ ] Pending |

**Medicare/Medicaid Clarity Text:**
> "Medicare covers skilled nursing care for those who qualify. Medicaid covers personal care and CDS support for eligible Missourians."

**Service Area Mention (Add to Hero or Timeline):**
> "Proudly serving families in St. Louis, Florissant, and surrounding Missouri communities."

**Lite Eligibility Section (Add to Home or Services Hub):**
```
## Who Pays for Home Health Care?

| Service Type | Typical Coverage |
|--------------|------------------|
| Home Health Care (Skilled Nursing) | Medicare (for eligible patients) |
| Consumer Directed Services | Missouri Medicaid |
| Personal Care | Medicaid, Private Pay |
| Elderly Home Care | Private Pay, Some Medicaid |

Coverage varies by individual situation. We help verify your benefits at no cost.
```

### Tier 3: Enhancements (Post-Launch)

| # | Issue | Effort | File(s) | Status |
|---|-------|--------|---------|--------|
| 15 | Build Staff/Team page | Medium | Create `app/(public)/team/page.tsx` | [ ] Deferred |
| 16 | Build full Insurance/Eligibility page | Medium | Create `app/(public)/eligibility/page.tsx` | [ ] Deferred |
| 17 | A/B test theme preferences | High | Analytics integration | [ ] Deferred |
| 18 | Add hero video loops | Medium | Video assets + component | [ ] Deferred |

---

## 5. Navigation & Information Architecture

### Main Navigation (Fixed)
```
Home | Services | About | Contact
```

**Services Dropdown:**
- Home Health Care
- Consumer Directed Services
- Personal Care
- Elderly Home Care
- [View All Services]

**DO NOT USE:**
- ~~"The Episodes"~~
- ~~"The Cast"~~
- ~~"The Finale"~~
- Any metaphor-based labels in user-facing navigation

**Internal Metaphors (Team Use Only):**
| User-Facing Label | Internal Metaphor |
|-------------------|-------------------|
| Services | The Episodes |
| About | Our Story |
| Process/Timeline | The Story Arc |
| Contact | The Finale |
| Staff | The Ensemble Cast |

### Footer Links
```
Services | About | Contact | Privacy Policy | Accessibility

Service Area: St. Louis, Florissant & Surrounding Missouri Communities
Phone: (314) 381-0321
Address: [Full Address]

© 2025 Angel's Care Home Health. State Licensed. Medicare Certified.
```

---

## 6. Service Data Structure (Canonical Reference)

> **Source:** Deep analysis of www.angelscarehomehealth.com service pages

### Service Slugs & Routes
```
/services                          → Services Hub (all 4 services)
/services/home-health-care         → Home Health Care detail
/services/consumer-directed-services → Consumer Directed Services detail
/services/personal-care            → Personal Care detail
/services/elderly-home-care        → Elderly Home Care detail
```

### Episode 1: Home Health Care
**Slug:** `home-health-care`
**Tagline:** "Medical excellence, delivered to your door."
**Background:** Light (`#FBF9F7`)
**Description:** Health challenges shouldn't mean giving up the comfort of home. Our Registered Nurses (RNs) and licensed staff coordinate directly with your doctor to manage chronic conditions, recovery after surgery, and complex medical needs. We bring clinical care to you, ensuring safety without the stress of a hospital visit.

**Features:**
- RN Nurse Visits
- Medication Management
- Wound & Ostomy Care
- Catheter Care
- Passive Range of Motion
- Chronic Disease Monitoring

**Coverage Note:** "Often covered by Medicare for eligible patients. We verify your benefits."

### Episode 2: Consumer Directed Services (CDS)
**Slug:** `consumer-directed-services`
**Tagline:** "Care from the people who know you best: Your Family."
**Background:** Light (`#FBF9F7`)
**Description:** You are already doing the work of caring for your loved one. You should be supported for it. This Missouri Medicaid program allows seniors to hire their own caregiver—including family members or friends (excluding spouses). We handle the paperwork and payroll so you can focus on what matters most.

**REQUIRED DISCLOSURE:**
> "Consumer Directed Services (CDS) is a Missouri Medicaid program. To qualify, you must meet Missouri's Medicaid eligibility and disability criteria. Contact us to verify your eligibility."

**Features:**
- Hire Your Own Family/Friend
- Medicaid Approved Program
- Weekly Pay for Caregivers
- Free Training Provided
- No Experience Required
- Angel's Care Handles Payroll

### Episode 3: Personal Care
**Slug:** `personal-care`
**Tagline:** "Dignity in every detail of daily life."
**Background:** Light (`#FBF9F7`)
**Description:** As we age, simple tasks like bathing or dressing can become unsafe or exhausting. Our Personal Care Aides provide respectful, hands-on assistance to help you maintain your independence and hygiene. We create a personalized safety plan that respects your routine and privacy.

**Features:**
- Bathing & Showering Assist
- Dressing & Grooming
- Mobility & Transfer Help
- Toileting & Incontinence Care
- Personal Hygiene Support
- Fall Prevention

### Episode 4: Elderly Home Care
**Slug:** `elderly-home-care`
**Tagline:** "A tidy home, a warm meal, and a friendly face."
**Background:** Light (`#FBF9F7`)
**Description:** Sometimes you don't need a nurse; you just need an extra pair of hands. Our Elderly Home Care services focus on keeping your home running smoothly. From cooking nutritious meals to keeping the house tidy, we reduce the burden of chores so you can enjoy your day. We also offer Respite Care to give family caregivers a well-deserved break.

**Features:**
- Light Housekeeping & Laundry
- Meal Preparation
- Companionship
- Shopping & Errands
- Respite Care (Family Relief)
- Medication Reminders

---

## 7. Asset Strategy (The "Cinematic" Layer)

### AI Content Generation Tools
- **Google AI Studio** - Text generation, prompts
- **Google Veo 3.1** - Video generation
- **Google Flow** - Workflow automation
- **Nano Banana Pro** - Image generation

### Accessibility Requirement
> **All images must include descriptive alt text** (who/what/context) for screen readers, not just decorative labels.

**Example:**
```tsx
// BAD:
<img src="nurse.jpg" alt="Nurse" />

// GOOD:
<img src="nurse.jpg" alt="Registered nurse reviewing medication schedule with elderly patient in their living room" />
```

### AI Video Prompts
Used in Google AI Studio / Veo 3.1 to generate background loops.
1.  **Hero Loop:** "Cinematic slow motion, golden hour sunlight streaming through a window, a nurse gently holding an elderly patient's hand, comforting smile, 85mm lens, high production value."
2.  **Recovery Loop:** "Senior walking in a lush garden with a cane, smiling key light, slow motion, confident steps, cinematic depth of field."
3.  **Family Care Loop:** "Adult daughter helping elderly mother with meal preparation, warm kitchen lighting, genuine laughter, cinematic color grading."

### "Cast" Photos (AI Generation Prompts)
1.  **Nurse Portrait:** "Professional headshot, warm lighting, approachable African American female nurse, wearing scrubs, soft bokeh background, genuine smile."
2.  **Caregiver Action:** "Home caregiver helping senior with meal preparation, warm kitchen lighting, genuine interaction, diverse cast."
3.  **Family Connection:** "Adult son holding elderly father's hand, living room setting, golden hour light through window, emotional warmth."

### Testimonial Photo Prompts
1.  "Senior woman portrait, warm lighting, genuine smile, soft focus background, professional but approachable."
2.  "Middle-aged daughter, professional headshot style, warm expression, neutral background."
3.  "Elderly couple, sitting together, warm lighting, comfortable home setting."

---

## 8. Performance Budget

### Hero Section Budget
| Asset | Max Size | Fallback |
|-------|----------|----------|
| Hero Video (if used) | 2MB | Static image + CSS gradient |
| Hero Background Image | 200KB | CSS gradient only |
| Total Hero Load | <3MB | <500KB on slow connections |

### Mobile Performance Rules
| Rule | Requirement |
|------|-------------|
| Backdrop blur | Reduce or disable on mobile (`@media (max-width: 768px)`) |
| Glass effects | Simpler shadows, fewer layers on mobile |
| Video autoplay | Disable on `prefers-reduced-data` or cellular |
| Image loading | Lazy load below-fold images |
| Font loading | `font-display: swap` for all custom fonts |

### Lighthouse Targets
| Metric | Target |
|--------|--------|
| Performance | >80 |
| Accessibility | >90 |
| Best Practices | >90 |
| SEO | >90 |
| LCP | <2.5s |
| CLS | <0.1 |

**Audience Reality Check:**
> Your users are not on M3 MacBooks. Some are on old Amazon Fire tablets and Tracfones with rural connections.

---

## 9. Form Requirements

### Contact Form (Minimal First Touch)
**Required Fields:**
1. Name (First + Last)
2. Phone Number
3. Best Time to Call (Morning/Afternoon/Evening)
4. Who Needs Care? (Myself / Family Member / Other)

**Optional Fields:**
- Email
- How did you hear about us?
- Brief message

**DO NOT ADD:**
- Insurance information (get this on the call)
- Medical history (compliance risk)
- Full address (not needed for initial contact)
- More than 6 fields total

### Form Accessibility
- All inputs: `min-height: 44px` (tap target)
- Labels: `text-base` (16px), visible (not placeholder-only)
- Error states: Clear red border + text explanation
- Success state: Confirmation message + phone number to call

---

## 10. Files Modified During Service Correction

The following files were updated to reflect the client's actual 4 services:

| File | Change |
| :--- | :--- |
| `components/layout/main-nav.tsx` | Updated `SERVICES` array from 6 AI-assumed services to 4 actual services |
| `components/sections/services-ensemble.tsx` | Replaced 6-service grid with 4-service 2x2 grid, added Link navigation |
| `app/(public)/services/page.tsx` | Updated services hub with correct 4 services |
| `app/(public)/services/[slug]/page.tsx` | Updated `EPISODES` data structure with correct 4 services and features |

---

## 11. UX Audit Summary

### Audit Sources
1. **Primary Audit:** Claude Opus 4.5 (2025-12-12)
2. **Secondary Audit:** UX_AUDIT.md
3. **Validation:** Gemini (2025-12-12)
4. **Final Review:** Nathan (2025-12-12)

### Consensus Critical Issues
1. "The Episodes" navigation label confuses seniors
2. About page stub destroys trust
3. Zero testimonials/social proof
4. Form contrast issues (placeholders too faint)
5. Missing trust badges (Medicare Certified, State Licensed)
6. **NEW:** "100% Covered" language is compliance risk
7. **NEW:** Dark theme by default is UX risk for seniors
8. **NEW:** No persistent mobile phone CTA

### Theme Decision (Final)
**Hybrid approach:** Dark cinematic for hero + select accent bands. Light warm backgrounds for all long-form content.

### Documentation
- Consolidated Assessment: `documentation/team-communications/2025-12-12-ux-audit-consolidated.md`
- Gemini Review Prompt: `documentation/team-communications/2025-12-12-gemini-ux-review-prompt.md`

---

## 12. Lessons Learned

**CRITICAL for future projects:**

1. **Always analyze the existing site thoroughly** before creating an implementation plan.
2. **Never assume services** based on industry norms - verify with the actual client offering.
3. **The old site (www.angelscarehomehealth.com) is the source of truth** for business offerings.
4. **Consumer Directed Services is Missouri-specific** - this is a Medicaid program unique to the region.
5. **Home Health Care encompasses** what might typically be separate therapy services in other agencies.
6. **Conduct UX audit BEFORE launch** - not after. Catch trust gaps early.
7. **Dark themes require extra accessibility rigor** - enforce minimum contrast ratios.
8. **Navigation labels must match user mental models** - not design team metaphors.
9. **Always have human clinical/administrative sign-off** on any claim about coverage, eligibility, or scope of care.
10. **Accessibility is core, cinematic is layered on** - not the other way around.
11. **Design for the lowest common denominator device** - old tablets and budget phones on rural connections.

---

## 13. Pre-Launch Checklist

### BLOCKERS (Cannot Launch Without)
- [ ] Remove all "100% Covered" language
- [ ] Add CDS Missouri Medicaid disclosure
- [ ] Clinical sign-off on scope/feature claims
- [ ] About page with licensure information
- [ ] Rename "The Episodes" to "Services"

### Must Complete (Tier 1)
- [ ] Add testimonials section (3 minimum)
- [ ] Fix form contrast (placeholders + labels)
- [ ] Add trust badges to footer + hero
- [ ] Implement light backgrounds for content sections
- [ ] Add persistent mobile CTA bar
- [ ] Add service area mention

### Should Complete (Tier 2)
- [ ] Remove "CINEMATIC" watermark from hero
- [ ] Fix "See If You Qualify" link destination
- [ ] Improve mobile menu close button accessibility
- [ ] Add Medicare/Medicaid differentiation text
- [ ] Add lite eligibility section
- [ ] Populate at least 50% of image placeholders

### Nice to Have (Tier 3)
- [ ] Staff/Team page
- [ ] Full Insurance/Eligibility checker page
- [ ] Hero video loops

---

## 14. Delta List (Task Manager Import)

Copy-paste ready for Jira/Linear/Notion:

```
## BLOCKERS
- [ ] [COMPLIANCE] Remove "100% Covered" language from process-timeline.tsx
- [ ] [COMPLIANCE] Add Missouri Medicaid disclosure to CDS service page
- [ ] [COMPLIANCE] Get clinical sign-off on "primary medical team" and feature claims

## TIER 1 - CRITICAL
- [ ] [NAV] Rename "The Episodes" to "Services" in main-nav.tsx (lines 62, 142)
- [ ] [PAGE] Build About page with licensure, address, years in business
- [ ] [COMPONENT] Create testimonial-carousel.tsx with 3+ testimonials
- [ ] [A11Y] Fix form contrast in contact-finale.tsx (labels to text-base, placeholders to white/50)
- [ ] [TRUST] Add Medicare Certified + State Licensed badges to footer
- [ ] [THEME] Convert process-timeline.tsx to light background
- [ ] [THEME] Convert service detail pages to light background
- [ ] [MOBILE] Create mobile-cta-bar.tsx with persistent Call + Request buttons

## TIER 2 - HIGH PRIORITY
- [ ] [CLEANUP] Remove "CINEMATIC" text from hero section
- [ ] [NAV] Fix "See If You Qualify" button destination
- [ ] [A11Y] Enlarge mobile menu X button + add bottom "Close Menu" text
- [ ] [CONTENT] Add Medicare vs Medicaid clarity text to timeline
- [ ] [CONTENT] Add service area mention (St. Louis, Florissant, MO)
- [ ] [CONTENT] Add lite eligibility section to services hub
- [ ] [ASSETS] Generate AI images for placeholder slots

## TIER 3 - ENHANCEMENTS
- [ ] [PAGE] Build Staff/Team page
- [ ] [PAGE] Build full Eligibility checker page
- [ ] [PERF] Add hero video with proper fallbacks
```

---

> **Version History:**
> - v1.0 (2025-12-12): Initial plan with AI-assumed services
> - v1.1 (2025-12-12): Corrected to client's actual 4 services
> - v2.0 (2025-12-12): Added Phase 7 (UX/UI Remediation) based on Opus + Gemini audit
> - v2.1 (2025-12-12): **Critical update** - Compliance fixes ("100% Covered"), hybrid light/dark theme strategy, mobile CTA bar, performance budgets, form requirements, Delta List for task import
