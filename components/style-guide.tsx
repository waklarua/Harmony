"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, AlertCircle, Info, Heart, Shield, Eye, Users } from "lucide-react"

export function StyleGuide() {
  return (
    <div className="space-y-12">
      {/* Core Principles */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Core Design Principles</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <PrincipleCard
            icon={<Eye className="w-5 h-5" />}
            title="Transparency Over Mystery"
            description="Every action's consequence is clearly communicated. No hidden processes or ambiguous states. Users always know where their data goes."
          />
          <PrincipleCard
            icon={<Heart className="w-5 h-5" />}
            title="Calm Clarity"
            description="Reduce cognitive load through generous whitespace, clear hierarchy, and single-purpose screens. Never overwhelm; always guide."
          />
          <PrincipleCard
            icon={<Shield className="w-5 h-5" />}
            title="Security as Experience"
            description="Make security features visible and reassuring—not anxiety-inducing. Trust badges, encryption indicators, and privacy controls are prominent."
          />
          <PrincipleCard
            icon={<Users className="w-5 h-5" />}
            title="Human-Centered Abstraction"
            description="Avoid clinical language and sterile aesthetics. The platform should feel like a thoughtful space, not a medical facility."
          />
          <PrincipleCard
            icon={<Info className="w-5 h-5" />}
            title="Progressive Disclosure"
            description="Show only what's needed at each moment. Advanced options exist but don't clutter the primary experience."
          />
        </div>
      </section>

      {/* Color Palette */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Color Palette</h3>
        <p className="text-muted-foreground">
          Colors selected for psychological impact: calming blues and greens that evoke trust, stability, and natural
          healing.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ColorCard
            name="Serene Blue"
            hex="#4A7B9D"
            oklch="oklch(0.55 0.08 220)"
            role="Primary"
            rationale="Evokes trust, stability, and calm. Used for primary actions, navigation, and key UI elements. Tested for accessibility."
          />
          <ColorCard
            name="Healing Sage"
            hex="#5BA88F"
            oklch="oklch(0.65 0.12 160)"
            role="Secondary"
            rationale="Natural, restorative green associated with growth and healing. Used for positive states, success messages, and Guide-related elements."
          />
          <ColorCard
            name="Warm Honey"
            hex="#D4B483"
            oklch="oklch(0.85 0.08 85)"
            role="Accent"
            rationale="Soft warmth without intensity. Used sparingly for highlights, notifications, and admin-related elements."
          />
          <ColorCard
            name="Soft Slate"
            hex="#6B7280"
            oklch="oklch(0.5 0.02 240)"
            role="Neutral"
            rationale="Grounding neutral that provides contrast without coldness. Used for text, borders, and secondary information."
          />
        </div>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <h4 className="font-medium text-foreground">Color Usage Guidelines</h4>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="font-medium text-foreground">Do:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[oklch(0.65_0.12_160)] mt-0.5" />
                  Use Serene Blue for all primary CTAs
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[oklch(0.65_0.12_160)] mt-0.5" />
                  Apply generous whitespace (off-white backgrounds)
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[oklch(0.65_0.12_160)] mt-0.5" />
                  Reserve Healing Sage for success states only
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground">Don't:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
                  Use bright reds for non-critical errors
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
                  Apply clinical white backgrounds (#FFFFFF)
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
                  Combine more than 2 accent colors per screen
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Typography</h3>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Heading: Inter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Clean, geometric sans-serif with excellent readability. Conveys modernity and professionalism while
                remaining approachable.
              </p>
              <div className="space-y-3 border-t border-border pt-4">
                <p className="text-4xl font-semibold">Aa Bb Cc</p>
                <p className="text-2xl font-semibold">The quick brown fox</p>
                <p className="text-xl font-medium">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="text-lg">0123456789</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Body: Inter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Same family for consistency. Variable weight allows subtle emphasis without switching fonts. Optimized
                for screen reading.
              </p>
              <div className="space-y-3 border-t border-border pt-4">
                <p className="text-base leading-relaxed">
                  Body text (16px): "Taking the first step toward support takes courage. We're here to make that step as
                  easy and safe as possible."
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Secondary text (14px): Your information is encrypted and secure.
                </p>
                <p className="text-xs text-muted-foreground">Caption text (12px): Last updated 5 minutes ago</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted/30 border border-border rounded-xl p-6">
          <h4 className="font-medium text-foreground mb-3">Type Scale</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-baseline gap-4">
              <span className="text-muted-foreground w-24">H1 (36px)</span>
              <span className="text-4xl font-semibold">Page Titles</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-muted-foreground w-24">H2 (24px)</span>
              <span className="text-2xl font-semibold">Section Headers</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-muted-foreground w-24">H3 (20px)</span>
              <span className="text-xl font-medium">Card Titles</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-muted-foreground w-24">Body (16px)</span>
              <span className="text-base">Primary content text</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-muted-foreground w-24">Small (14px)</span>
              <span className="text-sm text-muted-foreground">Secondary information</span>
            </div>
          </div>
        </div>
      </section>

      {/* Imagery & Iconography */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Imagery & Iconography</h3>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Imagery Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="space-y-2">
                <p className="font-medium text-foreground">Preferred:</p>
                <ul className="space-y-1">
                  <li>• Abstract, nature-inspired patterns (flowing water, gentle curves)</li>
                  <li>• Soft, desaturated photography of environments (not people)</li>
                  <li>• Illustrations with organic, hand-drawn qualities</li>
                  <li>• Symbolic imagery: paths, doorways, light, growth</li>
                </ul>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Avoid:</p>
                <ul className="space-y-1">
                  <li>• Stock photos of "happy people" or forced smiles</li>
                  <li>• Clinical/medical imagery (stethoscopes, clipboards)</li>
                  <li>• Overly abstract or tech-focused visuals</li>
                  <li>• Images that could trigger or stigmatize</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Icon System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Icons should be simple, positive, and unambiguous. Use rounded stroke icons (2px weight) from the Lucide
                library.
              </p>
              <div className="grid grid-cols-6 gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">Care</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">Secure</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">Connect</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.65_0.12_145)]/10 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[oklch(0.65_0.12_145)]" />
                  </div>
                  <span className="text-xs text-muted-foreground">Success</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.85_0.08_85)]/20 flex items-center justify-center">
                    <Info className="w-5 h-5 text-[oklch(0.7_0.1_85)]" />
                  </div>
                  <span className="text-xs text-muted-foreground">Info</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="text-xs text-muted-foreground">Alert</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* UI Components - Voice & Tone */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">UI Components: Voice & Tone</h3>
        <p className="text-muted-foreground">
          Microcopy should be supportive, empowering, and neutral. Never patronizing, clinical, or anxiety-inducing.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Empty States */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Empty States</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-medium text-foreground">No sessions yet</h4>
                <p className="text-sm text-muted-foreground">
                  When you're ready, browse our counselors to find someone who feels right for you. There's no
                  pressure—take your time.
                </p>
                <Button size="sm" className="mt-2">
                  Browse Counselors
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Error Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Error Messages</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground">Connection interrupted</p>
                  <p className="text-sm text-muted-foreground">
                    Don't worry—your session is safe. We're reconnecting now. If this continues, you can rejoin using
                    the link in your email.
                  </p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">
                <strong>Tone:</strong> Reassuring first, then informative. Never blame the user.
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Modals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Confirmation Modal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-card border border-border rounded-lg p-5 space-y-4 shadow-lg">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">Book this session?</h4>
                  <p className="text-sm text-muted-foreground">
                    You're about to book a 50-minute session with <strong>Dr. Sarah Chen</strong> on{" "}
                    <strong>Tuesday, Jan 15 at 3:00 PM</strong>.
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 text-sm text-muted-foreground flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary mt-0.5" />
                  Your session is private and encrypted. Only you and your counselor can access it.
                </div>
                <div className="flex gap-3 justify-end">
                  <Button variant="outline" size="sm">
                    Go back
                  </Button>
                  <Button size="sm">Confirm booking</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Labels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Form Elements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  What brings you here today? <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <Input placeholder="Share as much or as little as you'd like..." />
                <p className="text-xs text-muted-foreground">
                  This helps counselors understand how they might support you. You can update this anytime.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <label className="text-sm font-medium text-foreground">Create a password</label>
                <Input type="password" placeholder="At least 8 characters" />
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Your password is encrypted and never stored as plain text.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Button States */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Component Examples</h3>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Button Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <Button>Primary Action</Button>
                <p className="text-xs text-muted-foreground text-center">Primary</p>
              </div>
              <div className="space-y-2">
                <Button variant="secondary">Secondary</Button>
                <p className="text-xs text-muted-foreground text-center">Secondary</p>
              </div>
              <div className="space-y-2">
                <Button variant="outline">Outline</Button>
                <p className="text-xs text-muted-foreground text-center">Outline</p>
              </div>
              <div className="space-y-2">
                <Button variant="ghost">Ghost</Button>
                <p className="text-xs text-muted-foreground text-center">Ghost</p>
              </div>
              <div className="space-y-2">
                <Button disabled>Disabled</Button>
                <p className="text-xs text-muted-foreground text-center">Disabled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Status Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-[oklch(0.65_0.12_145)]/15 text-[oklch(0.5_0.12_145)] border-[oklch(0.65_0.12_145)]/30">
                <Check className="w-3 h-3 mr-1" />
                Verified
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/30">Upcoming</Badge>
              <Badge className="bg-[oklch(0.85_0.08_85)]/20 text-[oklch(0.6_0.1_85)] border-[oklch(0.85_0.08_85)]/30">
                In Review
              </Badge>
              <Badge variant="secondary">Completed</Badge>
              <Badge className="bg-destructive/10 text-destructive border-destructive/30">Cancelled</Badge>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

function PrincipleCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <h4 className="font-medium text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function ColorCard({
  name,
  hex,
  oklch,
  role,
  rationale,
}: {
  name: string
  hex: string
  oklch: string
  role: string
  rationale: string
}) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="h-24 w-full" style={{ backgroundColor: hex }} />
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-foreground">{name}</h4>
          <Badge variant="secondary" className="text-xs">
            {role}
          </Badge>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <p className="font-mono">{hex}</p>
          <p className="font-mono text-[10px]">{oklch}</p>
        </div>
        <p className="text-xs text-muted-foreground pt-2 border-t border-border">{rationale}</p>
      </div>
    </div>
  )
}
