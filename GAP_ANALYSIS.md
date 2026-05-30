# Functional Requirements Gap Analysis
## Harmony Mental Health Platform

**Analysis Date:** May 2026  
**Baseline:** Requirements Document (final-final-ch3 [4-6].pdf)  
**Current Implementation:** Feature/backend-integration branch

---

## Executive Summary

- **Total Requirements:** 29 functional requirements (FR-01 to FR-29)
- **Fully Implemented:** 6 features (21%)
- **Partially Implemented:** 6 features (21%)
- **Not Implemented:** 17 features (59%)

---

## Detailed Gap Analysis by Module

### USER MANAGEMENT MODULE

#### FR-01: User Registration (FULLY IMPLEMENTED ✅)
- **Status:** ✅ Fully Implemented
- **What Exists:**
  - Secure email/password registration via Better Auth
  - User table stores email, name, role, profile data
  - Password hashing via Better Auth (`account.password`)
  - Server action: `updateUserRole()` in `app/actions/user.ts`
- **Location:** 
  - Frontend: `app/signup/page.tsx`, `components/auth/signup-form.tsx`
  - Backend: `app/api/auth/[...all]/route.ts` (Better Auth handler), `lib/auth.ts`
  - Database: `user` table, `account` table (credentials)
- **Notes:** Role selection during signup allows "seeker" or "guide" selection

---

#### FR-02: User Profile View & Update (PARTIALLY IMPLEMENTED ⚠️)
- **Status:** ⚠️ Partially Implemented
- **What Exists:**
  - User table stores name, image, role, email
  - `getUser()` server action in `app/actions/user.ts`
  - Settings pages exist: `components/seeker/settings-page.tsx`, `components/guide/settings-page.tsx`, `components/steward/settings-page.tsx`
  - Profile display in sidebar
- **What's Missing:**
  - **Update UI:** Settings pages show mock data, no actual form submission to update user fields
  - **Backend:** No `updateUserProfile()` server action to persist changes
  - **API:** No route to handle profile updates
- **Where to Add:**
  - Backend: Add `updateUserProfile(name, image)` server action in `app/actions/user.ts`
  - Frontend: Wire `<form>` in settings pages to call the action on submit
  - Database: Already has columns (name, image, updatedAt)

---

#### FR-10: Admin User/Counselor Account Management (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - Admin interface to activate/suspend users
  - Admin ability to edit any user's account details
  - No database flags for account status (active/suspended)
  - No admin API endpoints
- **Where to Build:**
  - Database: Add `status` column to `user` table (enum: active, suspended, pending)
  - Backend: Create server actions in `app/actions/admin.ts`:
    - `adminUpdateUserStatus(userId, status)`
    - `adminEditUserAccount(userId, updates)`
  - Frontend: Create `components/steward/user-management.tsx` to list/manage users

---

#### FR-31: User Login (FULLY IMPLEMENTED ✅)
- **Status:** ✅ Fully Implemented
- **What Exists:**
  - Secure email/password login via Better Auth
  - Session management with tokens
  - Role-based redirect (seeker → `/seeker/dashboard`, guide → `/guide/dashboard`, etc.)
  - Session validation on protected pages
- **Location:**
  - Frontend: `app/login/page.tsx`, `components/auth/login-form.tsx`
  - Backend: `lib/auth.ts`, `app/api/auth/[...all]/route.ts`
  - Database: `session` table, `account` table

---

### APPOINTMENT & SCHEDULING MODULE

#### FR-03: Search & View Counselor Profiles (PARTIALLY IMPLEMENTED ⚠️)
- **Status:** ⚠️ Partially Implemented
- **What Exists:**
  - UI exists: `components/seeker/counselor-browser.tsx` with search/filter
  - Database: `counselor_profile` table with bio, specializations, rating, availability
  - Mock data available
- **What's Missing:**
  - **Backend:** `getCounselors()` server action not wired to real database queries
  - **Frontend:** Component still imports mock data (`mockCounselors`)
  - **Search:** Client-side filtering only, no full-text search backend
