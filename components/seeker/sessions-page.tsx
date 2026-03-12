"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeekerLayout } from "./seeker-layout"
import { Calendar, Clock, Video, MessageSquare, Phone, ArrowRight } from "lucide-react"
import { mockSessions } from "@/lib/mock-data"
import { EmptyState } from "@/components/shared/empty-state"

export function SessionsPage() {
  const upcomingSessions = mockSessions.filter((s) => s.status === "upcoming")
  const completedSessions = mockSessions.filter((s) => s.status === "completed")

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-3 w-3" />
      case "chat":
        return <MessageSquare className="h-3 w-3" />
      case "voice":
        return <Phone className="h-3 w-3" />
      default:
        return <Video className="h-3 w-3" />
    }
  }

  return (
    <SeekerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">My Sessions</h1>
            <p className="mt-1 text-muted-foreground">View and manage your counseling sessions</p>
          </div>
          <Link href="/seeker/counselors">
            <Button>Book New Session</Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming" className="gap-2">
              Upcoming
              {upcomingSessions.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {upcomingSessions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={session.counselorAvatar || "/placeholder.svg"}
                              alt={session.counselorName}
                            />
                            <AvatarFallback>{session.counselorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{session.counselorName}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(session.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.time}
                              </span>
                              <Badge variant="outline" className="gap-1 capitalize">
                                {getSessionTypeIcon(session.type)}
                                {session.type}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/session/${session.id}`}>
                            <Button className="gap-1">
                              Join Session
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="outline">Reschedule</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState variant="no-upcoming-sessions" />
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {completedSessions.length > 0 ? (
              <div className="space-y-4">
                {completedSessions.map((session) => (
                  <Card key={session.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={session.counselorAvatar || "/placeholder.svg"}
                              alt={session.counselorName}
                            />
                            <AvatarFallback>{session.counselorName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{session.counselorName}</p>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(session.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.duration} min
                              </span>
                            </div>
                            {session.notes && (
                              <div className="mt-3 rounded-lg bg-muted/50 p-3">
                                <p className="text-xs font-medium text-muted-foreground">Session Notes</p>
                                <p className="mt-1 text-sm">{session.notes}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge variant="outline">Completed</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState variant="no-completed-sessions" />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SeekerLayout>
  )
}
