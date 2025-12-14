# Prompt for Claude Opus

**Subject:** Backend Phase 2 - Content Management & Notifications

**Context:**
Gemini has completed the **Admin Contact Management** module. The app now supports:
1.  Listing, Searching, Filtering Contacts.
2.  Creating and Editing Contacts (forms wired to Server Actions).
3.  Bulk Importing Contacts from Excel/CSV (server-side parsing implemented).
4.  Database interactions for `contacts` are fully functional.

**Your Location:** `/mnt/extreme-pro/angelscare`
**Port:** 3007

**Your Objectives:**
Please proceed with **Phase 4: Content Management** and **Phase 5: Notification System**.

1.  **Content Management Backend:**
    *   Create Server Actions/CRUD for:
        *   `testimonials` (Approve/Reject flow).
        *   `gallery_items` (Uploads handling).
        *   `faq_items` (Q&A management).
        *   `job_postings` (Careers page).
    *   *Note:* The UI pages for these are not yet built, but creating the actions now allows Gemini to wire them up immediately.

2.  **Notification System:**
    *   Implement the `notification_queue` logic.
    *   Create a background worker (or cron endpoint) to process pending notifications.
    *   Integrate a stub/real provider for SMS/Email (as per the "TBD" in the plan, or use a log-based mock for now).

3.  **Verify & Polish:**
    *   Ensure `admin_audit_log` is tracking imports and updates correctly (Gemini added hooks for these).
    *   Check `pm2` status and logs.

**Reference:**
-   Existing Actions: `lib/actions/contacts.ts`, `lib/actions/import.ts`.
-   Schema: See `lib/db.ts` or database directly.

**Action:**
Begin implementation of Content Management Server Actions.