- **Where to Add:**
  - Backend: Implement `getCounselors(searchTerm?, specialization?)` in `app/actions/dashboard.ts`
  - Frontend: Replace mock data import with server action call in `app/seeker/counselors/page.tsx`
  - Database: Query ready, just need to expose via action

---

#### FR-07: Counselor Dashboard & Availability Management (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No availability calendar/schedule interface for counselors
  - No ability for counselors to set/update availability slots
  - No database schema for availability slots (only a free-text `availability` field in `counselor_profile`)
- **Where to Build:**
  - Database: Create `availability_slot` table:
    - `id`, `counselorId`, `day_of_week`, `start_time`, `end_time`, `is_available`, `created_at`
  - Backend: Create server actions:
    - `getCounselorAvailability(counselorId)`
    - `updateAvailabilitySlot(slotId, isAvailable)`
    - `createAvailabilitySlot(counselorId, schedule)`
  - Frontend: Build `components/guide/availability-manager.tsx` with calendar UI

---

#### FR-08: Counselor View Appointments & Conduct Sessions (PARTIALLY IMPLEMENTED ⚠️)
- **Status:** ⚠️ Partially Implemented (UI exists, data missing)
- **What Exists:**
  - UI: `components/guide/guide-dashboard.tsx` shows sessions
  - UI: `components/session/session-room.tsx` for chat interface
  - Database: `booking` table with sessionType (video/chat), status, notes
  - Mock data: Past and upcoming sessions
- **What's Missing:**
  - **Backend:** `getGuideSessions(counselorId)` not implemented, still uses mocks
  - **Real-time Chat:** Session room uses mock messages, no Supabase Realtime/WebSocket
  - **Session Conductor UI:** Video calls not integrated (no Jitsi/Daily.co)
- **Where to Add:**
  - Backend: Add `getGuideSessions()` in `app/actions/dashboard.ts` (query `booking` where counselorId=current user)
  - Frontend: Wire `app/guide/dashboard/page.tsx` to call action instead of mocks
  - Real-time: Integrate Supabase Realtime or WebSocket for live chat

---

#### FR-28: Counselor Waitlist & Auto-Notification (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No waitlist concept/UI
  - No availability check logic (always assume slots available)
  - No automatic notification system
  - No database table for waitlist entries
- **Where to Build:**
  - Database: Create `waitlist` table:
    - `id`, `seekerId`, `counselorId`, `created_at`, `notified_at`
  - Backend: Create server actions:
    - `joinWaitlist(seekerId, counselorId)`
    - `removeFromWaitlist(waitlistId)`
    - Trigger: When counselor adds availability slot → query waitlist → send notifications
  - Frontend: Add "Join Waitlist" button on counselor profile if no slots available

---

### SECURE COMMUNICATION (CHAT) MODULE

#### FR-04: Real-Time Text-Based Counseling Sessions (PARTIALLY IMPLEMENTED ⚠️)
- **Status:** ⚠️ Partially Implemented (UI only, mock data)
- **What Exists:**
  - UI: `components/session/session-room.tsx` with chat input, message display, video toggle
  - Database: `message` table with bookingId, senderId, content, isRead, createdAt
  - Mock messages available
- **What's Missing:**
  - **Real-time delivery:** No WebSocket/Supabase Realtime
  - **Encryption:** Messages stored plain-text in DB (no encryption layer)
  - **Actual chat flow:** No `sendMessage()` server action wired, mock only
  - **Encryption at-rest:** Messages should be encrypted before DB storage
- **Where to Add:**
  - Backend: Implement `sendMessage(bookingId, content)` server action in `app/actions/booking.ts`
    - Encrypt content before saving (use `crypto` library)
    - Trigger Supabase Realtime event
  - Backend: Add `receiveMessagesSubscription()` to listen for real-time updates
  - Frontend: Replace mock data with real `message` queries and Realtime subscription in `session-room.tsx`
  - Database: Add `encrypted_content` column, keep `content` for legacy; implement encryption on read/write

---

