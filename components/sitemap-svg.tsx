"use client"

import { Card } from "@/components/ui/card"

export function SitemapSVG() {
  return (
    <div className="space-y-6">
      <Card className="p-6 overflow-x-auto">
        <svg viewBox="0 0 1200 900" className="w-full min-w-[800px]" style={{ maxHeight: "700px" }}>
          <defs>
            {/* Gradients for role sections */}
            <linearGradient id="seekerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.55 0.08 220)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="oklch(0.55 0.08 220)" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="guideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.75 0.1 160)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="oklch(0.75 0.1 160)" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="stewardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.85 0.08 85)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="oklch(0.85 0.08 85)" stopOpacity="0.05" />
            </linearGradient>

            {/* Arrow marker */}
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="oklch(0.5 0.02 240)" />
            </marker>
          </defs>

          {/* Title */}
          <text x="600" y="30" textAnchor="middle" className="fill-foreground text-lg font-semibold">
            Harmony Platform Information Architecture
          </text>

          {/* PUBLIC SECTION */}
          <g>
            <rect
              x="20"
              y="50"
              width="1160"
              height="100"
              rx="12"
              fill="oklch(0.95 0.01 220)"
              stroke="oklch(0.85 0.02 220)"
              strokeWidth="1"
            />
            <text x="40" y="75" className="fill-muted-foreground text-xs font-medium uppercase tracking-wider">
              Public Pages
            </text>

            {/* Public page nodes */}
            <g transform="translate(100, 95)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                rx="8"
                fill="white"
                stroke="oklch(0.8 0.02 220)"
                strokeWidth="1"
              />
              <text x="60" y="25" textAnchor="middle" className="fill-foreground text-sm font-medium">
                Landing
              </text>
            </g>
            <g transform="translate(250, 95)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                rx="8"
                fill="white"
                stroke="oklch(0.8 0.02 220)"
                strokeWidth="1"
              />
              <text x="60" y="25" textAnchor="middle" className="fill-foreground text-sm font-medium">
                About
              </text>
            </g>
            <g transform="translate(400, 95)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                rx="8"
                fill="white"
                stroke="oklch(0.8 0.02 220)"
                strokeWidth="1"
              />
              <text x="60" y="25" textAnchor="middle" className="fill-foreground text-sm font-medium">
                How It Works
              </text>
            </g>
            <g transform="translate(550, 95)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                rx="8"
                fill="white"
                stroke="oklch(0.8 0.02 220)"
                strokeWidth="1"
              />
              <text x="60" y="25" textAnchor="middle" className="fill-foreground text-sm font-medium">
                Privacy Policy
              </text>
            </g>
            <g transform="translate(700, 95)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                rx="8"
                fill="white"
                stroke="oklch(0.8 0.02 220)"
                strokeWidth="1"
              />
              <text x="60" y="25" textAnchor="middle" className="fill-foreground text-sm font-medium">
                Resources
              </text>
            </g>
            <g transform="translate(850, 95)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                rx="8"
                fill="white"
                stroke="oklch(0.8 0.02 220)"
                strokeWidth="1"
              />
              <text x="60" y="25" textAnchor="middle" className="fill-foreground text-sm font-medium">
                FAQ
              </text>
            </g>
            <g transform="translate(1000, 95)">
              <rect
                x="0"
                y="0"
                width="120"
                height="40"
                rx="8"
                fill="white"
                stroke="oklch(0.8 0.02 220)"
                strokeWidth="1"
              />
              <text x="60" y="25" textAnchor="middle" className="fill-foreground text-sm font-medium">
                Contact
              </text>
            </g>
          </g>

          {/* AUTH GATE */}
          <g transform="translate(500, 170)">
            <rect x="0" y="0" width="200" height="50" rx="10" fill="oklch(0.55 0.08 220)" />
            <text
              x="100"
              y="22"
              textAnchor="middle"
              className="fill-white text-xs font-medium uppercase tracking-wider"
            >
              Authentication Gate
            </text>
            <text x="100" y="38" textAnchor="middle" className="fill-white/80 text-xs">
              Sign Up / Sign In
            </text>
          </g>

          {/* Connection lines from auth to dashboards */}
          <line
            x1="500"
            y1="220"
            x2="200"
            y2="280"
            stroke="oklch(0.5 0.02 240)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="600"
            y1="220"
            x2="600"
            y2="280"
            stroke="oklch(0.5 0.02 240)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            markerEnd="url(#arrowhead)"
          />
          <line
            x1="700"
            y1="220"
            x2="1000"
            y2="280"
            stroke="oklch(0.5 0.02 240)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            markerEnd="url(#arrowhead)"
          />

          {/* SEEKER SECTION */}
          <g>
            <rect
              x="20"
              y="290"
              width="360"
              height="590"
              rx="12"
              fill="url(#seekerGrad)"
              stroke="oklch(0.55 0.08 220)"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <text x="40" y="315" className="fill-[oklch(0.55_0.08_220)] text-xs font-medium uppercase tracking-wider">
              Seeker Dashboard
            </text>

            {/* Seeker Hub */}
            <g transform="translate(120, 340)">
              <rect x="0" y="0" width="160" height="50" rx="10" fill="oklch(0.55 0.08 220)" />
              <text x="80" y="20" textAnchor="middle" className="fill-white text-xs font-medium uppercase">
                Home Hub
              </text>
              <text x="80" y="36" textAnchor="middle" className="fill-white/80 text-xs">
                Dashboard
              </text>
            </g>

            {/* Seeker sub-pages */}
            <g transform="translate(40, 420)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.55 0.08 220)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Find Counselor
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Browse & Filter
              </text>
            </g>
            <g transform="translate(40, 480)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.55 0.08 220)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Counselor Profile
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                View & Book
              </text>
            </g>
            <g transform="translate(40, 540)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.55 0.08 220)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Book Session
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Select Time
              </text>
            </g>
            <g transform="translate(40, 600)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="oklch(0.55 0.08 220)"
                fillOpacity="0.15"
                stroke="oklch(0.55 0.08 220)"
                strokeWidth="1"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Session Room
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Live Chat
              </text>
            </g>

            <g transform="translate(230, 420)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.55 0.08 220)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                My Sessions
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                History & Upcoming
              </text>
            </g>
            <g transform="translate(230, 480)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.55 0.08 220)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Messages
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Secure Inbox
              </text>
            </g>
            <g transform="translate(230, 540)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.55 0.08 220)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Resources
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Articles & Tools
              </text>
            </g>
            <g transform="translate(230, 600)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.55 0.08 220)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                My Profile
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Settings & Privacy
              </text>
            </g>

            {/* Flow arrows */}
            <path
              d="M105 465 L105 480"
              stroke="oklch(0.55 0.08 220)"
              strokeWidth="1"
              strokeOpacity="0.5"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M105 525 L105 540"
              stroke="oklch(0.55 0.08 220)"
              strokeWidth="1"
              strokeOpacity="0.5"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M105 585 L105 600"
              stroke="oklch(0.55 0.08 220)"
              strokeWidth="1"
              strokeOpacity="0.5"
              markerEnd="url(#arrowhead)"
            />

            {/* Flow label */}
            <text x="200" y="710" textAnchor="middle" className="fill-[oklch(0.55_0.08_220)] text-[10px] font-medium">
              Primary Flow: Browse → Book → Session
            </text>
          </g>

          {/* GUIDE SECTION */}
          <g>
            <rect
              x="420"
              y="290"
              width="360"
              height="590"
              rx="12"
              fill="url(#guideGrad)"
              stroke="oklch(0.75 0.1 160)"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <text x="440" y="315" className="fill-[oklch(0.65_0.12_160)] text-xs font-medium uppercase tracking-wider">
              Guide Dashboard
            </text>

            {/* Guide Hub */}
            <g transform="translate(520, 340)">
              <rect x="0" y="0" width="160" height="50" rx="10" fill="oklch(0.65 0.12 160)" />
              <text x="80" y="20" textAnchor="middle" className="fill-white text-xs font-medium uppercase">
                Professional Hub
              </text>
              <text x="80" y="36" textAnchor="middle" className="fill-white/80 text-xs">
                Dashboard
              </text>
            </g>

            {/* Guide sub-pages */}
            <g transform="translate(440, 420)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.65 0.12 160)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Calendar
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Availability
              </text>
            </g>
            <g transform="translate(440, 480)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.65 0.12 160)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                My Clients
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Active & Past
              </text>
            </g>
            <g transform="translate(440, 540)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.65 0.12 160)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Session Notes
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Private Records
              </text>
            </g>
            <g transform="translate(440, 600)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="oklch(0.65 0.12 160)"
                fillOpacity="0.15"
                stroke="oklch(0.65 0.12 160)"
                strokeWidth="1"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Session Room
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Conduct Session
              </text>
            </g>

            <g transform="translate(630, 420)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.65 0.12 160)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Messages
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Client Comms
              </text>
            </g>
            <g transform="translate(630, 480)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.65 0.12 160)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                My Profile
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Public Bio
              </text>
            </g>
            <g transform="translate(630, 540)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.65 0.12 160)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Earnings
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Payments
              </text>
            </g>
            <g transform="translate(630, 600)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.65 0.12 160)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Settings
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Account & Prefs
              </text>
            </g>

            <text x="600" y="710" textAnchor="middle" className="fill-[oklch(0.65_0.12_160)] text-[10px] font-medium">
              Primary Flow: Calendar → Client → Session
            </text>
          </g>

          {/* STEWARD SECTION */}
          <g>
            <rect
              x="820"
              y="290"
              width="360"
              height="590"
              rx="12"
              fill="url(#stewardGrad)"
              stroke="oklch(0.85 0.08 85)"
              strokeWidth="1"
              strokeOpacity="0.3"
            />
            <text x="840" y="315" className="fill-[oklch(0.7_0.1_85)] text-xs font-medium uppercase tracking-wider">
              Steward Dashboard
            </text>

            {/* Steward Hub */}
            <g transform="translate(920, 340)">
              <rect x="0" y="0" width="160" height="50" rx="10" fill="oklch(0.7 0.1 85)" />
              <text x="80" y="20" textAnchor="middle" className="fill-white text-xs font-medium uppercase">
                Admin Hub
              </text>
              <text x="80" y="36" textAnchor="middle" className="fill-white/80 text-xs">
                Control Center
              </text>
            </g>

            {/* Steward sub-pages */}
            <g transform="translate(840, 420)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.7 0.1 85)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                User Management
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                All Users
              </text>
            </g>
            <g transform="translate(840, 480)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.7 0.1 85)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Verification
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Credentials
              </text>
            </g>
            <g transform="translate(840, 540)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.7 0.1 85)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Resource Library
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Content CMS
              </text>
            </g>
            <g transform="translate(840, 600)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.7 0.1 85)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Reports
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Analytics
              </text>
            </g>

            <g transform="translate(1030, 420)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.7 0.1 85)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Support Tickets
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Help Requests
              </text>
            </g>
            <g transform="translate(1030, 480)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.7 0.1 85)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                System Settings
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Configuration
              </text>
            </g>
            <g transform="translate(1030, 540)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.7 0.1 85)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Audit Log
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Activity History
              </text>
            </g>
            <g transform="translate(1030, 600)">
              <rect
                x="0"
                y="0"
                width="130"
                height="45"
                rx="8"
                fill="white"
                stroke="oklch(0.7 0.1 85)"
                strokeWidth="1"
                strokeOpacity="0.5"
              />
              <text x="65" y="18" textAnchor="middle" className="fill-foreground text-xs font-medium">
                Platform Health
              </text>
              <text x="65" y="32" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                Monitoring
              </text>
            </g>

            <text x="1000" y="710" textAnchor="middle" className="fill-[oklch(0.7_0.1_85)] text-[10px] font-medium">
              Primary Flow: Monitor → Verify → Curate
            </text>
          </g>

          {/* Shared Session Connection */}
          <line
            x1="170"
            y1="622"
            x2="440"
            y2="622"
            stroke="oklch(0.5 0.02 240)"
            strokeWidth="1"
            strokeDasharray="6 3"
            opacity="0.5"
          />
          <text x="305" y="615" textAnchor="middle" className="fill-muted-foreground text-[9px]">
            Shared Session
          </text>

          {/* Legend */}
          <g transform="translate(20, 760)">
            <rect
              x="0"
              y="0"
              width="280"
              height="70"
              rx="8"
              fill="oklch(0.98 0.005 220)"
              stroke="oklch(0.9 0.01 220)"
              strokeWidth="1"
            />
            <text x="15" y="20" className="fill-muted-foreground text-[10px] font-medium uppercase">
              Legend
            </text>
            <g transform="translate(15, 32)">
              <rect x="0" y="0" width="12" height="12" rx="3" fill="oklch(0.55 0.08 220)" />
              <text x="18" y="10" className="fill-foreground text-[10px]">
                Seeker Role
              </text>
            </g>
            <g transform="translate(95, 32)">
              <rect x="0" y="0" width="12" height="12" rx="3" fill="oklch(0.65 0.12 160)" />
              <text x="18" y="10" className="fill-foreground text-[10px]">
                Guide Role
              </text>
            </g>
            <g transform="translate(175, 32)">
              <rect x="0" y="0" width="12" height="12" rx="3" fill="oklch(0.7 0.1 85)" />
              <text x="18" y="10" className="fill-foreground text-[10px]">
                Steward Role
              </text>
            </g>
            <g transform="translate(15, 50)">
              <line x1="0" y1="6" x2="30" y2="6" stroke="oklch(0.5 0.02 240)" strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="38" y="10" className="fill-foreground text-[10px]">
                Navigation Flow
              </text>
            </g>
            <g transform="translate(140, 50)">
              <rect
                x="0"
                y="0"
                width="12"
                height="12"
                rx="3"
                fill="white"
                stroke="oklch(0.8 0.02 220)"
                strokeWidth="1"
              />
              <text x="18" y="10" className="fill-foreground text-[10px]">
                Page/Screen
              </text>
            </g>
          </g>
        </svg>
      </Card>

      {/* Rationale */}
      <div className="bg-muted/30 border border-border rounded-xl p-6 space-y-3">
        <h3 className="font-semibold text-foreground">Design Rationale</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Role-based color coding</strong> provides instant visual recognition of context, reducing
              cognitive load and reinforcing security boundaries.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Clear authentication gate</strong> visually separates public content from private areas,
              emphasizing platform security.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Highlighted Session Room</strong> shows the shared touchpoint between Seeker and Guide,
              demonstrating the platform's core value proposition.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Progressive disclosure</strong> from hub to sub-pages prevents overwhelming users while
              maintaining clear navigation paths.
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
