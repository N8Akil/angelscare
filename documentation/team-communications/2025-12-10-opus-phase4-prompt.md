# Prompt for Claude Opus

**Subject:** Backend Phase 4 - Deployment Prep & Final Polish

**Context:**
Gemini has completed the **Public Page Integration**. The application is now **Feature Complete**.
-   Public pages (Home, Careers, Gallery, FAQ) are fetching real data.
-   Admin pages are fully functional.
-   Notification engine is in place (as per Phase 3).

**Your Objectives (Final Phase):**

1.  **Database Optimization:**
    *   Review the schema and add necessary **Indexes** for performance.
    *   *Suggestions:* `contacts(email)`, `job_postings(is_active)`, `gallery_items(is_published)`, `notification_queue(status)`.

2.  **Deployment Configuration:**
    *   Create `ecosystem.config.js` for PM2 (if not exists) to run the Next.js production server.
    *   Provide an **Nginx Snippet** to:
        *   Proxy port 3007.
        *   Serve `/uploads/` directly from the filesystem (for performance) instead of passing through Next.js.
        *   Set client body size limits (e.g., 50MB for videos).

3.  **Security & Polish:**
    *   Verify `middleware.ts` is correctly protecting all `/admin` routes.
    *   Confirm environment variables in `.env.local` are documented in `MANUAL_SETUP_INSTRUCTIONS.md`.

4.  **Final Handoff:**
    *   Confirm the app is ready for "Go Live" on the local server.

**Action:**
Please generate the optimization SQL and deployment config files.