#### FR-30: In-App Messaging (Outside Scheduled Sessions) (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **Note:** Different from FR-04 (scheduled session chat)
  - This is for non-urgent messages: appointment reminders, document sharing, follow-ups
  - Would be asynchronous (not live chat during session)
- **What's Missing:**
  - No separate messaging inbox UI
  - No document/file sharing capability
  - No message threading
- **Where to Build:**
  - Database: Create `notification_message` table (or use `message` with different `type`):
    - `id`, `fromUserId`, `toUserId`, `content`, `messageType` (reminder/document/note), `attachments`, `read_at`
  - Backend: Create `sendNotificationMessage(toUserId, content, type)` server action
  - Frontend: Build `components/shared/messages-inbox.tsx` to list/read messages

---

### MENTAL HEALTH SCREENING MODULE

#### FR-05: Mental Health Screening Questionnaires (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No screening questionnaire form
  - No standardized questionnaire questions (e.g., PHQ-9, GAD-7)
  - No results calculation/interpretation
  - No result storage/history
- **Where to Build:**
  - Database: Create tables:
    - `screening_questionnaire` (id, name, description, questions_json)
    - `screening_response` (id, userId, questionnaireId, answers_json, score, completed_at)
  - Backend: Create server actions:
    - `getQuestionnaires()`
    - `submitScreening(questionnaireId, answers)`
    - `getScreeningResults(userId)`
  - Frontend: Build `components/seeker/screening-form.tsx` with dynamic form from DB
  - **Ambiguity Note:** Document doesn't specify which questionnaires (PHQ-9, GAD-7, etc.) - needs confirmation

---

### RESOURCE LIBRARY MODULE

#### FR-06: Browse/Search Resource Library (PARTIALLY IMPLEMENTED ⚠️)
- **Status:** ⚠️ Partially Implemented (UI + mock data only)
- **What Exists:**
  - UI: `components/seeker/resources-page.tsx` with search, category filter
  - Database: `resource` table with title, description, category, url
  - Mock resources seeded (5 resources)
- **What's Missing:**
  - **Backend:** No `getResources()` server action, still uses mock data
  - **Frontend:** Component imports mocks, not real DB data
  - **Search:** Client-side only
- **Where to Add:**
  - Backend: Implement `getResources(category?, searchTerm?)` in `app/actions/dashboard.ts`
  - Frontend: Wire `app/seeker/resources/page.tsx` to fetch real data

---

#### FR-11: Admin Manage Resource Library (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No admin interface to add/edit/delete resources
  - No resource creation form
  - No bulk import capability
- **Where to Build:**
  - Backend: Create server actions in `app/actions/admin.ts`:
    - `createResource(title, description, category, url)`
    - `updateResource(resourceId, updates)`
    - `deleteResource(resourceId)`
  - Frontend: Build `components/steward/resource-management.tsx` with CRUD interface

---

### NOTIFICATION MODULE

#### FR-13: Notifications (Appointments, Reminders, Messages, Alerts) (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No email/SMS notification system
  - No in-app notification center
  - No notification scheduler (for appointment reminders)
  - No notification preferences/settings
- **Where to Build:**
  - Database: Create tables:
    - `notification` (id, userId, title, message, type, read_at, created_at)
    - `notification_preference` (userId, type, enable_email, enable_push, enable_in_app)
  - Backend: Create server actions:
    - `getNotifications(userId, unreadOnly?)`
    - `markNotificationRead(notificationId)`
    - Job/Cron: Send appointment reminders 24h before booking.scheduledAt
    - Job/Cron: Send session confirmed notifications when booking.status = confirmed
  - External Service: Email provider (SendGrid, Resend) for transactional emails
  - Frontend: Build `components/shared/notification-center.tsx`

---

### ADMIN & SYSTEM MONITORING MODULE

#### FR-09: Counselor Access Client Session History & Notes (PARTIALLY IMPLEMENTED ⚠️)
- **Status:** ⚠️ Partially Implemented (database ready, no UI)
- **What Exists:**
  - Database: `message` table linked to `booking` (session history)
  - Database: `booking.notes` column for session notes
  - Logic ready to query in `getGuideSessions()` action
