"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Settings, CreditCard, Shield, Video, Users, MessageCircle, ArrowRight } from "lucide-react"

const helpCategories = [
  {
    icon: BookOpen,
    title: "Getting Started",
    description: "New to Harmony? Start here.",
    articles: [
      { title: "How to create your account", href: "/help/create-account" },
      { title: "Finding the right counselor", href: "/help/find-counselor" },
      { title: "Your first session - what to expect", href: "/help/first-session" },
    ],
  },
  {
    icon: Video,
    title: "Sessions & Meetings",
    description: "Everything about your sessions.",
    articles: [
      { title: "Joining a video session", href: "/help/join-session" },
      { title: "Session rescheduling and cancellation", href: "/help/reschedule" },
      { title: "Technical requirements for video", href: "/help/tech-requirements" },
    ],
  },
  {
    icon: Settings,
    title: "Account Settings",
    description: "Manage your account and preferences.",
    articles: [
      { title: "Updating your profile", href: "/help/update-profile" },
      { title: "Notification preferences", href: "/help/notifications" },
      { title: "Changing your password", href: "/help/password" },
    ],
  },
  {
    icon: CreditCard,
    title: "Billing & Payments",
    description: "Payment methods and billing questions.",
    articles: [
      { title: "Managing payment methods", href: "/help/payment-methods" },
      { title: "Understanding your bill", href: "/help/billing" },
      { title: "Requesting a refund", href: "/help/refunds" },
    ],
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "How we protect your information.",
    articles: [
      { title: "Your data and privacy", href: "/help/privacy" },
      { title: "Two-factor authentication", href: "/help/2fa" },
      { title: "Downloading your data", href: "/help/data-export" },
    ],
  },
  {
    icon: Users,
    title: "For Counselors",
    description: "Resources for mental health professionals.",
    articles: [
      { title: "Setting up your practice", href: "/help/counselor-setup" },
      { title: "Managing your availability", href: "/help/availability" },
      { title: "Client management tips", href: "/help/client-management" },
    ],
  },
]

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = helpCategories.filter((category) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query) ||
      category.articles.some((a) => a.title.toLowerCase().includes(query))
    )
  })

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">How can we help you?</h1>
          <p className="mt-4 text-lg text-muted-foreground">Search our knowledge base or browse categories below.</p>

          <div className="relative mt-8 max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for help..."
              className="pl-12 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Card key={category.title} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <category.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{category.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>

                <ul className="mt-4 space-y-2">
                  {category.articles.map((article) => (
                    <li key={article.title}>
                      <Link
                        href={article.href}
                        className="group flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <span>{article.title}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
            <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 rounded-xl bg-muted/30 p-8 text-center">
          <MessageCircle className="mx-auto h-10 w-10 text-primary" />
          <h3 className="mt-4 text-xl font-semibold">Can't find what you're looking for?</h3>
          <p className="mt-2 text-muted-foreground">Our support team responds within 24 hours.</p>
          <Link href="/contact">
            <Button className="mt-4">Contact Support</Button>
          </Link>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}
