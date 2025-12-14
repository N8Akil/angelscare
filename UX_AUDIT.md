# UX/UI & CX Audit Report
> **Target:** Angel's Care Home Health Rebuild (angelscare-homehealth.com)
> **Auditor:** Senior CX/UI Architect
> **Date:** 2025-12-12

## Executive Summary
The new "Cinematic" build succeeds wildly in **Aesthetic** but fails significantly in **Trust & Clarity**. We have created a beautiful "Soap Opera" that feels premium and warm, but we have obscured independent verification (licensure, years in business) and over-committed to metaphors ("Episodes") that may confuse our 80-year-old core demographic.

**Verdict:** The visual shell is ready. The trust foundation is missing.

---

## 1. Information Architecture & Flows

### Navigation Clarity
-   **CRITICAL ISSUE:** The term **"The Episodes"** in the main navigation is a UX failure for this demographic.
    -   *Why:* An 80-year-old looking for "Nursing" or "Services" will not intuitively click "Episodes". The metaphor works for the *design team*, but not the *user*.
    -   *Fix:* Rename menu item to **"Services"** or **"Care Services"**. Keep the "Episode" structure internally, but label it clearly.
-   **Mobile Menu:** The full-screen overlay is beautiful, but the close button (`X`) is top-right. For users with arthritis or using large phones, this is a hard reach.
    -   *Fix:* Add a "Close" text button at the bottom or make the `X` larger and more prominent.

### The "About" Void
-   **CRITICAL ISSUE:** The `/about` page is a "Coming Soon" stub.
    -   *Why:* "Who are you?" is the #2 question after "what do you do?". A stub page destroys trust immediately.
    -   *Fix:* We must build a robust "Our Story" page featuring:
        -   **Years in Business:** (Need to verify from legacy)
        -   **Mission:** "Treating you like family."
        -   **Licensure:** "State Licensed & Medicare Certified" (Must be explicit).

---

## 2. Content & Messaging

### The Trust Gap
-   **Missing Signal:** **Testimonials**. There is ZERO social proof on the new site. The legacy site likely had patient stories.
    -   *Impact:* Relatives need to know others have verified this agency.
    -   *Fix:* Add a "What Families Say" section (Review Carousel) to the Homepage or About page.
-   **Missing Signal:** **Accreditation Badges**. We mention "Medicare pays 100%", but we don't display the "Medicare Certified" seal or distinct "State of Missouri" license badges.
    -   *Fix:* Add a "Trust Bar" in the Footer or Hero footer with official seals.

### Financial Clarity
-   **Win:** The "Eligibility Verified" banner in `ProcessTimeline` is excellent ("Often 100% Covered").
-   **Gap:** "Consumer Directed Services" mentions Medicaid, but the Timeline banner focuses heavily on Medicare.
    -   *Fix:* Add a line in the Eligibility Logic: *"Medicare for Skilled Care. Medicaid for Personal Care Support."* to differentiate clearly.

---

## 3. Visual Design & Aesthetic

### The "Angel Glass" Aesthetic
-   **Score: A+**. The "Golden Hour" palette, `glass-panel` utilities, and gradients are perfectly executed. It feels warm, premium, and distinct from sterile competitors.
-   **Visual Hierarchy:** The play between `Playfair Display` (Headings) and `Inter` (Body) works well for readability.

### Imagery
-   **Placeholder Risk:** We are currently using colored placeholders or generic icons.
-   *Action:* We must populate these with the "AI Cast Photos" immediately. Empty grey boxes labeled "Portrait" look broken and unprofessional.

---

## 4. UI/UX Details & Accessibility

### Form Accessibility (`ContactFinale`)
-   **Contrast Warning:** The form input placeholders (`text-white/30`) are too faint. Standard WCAG requires 4.5:1 for text, but placeholders can be lower (3:1). `white/30` on dark glass is borderline invisible for seniors with cataracts.
    -   *Fix:* Bump placeholders to `text-white/50` or `text-white/60`.
-   **Label Size:** Labels are `text-sm`.
    -   *Fix:* Bump labels to `text-base` (16px) for better readability.

### Tap Targets
-   **Phone Number:** The Hero phone number and Footer phone number are large and clickable (`tel:` linked). **Excellent.**
-   **Nav Links:** The Desktop Dropdown links represent good hit targets.

---

## 5. Action Plan (The "Fix-It" List)

1.  **Rename Navigation:** Change "The Episodes" to **"Services"**.
2.  **Build About Page:** Create `app/(public)/about/page.tsx` with "Our Story," Licensure, and Experience.
3.  **Add Testimonials:** Create a `TestimonialCarousel` component.
4.  **Fix Form Contrast:** Increase placeholder opacity and label size in `ContactFinale`.
5.  **Add Trust Badges:** Insert a "Licensure Row" in the Footer or Hero.