- **What's Missing:**
  - **UI:** No component to display session history for a specific booking
  - **UI:** No notes editor/viewer for counselor
  - **Permissions:** No explicit check that only assigned counselor can view notes
- **Where to Add:**
  - Backend: Add query to `getSessionHistory(bookingId)` action to fetch all messages + notes
  - Backend: Add check: only counselor assigned to booking or admin can access
  - Frontend: Build `components/guide/session-history-viewer.tsx` to display messages + notes
  - Frontend: Build `components/guide/session-notes-editor.tsx` with save functionality

---

#### FR-12: Admin Monitor System Activity & Analytics (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No activity log table
  - No analytics queries
  - No admin dashboard showing metrics
- **Where to Build:**
  - Database: Create `activity_log` table:
    - `id`, `userId`, `action` (login, booking_created, session_completed, etc.), `metadata_json`, `created_at`
  - Backend: Create `logActivity(userId, action, metadata)` helper called throughout the app
  - Backend: Create `getActivityLogs(filters)` action for admin queries
  - Frontend: Build `components/steward/activity-monitor.tsx`

---

#### FR-24: Weekly/Monthly Reports (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No report generation logic
  - No aggregation queries
  - No scheduled report job
  - Required metrics: active users, sessions completed, revenue, counselor utilization, satisfaction
- **Where to Build:**
  - Backend: Create `generateReport(startDate, endDate)` that queries:
    - `SELECT COUNT(DISTINCT userId) FROM user WHERE createdAt BETWEEN startDate AND endDate`
    - `SELECT COUNT(*) FROM booking WHERE status='completed' AND createdAt BETWEEN ...`
    - `SELECT SUM(amount) FROM booking WHERE status='completed' AND ...`
    - `SELECT counselorId, COUNT(*) FROM booking GROUP BY counselorId ...`
    - `SELECT AVG(rating) FROM review ...`
  - Backend: Create scheduled job (Vercel Cron) to run weekly/monthly
  - Frontend: Build `components/steward/reports-viewer.tsx` to display/export
  - Format: PDF or CSV export

---

#### FR-25: Export User Activity Logs (Anonymized) (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No export functionality
  - No anonymization logic
  - No CSV/JSON generation
- **Where to Build:**
  - Backend: Add `exportActivityLogs(startDate, endDate)` action that:
    - Queries `activity_log`
    - Removes/hashes personally identifiable info
    - Generates CSV or JSON
  - Frontend: Build download button in `components/steward/activity-monitor.tsx`

---

#### FR-29: Admin Configure Platform Settings (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No settings UI for admin
  - No configuration table
  - Configurable items not built: session pricing, cancellation policies, notification templates, featured resources
- **Where to Build:**
  - Database: Create `platform_settings` table:
    - `id`, `key` (session_price, cancellation_policy_days, notification_template_*, featured_resources), `value` (JSON), `updated_at`
  - Backend: Create actions:
    - `getPlatformSettings(keys?)`
    - `updatePlatformSetting(key, value)` (admin only)
  - Frontend: Build `components/steward/settings-manager.tsx` with form for each setting
  - Usage: Reference settings table in booking creation for pricing, in notification service for templates

---

### PAYMENT & BILLING MODULE

#### FR-14: Add Payment Methods (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No payment method storage
  - No Telebirr/bank transfer integration
  - No secure payment gateway integration
- **Where to Build:**
  - Database: Create `payment_method` table:
    - `id`, `userId`, `type` (telebirr, bank_transfer), `provider_token` (encrypted), `is_default`, `created_at`
  - External: Integrate Stripe or local payment gateway supporting Telebirr/ETB
  - Backend: Create `addPaymentMethod(paymentInfo)` action with encryption
  - Frontend: Build `components/shared/payment-method-form.tsx`

---

#### FR-15: Process Payments & Generate Invoices (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No payment processing logic
  - No invoice generation
  - No transaction logging
