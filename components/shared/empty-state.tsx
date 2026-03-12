"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Search, Users, BookOpen, Heart, MessageSquare, Sparkles, ArrowRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { mockCounselors } from "@/lib/mock-data"

type EmptyStateVariant =
  | "no-upcoming-sessions"
  | "no-completed-sessions"
  | "no-clients"
  | "no-new-clients"
  | "no-past-clients"
  | "no-search-results"
  | "no-resources"

interface EmptyStateProps {
  variant: EmptyStateVariant
  searchQuery?: string
}

// Get 3 recommended counselors for the empty state
const recommendedCounselors = mockCounselors.slice(0, 3)

export function EmptyState({ variant, searchQuery }: EmptyStateProps) {
  const configs: Record<
    EmptyStateVariant,
    {
      icon: typeof Calendar
      title: string
      description: string
      showCounselors?: boolean
      cta?: { label: string; href: string }
      secondaryCta?: { label: string; href: string }
    }
  > = {
    "no-upcoming-sessions": {
      icon: Calendar,
      title: "Ready for your first session?",
      description: "Taking the first step is brave. We have compassionate counselors ready to support your journey.",
      showCounselors: true,
      cta: { label: "Find a Counselor", href: "/seeker/counselors" },
      secondaryCta: { label: "Browse Resources", href: "/seeker/resources" },
    },
    "no-completed-sessions": {
      icon: Heart,
      title: "Your journey starts here",
      description:
        "Once you complete sessions, you'll see your progress and notes here. Every conversation is a step forward.",
      cta: { label: "Book Your First Session", href: "/seeker/counselors" },
    },
    "no-clients": {
      icon: Users,
      title: "No clients match your search",
      description: "Try adjusting your search terms or clearing filters to see all clients.",
    },
    "no-new-clients": {
      icon: Sparkles,
      title: "No new client requests",
      description: "New clients who book with you will appear here. Keep your profile updated to attract more seekers.",
      cta: { label: "Update Profile", href: "/guide/settings" },
    },
    "no-past-clients": {
      icon: Users,
      title: "No past clients yet",
      description: "Clients who complete their sessions will move here for your records.",
    },
    "no-search-results": {
      icon: Search,
      title: searchQuery ? `No results for "${searchQuery}"` : "No results found",
      description: "Try adjusting your search terms or clearing filters.",
    },
    "no-resources": {
      icon: BookOpen,
      title: "No resources match your search",
      description: "Try adjusting your search or selecting a different category.",
      cta: { label: "View All Resources", href: "/seeker/resources" },
    },
  }

  const config = configs[variant]
  const Icon = config.icon

  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        {/* Illustrated Icon */}
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-10 w-10 text-primary" />
          </div>
          {config.showCounselors && (
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <MessageSquare className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Text Content */}
        <h3 className="mt-6 text-lg font-semibold">{config.title}</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{config.description}</p>

        {/* Recommended Counselors Preview */}
        {config.showCounselors && (
          <div className="mt-6 w-full max-w-md">
            <p className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Recommended for you
            </p>
            <div className="space-y-2">
              {recommendedCounselors.map((counselor) => (
                <Link
                  key={counselor.id}
                  href={`/seeker/counselors/${counselor.id}`}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                    <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{counselor.name}</p>
                    <p className="text-xs text-muted-foreground">{counselor.specialties[0]}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {config.cta && (
            <Link href={config.cta.href}>
              <Button className="gap-2">
                {config.cta.label}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {config.secondaryCta && (
            <Link href={config.secondaryCta.href}>
              <Button variant="outline" className="bg-transparent">
                {config.secondaryCta.label}
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
