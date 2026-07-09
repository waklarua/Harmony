"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { GuideLayout } from "./guide-layout"
import { ChevronLeft, ChevronRight, Clock, Video, MessageSquare, Plus, Save, Loader2, CheckCircle2, Calendar } from "lucide-react"
import { getMyAvailability, saveCounselorAvailability } from "@/app/actions/availability"
import { getGuideWeekSchedule } from "@/app/actions/dashboard"
import type { AvailabilitySlot } from "@/app/actions/availability"
import type { WeekScheduleSession } from "@/app/actions/dashboard"

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DAY_INDEX_MAP: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 }

const TIME_OPTIONS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00',
  '21:00', '22:00', '23:00', '00:00',
]

function getWeekDates(offset: number): { weekStart: Date; weekEnd: Date; dates: Date[] } {
  const now = new Date()
  const day = now.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() + mondayOffset + offset * 7)
  weekStart.setHours(0, 0, 0, 0)

  const dates: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    dates.push(d)
  }

  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6)
  weekEnd.setHours(23, 59, 59, 999)

  return { weekStart, weekEnd, dates }
}

function formatWeekLabel(dates: Date[]): string {
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', timeZone: 'Africa/Addis_Ababa' }
  const start = dates[0].toLocaleDateString('en-US', opts)
  const end = dates[6].toLocaleDateString('en-US', opts)
  const year = dates[6].getFullYear()
  return `${start} – ${end}, ${year}`
}

export function SchedulePage({ userId }: { userId: string }) {
  const [weekOffset, setWeekOffset] = useState(0)
  const [availability, setAvailability] = useState<Record<number, AvailabilitySlot | null>>({})
  const [availLoading, setAvailLoading] = useState(true)
  const [availSaving, setAvailSaving] = useState(false)
  const [availSaved, setAvailSaved] = useState(false)
  const [weekSessions, setWeekSessions] = useState<WeekScheduleSession[]>([])
  const [weekLoading, setWeekLoading] = useState(true)

  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset])
  const weekLabel = useMemo(() => formatWeekLabel(weekDates.dates), [weekDates.dates])

  useEffect(() => {
    setWeekLoading(true)
    setWeekSessions([])
    getGuideWeekSchedule(userId, weekDates.weekStart, weekDates.weekEnd)
      .then(setWeekSessions)
      .catch(() => {})
      .finally(() => setWeekLoading(false))
  }, [weekOffset, userId])

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

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return weekSessions.filter((s) => s.date.startsWith(dateStr))
  }

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Schedule</h1>
            <p className="mt-1 text-muted-foreground">Manage your availability and view upcoming sessions</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Block Time
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Weekly View</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setWeekOffset((o) => o - 1)}>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous week</span>
                    </Button>
                    <span className="text-sm font-medium">{weekLabel}</span>
                    <Button variant="outline" size="icon" onClick={() => setWeekOffset((o) => o + 1)}>
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next week</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {weekLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="grid grid-cols-7 gap-2">
                    {DAY_NAMES.map((name, i) => {
                      const date = weekDates.dates[i]
                      const dayIndex = DAY_INDEX_MAP[name]
                      const slot = availability[dayIndex]
                      const sessions = getSessionsForDate(date)
                      const isAvailable = !!slot
                      const isToday = date.toDateString() === new Date().toDateString()

                      return (
                        <div
                          key={name}
                          className={`min-h-[140px] rounded-lg border p-2 ${
                            isToday ? 'border-primary ring-1 ring-primary' : ''
                          } ${isAvailable ? 'border-border bg-card' : 'border-border/50 bg-muted/50'}`}
                        >
                          <div className="mb-2 text-center">
                            <p className="text-xs text-muted-foreground">{name}</p>
                            <p className={`text-lg font-semibold ${isToday ? 'text-primary' : ''}`}>
                              {date.getDate()}
                            </p>
                          </div>

                          {isAvailable && slot && (
                            <div className="mb-1.5 text-center text-[10px] leading-tight text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950/30 rounded px-1 py-0.5">
                              {slot.startTime} – {slot.endTime}
                            </div>
                          )}

                          <div className="space-y-1">
                            {sessions.map((session) => (
                              <div key={session.id} className="rounded bg-primary/10 p-1.5 text-xs leading-tight">
                                <p className="font-medium text-primary">{session.time}</p>
                                <p className="truncate text-muted-foreground">{session.clientName}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Week Sessions List */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {weekLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : weekSessions.length > 0 ? (
                  <div className="space-y-4">
                    {weekSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={session.clientAvatar || "/placeholder.svg"} alt={session.clientName} />
                            <AvatarFallback>{session.clientName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{session.clientName}</p>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {new Date(session.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  timeZone: "Africa/Addis_Ababa",
                                })}{" "}
                                at {session.time}
                              </span>
                              <Badge variant="outline" className="gap-1 capitalize">
                                {session.type === "video" ? (
                                  <Video className="h-3 w-3" />
                                ) : (
                                  <MessageSquare className="h-3 w-3" />
                                )}
                                {session.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">Start</Button>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">No sessions this week</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Availability Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Weekly Availability</CardTitle>
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
                <CardDescription>Set your weekly availability with time ranges</CardDescription>
              </CardHeader>
              <CardContent>
                {availLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {DAY_NAMES.map((name, i) => {
                      const dayIndex = DAY_INDEX_MAP[name]
                      const slot = availability[dayIndex]
                      return (
                        <div key={name} className="flex items-center gap-3">
                          <Switch
                            checked={!!slot}
                            onCheckedChange={() => toggleDay(dayIndex)}
                          />
                          <span className="w-10 text-sm font-medium">{name}</span>
                          {slot && (
                            <div className="flex items-center gap-1 text-sm">
                              <select
                                value={slot.startTime}
                                onChange={(e) => updateTime(dayIndex, 'startTime', e.target.value)}
                                className="rounded border border-border bg-background px-1.5 py-0.5 text-xs"
                              >
                                {TIME_OPTIONS.map((t) => (
                                  <option key={t} value={t}>{t}</option>
                                ))}
                              </select>
                              <span className="text-muted-foreground">–</span>
                              <select
                                value={slot.endTime}
                                onChange={(e) => updateTime(dayIndex, 'endTime', e.target.value)}
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

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <h4 className="font-medium">Time Zone</h4>
                <p className="mt-1 text-sm text-muted-foreground">East Africa Time (EAT - UTC+3)</p>
                <p className="mt-2 text-xs text-muted-foreground">All times are displayed in your local time zone</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GuideLayout>
  )
}