- **Where to Build:**
  - Database: Create `transaction` table:
    - `id`, `bookingId`, `userId`, `amount`, `status` (pending, completed, failed), `invoice_url`, `created_at`
  - Backend: Create `processPayment(bookingId, paymentMethodId)` action
    - Call payment gateway
    - On success: create transaction, generate PDF invoice, send via email
    - Update `booking.status` to confirmed
  - External: Use PDF library (pdkit) to generate invoices
  - Frontend: Add payment step in booking flow (`components/seeker/booking-payment.tsx`)

---

#### FR-16: Counselor View Earnings & Withdraw Funds (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No earnings calculation/display
  - No withdrawal system
  - No payout schedule
- **Where to Build:**
  - Database: Create `earnings` table:
    - `id`, `counselorId`, `bookingId`, `amount`, `status` (pending, paid_out), `payout_date`
  - Backend: Create actions:
    - `getCounselorEarnings(counselorId, startDate?, endDate?)`
    - `requestWithdrawal(counselorId, amount)` - creates payout request
    - Scheduled job: Auto-process payouts weekly/monthly (status pending → paid_out)
  - Frontend: Build `components/guide/earnings-dashboard.tsx`

---

#### FR-17: Promotional Codes & Partnership Pricing (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No discount code system
  - No institutional pricing tiers
  - No code validation
- **Where to Build:**
  - Database: Create `promo_code` table:
    - `id`, `code`, `discount_percent`, `max_uses`, `used_count`, `expires_at`
  - Backend: Create `validatePromoCode(code)` action + apply discount in `processPayment()`
  - Frontend: Add promo code input field in booking/payment flow

---

### COUNSELOR APPLICATION & VERIFICATION MODULE

#### FR-18: Counselor Application Submission (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No application form
  - No credential upload capability
  - No application status tracking
- **Where to Build:**
  - Database: Create `counselor_application` table:
    - `id`, `userId`, `license_url`, `certifications_url`, `cv_url`, `status` (pending, approved, rejected), `feedback`, `submitted_at`, `reviewed_at`
  - Backend: Create `submitCounselorApplication(userId, files)` action
    - Upload files to Vercel Blob or S3
    - Create application record with status=pending
  - Frontend: Build `components/auth/counselor-application-form.tsx` in signup flow
  - External: Vercel Blob for file storage

---

#### FR-19: Admin Review & Verify Applications (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No admin review interface
  - No approval/rejection workflow
  - No credential verification process
- **Where to Build:**
  - Backend: Create `reviewCounselorApplication(applicationId, approved, feedback)` action (admin only)
    - If approved: create `counselor_profile` record, set user.role='guide'
    - If rejected: set status=rejected, store feedback
    - Send notification email to applicant
  - Frontend: Build `components/steward/counselor-applications.tsx` with list of pending applications

---

### SESSION FEEDBACK & RATING MODULE

#### FR-20: Rate & Review Counselor After Session (PARTIALLY IMPLEMENTED ⚠️)
- **Status:** ⚠️ Partially Implemented (database ready, no UI)
- **What Exists:**
  - Database: `review` table with counselorId, seekerId, rating, comment
  - Mock reviews available
- **What's Missing:**
  - **UI:** No rating/review form after session completion
  - **Trigger:** No automatic redirect to review form after session ends
  - **Validation:** No check that user completed session with this counselor before reviewing
- **Where to Add:**
  - Backend: Add `submitReview(bookingId, rating, comment)` server action
    - Validate: booking.seekerId=current user, booking.status=completed
  - Frontend: Build `components/seeker/session-review-form.tsx` modal/page
  - Frontend: After session ends, redirect to review form or show inline modal

---

#### FR-21: Counselor View Ratings (Anonymized) (PARTIALLY IMPLEMENTED ⚠️)
- **Status:** ⚠️ Partially Implemented (data ready, no UI)
- **What Exists:**
  - Database: `review` table with data
  - Mock reviews in guide dashboard
- **What's Missing:**
  - **Backend:** No `getCounselorRatings(counselorId)` action
  - **Frontend:** Guide dashboard shows mock reviews, not queried from DB
  - **Anonymization:** Reviews don't hide `seekerId` - need to mask user identity
