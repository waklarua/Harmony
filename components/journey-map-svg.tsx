"use client"

import { Card } from "@/components/ui/card"

export function JourneyMapSVG() {
  return (
    <div className="space-y-6">
      <Card className="p-6 overflow-x-auto">
        <svg viewBox="0 0 1400 800" className="w-full min-w-[1000px]" style={{ maxHeight: "650px" }}>
          <defs>
            <linearGradient id="emotionHigh" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.65 0.12 145)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="oklch(0.65 0.12 145)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="emotionLow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.6 0.15 25)" stopOpacity="0" />
              <stop offset="100%" stopColor="oklch(0.6 0.15 25)" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Title */}
          <text x="700" y="30" textAnchor="middle" className="fill-foreground text-lg font-semibold">
            First Session Journey: Seeker & Guide Perspectives
          </text>
          <text x="700" y="50" textAnchor="middle" className="fill-muted-foreground text-sm">
            Scenario: A first-time Seeker successfully completes an introductory session
          </text>

          {/* Phase Headers */}
          <g transform="translate(0, 70)">
            {["Awareness", "Exploration", "Commitment", "Preparation", "Session", "Reflection"].map((phase, i) => (
              <g key={phase} transform={`translate(${120 + i * 210}, 0)`}>
                <rect
                  x="0"
                  y="0"
                  width="190"
                  height="35"
                  rx="6"
                  fill="oklch(0.95 0.01 220)"
                  stroke="oklch(0.85 0.02 220)"
                  strokeWidth="1"
                />
                <text x="95" y="22" textAnchor="middle" className="fill-foreground text-sm font-medium">
                  {phase}
                </text>
              </g>
            ))}
          </g>

          {/* SEEKER JOURNEY (Top Half) */}
          <g transform="translate(0, 120)">
            <text x="60" y="20" textAnchor="middle" className="fill-[oklch(0.55_0.08_220)] text-sm font-semibold">
              SEEKER
            </text>
            <text x="60" y="35" textAnchor="middle" className="fill-[oklch(0.55_0.08_220)] text-xs opacity-70">
              The Seeker
            </text>

            {/* Emotion zones */}
            <rect x="110" y="50" width="1260" height="100" rx="6" fill="url(#emotionHigh)" opacity="0.5" />
            <rect x="110" y="150" width="1260" height="100" rx="6" fill="url(#emotionLow)" opacity="0.5" />

            {/* Baseline */}
            <line
              x1="110"
              y1="150"
              x2="1370"
              y2="150"
              stroke="oklch(0.8 0.02 220)"
              strokeWidth="1"
              strokeDasharray="4 2"
            />
            <text x="115" y="145" className="fill-muted-foreground text-[9px]">
              Neutral
            </text>
            <text x="115" y="70" className="fill-[oklch(0.65_0.12_145)] text-[9px]">
              Positive
            </text>
            <text x="115" y="230" className="fill-[oklch(0.6_0.15_25)] text-[9px]">
              Anxious
            </text>

            {/* Journey line */}
            <path
              d="M170 200 
                 C200 200, 220 180, 280 170 
                 C340 160, 380 190, 430 200 
                 C480 210, 520 170, 590 150 
                 C660 130, 720 140, 800 120 
                 C880 100, 940 110, 1010 100 
                 C1080 90, 1140 80, 1200 75 
                 C1260 70, 1300 65, 1340 60"
              fill="none"
              stroke="oklch(0.55 0.08 220)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Touchpoints */}
            <g transform="translate(170, 195)">
              <circle cx="0" cy="0" r="8" fill="oklch(0.55 0.08 220)" />
              <text x="0" y="-15" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                Sees Ad
              </text>
              <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Anxious but
              </text>
              <text x="0" y="35" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                curious
              </text>
            </g>

            <g transform="translate(280, 165)">
              <circle cx="0" cy="0" r="8" fill="oklch(0.55 0.08 220)" />
              <text x="0" y="-15" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                Visits Site
              </text>
              <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Relieved by
              </text>
              <text x="0" y="35" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                calm design
              </text>
            </g>

            <g transform="translate(430, 195)">
              <circle cx="0" cy="0" r="10" fill="oklch(0.6 0.15 25)" stroke="oklch(0.55 0.08 220)" strokeWidth="2" />
              <text x="0" y="-20" textAnchor="middle" className="fill-destructive text-[10px] font-medium">
                Sign Up
              </text>
              <text x="0" y="30" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                😰 Pain Point:
              </text>
              <text x="0" y="42" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Privacy fears
              </text>
            </g>

            <g transform="translate(590, 145)">
              <circle cx="0" cy="0" r="8" fill="oklch(0.55 0.08 220)" />
              <text x="0" y="-15" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                Browse
              </text>
              <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Hopeful,
              </text>
              <text x="0" y="35" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                comparing
              </text>
            </g>

            <g transform="translate(800, 115)">
              <circle cx="0" cy="0" r="8" fill="oklch(0.55 0.08 220)" />
              <text x="0" y="-15" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                Book
              </text>
              <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Relieved,
              </text>
              <text x="0" y="35" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                committed
              </text>
            </g>

            <g transform="translate(1010, 95)">
              <circle cx="0" cy="0" r="10" fill="oklch(0.6 0.15 25)" stroke="oklch(0.55 0.08 220)" strokeWidth="2" />
              <text x="0" y="-20" textAnchor="middle" className="fill-destructive text-[10px] font-medium">
                Wait
              </text>
              <text x="0" y="30" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                😰 Pain Point:
              </text>
              <text x="0" y="42" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Pre-session nerves
              </text>
            </g>

            <g transform="translate(1200, 70)">
              <circle cx="0" cy="0" r="8" fill="oklch(0.55 0.08 220)" />
              <text x="0" y="-15" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                Session
              </text>
              <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Nervous→
              </text>
              <text x="0" y="35" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Relieved
              </text>
            </g>

            <g transform="translate(1340, 55)">
              <circle cx="0" cy="0" r="10" fill="oklch(0.65 0.12 145)" stroke="oklch(0.55 0.08 220)" strokeWidth="2" />
              <text x="0" y="-20" textAnchor="middle" className="fill-[oklch(0.65_0.12_145)] text-[10px] font-medium">
                Complete
              </text>
              <text x="0" y="30" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                ✓ Goal Met:
              </text>
              <text x="0" y="42" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Hopeful, seen
              </text>
            </g>
          </g>

          {/* Divider */}
          <line x1="110" y1="420" x2="1370" y2="420" stroke="oklch(0.85 0.02 220)" strokeWidth="2" />
          <rect
            x="640"
            y="405"
            width="120"
            height="30"
            rx="15"
            fill="background"
            stroke="oklch(0.8 0.02 220)"
            strokeWidth="1"
          />
          <text x="700" y="425" textAnchor="middle" className="fill-muted-foreground text-xs">
            Shared Session
          </text>

          {/* GUIDE JOURNEY (Bottom Half) */}
          <g transform="translate(0, 450)">
            <text x="60" y="20" textAnchor="middle" className="fill-[oklch(0.65_0.12_160)] text-sm font-semibold">
              GUIDE
            </text>
            <text x="60" y="35" textAnchor="middle" className="fill-[oklch(0.65_0.12_160)] text-xs opacity-70">
              The Guide
            </text>

            {/* Emotion zones */}
            <rect x="110" y="50" width="1260" height="80" rx="6" fill="url(#emotionHigh)" opacity="0.3" />
            <rect x="110" y="130" width="1260" height="80" rx="6" fill="url(#emotionLow)" opacity="0.2" />

            {/* Baseline */}
            <line
              x1="110"
              y1="130"
              x2="1370"
              y2="130"
              stroke="oklch(0.8 0.02 220)"
              strokeWidth="1"
              strokeDasharray="4 2"
            />

            {/* Journey line */}
            <path
              d="M170 160 
                 C220 160, 260 140, 320 130 
                 C380 120, 430 145, 490 150 
                 C550 155, 600 130, 680 120 
                 C760 110, 840 115, 920 110 
                 C1000 105, 1080 100, 1140 95 
                 C1200 90, 1280 85, 1340 80"
              fill="none"
              stroke="oklch(0.65 0.12 160)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Touchpoints */}
            <g transform="translate(170, 155)">
              <circle cx="0" cy="0" r="8" fill="oklch(0.65 0.12 160)" />
              <text x="0" y="-15" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                Apply
              </text>
              <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Optimistic
              </text>
            </g>

            <g transform="translate(320, 125)">
              <circle cx="0" cy="0" r="8" fill="oklch(0.65 0.12 160)" />
              <text x="0" y="-15" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                Verified
              </text>
              <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Confident
              </text>
            </g>

            <g transform="translate(490, 145)">
              <circle cx="0" cy="0" r="10" fill="oklch(0.6 0.15 25)" stroke="oklch(0.65 0.12 160)" strokeWidth="2" />
              <text x="0" y="-20" textAnchor="middle" className="fill-destructive text-[10px] font-medium">
                Profile Setup
              </text>
              <text x="0" y="30" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                ⚠️ Friction:
              </text>
              <text x="0" y="42" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Time investment
              </text>
            </g>

            <g transform="translate(680, 115)">
              <circle cx="0" cy="0" r="8" fill="oklch(0.65 0.12 160)" />
              <text x="0" y="-15" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                Set Hours
              </text>
              <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                In control
              </text>
            </g>

            <g transform="translate(920, 105)">
              <circle cx="0" cy="0" r="8" fill="oklch(0.65 0.12 160)" />
              <text x="0" y="-15" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                Notified
              </text>
              <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                New booking!
              </text>
            </g>

            <g transform="translate(1140, 90)">
              <circle cx="0" cy="0" r="8" fill="oklch(0.65 0.12 160)" />
              <text x="0" y="-15" textAnchor="middle" className="fill-foreground text-[10px] font-medium">
                Session
              </text>
              <text x="0" y="25" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Focused,
              </text>
              <text x="0" y="35" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                empathetic
              </text>
            </g>

            <g transform="translate(1340, 75)">
              <circle cx="0" cy="0" r="10" fill="oklch(0.65 0.12 145)" stroke="oklch(0.65 0.12 160)" strokeWidth="2" />
              <text x="0" y="-20" textAnchor="middle" className="fill-[oklch(0.65_0.12_145)] text-[10px] font-medium">
                Follow-up
              </text>
              <text x="0" y="30" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                ✓ Fulfilled,
              </text>
              <text x="0" y="42" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                notes complete
              </text>
            </g>
          </g>

          {/* Legend */}
          <g transform="translate(110, 710)">
            <rect
              x="0"
              y="0"
              width="400"
              height="70"
              rx="8"
              fill="oklch(0.98 0.005 220)"
              stroke="oklch(0.9 0.01 220)"
              strokeWidth="1"
            />
            <text x="15" y="20" className="fill-muted-foreground text-[10px] font-medium uppercase">
              Legend
            </text>
            <g transform="translate(15, 35)">
              <circle cx="6" cy="6" r="6" fill="oklch(0.55 0.08 220)" />
              <text x="20" y="10" className="fill-foreground text-[10px]">
                Seeker Touchpoint
              </text>
            </g>
            <g transform="translate(130, 35)">
              <circle cx="6" cy="6" r="6" fill="oklch(0.65 0.12 160)" />
              <text x="20" y="10" className="fill-foreground text-[10px]">
                Guide Touchpoint
              </text>
            </g>
            <g transform="translate(245, 35)">
              <circle cx="6" cy="6" r="7" fill="oklch(0.6 0.15 25)" stroke="oklch(0.55 0.08 220)" strokeWidth="2" />
              <text x="22" y="10" className="fill-foreground text-[10px]">
                Pain Point
              </text>
            </g>
            <g transform="translate(330, 35)">
              <circle cx="6" cy="6" r="7" fill="oklch(0.65 0.12 145)" stroke="oklch(0.55 0.08 220)" strokeWidth="2" />
              <text x="22" y="10" className="fill-foreground text-[10px]">
                Goal Met
              </text>
            </g>
            <g transform="translate(15, 55)">
              <line x1="0" y1="0" x2="30" y2="0" stroke="oklch(0.55 0.08 220)" strokeWidth="3" strokeLinecap="round" />
              <text x="40" y="4" className="fill-foreground text-[10px]">
                Emotional journey (higher = more positive)
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
              <strong>Dual-perspective layout</strong> enables stakeholders to see both user types simultaneously,
              identifying synchronization points and shared experiences.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Pain points highlighted</strong> (sign-up privacy fears, pre-session nerves, profile setup
              friction) inform targeted UX interventions.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Emotional trajectory visualization</strong> demonstrates the platform's goal: transforming anxiety
              into hope and relief through intentional design.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Shared session highlight</strong> at center emphasizes the core value proposition where both
              journeys converge.
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
