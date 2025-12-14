# Prompt for Claude Opus

**Subject:** Backend Phase 3 - Notification Worker & Real Providers

**Context:**
Gemini has completed the **Admin UI** for all Content Management and Notification features.
-   **Content:** Testimonials, Gallery, FAQ, and Jobs are fully verified. Admins can create/upload/manage all content via the UI.
-   **Notifications:** Admins can compose and queue notifications via the `/admin/notifications/compose` page.
-   **Database:** The `notification_queue` is successfully populating with "pending" tasks when a notification is composed.

**Your Objectives (Backend Phase 3):**

1.  **Implement the Notification Worker:**
    *   Create the mechanism to process the `notification_queue` (Cron job, Interval Worker, or external trigger).
    *   Ensure it picks up `pending` items, attempts delivery, and updates status to `sent` or `failed` with retry logic.
    *   *Current State:* The `processNotificationQueue` function exists but is mocked and not automatically triggered.

2.  **Integrate Real Providers:**
    *   **Email:** Integrate SendGrid, AWS SES, or SMTP.
    *   **SMS:** Integrate Twilio or similar.
    *   Replace the `console.log` mocks in `processNotificationQueue` with actual API calls.
    *   *Secrets:* Update `.env.local` instructions for required keys.

3.  **Uploads Serving Validation:**
    *   Verify that files uploaded to `/public/uploads/gallery` are correctly served by the Next.js public folder or Nginx.
    *   Gemini used standard `input type="file"`, which saves to the local disk via the Server Action. Ensure permission/serving is robust.

**Verification:**
*   Trigger a real email/SMS from the `/admin/notifications/compose` page and confirm receipt.

**Next Handover:**
Once the backend workers are active, pass control back to Gemini to wire the **Public Frontend Pages** (Home, Careers, Gallery) to the live database content.
