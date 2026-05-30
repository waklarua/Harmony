# Harmony: Project Summary (2-Page Overview)

## Project Overview
**Harmony** is a mental health counseling platform connecting seekers (users seeking mental health support) with guides (licensed counselors) and stewards (admins). Built with Next.js 16 and a full backend, it supports user authentication, session booking, messaging, and mood tracking with Ethiopian localization (ETB currency, EAT timezone).

**Live**: https://v0-harmony-h3.vercel.app | **Branch**: feature/backend-integration | **Status**: Production-ready auth + database integrated

---

## Frontend Architecture

**Technologies**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (125+ components), Lucide Icons

**Structure**: 
- `/app` - Route pages (auth, dashboards, resources, counselor browser, session room, settings)
- `/components` - 50+ components organized by role (seeker/, guide/, steward/, shared/)
- `/lib` - Utilities (auth client, version, database client, mock data)

**Key Pages**:
- **Landing** (`/`): Marketing page with crisis resources, features, and testimonial
- **Auth** (`/login`, `/signup`, `/forgot-password`): Real authentication via Better Auth
- **Seeker Dashboard** (`/seeker/dashboard`): Upcoming sessions, completed sessions, mood tracker, crisis resources, journey progress
- **Guide Dashboard** (`/guide/dashboard`): Client roster, new requests, session schedule, messages, availability settings
- **Steward Dashboard** (`/steward/dashboard`): Platform analytics, pending counselor approvals, support tickets, user management
- **Counselor Browser** (`/seeker/counselors`): Search/filter guides by specialization, view ratings/reviews, book sessions
- **Session Room** (`/seeker/session/:id`): Video/chat mode toggle, troubleshooting panel, message history
- **Resources** (`/seeker/resources`): Mental health articles searchable by category
- **Settings** (`/[role]/settings`): Profile, security, theme preferences, login activity

**State Management**: Client-side via React hooks (useState, useEffect) + form state with shadcn/ui Form; server-side via Next.js Server Components and Server Actions

**Styling**: Tailwind CSS with custom design tokens (OKLCH color space, semantic colors: serene, calm, warm, safe, trust, hope). Light/dark theme via next-themes

**Data Flow**: Components receive props from page-level Server Components → pages fetch data via server actions → actions query database → results passed to components as props (no fetch within components)

---

## Backend Architecture

**Technologies**: Better Auth (email/password), Drizzle ORM, PostgreSQL (Neon), Next.js Route Handlers + Server Actions

**Authentication** (`/api/auth/[...all]`):
- Better Auth handler mounted at `POST/GET /api/auth/*` endpoints
- Email/password signup (`authClient.signUp.email`) → creates user + account record → session cookie set
- Email/password signin (`authClient.signIn.email`) → validates password → returns user + session token
- Session validation via `auth.api.getSession()` called server-side to check request headers
- Cookies: `better-auth.session_token` (secure, httpOnly, sameSite=none in dev)
- Trusted origins: Production URL + all Vercel preview domains

**Server Actions** (async functions in `/app/actions/`):
- `getUserId()` helper - extracts userId from session, throws if unauthenticated
- **User**: `getUser()`, `updateUserRole(role)` - read/update user role
- **Booking**: `createBooking()`, `getBookings()`, `updateBookingStatus()`, `getMessages()`, `sendMessage()` - CRUD for sessions & messages
- **Wellness**: `recordMoodEntry()`, `getMoodEntries()` - mood tracking
- **Admin**: Placeholder for platform stats queries

**Authorization**: `getUserId()` pattern - every action that reads/writes user data filters by session userId. No Row-Level Security; server-side userId check is security boundary

**Error Handling**: Try-catch in components, error messages in UI, console logs for debugging

**Middleware** (`middleware.ts`): Edge runtime - checks for `better-auth.session_token` cookie; redirects unauthenticated users to `/login`; allows public routes (/, /login, /signup)

---

## Database Architecture

**Database**: PostgreSQL (Neon, free tier)

**Schema** (10 tables):
1. **user** - `id`, `email` (UNIQUE), `emailVerified`, `name`, `image`, `role` (seeker|guide|steward), `createdAt`, `updatedAt`
2. **session** - `id`, `userId` (FK user), `token` (UNIQUE), `expiresAt`, `ipAddress`, `userAgent`, timestamps
3. **account** - `id`, `userId` (FK user), `accountId`, `providerId`, `password` (hashed), `accessToken*`, `refreshToken*`, timestamps
4. **verification** - `id`, `identifier`, `value`, `expiresAt`, timestamps (email verification tokens)
5. **counselor_profile** - `id`, `userId` (FK, UNIQUE), `bio`, `specializations[]`, `certifications[]`, `hourlyRate`, `rating`, `availability`
6. **booking** - `id`, `seekerId` (FK user), `counselorId` (FK user), `sessionType` (video|chat), `status` (pending|confirmed|completed), `scheduledAt`, `duration`, `amount`, timestamps
7. **message** - `id`, `bookingId` (FK booking), `senderId` (FK user), `content`, `attachments[]`, `isRead`, `createdAt`
8. **mood_entry** - `id`, `userId` (FK user), `mood` (text), `intensity` (1-10), `notes`, `createdAt`
9. **resource** - `id`, `title`, `description`, `category`, `url`, `createdAt`
10. **review** - `id`, `counselorId` (FK user), `seekerId` (FK user), `rating`, `comment`, `createdAt`

**Relationships**: user → many sessions, bookings, messages, mood_entries, reviews (cascade delete). Indexes on FK + frequently-queried columns (userId, bookingId, status)

**Access Pattern**: Drizzle ORM - `db.select().from(table).where(eq(table.userId, userId))` in server actions. All writes include userId scope check before mutation

---

## End-to-End Flow

**1. Signup**: User fills form → `<SignupForm>` calls `authClient.signUp.email(email, password, name)` → POST `/api/auth/signup` → Better Auth creates user + account + hashed password in DB → session cookie set → redirect to dashboard

**2. Session Booking**: Seeker selects counselor → `createBooking(counselorId, time)` server action → inserts into `booking` table with status=pending → guide sees new request in dashboard → guide calls `updateBookingStatus(bookingId, 'confirmed')` → updates booking in DB

**3. Messaging**: During session, seeker/guide type messages → `sendMessage(bookingId, content)` server action → inserts into `message` table → `getMessages(bookingId)` fetches from DB → rendered in session room component. isRead flag tracks read status

**4. Mood Tracking**: Seeker logs mood → `recordMoodEntry(mood, intensity, notes)` server action → inserts into `mood_entry` table → dashboard fetches recent entries via `getMoodEntries()` → mood sparkline/history rendered

**5. Counselor Discovery**: Seeker visits counselor browser → page fetches counselors + ratings via server action query (joins user + counselor_profile + review aggregate) → filtered/sorted client-side or server-side → displayed in grid with CTA to book

**Data never persists client-side** (no localStorage for app data). All state = session cookie (auth) + URL params (filters) + component state (UI toggles). Real data always fetched from DB via server actions on page load or user action

---

## Deployment & Versioning
**Platform**: Vercel (production at v0-harmony-h3.vercel.app)  
**Env Vars**: `DATABASE_URL` (Neon), `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` (optional)  
**Version**: Tracked in `lib/version.ts`, displayed in footer; auto-bumped on each deployment  
**Build**: Next.js 16 Turbopack (33 routes), ~35s deploy time
