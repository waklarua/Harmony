"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Layout, Users, Calendar, MessageSquare, LayoutDashboard } from "lucide-react"

export function WireframeDescriptions() {
  return (
    <div className="space-y-8">
      {/* Screen 1: Seeker Landing Page */}
      <WireframeCard
        number="01"
        title="Seeker Landing Page"
        subtitle="Pre-login public entry point"
        icon={<Layout className="w-5 h-5" />}
        purpose="Introduce the platform, build trust, reduce anxiety, and guide visitors toward creating an account or learning more."
        components={[
          {
            name: "Hero Section",
            description:
              "Large headline with empathetic value proposition ('Find support on your terms'), subtext addressing common fears, and primary CTA button ('Get Started—It's Free')",
          },
          {
            name: "Trust Indicators Bar",
            description:
              "Horizontal strip showing: encryption badge, 'Licensed Professionals Only', 'Your Privacy Protected', HIPAA-style compliance icons",
          },
          {
            name: "How It Works",
            description:
              "3-step visual flow (Find → Book → Connect) with simple icons and one-line descriptions. Non-overwhelming.",
          },
          {
            name: "Counselor Preview Grid",
            description: "3-4 anonymized counselor cards showing specialties, not faces. 'Browse All' link.",
          },
          {
            name: "Testimonial/Quote",
            description:
              "Single, authentic quote from a user (first name only) about their experience. No stock photos.",
          },
          {
            name: "Resource Teaser",
            description: "2-3 featured articles/guides with calming imagery. 'Explore Resources' link.",
          },
          {
            name: "Footer",
            description:
              "Privacy Policy, Terms, About, FAQ links. Helpline disclaimer ('This is not a crisis service').",
          },
        ]}
        actions={[
          "Click 'Get Started' → Sign Up flow",
          "Click 'Browse Counselors' → Counselor listing (limited view)",
          "Click 'Learn More' → About page",
          "Click resource article → Public resource page",
        ]}
        navigation={[
          { from: "External", description: "Ads, search, referrals → Landing" },
          { from: "Landing", description: "→ Sign Up, About, Resources, FAQ" },
        ]}
      />

      {/* Screen 2: Seeker Dashboard */}
      <WireframeCard
        number="02"
        title="Seeker Dashboard"
        subtitle="Post-login home base"
        icon={<LayoutDashboard className="w-5 h-5" />}
        purpose="Provide a calm, organized hub for Seekers to manage their well-being journey—upcoming sessions, messages, and resources."
        components={[
          {
            name: "Welcome Header",
            description:
              "Personalized greeting ('Welcome back, Jamie'), current date, and subtle encouragement message.",
          },
          {
            name: "Upcoming Session Card",
            description:
              "Prominent card showing next session: Counselor name, date/time, 'Join Session' button (enabled 5 min before), 'Reschedule' link.",
          },
          {
            name: "Quick Actions Row",
            description: "3 large buttons: 'Find a Counselor', 'My Messages', 'Resources'. Icon + label format.",
          },
          {
            name: "Session History Summary",
            description: "Compact list of past 3 sessions with counselor name and date. 'View All' link.",
          },
          {
            name: "Unread Messages Badge",
            description: "Notification indicator if counselor has sent a message. Links to secure inbox.",
          },
          {
            name: "Recommended Resources",
            description: "2 curated articles/tools based on user preferences or session topics (if available).",
          },
          {
            name: "Profile Completion Prompt",
            description:
              "Gentle nudge if profile is incomplete: 'Add a bit about yourself to help counselors support you better.'",
          },
        ]}
        actions={[
          "Click 'Join Session' → Session Room (when available)",
          "Click 'Find a Counselor' → Counselor listing",
          "Click message notification → Secure Inbox",
          "Click 'View All Sessions' → Session History page",
        ]}
        navigation={[
          { from: "Login", description: "→ Dashboard (default landing)" },
          { from: "Dashboard", description: "→ Session Room, Counselor Search, Messages, Profile, Resources" },
        ]}
      />

      {/* Screen 3: Counselor Booking & Profile View */}
      <WireframeCard
        number="03"
        title="Counselor Booking & Profile View"
        subtitle="Selection and scheduling"
        icon={<Users className="w-5 h-5" />}
        purpose="Allow Seekers to learn about a specific counselor and book a session with confidence and minimal friction."
        components={[
          {
            name: "Counselor Header",
            description:
              "Name, credentials (e.g., 'Licensed Clinical Social Worker'), verification badge, and abstract avatar/initials (no photo required).",
          },
          {
            name: "Bio Section",
            description:
              "Counselor's personal statement in their own voice. Specialties listed as tags (e.g., 'Anxiety', 'Life Transitions', 'Work Stress').",
          },
          {
            name: "Approach & Philosophy",
            description: "Brief description of therapeutic approach in accessible language.",
          },
          {
            name: "Availability Calendar",
            description:
              "Interactive weekly view showing open slots. Color-coded: Available (blue), Selected (dark blue), Unavailable (gray).",
          },
          {
            name: "Session Details",
            description: "Selected slot summary: Date, time, duration (50 min), session type (Text-based).",
          },
          {
            name: "Booking CTA",
            description: "Large 'Book This Session' button. Secondary 'Message Counselor First' option.",
          },
          {
            name: "Privacy Reassurance",
            description: "Small security note: 'Your booking is private. Only you and [Counselor Name] can see it.'",
          },
        ]}
        actions={[
          "Select available time slot → Slot highlights, details update",
          "Click 'Book This Session' → Confirmation modal → Dashboard with new session",
          "Click 'Message Counselor First' → Pre-session messaging thread",
          "Click back → Return to counselor listing",
        ]}
        navigation={[
          { from: "Counselor Listing / Dashboard", description: "→ Profile View" },
          { from: "Profile View", description: "→ Booking Confirmation → Dashboard, or → Pre-Session Messaging" },
        ]}
      />

      {/* Screen 4: Secure Session Interface */}
      <WireframeCard
        number="04"
        title="Secure Session Interface"
        subtitle="Live text-based counseling"
        icon={<MessageSquare className="w-5 h-5" />}
        purpose="Provide a distraction-free, secure environment for real-time text-based counseling between Seeker and Guide."
        components={[
          {
            name: "Session Header",
            description:
              "Counselor name, session timer (optional), 'End Session' button (with confirmation), and security indicator (lock icon + 'Encrypted').",
          },
          {
            name: "Chat Window",
            description:
              "Full-height message thread. Messages aligned: Seeker (right, blue bubble), Guide (left, gray bubble). Timestamps on hover.",
          },
          {
            name: "Message Input Area",
            description:
              "Large text input field with 'Send' button. Character limit indicator (if any). Typing indicator when other party is typing.",
          },
          {
            name: "Session Tools (Counselor Only)",
            description:
              "Discreet sidebar or dropdown for notes, quick resources to share, and session summary template.",
          },
          {
            name: "Connection Status",
            description: "Subtle indicator showing connection strength. Reconnection notice if connection drops.",
          },
          {
            name: "Session Info Panel",
            description:
              "Collapsible side panel (mobile: bottom sheet) showing session start time, counselor credentials, and emergency resources link.",
          },
        ]}
        actions={[
          "Type and send message → Appears in chat",
          "Click 'End Session' → Confirmation modal → Post-session summary screen",
          "Connection drops → Auto-reconnect attempt with user notification",
          "Counselor shares resource → Link appears in chat (Seeker side)",
        ]}
        navigation={[
          { from: "Dashboard (when session starts)", description: "→ Session Room" },
          { from: "Session Room", description: "→ Post-Session Summary → Dashboard" },
          { from: "Emergency", description: "→ External crisis resource (new tab, with warning)" },
        ]}
      />

      {/* Screen 5: Counselor Dashboard */}
      <WireframeCard
        number="05"
        title="Counselor Dashboard"
        subtitle="Professional management hub"
        icon={<Calendar className="w-5 h-5" />}
        purpose="Give Guides an efficient, organized workspace to manage their schedule, clients, and practice—supporting their professional workflow."
        components={[
          {
            name: "Today's Schedule",
            description:
              "Prominent card showing today's sessions in timeline format. Each entry: Client initials (privacy), time, status (Upcoming/In Progress/Completed), 'Join' button.",
          },
          {
            name: "Weekly Calendar Overview",
            description: "Mini calendar showing session density by day. Click to expand full day view.",
          },
          {
            name: "Client List Panel",
            description:
              "Sidebar or card showing active clients (initials + pseudonym). Quick access to session history and notes per client.",
          },
          {
            name: "Pending Actions",
            description:
              "Notification area: New booking requests, unread messages, incomplete session notes reminders.",
          },
          {
            name: "Quick Stats",
            description: "Sessions this week, hours, and client count. Simple, non-gamified metrics.",
          },
          {
            name: "Availability Settings Link",
            description: "Quick access to modify weekly availability and time-off.",
          },
          {
            name: "Earnings Summary",
            description: "Current period earnings, pending payouts, and link to full financial details.",
          },
        ]}
        actions={[
          "Click 'Join' on upcoming session → Session Room",
          "Click client → Client detail view with history and notes",
          "Click notification → Relevant action (e.g., booking confirmation, message reply)",
          "Click 'Set Availability' → Availability management screen",
        ]}
        navigation={[
          { from: "Login", description: "→ Counselor Dashboard (default)" },
          {
            from: "Dashboard",
            description: "→ Session Room, Client Details, Messages, Availability, Earnings, Profile Settings",
          },
        ]}
      />

      {/* Design Notes */}
      <div className="bg-muted/30 border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-foreground">Wireframe Design Notes</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="space-y-2">
            <p className="font-medium text-foreground">Responsive Considerations:</p>
            <ul className="space-y-1">
              <li>• All screens adapt to mobile-first layouts</li>
              <li>• Session Room prioritizes chat window on mobile</li>
              <li>• Dashboards use collapsible panels on smaller screens</li>
              <li>• Touch targets minimum 44px for accessibility</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-foreground">Accessibility Requirements:</p>
            <ul className="space-y-1">
              <li>• All interactive elements keyboard-navigable</li>
              <li>• Color contrast ratios meet WCAG AA standards</li>
              <li>• Screen reader-friendly labels on all controls</li>
              <li>• Focus states clearly visible</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function WireframeCard({
  number,
  title,
  subtitle,
  icon,
  purpose,
  components,
  actions,
  navigation,
}: {
  number: string
  title: string
  subtitle: string
  icon: React.ReactNode
  purpose: string
  components: { name: string; description: string }[]
  actions: string[]
  navigation: { from: string; description: string }[]
}) {
  return (
    <Card>
      <CardHeader className="border-b border-border">
        <div className="flex items-start gap-4">
          <div className="text-3xl font-light text-primary/40">{number}</div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                {icon}
              </div>
              <div>
                <CardTitle className="text-xl">{title}</CardTitle>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-6">
        {/* Purpose */}
        <div className="space-y-2">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              Purpose
            </Badge>
          </h4>
          <p className="text-muted-foreground">{purpose}</p>
        </div>

        {/* Key Components */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              Key Components
            </Badge>
          </h4>
          <div className="grid gap-3">
            {components.map((component, i) => (
              <div key={i} className="bg-muted/30 rounded-lg p-3 space-y-1">
                <p className="font-medium text-foreground text-sm">{component.name}</p>
                <p className="text-sm text-muted-foreground">{component.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Actions */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              Primary Actions
            </Badge>
          </h4>
          <ul className="space-y-2">
            {actions.map((action, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                {action}
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="font-medium text-foreground flex items-center gap-2">
            <Badge variant="secondary" className="font-normal">
              Navigation
            </Badge>
          </h4>
          <div className="flex flex-wrap gap-2">
            {navigation.map((nav, i) => (
              <div key={i} className="bg-muted/50 rounded-lg px-3 py-2 text-sm">
                <span className="font-medium text-foreground">{nav.from}</span>
                <span className="text-muted-foreground"> {nav.description}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
