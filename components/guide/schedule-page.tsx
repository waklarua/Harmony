"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { GuideLayout } from "./guide-layout"
import { ChevronLeft, ChevronRight, Clock, Video, MessageSquare, Plus } from "lucide-react"
import { mockGuideSchedule } from "@/lib/mock-data"

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

export function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState("Dec 23 - Dec 29, 2024")
  const [availability, setAvailability] = useState<Record<string, boolean>>({
    Mon: true,
    Tue: true,
    Wed: true,
    Thu: true,
    Fri: false,
    Sat: false,
    Sun: false,
  })

  const getSessionsForDay = (day: string) => {
    // In a real app, filter based on actual dates
    if (day === "Mon") return mockGuideSchedule.slice(0, 2)
    if (day === "Tue") return mockGuideSchedule.slice(2, 3)
    return []
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
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Previous week</span>
                    </Button>
                    <span className="text-sm font-medium">{currentWeek}</span>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">Next week</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day, index) => {
                    const sessions = getSessionsForDay(day)
                    const isAvailable = availability[day]
                    const dateNum = 23 + index

                    return (
                      <div
                        key={day}
                        className={`min-h-[120px] rounded-lg border p-2 ${
                          isAvailable ? "border-border bg-card" : "border-border/50 bg-muted/50"
                        }`}
                      >
                        <div className="mb-2 text-center">
                          <p className="text-xs text-muted-foreground">{day}</p>
                          <p className="text-lg font-semibold">{dateNum}</p>
                        </div>
                        <div className="space-y-1">
                          {sessions.map((session) => (
                            <div key={session.id} className="rounded bg-primary/10 p-1.5 text-xs">
                              <p className="font-medium text-primary">{session.time}</p>
                              <p className="truncate text-muted-foreground">{session.clientName}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Today's Sessions */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGuideSchedule.map((session) => (
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
              </CardContent>
            </Card>
          </div>

          {/* Availability Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weekDays.map((day) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{day}</span>
                      <Switch
                        checked={availability[day]}
                        onCheckedChange={(checked) => setAvailability((prev) => ({ ...prev, [day]: checked }))}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Working Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Start Time</span>
                    <span className="font-medium">9:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">End Time</span>
                    <span className="font-medium">5:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Session Duration</span>
                    <span className="font-medium">50 min</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Buffer Time</span>
                    <span className="font-medium">10 min</span>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full bg-transparent">
                  Edit Hours
                </Button>
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
