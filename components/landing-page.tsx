"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, useInView } from "framer-motion"
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
  Database,
  Mail,
  Phone,
  AlertCircle,
  MessageCircle,
  Calendar,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { formatCurrency } from "@/lib/format"
import { authClient } from "@/lib/auth-client"
import { SkipLinks } from "@/components/shared/skip-links"
import { CrisisLink } from "@/components/shared/crisis-banner"

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  )
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 2000
    const step = Math.max(1, Math.floor(target / 60))
    const interval = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(start)
      }
    }, duration / 60)
    return () => clearInterval(interval)
  }, [isInView, target])

  const display = target >= 1000 ? `${Math.floor(count / 1000)}k+` : count < 10 ? count.toFixed(1) : `${count}+`

  return <span ref={ref}>{display}{suffix}</span>
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export function LandingPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = authClient.useSession()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleLogout = async () => {
    await authClient.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      {/* Dot grid background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] bg-[length:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black,transparent_70%)]" />

      <SkipLinks
        links={[
          { href: "#main-content", label: "Skip to main content" },
          { href: "#how-it-works", label: "Skip to How It Works" },
        ]}
      />

      {/* Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary"
              whileHover={{ scale: 1.1, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Heart className="h-5 w-5 text-primary-foreground" />
            </motion.div>
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
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:text-foreground hover:shadow-md hover:shadow-primary/20"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Us</span>
            </Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            {session ? (
              <>
                {(() => {
                  const role = (session.user as { role?: string })?.role || 'seeker'
                  const dashboardHref =
                    role === 'guide' ? '/guide/dashboard'
                    : role === 'steward' ? '/steward/dashboard'
                    : '/seeker/dashboard'
                  return (
                    <Link href={dashboardHref}>
                      <Button variant="ghost" size="sm">Dashboard</Button>
                    </Link>
                  )
                })()}
                <Button variant="outline" size="sm" onClick={handleLogout}>Sign Out</Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
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
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-border bg-background p-4 md:hidden"
          >
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
              <Link href="/contact" className="text-sm text-muted-foreground">
                Contact Us
              </Link>
              <div className="flex gap-3 pt-4">
                {session ? (
                  <>
                    {(() => {
                      const role = (session.user as { role?: string })?.role || 'seeker'
                      const dashboardHref =
                        role === 'guide' ? '/guide/dashboard'
                        : role === 'steward' ? '/steward/dashboard'
                        : '/seeker/dashboard'
                      return (
                        <Link href={dashboardHref} className="flex-1">
                          <Button variant="outline" className="w-full bg-transparent">Dashboard</Button>
                        </Link>
                      )
                    })()}
                    <Button className="flex-1" onClick={handleLogout}>Sign Out</Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">Sign In</Button>
                    </Link>
                    <Link href="/signup" className="flex-1">
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section id="main-content" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="relative flex flex-col items-center md:flex-row md:items-start md:gap-12">
            <motion.div
              className="mx-auto max-w-3xl text-center md:mx-0 md:flex-1 md:text-left"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Your path to better{" "}
                <span className="text-primary">
                  mental well-being
                </span>
                <br />
                starts here
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl md:mx-0">
                Connect with licensed counselors in a secure, private environment. Get the support you deserve, on your
                schedule.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
                <Link href="/signup">
                  <Button size="lg" className="w-full gap-2 sm:w-auto shadow-lg shadow-primary/25">
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
              <motion.div
                className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
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
              </motion.div>
            </motion.div>

            {/* Floating counselor card */}
            <motion.div
              className="hidden md:block flex-shrink-0 mt-8 md:mt-0"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div
                className="w-72 rounded-2xl border border-border bg-card/80 p-6 shadow-xl shadow-primary/5 backdrop-blur-sm"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Dr. Alemayehu wase</p>
                    <p className="text-xs text-muted-foreground">Licensed Counselor</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span className="font-medium">4.9</span>
                  <span className="text-muted-foreground">(128 reviews)</span>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Available today</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-green-600 dark:text-green-400">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Online
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="flex-1 gap-1 text-xs" asChild>
                    <Link href="/signup">
                      <MessageCircle className="h-3.5 w-3.5" />
                      Book Session
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <motion.section
        className="border-y border-border bg-muted/30 py-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">
                <AnimatedCounter target={150} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">Licensed Counselors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary sm:text-4xl">
                <AnimatedCounter target={12000} />
              </div>
              <div className="mt-1 text-sm text-muted-foreground">Sessions Completed</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-3xl font-bold text-primary sm:text-4xl">
                4.<AnimatedCounter target={8} />
              </div>
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
      </motion.section>

      {/* How It Works */}
      <motion.section
        id="how-it-works"
        className="py-20 sm:py-28"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Getting started is simple</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Begin your journey in just a few steps. We have made the process as straightforward as possible.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-8 md:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
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
              <motion.div key={item.step} variants={fadeUp}>
                <Card className="group relative overflow-hidden border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-6">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                      <p className="mt-2 text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Features Grid - Bento Layout */}
      <motion.section
        className="bg-muted/30 py-20 sm:py-28"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for your peace of mind</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Every feature designed with your comfort and security in mind.
            </p>
          </motion.div>

          <motion.div
            className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Featured card - spans 2 cols */}
            <motion.div variants={fadeUp} className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
              <Card className="group h-full border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
                <CardContent className="flex h-full flex-col justify-center p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <CheckCircle className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold">Verified Professionals</h3>
                  <p className="mt-3 max-w-md text-base text-muted-foreground">
                    Every counselor is licensed and thoroughly vetted before joining our platform. Your safety and quality of care are our top priorities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="group h-full border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">Complete Privacy</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your conversations are encrypted and your data is never shared without consent.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="group h-full border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">Flexible Scheduling</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Book sessions that fit your life. Morning, evening, or weekend availability.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="group h-full border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">Multiple Session Types</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Choose video, voice, or text-based sessions based on your comfort level.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="group h-full border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">Progress Tracking</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Monitor your journey with mood tracking and session notes.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="group h-full border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <CardContent className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">Affordable Care</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Transparent pricing starting from {formatCurrency(5130)}/session. No hidden fees.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* For Counselors CTA */}
      <motion.section
        id="for-counselors"
        className="py-20 sm:py-28"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="overflow-hidden rounded-2xl bg-primary"
            whileHover={{ scale: 1.005 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
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
                  <Button size="lg" variant="secondary" className="mt-8 gap-2 shadow-lg">
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
          </motion.div>
        </div>
      </motion.section>

      {/* Privacy Section */}
      <motion.section
        id="privacy"
        className="bg-muted/30 py-20 sm:py-28"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            variants={fadeUp}
          >
            <motion.div
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">Your privacy is our priority</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We understand that seeking support requires trust. That is why we have built our platform with
              industry-leading security measures.
            </p>
          </motion.div>

          <motion.div
            className="mt-12 grid gap-8 md:grid-cols-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp}>
              <Card className="group border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <Lock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">End-to-End Encryption</h3>
                <p className="text-muted-foreground">
                  All communications are encrypted. Only you and your counselor can read your messages.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="group border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Secure Platform</h3>
                <p className="text-muted-foreground">
                  We meet the highest standards for healthcare data protection and privacy.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Card className="group border p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">You Own Your Data</h3>
                <p className="text-muted-foreground">
                  Export or delete your information at any time. Your data belongs to you.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="py-20 sm:py-28"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to take the first step?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Reaching out is the hardest part. We are here to make the rest easy.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/signup">
                <Button size="lg" className="mt-8 gap-2 shadow-lg shadow-primary/25">
                  Get Started Today
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            <p className="mt-4 text-sm text-muted-foreground">No commitment required. Cancel anytime.</p>
          </motion.div>
        </div>
      </motion.section>

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
                <Link
                  href="/crisis"
                  className="inline-flex w-full items-center gap-2 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm font-medium text-destructive transition-all duration-300 hover:bg-destructive/20 hover:shadow-lg hover:shadow-destructive/20 animate-pulse"
                >
                  <AlertCircle className="h-4 w-4" />
                  Need immediate help? Crisis resources →
                </Link>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://t.me/echoblaze"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <TelegramIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/ermii23"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <InstagramIcon className="h-5 w-5" />
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
                  <Link href="/seeker/counselors" className="hover:text-foreground">
                    Find a Counselor
                  </Link>
                </li>
                <li>
                  <Link href="#for-counselors" className="hover:text-foreground">
                    For Counselors
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
              © 2026 Harmony. All rights reserved. Made with care in Ethiopia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
