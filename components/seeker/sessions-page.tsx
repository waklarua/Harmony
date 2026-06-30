"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeekerLayout } from "./seeker-layout"
import { Calendar, Clock, Video, MessageSquare, Phone, ArrowRight, Timer, CheckCircle2 } from "lucide-react"
import { EmptyState } from "@/components/shared/empty-state"
import { canJoinSession, getJoinButtonLabel } from "@/lib/session-utils"
import type { SeekerSession } from "@/app/actions/dashboard"

interface SessionsPageProps {
  upcoming: SeekerSession[]
  active: SeekerSession[]
  past: SeekerSession[]
}

export function SessionsPage({ upcoming, active, past }: SessionsPageProps) {
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
              {upcoming.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {upcoming.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
              {active.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {active.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="past">
              Past
              {past.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {past.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcoming.length > 0 ? (
              <div className="space-y-4">
                {upcoming.map((session) => (
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
                                {new Date(session.date + 'T12:00:00Z').toLocaleDateString("en-US", {
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
                              <Badge variant={session.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs capitalize">
                                {session.status === 'in_progress' ? 'In Progress' : session.status}
                              </Badge>
                              {session.paymentStatus === 'paid' && (
                                <Badge variant="outline" className="gap-1 border-green-500/30 bg-green-500/10 text-green-600 text-xs">
                                  <CheckCircle2 className="h-3 w-3" />
                                  Paid
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {canJoinSession(session.scheduledAt, session.duration, session.status) ? (
                            <Link href={`/session/${session.id}`}>
                              <Button className="gap-1">
                                Join Session
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </Link>
                          ) : (
                            <Button className="gap-1" disabled>
                              <Timer className="h-3.5 w-3.5" />
                              {getJoinButtonLabel(session.scheduledAt, session.duration)}
                            </Button>
                          )}

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

          <TabsContent value="active" className="mt-6">
            {active.length > 0 ? (
              <div className="space-y-4">
                {active.map((session) => (
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
                                {new Date(session.date + 'T12:00:00Z').toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.time}
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
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={session.status === 'in_progress' ? 'default' : 'outline'}>
                            {session.status === 'in_progress' ? 'In Progress' : 'Active'}
                          </Badge>
                          {session.paymentStatus === 'paid' && (
                            <Badge variant="outline" className="gap-1 border-green-500/30 bg-green-500/10 text-green-600 text-xs">
                              <CheckCircle2 className="h-3 w-3" />
                              Paid
                            </Badge>
                          )}
                          <Link href={`/session/${session.id}`}>
                            <Button size="sm" className="gap-1">
                              Join Session
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState variant="no-completed-sessions" title="No active sessions" description="Sessions in progress will appear here." />
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {past.length > 0 ? (
              <div className="space-y-4">
                {past.map((session) => (
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
                                {new Date(session.date + 'T12:00:00Z').toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {session.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="capitalize">{session.status}</Badge>
                        {session.paymentStatus === 'paid' && (
                          <Badge variant="outline" className="gap-1 border-green-500/30 bg-green-500/10 text-green-600 text-xs">
                            <CheckCircle2 className="h-3 w-3" />
                            Paid
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState variant="no-completed-sessions" title="No past sessions" description="Cancelled or missed sessions will appear here." />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SeekerLayout>
  )
}
