"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GuideLayout } from "./guide-layout"
import { TrendingUp, Calendar } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface EarningsData {
  total: number
  thisMonth: number
  entries: Array<{
    id: string
    bookingId: string
    amount: number
    createdAt: string
  }>
}

interface EarningsPageProps {
  earningsData: EarningsData
}

export function EarningsPage({ earningsData }: EarningsPageProps) {
  const entries = earningsData.entries

  const monthlyMap = new Map<string, number>()
  for (const e of entries) {
    const d = new Date(e.createdAt)
    const key = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    monthlyMap.set(key, (monthlyMap.get(key) || 0) + e.amount)
  }
  const monthlyData = Array.from(monthlyMap.entries())
    .map(([month, amount]) => ({ month, amount }))
    .slice(-6)

  const sessionCount = entries.length

  const yearStart = new Date(new Date().getFullYear(), 0, 1)
  const ytd = entries
    .filter((e) => new Date(e.createdAt) >= yearStart)
    .reduce((sum, e) => sum + e.amount, 0)

  return (
    <GuideLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Earnings</h1>
          <p className="mt-1 text-muted-foreground">Track your income and payout history</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(earningsData.thisMonth)}</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sessionCount}</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(earningsData.total)}</p>
                <p className="text-sm text-muted-foreground">All Time</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{formatCurrency(ytd)}</p>
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
              <CardDescription>Your monthly earnings history (ETB)</CardDescription>
            </CardHeader>
            <CardContent>
              {monthlyData.length > 0 ? (
                <ChartContainer
                  config={{
                    amount: {
                      label: "Earnings (ETB)",
                      color: "var(--primary)",
                    },
                  }}
                  className="h-[300px] w-full"
                >
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
                </ChartContainer>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                  No earnings data yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
              <CardDescription>Earnings breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-2xl font-bold text-primary">{formatCurrency(earningsData.thisMonth)}</p>
                <p className="mt-1 text-sm text-muted-foreground">Earned this month</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Per Booking</span>
                  <span className="font-medium">{formatCurrency(1500)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Bookings</span>
                  <span className="font-medium">{sessionCount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Earnings History */}
        <Card>
          <CardHeader>
            <CardTitle>Earnings History</CardTitle>
            <CardDescription>All your earnings from confirmed bookings</CardDescription>
          </CardHeader>
          <CardContent>
            {entries.length > 0 ? (
              <div className="space-y-4">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex flex-col gap-2 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-medium">{formatCurrency(entry.amount)}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <Badge variant="outline" className="w-fit">Booking confirmed</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-8 text-center">
                <p className="text-muted-foreground">No earnings yet. Accept a booking request to get started.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </GuideLayout>
  )
}
