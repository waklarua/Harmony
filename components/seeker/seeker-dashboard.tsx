"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { SeekerLayout } from "./seeker-layout"
import { Calendar, Clock, ArrowRight, Video, MessageSquare, TrendingUp, BookOpen, Search, Sparkles, User } from "lucide-react"
import { mockSessions, mockMoodData, mockUser, mockCounselors } from "@/lib/mock-data"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CrisisBanner } from "@/components/shared/crisis-banner"
import { EmptyState } from "@/components/shared/empty-state"
import { JourneyProgress } from "@/components/seeker/journey-progress"

export function SeekerDashboard() {
  const upcomingSession = mockSessions.find((s) => s.status === "upcoming")
  const completedSessions = mockSessions.filter((s) => s.status === "completed")

  return (
    <SeekerLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, {mockUser.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your mental health journey today</p>
        </div>

        {/* Action Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/seeker/counselors">
            <Card className="cursor-pointer border-primary/20 bg-gradient-to-br from-blue-500 to-blue-600 text-white transition-all hover:shadow-lg hover:scale-105">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Find Counselor</p>
                  <p className="text-sm opacity-90">Browse available therapists</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/seeker/resources">
            <Card className="cursor-pointer border-accent/20 bg-gradient-to-br from-green-500 to-green-600 text-white transition-all hover:shadow-lg hover:scale-105">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Resources</p>
                  <p className="text-sm opacity-90">Access wellness materials</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/seeker/profile">
            <Card className="cursor-pointer bg-gradient-to-br from-purple-500 to-purple-600 text-white transition-all hover:shadow-lg hover:scale-105">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">My Profile</p>
                  <p className="text-sm opacity-90">Update your information</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Upcoming Sessions Title */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Sessions & Activity */}
          <div className="space-y-6 lg:col-span-2">
            {/* Upcoming Sessions - Display all instead of single card */}
            {mockSessions.filter((s) => s.status === "upcoming").length > 0 ? (
              <div className="space-y-4">
                {mockSessions
                  .filter((s) => s.status === "upcoming")
                  .map((session) => (
                    <Card key={session.id} className="overflow-hidden border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-14 w-14 flex-shrink-0">
                              <AvatarImage
                                src={session.counselorAvatar || "/placeholder.svg"}
                                alt={session.counselorName}
                              />
                              <AvatarFallback>{session.counselorName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-semibold text-lg">{session.counselorName}</p>
                              <p className="text-sm text-muted-foreground mb-3">
                                {mockCounselors.find((c) => c.id === session.counselorId)?.specialties?.[0] || "Therapy"}
                              </p>
                              <div className="flex flex-col gap-1 text-sm">
                                <span className="flex items-center gap-2 text-muted-foreground">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(session.date).toLocaleDateString("en-ET", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                    timeZone: "Africa/Addis_Ababa",
                                  })}
                                </span>
                                <span className="flex items-center gap-2 text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {session.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 sm:flex-col">
                            <Link href={`/session/${session.id}`} className="flex-1 sm:flex-none">
                              <Button className="w-full">Join Session</Button>
                            </Link>
                            <Button variant="outline" className="flex-1 sm:flex-none bg-transparent">
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : (
              <EmptyState variant="no-upcoming-sessions" />
            )}

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Sessions</CardTitle>
                  <Link href="/seeker/sessions">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {completedSessions.length > 0 ? (
                  <div className="space-y-4">
                    {completedSessions.slice(0, 3).map((session) => (
                      <div
                        key={session.id}
                        className="flex items-start justify-between rounded-lg border border-border p-4"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={session.counselorAvatar || "/placeholder.svg"}
                              alt={session.counselorName}
                            />
                            <AvatarFallback>{session.counselorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{session.counselorName}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(session.date).toLocaleDateString("en-ET", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                timeZone: "Africa/Addis_Ababa",
                              })}
                            </p>
                            {session.notes && <p className="mt-2 text-sm text-muted-foreground">{session.notes}</p>}
                          </div>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">Your completed sessions will appear here.</p>
                    <Link href="/seeker/counselors" className="mt-2 inline-block">
                      <Button variant="link" size="sm" className="gap-1">
                        Book your first session
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Recent Activity */}
          <div className="space-y-6">
            <CrisisBanner />

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: "✓", text: "Session completed 2 hours ago", time: "" },
                  { icon: "💬", text: "New message 5 hours ago", time: "" },
                  { icon: "💬", text: "New message 5 hours ago", time: "" },
                  { icon: "📅", text: "Session rescheduled 1 day ago", time: "" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-b-0">
                    <span className="text-lg">{activity.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{activity.text}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Your Journey compact widget */}
            <JourneyProgress variant="compact" />

            <p className="text-xs text-center text-muted-foreground">All times displayed in EAT (UTC+3)</p>
          </div>
        </div>
      </div>
    </SeekerLayout>
  )
}
