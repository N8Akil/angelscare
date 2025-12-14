# Team Communication: Implementation Plan v2.0

> **Date:** 2025-12-12
> **From:** Claude Opus 4.5 + Gemini (Collaborative Review)
> **To:** Nathan / Project Lead
> **Subject:** Updated Implementation Plan with UX Remediation Phase

---

## Summary

The Implementation Plan has been updated to **Version 2.0** incorporating:

1. **Consolidated UX Audit findings** from Opus primary audit + UX_AUDIT.md
2. **Gemini's validation** of critical issues and theme decision
3. **New Phase 7: UX/UI Remediation** with tiered priority action items
4. **Pre-Launch Checklist** for team accountability

---

## Key Changes in v2.0

### New Section: Design System Refinement
Added **Text Contrast Rules** based on Gemini's validation:
- Headings must use `text-[#F5F5F0]` or `text-white` (not `text-white/80`)
- Body copy must use `text-white/90` minimum
- Form labels increased to `text-base` (16px)
- Placeholders minimum `text-white/50`

### New Phase 7: UX/UI Remediation
14 action items organized into three tiers:

**Tier 1 - Critical (5 items, Before Launch):**
1. Rename "The Episodes" to "Services"
2. Build About page with licensure
3. Add testimonials section
4. Fix form contrast
5. Add trust badges

**Tier 2 - High Priority (5 items, Sprint 1):**
6. Remove "CINEMATIC" watermark
7. Fix "See If You Qualify" link
8. Mobile close button accessibility
9. Medicare/Medicaid clarity
10. Populate image placeholders

**Tier 3 - Enhancements (4 items, Post-Launch):**
11. Staff/Team page
12. Insurance/Eligibility page
13. A/B theme testing
14. Hero video loops

### New Section: UX Audit Summary
Documents the three-source consensus and theme decision.

### New Section: Pre-Launch Checklist
Actionable checkbox list for team accountability.

### Expanded Asset Strategy
Added AI content generation tool list and testimonial photo prompts.

---

## Theme Decision (FINAL)

**Gemini's Verdict:**
> "We will keep the 'Cinematic' dark aesthetic for Brand impact but strictly enforce High Contrast Text for all body copy."

**Action:** Keep dark theme, but enforce contrast rules throughout codebase.

---

## Immediate Next Steps

1. **Review Implementation Plan v2.0** at `/IMPLEMENTATION_PLAN.md`
2. **Assign Tier 1 tasks** to development team
3. **Begin About page development** (highest impact trust signal)
4. **Update navigation label** from "The Episodes" to "Services"

---

## Documentation Trail

| Document | Location |
|----------|----------|
| Implementation Plan v2.0 | `/IMPLEMENTATION_PLAN.md` |
| Consolidated UX Audit | `/documentation/team-communications/2025-12-12-ux-audit-consolidated.md` |
| Gemini Review Prompt | `/documentation/team-communications/2025-12-12-gemini-ux-review-prompt.md` |
| Original UX Audit | `/UX_AUDIT.md` |

---

*Prepared by Claude Opus 4.5 on 2025-12-12*
*Validated by Gemini*
