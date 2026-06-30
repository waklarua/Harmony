"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GuideLayout } from "./guide-layout"
import { Calendar, Clock, ArrowRight, Video, Users, TrendingUp, Save, Loader2, CheckCircle2, Timer } from "lucide-react"
import { canJoinSession, getJoinButtonLabel } from "@/lib/session-utils"
import { formatCurrency } from "@/lib/format"
import { useEffect, useState, useCallback } from "react"
import { getMyAvailability, saveCounselorAvailability } from "@/app/actions/availability"
import { getWaitlistForCounselor } from "@/app/actions/waitlist"
import { Switch } from "@/components/ui/switch"
import type { AvailabilitySlot } from "@/app/actions/availability"

interface GuideDashboardProps {
  todaysSessions: Array<{
    id: string
    clientId: string
    clientName: string
    clientAvatar: string | null
    time: string
    duration: number | null
    status: string
    type: string
    scheduledAt: string
  }>
  activeClients: Array<{
    id: string
    name: string
    avatar: string | null
    lastSession: string
    totalSessions: number
    status: string
  }>
  bookingRequests: Array<{
    id: string
    clientId: string
    clientName: string
    clientAvatar: string | null
    date: string
    time: string
    status: string
    scheduledAt: string
  }>
  guideName: string
  earningsData: {
    total: number
    thisMonth: number
    entries: Array<{
      id: string
      bookingId: string
      amount: number
      createdAt: string
    }>
  }
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const TIME_OPTIONS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00', '00:00',
]

export function GuideDashboard({ todaysSessions, activeClients, bookingRequests, guideName, earningsData }: GuideDashboardProps) {
  const [availability, setAvailability] = useState<Record<number, AvailabilitySlot | null>>({})
  const [availLoading, setAvailLoading] = useState(true)
  const [availSaving, setAvailSaving] = useState(false)
  const [availSaved, setAvailSaved] = useState(false)
  const [waitlistEntries, setWaitlistEntries] = useState<Array<{ id: string; seekerName: string | null; createdAt: Date | null }>>([])
  const [wlLoading, setWlLoading] = useState(true)

  useEffect(() => {
    getWaitlistForCounselor()
      .then(setWaitlistEntries)
      .catch(() => {})
      .finally(() => setWlLoading(false))
  }, [])

  useEffect(() => {
    getMyAvailability().then((slots) => {
      const map: Record<number, AvailabilitySlot | null> = {}
      for (let i = 0; i < 7; i++) {
        const found = slots.find((s) => s.dayOfWeek === i)
        map[i] = found || null
      }
      setAvailability(map)
    }).catch(() => {}).finally(() => setAvailLoading(false))
  }, [])

  const toggleDay = useCallback((day: number) => {
    setAvailability((prev) => {
      if (prev[day]) {
        return { ...prev, [day]: null }
      }
      return { ...prev, [day]: { dayOfWeek: day, startTime: '09:00', endTime: '17:00' } }
    })
  }, [])

  const updateTime = useCallback((day: number, field: 'startTime' | 'endTime', value: string) => {
    setAvailability((prev) => {
      const slot = prev[day]
      if (!slot) return prev
      return { ...prev, [day]: { ...slot, [field]: value } }
    })
  }, [])

  const handleSaveAvailability = async () => {
    setAvailSaving(true)
    setAvailSaved(false)
    const slots = Object.values(availability).filter((s): s is AvailabilitySlot => s !== null)
    try {
      await saveCounselorAvailability(slots)
      setAvailSaved(true)
      setTimeout(() => setAvailSaved(false), 3000)
    } catch {
      // ignore
    } finally {
      setAvailSaving(false)
    }
  }

  return (
    <GuideLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, Dr. {guideName.split(" ")[1]}
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
                  <p className="text-sm opacity-90">{formatCurrency(earningsData.thisMonth)} this month</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Today's Schedule */}
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
                          {canJoinSession(session.scheduledAt, session.duration, session.status) ? (
                            <Link href={`/session/${session.id}`}>
                              <Button size="sm">Start Session</Button>
                            </Link>
                          ) : (
                            <Button size="sm" disabled>
                              <Timer className="mr-1.5 h-3.5 w-3.5" />
                              {getJoinButtonLabel(session.scheduledAt, session.duration)}
                            </Button>
                          )}
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
            </div>

            {/* Waitlist */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Waitlist
                </CardTitle>
                <CardDescription>Seekers waiting for an opening</CardDescription>
              </CardHeader>
              <CardContent>
                {wlLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : waitlistEntries.length > 0 ? (
                  <div className="space-y-3">
                    {waitlistEntries.map((entry, i) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{entry.seekerName || 'Anonymous'}</p>
                            <p className="text-xs text-muted-foreground">
                              Joined {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'Unknown'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No one on the waitlist</p>
                )}
              </CardContent>
            </Card>

            {/* Availability Settings */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Working Hours</CardTitle>
                  <Button
                    size="sm"
                    onClick={handleSaveAvailability}
                    disabled={availLoading || availSaving}
                    className="gap-1.5"
                  >
                    {availSaving ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : availSaved ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    {availSaved ? 'Saved' : 'Save'}
                  </Button>
                </div>
                <CardDescription>Set your weekly availability</CardDescription>
              </CardHeader>
              <CardContent>
                {availLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {DAY_NAMES.map((name, i) => {
                      const slot = availability[i]
                      return (
                        <div key={i} className="flex items-center gap-3">
                          <Switch checked={!!slot} onCheckedChange={() => toggleDay(i)} />
                          <span className="w-10 text-sm font-medium">{name}</span>
                          {slot && (
                            <div className="flex items-center gap-1 text-sm">
                              <select
                                value={slot.startTime}
                                onChange={(e) => updateTime(i, 'startTime', e.target.value)}
                                className="rounded border border-border bg-background px-1.5 py-0.5 text-xs"
                              >
                                {TIME_OPTIONS.map((t) => (
                                  <option key={t} value={t}>{t}</option>
                                ))}
                              </select>
                              <span className="text-muted-foreground">–</span>
                              <select
                                value={slot.endTime}
                                onChange={(e) => updateTime(i, 'endTime', e.target.value)}
                                className="rounded border border-border bg-background px-1.5 py-0.5 text-xs"
                              >
                                {TIME_OPTIONS.map((t) => (
                                  <option key={t} value={t}>{t}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GuideLayout>
  )
}
