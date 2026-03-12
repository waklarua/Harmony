"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { SeekerLayout } from "./seeker-layout"
import { Send, Search, MessageCircle } from "lucide-react"
import { EmptyState } from "@/components/shared/empty-state"

interface Message {
  id: string
  counselorName: string
  counselorAvatar: string
  lastMessage: string
  timestamp: string
  unread: number
  status: "active" | "archived"
}

const mockMessages: Message[] = [
  {
    id: "1",
    counselorName: "Dr. Selamawit Mulgeta",
    counselorAvatar: "/professional-portrait.png",
    lastMessage: "I'm glad to hear your progress. Let's continue with the mindfulness techniques next session.",
    timestamp: "2 hours ago",
    unread: 0,
    status: "active",
  },
  {
    id: "2",
    counselorName: "Musse Ahmed",
    counselorAvatar: "/professional-portrait.png",
    lastMessage: "Your anxiety management exercise worked well!",
    timestamp: "5 hours ago",
    unread: 2,
    status: "active",
  },
  {
    id: "3",
    counselorName: "Emebet Tesfaye",
    counselorAvatar: "/professional-portrait.png",
    lastMessage: "I appreciate your openness in our last session.",
    timestamp: "1 day ago",
    unread: 0,
    status: "active",
  },
]

export function MessagesPage() {
  const activeMessages = mockMessages.filter((m) => m.status === "active")
  const archivedMessages = mockMessages.filter((m) => m.status === "archived")
  const unreadCount = activeMessages.reduce((sum, m) => sum + m.unread, 0)

  return (
    <SeekerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Messages</h1>
            <p className="mt-1 text-muted-foreground">Chat with your counselors and get support</p>
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
              Messages
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
                          <AvatarImage src={message.counselorAvatar || "/placeholder.svg"} alt={message.counselorName} />
                          <AvatarFallback>{message.counselorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold truncate">{message.counselorName}</h3>
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
                title="No messages yet"
                description="Start a conversation with your counselor"
                action={
                  <Button variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Browse Counselors
                  </Button>
                }
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
                          <AvatarImage src={message.counselorAvatar || "/placeholder.svg"} alt={message.counselorName} />
                          <AvatarFallback>{message.counselorName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold truncate">{message.counselorName}</h3>
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
                title="No archived messages"
                description="Conversations you've archived will appear here"
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SeekerLayout>
  )
}
