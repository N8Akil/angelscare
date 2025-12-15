# Angel's Care Design Principles & Guidelines

*Derived from Apple Human Interface Guidelines (HIG) & Modern Healthcare UX Best Practices.*

## 1. High-Level Design Principles (Apple Core)

These pillars define the "soul" of the Angel's Care aesthetic and interaction model.

### 1. Clarity
**Goal:** Ambiguity is the enemy. Users must always know "Where am I?" and "What can I do?".
*   **Application:**
    *   **Hero Sections:** 1 Headline, 1 Supporting Line, 1-2 CTAs. No clutter.
    *   **Service Labels:** Use precise names (e.g., "Home Health Care", "Personal Care") consistently. Avoid mixing terms.
    *   **Navigation:** Simple, predictable, and answer-oriented.

### 2. Deference
**Goal:** The UI frames the content; it doesn't compete with it.
*   **Application:**
    *   Gradients, glass effects, and visual flourishes are **stage dressing**, not the star.
    *   Backgrounds must never compromise text readability (especially for legal/clinical copy).
    *   Content (Services, Eligibility, Contact) is King.

### 3. Depth
**Goal:** Use visual hierarchy and layers to convey structure and "story".
*   **Application:**
    *   **Hierarchy:** Hero → Key Value → Actions → Support → Footer.
    *   **Layers:** Cards, overlays, and modal dialogs feel like stacked layers.
    *   **Scroll:** A journey from reassurance → explanation → proof → conversion.

### 4. Consistency
**Goal:** Transferable learning. If it works X way here, it works X way there.
*   **Application:**
    *   Consistent button styles, spacing, and headings across Home, Services, About, and Contact.
    *   Identical service names and descriptions everywhere.
    *   Uniform CTA language for identical flows (e.g., "Start Care Now").

### 5. Aesthetic Integrity
**Goal:** Function determines form. The look must match the seriousness of healthcare.
*   **Application:**
    *   **Vibe:** Competent Clinic + Loving Family/Neighbor.
    *   **Avoid:** Overly playful "startup" visuals or cold, clinical sterility.
    *   **Result:** "You are safe, and we take you seriously."

### 6. Direct Manipulation
**Goal:** Interacting with content, not controls.
*   **Application:**
    *   Large, obvious tap targets.
    *   If it looks clickable, it is. If it's static, it shows no hover state.
    *   Immediate, visible response to actions (scroll, expand, submit).

### 7. Feedback
**Goal:** Communication. Every action has a reaction.
*   **Application:**
    *   Inline validation for forms.
    *   Smooth animations for page transitions or scrolls.
    *   Helpful, kind error states (no generic "Error 500").

### 8. Metaphors
**Goal:** Mental shortcuts based on the real world.
*   **Application:**
    *   **The Story:** A cinematic journey from crisis to independence.
    *   **Episodes:** Service cards.
    *   **Cast:** Team and testimonials.

### 9. User Control
**Goal:** Guide, don't boss.
*   **Application:**
    *   Multiple safe paths to act (Call, Form, Read).
    *   No auto-play video with sound.
    *   Transparent explanation of data usage.

---

## 2. Practical Web Guidelines (The "Rules")

### 2.1 Typography
*   **Legibility First:**
    *   Desktop Body: **18-20px**.
    *   Mobile Body: **16-18px**.
*   **Hierarchy:** Distinct H1 → H2 → Body → CTA sizing.
*   **Font Set:** Limit to 1-2 families (Serif for headers, Sans for body).
*   **Spacing:** 45-75 chars/line, 1.4-1.6 line-height.

### 2.2 Color & Contrast
*   **WCAG Compliance:** 4.5:1 ratio for body text, 3:1 for large text.
*   **Text on Images:** Always use overlays/scrims.
*   **Semantic Roles:**
    *   **Primary (Navy):** Action.
    *   **Accent (Gold):** Highlights.
    *   **Neutral (Cream/White):** Backgrounds.
*   **Avoid:** Low-contrast gray on cream.

### 2.3 Layout & Spacing
*   **Grid:** 12-column grid system.
*   **Spacing Tokens:** Consistent (8px, 16px, 24px, 32px, etc.).
*   **Whitespace:** "Comprehension space," not empty space.
*   **No Horizontal Scroll:** Vertical flow only for primary content.

### 2.4 Navigation
*   **Main Nav:** 4-6 items max (Home, Services, About, etc.).
*   **Mobile:** Clean header + hamburger + **Sticky Call Bar**.
*   **Clarity:** Standard naming ("Services" > "Episodes").

### 2.5 Components
*   **Cards:** Icon → Heading → Short Copy → CTA. Whole card clickable.
*   **Buttons:** One primary style (Navy Pill). Strong verbs ("Start", "Call").
*   **Forms:** Labels visible. One-column. Grouped logically.
*   **Alerts:** Calm colors. Plain English.

### 2.6 Motion
*   **Subtle:** Fades, slide-ins. Purpose-driven feedback.
*   **No Motion Sickness:** Avoid aggressive parallax or rapid flashing.

### 2.7 Accessibility (Baseline)
*   **Target Size:** 44x44px min.
*   **Keyboard:** Fully navigable.
*   **Screen Readers:** Semantic HTML (Headings, Landmarks).
*   **Plain Language:** Explain jargon immediately.

---

## 3. The 10 Commandments (Design Principles for Angel's Care)

1.  **Content First, Chrome Second:** Visuals serve the story. Text wins over decoration.
2.  **One Clear Path per Screen:** One primary goal. One main CTA. Identify the "One Thing".
3.  **Comfortable for 80-Year-Old Eyes:** Big text (18px+), high contrast, generous spacing.
4.  **Reassure in the First 5 Seconds:** "Are you legit? Are you local? Can I talk to you?" (Trust Signals).
5.  **Speak Human, Not Healthcare:** "Nurse visits" over "Skilled Nursing". Translate jargon.
6.  **Consistency Across the Journey:** Same names, same buttons, same patterns everywhere.
7.  **Visible Safety & Compliance:** Surface credentials (Medicare, State Licensed) constantly but subtly.
8.  **Soft Motion, Never Surprise:** Meaningful animations only. No auto-play sound.
9.  **Always Mobile-Ready:** Thumb-friendly. Sticky CTAs. Fast load.
10. **No Dead Ends:** Every page ends with a clear path forward (Action or relevant content).