- **Where to Add:**
  - Backend: Add `getCounselorRatings(counselorId)` action in `app/actions/dashboard.ts`
    - Query `review` where counselorId=param
    - Exclude `seekerId` from response
    - Calculate average rating
  - Frontend: Wire `components/guide/guide-dashboard.tsx` to fetch real reviews
  - Frontend: Display "Anonymous User" instead of name

---

#### FR-26: Save Private Session Notes (Encrypted) (PARTIALLY IMPLEMENTED ⚠️)
- **Status:** ⚠️ Partially Implemented (UI exists, encryption missing)
- **What Exists:**
  - Database: `booking.notes` column (plain text)
  - Mock notes visible in session room
- **What's Missing:**
  - **Encryption:** Notes stored plain-text, should be encrypted
  - **Backend:** No `updateBookingNotes(bookingId, notes)` action to persist edits
  - **Frontend:** Notes are read-only in UI, no edit/save capability
- **Where to Add:**
  - Backend: Add `updateBookingNotes(bookingId, notesContent)` action
    - Encrypt notes before saving to DB
    - Only allow counselor assigned to booking
  - Frontend: Make notes field editable in `components/session/session-room.tsx`
  - Database: Add `notes_encrypted` column, keep `notes` for legacy

---

#### FR-27: User Request & Approve Session Note Summary (NOT IMPLEMENTED ❌)
- **Status:** ❌ Not Implemented
- **What's Missing:**
  - No request mechanism for users
  - No approval workflow for counselors
  - No summary generation/sharing
- **Where to Build:**
  - Database: Create `note_share_request` table:
    - `id`, `bookingId`, `requestedBy` (seekerId), `status` (pending, approved, denied), `requested_at`, `reviewed_at`
  - Backend: Create actions:
    - `requestNoteSummary(bookingId)` - creates request
    - `approveNoteShare(requestId, approve)` - counselor approves/denies
    - `getNoteShareHistory(userId)` - fetch shared notes for user
  - Frontend: Build request UI in `components/seeker/past-sessions.tsx`
  - Frontend: Build approval workflow in `components/guide/guide-dashboard.tsx`

---

### CRISIS & EMERGENCY SUPPORT MODULE

#### FR-22: Display Crisis Helpline Information on All Pages (FULLY IMPLEMENTED ✅)
- **Status:** ✅ Fully Implemented
- **What Exists:**
  - Component: `components/shared/crisis-banner.tsx` displays crisis hotlines
  - Placement: Rendered at bottom of all pages via `page-footer.tsx`
  - Content: Ethiopian emergency numbers (e.g., suicide prevention hotline)
- **Location:**
  - Frontend: `components/shared/crisis-banner.tsx` (always visible)
  - Integrated in: `components/shared/page-footer.tsx`

---

#### FR-23: Crisis Button with Emergency Resources (FULLY IMPLEMENTED ✅)
- **Status:** ✅ Fully Implemented
- **What Exists:**
  - Component: Crisis banner includes "Crisis" button
  - Behavior: Links to `/resources?category=crisis` or displays crisis resources modal
  - Content: Local emergency contacts, coping resources
- **Location:**
  - Frontend: `components/shared/crisis-banner.tsx`
  - Page: `app/seeker/resources/page.tsx` (shows crisis resources)

---

## Summary Table

