"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { GuideLayout } from "./guide-layout"
import { Search, MessageCircle } from "lucide-react"
import { EmptyState } from "@/components/shared/empty-state"

interface Message {
  id: string
  clientName: string
  clientAvatar: string
  lastMessage: string
  timestamp: string
  unread: number
  status: "active" | "archived"
}

const mockMessages: Message[] = [
  {
    id: "1",
    clientName: "Abeba Geleta",
    clientAvatar: "/professional-portrait.png",
    lastMessage: "Thank you for the session today. The techniques you suggested are really helping.",
    timestamp: "1 hour ago",
    unread: 1,
    status: "active",
  },
  {
    id: "2",
    clientName: "Yohannes Tekle",
    clientAvatar: "/professional-portrait.png",
    lastMessage: "Can we reschedule next week's appointment?",
    timestamp: "3 hours ago",
    unread: 0,
    status: "active",
  },
  {
    id: "3",
    clientName: "Tizita Haile",
    clientAvatar: "/professional-portrait.png",
    lastMessage: "I've been practicing the breathing exercises daily.",
    timestamp: "2 days ago",
    unread: 0,
    status: "active",
  },
]

export function GuideMessagesPage() {
  const activeMessages = mockMessages.filter((m) => m.status === "active")
  const archivedMessages = mockMessages.filter((m) => m.status === "archived")
  const unreadCount = activeMessages.reduce((sum, m) => sum + m.unread, 0)

  return (
    <GuideLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Client Messages</h1>
            <p className="mt-1 text-muted-foreground">Communicate with your clients between sessions</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search conversations..." className="pl-10" />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              Conversations
              {unreadCount > 0 && (
                <Badge variant="default" className="ml-1">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {activeMessages.length > 0 ? (
              <div className="space-y-3">
                {activeMessages.map((message) => (
                  <Card
                    key={message.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={message.clientAvatar || "/placeholder.svg"} alt={message.clientName} />
                          <AvatarFallback>{message.clientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold truncate">{message.clientName}</h3>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {message.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {message.lastMessage}
                          </p>
                          {message.unread > 0 && (
                            <div className="mt-2">
                              <Badge variant="secondary">{message.unread} new</Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                variant="no-data"
                title="No conversations yet"
                description="Messages from your clients will appear here"
              />
            )}
          </TabsContent>

          <TabsContent value="archived" className="mt-6">
            {archivedMessages.length > 0 ? (
              <div className="space-y-3">
                {archivedMessages.map((message) => (
                  <Card
                    key={message.id}
                    className="cursor-pointer hover:border-primary/50 transition-colors opacity-75"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={message.clientAvatar || "/placeholder.svg"} alt={message.clientName} />
                          <AvatarFallback>{message.clientName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold truncate">{message.clientName}</h3>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {message.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {message.lastMessage}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <EmptyState
                variant="no-data"
                title="No archived conversations"
                description="Conversations you've archived will appear here"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </GuideLayout>
  )
}
