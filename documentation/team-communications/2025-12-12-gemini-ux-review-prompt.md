# Gemini Review Prompt: UX/UI Audit Consolidation

---

## Context

You are a senior UX/UI architect reviewing a consolidated audit assessment for Angel's Care Home Health website rebuild. Two independent audits were conducted - one by Claude Opus 4.5 and one documented in UX_AUDIT.md. These have been consolidated into a single assessment document.

**Your Role:** Review the consolidated findings, validate the prioritization, and provide your expert perspective on any gaps or adjustments needed.

---

## Background

**Project:** Angel's Care Home Health website rebuild
**New Site:** angelscare-homehealth.com
**Legacy Site:** www.angelscarehomehealth.com (source of truth for services)

**Design Philosophy:** "Cinematic Soap Opera" with glassmorphism, dark navy backgrounds, and "Golden Hour" warm accents.

**Target Audience:**
- Primary: Seniors aged 65-85+ (the patients)
- Secondary: Adult children aged 40-65 (decision makers)

**Client's Actual Services (4 only):**
1. Home Health Care (skilled nursing, wound care, medication management)
2. Consumer Directed Services (Missouri Medicaid - hire family as caregiver)
3. Personal Care (bathing, dressing, grooming assistance)
4. Elderly Home Care (housekeeping, meals, companionship, respite)

---

## The Consolidated Assessment

Below is the full consolidated UX/UI audit document. Please review it carefully:

```markdown
[INSERT FULL CONTENT OF 2025-12-12-ux-audit-consolidated.md HERE]
```

---

## Your Review Tasks

### 1. Validate Critical Issues
Review the 5 consensus critical issues. Do you agree these are the highest priority? Are there any issues that should be elevated or demoted?

### 2. Resolve the Theme Disagreement
The two audits disagree on the visual theme:
- Opus Audit: Rated C+ (inappropriate for seniors)
- UX_AUDIT.md: Rated A+ (beautifully executed)

What is YOUR assessment? Should the dark theme:
a) Remain as-is (premium differentiation)
b) Be lightened slightly (keep character, improve accessibility)
c) Be completely redesigned to light theme (match senior expectations)

Provide reasoning based on home health care industry standards and your knowledge of senior UX patterns.

### 3. Prioritization Check
Review the Tier 1/2/3 priority list. Are there any items that should be moved between tiers? Any that are missing?

### 4. Mobile UX Gap
The mobile close button accessibility issue was only identified in one audit. How critical is this for the target demographic? What is the recommended fix?

### 5. Content Generation Strategy
The team plans to use AI tools (Google AI Studio, Veo 3.1, etc.) for content generation. What guidelines should we establish for:
- Imagery style/tone
- Video content (if hero videos are added)
- Testimonial formats
- Staff photo presentation

### 6. Additional Observations
Are there any UX/UI concerns that BOTH audits may have missed? Consider:
- Cognitive load for seniors
- Reading patterns (F-pattern vs Z-pattern)
- Call-to-action placement
- Form field sequencing
- Error state handling
- Loading state design

---

## Expected Output Format

Please structure your review response as follows:

```markdown
# Gemini UX/UI Audit Review
Date: [Today's Date]

## 1. Critical Issues Validation
[Your assessment of the 5 consensus issues]

## 2. Theme Resolution
[Your recommendation: A, B, or C with reasoning]

## 3. Prioritization Adjustments
[Any changes to Tier 1/2/3 lists]

## 4. Mobile UX Assessment
[Your evaluation and recommended fix]

## 5. Content Generation Guidelines
[Specific recommendations for AI content]

## 6. Additional Observations
[Any gaps both audits missed]

## 7. Final Recommendation
[Summary of most impactful changes needed]
```

---

## Important Notes

1. **Placeholders are intentional** - Don't flag empty image/video slots as bugs
2. **Service data is now correct** - The 4 services listed above are verified accurate
3. **"The Episodes" naming is confirmed bad** - Both audits agree, no debate needed
4. **Focus on actionable feedback** - What specific changes should be made?

---

*Prompt prepared for Gemini review on 2025-12-12*
*Source: Consolidated assessment from Claude Opus 4.5 + UX_AUDIT.md*