| FR ID | Requirement | Status | Priority for Next Phase |
|-------|-------------|--------|------------------------|
| FR-01 | Registration | ✅ | - |
| FR-02 | Profile View/Update | ⚠️ | High (add update UI) |
| FR-03 | Search Counselors | ⚠️ | High (wire to DB) |
| FR-04 | Real-time Chat | ⚠️ | Medium (add Realtime) |
| FR-05 | Screening Questionnaires | ❌ | Low (new feature) |
| FR-06 | Resource Library Browse | ⚠️ | High (wire to DB) |
| FR-07 | Counselor Availability Mgmt | ❌ | High (needed for bookings) |
| FR-08 | Counselor View Sessions | ⚠️ | High (wire to DB) |
| FR-09 | Session History Access | ⚠️ | Medium (add UI) |
| FR-10 | Admin User Management | ❌ | Medium (admin feature) |
| FR-11 | Admin Resource Management | ❌ | Medium (admin feature) |
| FR-12 | System Monitoring | ❌ | Low (monitoring) |
| FR-13 | Notifications | ❌ | High (core feature) |
| FR-14 | Payment Methods | ❌ | High (monetization) |
| FR-15 | Process Payments | ❌ | High (monetization) |
| FR-16 | Counselor Earnings | ❌ | High (monetization) |
| FR-17 | Promo Codes | ❌ | Low (nice-to-have) |
| FR-18 | Counselor Application | ❌ | High (onboarding) |
| FR-19 | Admin Verify Applications | ❌ | High (onboarding) |
| FR-20 | Rate Counselor | ⚠️ | Medium (add UI) |
| FR-21 | View Ratings | ⚠️ | Medium (wire to DB) |
| FR-22 | Crisis Info Display | ✅ | - |
| FR-23 | Crisis Button | ✅ | - |
| FR-24 | Reports | ❌ | Low (admin analytics) |
| FR-25 | Export Logs | ❌ | Low (compliance) |
| FR-26 | Private Session Notes | ⚠️ | Medium (add encryption) |
| FR-27 | Note Share Request | ❌ | Low (optional feature) |
| FR-28 | Waitlist System | ❌ | Medium (nice-to-have) |
| FR-29 | Admin Settings | ❌ | Medium (admin feature) |
| FR-30 | In-app Messaging | ❌ | Medium (non-urgent messages) |
| FR-31 | Login | ✅ | - |

---

## Implemented Features Not in Requirements

The following functionality exists in the codebase but is not explicitly mentioned in the requirements document:

1. **Version Tracking** - App version displayed in footer (`lib/version.ts`)
2. **Mood Entry Tracking** - Mood logging system (`mood_entry` table, `recordMoodEntry()` action)
3. **Booking Status Tracking** - Bookings track status (pending, confirmed, completed, cancelled)
4. **Multi-role Dashboard** - Separate dashboards for seeker, guide, steward roles
5. **Theme Switcher** - Light/dark mode toggle in settings
6. **Sidebar Navigation** - Persistent navigation with role-based menu
7. **Collapsible Sidebar** - Mobile-responsive sidebar collapse

---

## Ambiguities & Clarifications Needed

1. **FR-05 Screening Questionnaires:** Which specific questionnaires should be used? (e.g., PHQ-9 for depression, GAD-7 for anxiety, K6 for psychological distress)
2. **FR-28 Waitlist Notifications:** Should notifications be email-only, in-app, or both?
3. **FR-24 Reports:** What format? (PDF, CSV, dashboard chart?)
4. **FR-30 In-app Messaging:** Is this separate from session chat or same channel? Document is ambiguous.
5. **FR-17 Pricing Tiers:** How many tiers? What are the price levels?
6. **Compliance:** Are there specific data residency or compliance requirements (GDPR, local law)?
7. **Session Duration:** Are sessions fixed-length or flexible? (Affects availability slots in FR-07)

---

## Recommendations for Next Development Phase

**High Priority (Core Features):**
- Wire dashboards to real database (FR-03, FR-06, FR-08, FR-21)
- Implement payment system (FR-14, FR-15, FR-16)
- Build counselor onboarding (FR-18, FR-19)
- Add notifications system (FR-13)
- Implement availability management (FR-07)

**Medium Priority (UX Enhancements):**
- Complete profile management (FR-02)
- Add real-time chat (FR-04)
- Build rating/review flow (FR-20, FR-21)
- Add session notes (FR-26)
- Implement admin tools (FR-10, FR-11)

**Low Priority (Nice-to-Haves):**
- Waitlist system (FR-28)
- Screening questionnaires (FR-05)
- Advanced analytics (FR-12, FR-24, FR-25)
- Promo codes (FR-17)
- Note sharing (FR-27)

