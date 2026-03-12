"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GuideLayout } from "./guide-layout"
import { Calendar, Clock, ArrowRight, Video, Users, TrendingUp, Star, MessageSquare, FileText } from "lucide-react"
import { mockClients, mockGuideSchedule, mockGuide } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/format"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const earningsData = [
  { month: "Oct", amount: 136800 },
  { month: "Nov", amount: 159600 },
  { month: "Dec", amount: 182400 },
]

export function GuideDashboard() {
  const todaysSessions = mockGuideSchedule.filter((s) => s.status === "upcoming")
  const activeClients = mockClients.filter((c) => c.status === "active")

  return (
    <GuideLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, Dr. {mockGuide.name.split(" ")[1]}
          </h1>
          <p className="text-muted-foreground">
            {todaysSessions.length} session{todaysSessions.length !== 1 ? "s" : ""} scheduled today
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Link href="/guide/clients">
            <Card className="cursor-pointer border-primary/20 bg-gradient-to-br from-blue-500 to-blue-600 text-white transition-all hover:shadow-lg hover:scale-105">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">My Clients</p>
                  <p className="text-sm opacity-90">{activeClients.length} active clients</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/guide/schedule">
            <Card className="cursor-pointer border-accent/20 bg-gradient-to-br from-green-500 to-green-600 text-white transition-all hover:shadow-lg hover:scale-105">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Schedule</p>
                  <p className="text-sm opacity-90">Manage your availability</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/guide/earnings">
            <Card className="cursor-pointer bg-gradient-to-br from-purple-500 to-purple-600 text-white transition-all hover:shadow-lg hover:scale-105">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Earnings</p>
                  <p className="text-sm opacity-90">{formatCurrency(182400)} this month</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Today's Schedule & Earnings */}
          <div className="space-y-6 lg:col-span-2">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Today&apos;s Schedule</CardTitle>
                    <CardDescription>Your upcoming sessions for today (EAT)</CardDescription>
                  </div>
                  <Link href="/guide/schedule">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {todaysSessions.length > 0 ? (
                  <div className="space-y-4">
                    {todaysSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={session.clientAvatar || "/placeholder.svg"} alt={session.clientName} />
                            <AvatarFallback>{session.clientName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{session.clientName}</p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Video className="h-3 w-3" />
                                {session.duration} min
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/session/${session.id}`}>
                            <Button size="sm">Start Session</Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            View Notes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">No sessions scheduled for today</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Earnings Chart */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Earnings Overview
                    </CardTitle>
                    <CardDescription>Your earnings over the past 3 months (ETB)</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    amount: {
                      label: "Earnings (ETB)",
                      color: "var(--primary)",
                    },
                  }}
                  className="h-[200px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={earningsData}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats & Activity */}
          <div className="space-y-6">
            {/* Key Stats */}
            <div className="grid gap-3">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Clients</p>
                    <p className="text-2xl font-bold">{activeClients.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary/50" />
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-accent">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold">4.9</p>
                  </div>
                  <Star className="h-8 w-8 text-accent/50" />
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Sessions This Month</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-500/50" />
                </CardContent>
              </Card>
            </div>

            {/* New Booking Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Booking Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/professional-portrait.png" alt="Musse Ahmed" />
                      <AvatarFallback>M</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Musse Ahmed</p>
                      <p className="text-xs text-muted-foreground">Requested today</p>
                    </div>
                  </div>
                  <Badge className="text-xs">New</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Access */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tools</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <FileText className="h-4 w-4" />
                  Session Notes Template
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
                  <MessageSquare className="h-4 w-4" />
                  Message a Client
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GuideLayout>
  )
}
