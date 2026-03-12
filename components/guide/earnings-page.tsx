"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GuideLayout } from "./guide-layout"
import { TrendingUp, Calendar, ArrowUpRight, Download } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const monthlyData = [
  { month: "Jul", amount: 102600 },
  { month: "Aug", amount: 125400 },
  { month: "Sep", amount: 136800 },
  { month: "Oct", amount: 148200 },
  { month: "Nov", amount: 159600 },
  { month: "Dec", amount: 182400 },
]

const recentPayouts = [
  { id: "1", date: "Dec 15, 2024", amount: 91200, sessions: 12, status: "completed" },
  { id: "2", date: "Dec 1, 2024", amount: 79800, sessions: 11, status: "completed" },
  { id: "3", date: "Nov 15, 2024", amount: 85500, sessions: 12, status: "completed" },
]

export function EarningsPage() {
  return (
    <GuideLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Earnings</h1>
            <p className="mt-1 text-muted-foreground">Track your income and payout history</p>
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Grid - All values updated to ETB */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(182400)}</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <ArrowUpRight className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">+14%</p>
                  <ArrowUpRight className="h-4 w-4 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">vs Last Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Sessions This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(923400)}</p>
                <p className="text-sm text-muted-foreground">Year to Date</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Earnings Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
              <CardDescription>Your monthly earnings for the past 6 months (ETB)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: {
                    label: "Earnings (ETB)",
                    color: "var(--primary)",
                  },
                }}
                className="h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          formatter={(value) => {
                            return [`ETB ${Number(value).toLocaleString()}`, "Earnings"]
                          }}
                        />
                      }
                    />
                    <Bar dataKey="amount" fill="var(--color-amount)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Payout Schedule - Updated to ETB */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Next Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-3xl font-bold text-primary">{formatCurrency(91200)}</p>
                <p className="mt-1 text-sm text-muted-foreground">Scheduled for Jan 1, 2025</p>
                <div className="mt-3 flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">12 sessions completed</span>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Session Rate</span>
                  <span className="font-medium">{formatCurrency(6840)}/session</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Platform Fee</span>
                  <span className="font-medium">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Net Rate</span>
                  <span className="font-medium">{formatCurrency(5814)}/session</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payout History - Updated to ETB */}
        <Card>
          <CardHeader>
            <CardTitle>Payout History</CardTitle>
            <CardDescription>Your recent payouts and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayouts.map((payout) => (
                <div
                  key={payout.id}
                  className="flex flex-col gap-2 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-medium">{formatCurrency(payout.amount)}</p>
                    <p className="text-sm text-muted-foreground">
                      {payout.date} • {payout.sessions} sessions
                    </p>
                  </div>
                  <Badge variant="outline" className="w-fit capitalize">
                    {payout.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </GuideLayout>
  )
}
