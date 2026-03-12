"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  Heart,
  Clock,
  Users,
  Lock,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  Facebook,
  Linkedin,
  Youtube,
  Database,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { formatCurrency } from "@/lib/format"
import { SkipLinks } from "@/components/shared/skip-links"
import { CrisisLink } from "@/components/shared/crisis-banner"

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SkipLinks
        links={[
          { href: "#main-content", label: "Skip to main content" },
          { href: "#how-it-works", label: "Skip to How It Works" },
        ]}
      />

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Harmony</span>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 shadow-lg shadow-primary/5 backdrop-blur-sm md:flex">
            <Link
              href="#how-it-works"
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:text-foreground hover:shadow-md hover:shadow-primary/20"
            >
              <CheckCircle className="h-4 w-4" />
              <span>How It Works</span>
            </Link>
            <Link
              href="#for-counselors"
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:text-foreground hover:shadow-md hover:shadow-primary/20"
            >
              <Users className="h-4 w-4" />
              <span>For Counselors</span>
            </Link>
            <Link
              href="#privacy"
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:text-foreground hover:shadow-md hover:shadow-primary/20"
            >
              <Shield className="h-4 w-4" />
              <span>Privacy & Security</span>
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border bg-background p-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link href="#how-it-works" className="text-sm text-muted-foreground">
                How It Works
              </Link>
              <Link href="#for-counselors" className="text-sm text-muted-foreground">
                For Counselors
              </Link>
              <Link href="#privacy" className="text-sm text-muted-foreground">
                Privacy & Security
              </Link>
              <div className="flex gap-3 pt-4">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full bg-transparent">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" className="flex-1">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="main-content" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your path to better <span className="text-primary">mental well-being</span> starts here
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Connect with licensed counselors in a secure, private environment. Get the support you deserve, on your
              schedule.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="w-full gap-2 sm:w-auto">
                  Find Your Counselor
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>Secure Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-primary" />
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Licensed Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-y border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">150+</div>
              <div className="mt-1 text-sm text-muted-foreground">Licensed Counselors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">12k+</div>
              <div className="mt-1 text-sm text-muted-foreground">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">4.8</div>
              <div className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3 w-3 fill-primary text-primary" />
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">24/7</div>
              <div className="mt-1 text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Getting started is simple</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Begin your journey in just a few steps. We have made the process as straightforward as possible.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description:
                  "Sign up and share a bit about yourself and what you are looking for in a counselor. This helps us find the right match.",
                icon: Users,
              },
              {
                step: "02",
                title: "Find Your Match",
                description:
                  "Browse verified counselors by specialty, availability, and approach. Read reviews and find someone who feels right.",
                icon: Heart,
              },
              {
                step: "03",
                title: "Begin Your Sessions",
                description:
                  "Schedule your first session and connect via secure video, voice, or text. Your journey to wellness starts now.",
                icon: Clock,
              },
            ].map((item) => (
              <Card key={item.step} className="relative overflow-hidden border-border bg-card">
                <CardContent className="p-6">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for your peace of mind</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every feature designed with your comfort and security in mind.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Verified Professionals",
                description: "Every counselor is licensed and thoroughly vetted before joining our platform.",
                icon: CheckCircle,
              },
              {
                title: "Complete Privacy",
                description: "Your conversations are encrypted and your data is never shared without consent.",
                icon: Lock,
              },
              {
                title: "Flexible Scheduling",
                description: "Book sessions that fit your life. Morning, evening, or weekend availability.",
                icon: Clock,
              },
              {
                title: "Multiple Session Types",
                description: "Choose video, voice, or text-based sessions based on your comfort level.",
                icon: Users,
              },
              {
                title: "Progress Tracking",
                description: "Monitor your journey with mood tracking and session notes.",
                icon: Heart,
              },
              {
                title: "Affordable Care",
                description: `Transparent pricing starting from ${formatCurrency(5130)}/session. No hidden fees.`,
                icon: Shield,
              },
            ].map((feature) => (
              <Card key={feature.title} className="border-border bg-card">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Counselors CTA */}
      <section id="for-counselors" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-primary">
            <div className="grid items-center gap-8 p-8 md:grid-cols-2 lg:p-12">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Are you a counselor?
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/80">
                  Join our network of licensed professionals and expand your practice. We handle the technology so you
                  can focus on what matters most: helping people.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "Flexible schedule management",
                    "Secure session platform",
                    "Streamlined client management",
                    "Competitive compensation",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-primary-foreground/90">
                      <CheckCircle className="h-5 w-5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup?role=guide">
                  <Button size="lg" variant="secondary" className="mt-8 gap-2">
                    Apply to Join
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative hidden md:block">
                <div className="aspect-square rounded-xl bg-primary-foreground/10 p-8">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Users className="h-16 w-16 text-primary-foreground/60" />
                    <p className="mt-4 text-xl font-semibold text-primary-foreground">Join 150+ counselors</p>
                    <p className="mt-2 text-primary-foreground/70">helping thousands find support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section id="privacy" className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Your privacy is our priority</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We understand that seeking support requires trust. That is why we have built our platform with
              industry-leading security measures.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Card className="border p-6 text-center transition-shadow hover:shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">End-to-End Encryption</h3>
              <p className="text-muted-foreground">
                All communications are encrypted. Only you and your counselor can read your messages.
              </p>
            </Card>

            <Card className="border p-6 text-center transition-shadow hover:shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Secure Platform</h3>
              <p className="text-muted-foreground">
                We meet the highest standards for healthcare data protection and privacy.
              </p>
            </Card>

            <Card className="border p-6 text-center transition-shadow hover:shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Database className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">You Own Your Data</h3>
              <p className="text-muted-foreground">
                Export or delete your information at any time. Your data belongs to you.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to take the first step?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Reaching out is the hardest part. We are here to make the rest easy.
            </p>
            <Link href="/signup">
              <Button size="lg" className="mt-8 gap-2">
                Get Started Today
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">No commitment required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Heart className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold">Harmony</span>
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Providing professional, confidential mental health support to empower individuals across Ethiopia.
              </p>
              <div className="mt-3">
                <CrisisLink />
              </div>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Telegram"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <TelegramIcon className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="group rounded-xl border border-primary/20 bg-background/50 p-4 shadow-[0_0_15px_rgba(74,247,255,0.15)] transition-all duration-300 hover:border-primary/40 hover:bg-background/70 hover:shadow-[0_0_25px_rgba(74,247,255,0.35)]">
              <h4 className="font-semibold">Platform</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#how-it-works" className="hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/counselors" className="hover:text-foreground">
                    Find a Counselor
                  </Link>
                </li>
                <li>
                  <Link href="#for-counselors" className="hover:text-foreground">
                    For Counselors
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div className="group rounded-xl border border-border/20 bg-background/50 p-4 shadow-[0_0_15px_rgba(74,247,255,0.15)] transition-all duration-300 hover:border-primary/40 hover:bg-background/70 hover:shadow-[0_0_25px_rgba(74,247,255,0.35)]">
              <h4 className="font-semibold">Support</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/crisis" className="hover:text-foreground">
                    Crisis Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div className="group rounded-xl border border-border/20 bg-background/50 p-4 shadow-[0_0_15px_rgba(74,247,255,0.15)] transition-all duration-300 hover:border-primary/40 hover:bg-background/70 hover:shadow-[0_0_25px_rgba(74,247,255,0.35)]">
              <h4 className="font-semibold">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="hover:text-foreground">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2025 Harmony. All rights reserved. Made with care in Ethiopia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
