"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StewardLayout } from "./steward-layout"
import {
  Users,
  UserCheck,
  Calendar,
  Star,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { mockPlatformStats, mockPendingCounselors, mockSupportTickets } from "@/lib/mock-data"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const sessionTrendData = [
  { week: "W1", sessions: 180 },
  { week: "W2", sessions: 210 },
  { week: "W3", sessions: 195 },
  { week: "W4", sessions: 262 },
]

export function StewardDashboard() {
  const openTickets = mockSupportTickets.filter((t) => t.status !== "resolved")

  return (
    <StewardLayout>
      <div className="space-y-8">
        {/* Welcome Section - Updated with Ethiopian name */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Welcome back, Henok. Here is your platform overview.</p>
          </div>
          <div className="flex gap-2">
            <Link href="/steward/counselors">
              <Button variant="outline" className="gap-2 bg-transparent">
                <UserCheck className="h-4 w-4" />
                Review Applications
                {mockPlatformStats.pendingVerifications > 0 && (
                  <Badge variant="destructive" className="ml-1">
                    {mockPlatformStats.pendingVerifications}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockPlatformStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <UserCheck className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockPlatformStats.totalCounselors}</p>
                <p className="text-sm text-muted-foreground">Active Counselors</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockPlatformStats.sessionsThisMonth}</p>
                <p className="text-sm text-muted-foreground">Sessions This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Star className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockPlatformStats.averageRating}</p>
                <p className="text-sm text-muted-foreground">Platform Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Sessions Trend */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Session Trends
                    </CardTitle>
                    <CardDescription>Weekly session volume for this month</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sessions: {
                      label: "Sessions",
                      color: "var(--primary)",
                    },
                  }}
                  className="h-[200px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sessionTrendData}>
                      <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="sessions"
                        stroke="var(--color-sessions)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-sessions)", strokeWidth: 0, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Pending Verifications - Updated with Ethiopian names */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Pending Verifications</CardTitle>
                    <CardDescription>Counselor applications awaiting review</CardDescription>
                  </div>
                  <Link href="/steward/counselors">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {mockPendingCounselors.length > 0 ? (
                  <div className="space-y-4">
                    {mockPendingCounselors.map((counselor) => (
                      <div
                        key={counselor.id}
                        className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                            <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{counselor.name}</p>
                            <p className="text-sm text-muted-foreground">{counselor.credentials}</p>
                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Submitted {counselor.submittedAt}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <XCircle className="h-3 w-3" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <UserCheck className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">No pending verifications</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Alerts */}
            {(mockPlatformStats.pendingVerifications > 0 || openTickets.length > 0) && (
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                    Requires Attention
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockPlatformStats.pendingVerifications > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span>{mockPlatformStats.pendingVerifications} counselor verifications pending</span>
                      <Link href="/steward/counselors">
                        <Button variant="ghost" size="sm">
                          Review
                        </Button>
                      </Link>
                    </div>
                  )}
                  {openTickets.length > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span>{openTickets.length} support tickets open</span>
                      <Link href="/steward/support">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Recent Support Tickets - Names already updated in mock-data */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Recent Tickets</CardTitle>
                  <Link href="/steward/support">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockSupportTickets.slice(0, 3).map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-start justify-between rounded-lg border border-border p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{ticket.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          {ticket.userName} • {ticket.createdAt}
                        </p>
                      </div>
                      <Badge
                        variant={
                          ticket.priority === "high"
                            ? "destructive"
                            : ticket.priority === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs capitalize"
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Active users today</span>
                  <span className="font-medium">{mockPlatformStats.activeUsers}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total sessions</span>
                  <span className="font-medium">{mockPlatformStats.totalSessions.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Support tickets</span>
                  <span className="font-medium">{mockPlatformStats.supportTickets}</span>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">All times displayed in EAT (UTC+3)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StewardLayout>
  )
}
