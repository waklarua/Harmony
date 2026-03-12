"use client"

import type React from "react"

import { useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Star,
  Award,
  Sparkles,
  ChevronRight,
  Heart,
  CheckCircle2,
  Flame,
} from "lucide-react"
import { mockSessions, mockMoodData, mockUser } from "@/lib/mock-data"
import { ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface Milestone {
  id: string
  title: string
  description: string
  target: number
  current: number
  type: "sessions" | "streak" | "time" | "goal"
  icon: React.ReactNode
  achieved: boolean
  achievedDate?: string
}

interface JourneyProgressProps {
  variant?: "full" | "compact"
}

export function JourneyProgress({ variant = "full" }: JourneyProgressProps) {
  const completedSessions = mockSessions.filter((s) => s.status === "completed").length
  const memberSince = new Date(mockUser.joinedAt)
  const now = new Date()
  const daysOnPlatform = Math.floor((now.getTime() - memberSince.getTime()) / (1000 * 60 * 60 * 24))
  const weeksOnPlatform = Math.floor(daysOnPlatform / 7)

  // Calculate mood trend
  const moodTrend = useMemo(() => {
    if (mockMoodData.length < 2) return 0
    const recentAvg = mockMoodData.slice(-3).reduce((a, b) => a + b.value, 0) / 3
    const earlierAvg = mockMoodData.slice(0, 3).reduce((a, b) => a + b.value, 0) / 3
    return ((recentAvg - earlierAvg) / earlierAvg) * 100
  }, [])

  // Define milestones
  const milestones: Milestone[] = [
    {
      id: "first-session",
      title: "First Step",
      description: "Complete your first session",
      target: 1,
      current: completedSessions,
      type: "sessions",
      icon: <Star className="h-5 w-5" />,
      achieved: completedSessions >= 1,
      achievedDate: completedSessions >= 1 ? "Dec 9, 2024" : undefined,
    },
    {
      id: "five-sessions",
      title: "Building Momentum",
      description: "Complete 5 sessions",
      target: 5,
      current: completedSessions,
      type: "sessions",
      icon: <Flame className="h-5 w-5" />,
      achieved: completedSessions >= 5,
    },
    {
      id: "ten-sessions",
      title: "Committed",
      description: "Complete 10 sessions",
      target: 10,
      current: completedSessions,
      type: "sessions",
      icon: <Trophy className="h-5 w-5" />,
      achieved: completedSessions >= 10,
    },
    {
      id: "one-month",
      title: "One Month Strong",
      description: "Active for 30 days",
      target: 30,
      current: daysOnPlatform,
      type: "time",
      icon: <Calendar className="h-5 w-5" />,
      achieved: daysOnPlatform >= 30,
      achievedDate: daysOnPlatform >= 30 ? "Dec 15, 2024" : undefined,
    },
    {
      id: "three-months",
      title: "Quarter Journey",
      description: "Active for 3 months",
      target: 90,
      current: daysOnPlatform,
      type: "time",
      icon: <Award className="h-5 w-5" />,
      achieved: daysOnPlatform >= 90,
    },
  ]

  const achievedMilestones = milestones.filter((m) => m.achieved)
  const nextMilestone = milestones.find((m) => !m.achieved)

  // Therapy goals progress (mock data)
  const therapyGoals = [
    { id: "anxiety", label: "Managing Anxiety", progress: 65 },
    { id: "stress", label: "Stress Management", progress: 80 },
    { id: "self-esteem", label: "Building Self-Esteem", progress: 45 },
  ]

  // Compact widget for dashboard
  if (variant === "compact") {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-primary" />
              Your Journey
            </CardTitle>
            <Link href="/seeker/journey">
              <Button variant="ghost" size="sm" className="gap-1 h-8">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-primary/10 p-3">
              <p className="text-2xl font-bold text-primary">{completedSessions}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
            <div className="rounded-lg bg-accent/10 p-3">
              <p className="text-2xl font-bold text-accent-foreground">{weeksOnPlatform}</p>
              <p className="text-xs text-muted-foreground">Weeks</p>
            </div>
            <div className="rounded-lg bg-green-500/10 p-3">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{achievedMilestones.length}</p>
              <p className="text-xs text-muted-foreground">Milestones</p>
            </div>
          </div>

          {/* Next Milestone */}
          {nextMilestone && (
            <div className="rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  {nextMilestone.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{nextMilestone.title}</p>
                  <Progress value={(nextMilestone.current / nextMilestone.target) * 100} className="mt-1 h-2" />
                  <p className="mt-1 text-xs text-muted-foreground">
                    {nextMilestone.current} / {nextMilestone.target}{" "}
                    {nextMilestone.type === "sessions" ? "sessions" : "days"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mood Trend Indicator */}
          <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
            <div className="flex items-center gap-2">
              <TrendingUp className={`h-4 w-4 ${moodTrend >= 0 ? "text-green-500" : "text-red-500"}`} />
              <span className="text-sm">Mood Trend</span>
            </div>
            <Badge variant={moodTrend >= 0 ? "default" : "secondary"} className="text-xs">
              {moodTrend >= 0 ? "+" : ""}
              {moodTrend.toFixed(0)}% this week
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Full page version
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Your Journey</h1>
        <p className="mt-1 text-muted-foreground">Track your progress and celebrate your growth</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedSessions}</p>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                <Calendar className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{daysOnPlatform}</p>
                <p className="text-sm text-muted-foreground">Days on Harmony</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                <Trophy className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {achievedMilestones.length}/{milestones.length}
                </p>
                <p className="text-sm text-muted-foreground">Milestones Achieved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${moodTrend >= 0 ? "bg-green-500/10" : "bg-orange-500/10"}`}
              >
                <TrendingUp
                  className={`h-6 w-6 ${moodTrend >= 0 ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"}`}
                />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {moodTrend >= 0 ? "+" : ""}
                  {moodTrend.toFixed(0)}%
                </p>
                <p className="text-sm text-muted-foreground">Mood Improvement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Milestones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Milestones
            </CardTitle>
            <CardDescription>Celebrate your progress achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {milestones.map((milestone) => (
              <div
                key={milestone.id}
                className={`flex items-start gap-4 rounded-lg border p-4 transition-colors ${
                  milestone.achieved ? "border-green-500/30 bg-green-500/5" : "border-border"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    milestone.achieved
                      ? "bg-green-500/20 text-green-600 dark:text-green-400"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {milestone.achieved ? <CheckCircle2 className="h-5 w-5" /> : milestone.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{milestone.title}</p>
                    {milestone.achieved && (
                      <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 dark:text-green-400">
                        Achieved
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  {!milestone.achieved && (
                    <>
                      <Progress value={(milestone.current / milestone.target) * 100} className="mt-2 h-2" />
                      <p className="mt-1 text-xs text-muted-foreground">
                        {milestone.current} / {milestone.target}
                      </p>
                    </>
                  )}
                  {milestone.achievedDate && (
                    <p className="mt-1 text-xs text-muted-foreground">Achieved on {milestone.achievedDate}</p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Therapy Goals Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Goals Progress
            </CardTitle>
            <CardDescription>Track progress on your therapy goals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {therapyGoals.map((goal) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{goal.label}</p>
                  <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  {goal.progress >= 75
                    ? "Excellent progress! Keep it up."
                    : goal.progress >= 50
                      ? "Good progress. You're on the right track."
                      : "Keep working at it. Every step counts."}
                </p>
              </div>
            ))}

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm font-medium">Want to update your goals?</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Discuss your progress with your counselor in your next session.
              </p>
              <Link href="/seeker/profile">
                <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                  Edit Goals
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Mood Journey Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Mood Journey
            </CardTitle>
            <CardDescription>Your emotional well-being over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Mood",
                  color: "var(--primary)",
                },
              }}
              className="h-[250px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockMoodData}>
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis
                    domain={[1, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => {
                      const labels = ["", "Low", "Fair", "Good", "Great", "Excellent"]
                      return labels[value] || ""
                    }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="var(--color-value)"
                    strokeWidth={2}
                    fill="url(#moodGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-muted-foreground">Mood Score (1-5)</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className={`h-4 w-4 ${moodTrend >= 0 ? "text-green-500" : "text-red-500"}`} />
                <span className="text-muted-foreground">{moodTrend >= 0 ? "Improving" : "Needs attention"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Encouragement Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">You're Making Progress!</h3>
              <p className="mt-1 text-muted-foreground">
                Every session, every reflection, and every small step forward is building toward a healthier you. Be
                proud of the commitment you're showing to your well-being.
              </p>
            </div>
            <Link href="/seeker/counselors">
              <Button className="shrink-0">Book Next Session</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
