"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { SeekerLayout } from "./seeker-layout"
import Link from "next/link"
import { Send, Search, MessageCircle } from "lucide-react"
import { EmptyState } from "@/components/shared/empty-state"
import Pusher from "pusher-js"

interface Message {
  id: string
  counselorName: string
  counselorAvatar: string
  lastMessage: string
  timestamp: string
  unread: number
  status: "active" | "archived"
}

export function MessagesPage({ conversations = [], currentUserId }: { conversations?: Message[]; currentUserId: string }) {
  const router = useRouter()
  const [items, setItems] = useState(conversations)
  const activeMessages = items.filter((m) => m.status === "active")
  const archivedMessages = items.filter((m) => m.status === "archived")
  const unreadCount = activeMessages.reduce((sum, m) => sum + m.unread, 0)
  const channelsRef = useRef<Pusher.Channel[]>([])

  // Re-fetch conversations when tab becomes visible (e.g. returning from chat)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible") router.refresh()
    }
    document.addEventListener("visibilitychange", handleVisibility)
    return () => document.removeEventListener("visibilitychange", handleVisibility)
  }, [router])

  // Subscribe to Pusher channels for real-time unread count updates
  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_PUSHER_KEY
    const pc = process.env.NEXT_PUBLIC_PUSHER_CLUSTER
    if (!pk || !pc || !currentUserId) return

    const pusherClient = new Pusher(pk, {
      cluster: pc,
      channelAuthorization: {
        endpoint: "/api/pusher/auth",
        transport: "ajax",
      },
    })

    const convos = conversations.filter((m) => m.status === "active")
    const subs = convos.map((conv) => {
      const channel = pusherClient.subscribe(`private-session-${conv.id}`)
      channel.bind("new-message", (data: { id: string; senderId: string; content: string; createdAt: string }) => {
        if (data.senderId === currentUserId) return
        setItems((prev) =>
          prev.map((c) =>
            c.id === conv.id
              ? {
                  ...c,
                  unread: c.unread + 1,
                  timestamp: (() => {
                    const diff = Date.now() - new Date(data.createdAt).getTime()
                    const hours = Math.floor(diff / 3600000)
                    const days = Math.floor(hours / 24)
                    return hours < 1 ? "Just now" : hours < 24 ? `${hours}h ago` : `${days}d ago`
                  })(),
                }
              : c,
          ),
        )
      })
      return channel
    })

    channelsRef.current = subs

    return () => {
      for (const ch of subs) {
        ch.unbind_all()
        ch.unsubscribe()
      }
      pusherClient.disconnect()
    }
  }, [currentUserId, conversations]) // eslint-disable-line react-hooks/exhaustive-deps

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
                  <Link key={message.id} href={`/chat/${message.id}`}>
                  <Card
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
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState
                variant="no-data"
                title="No messages yet"
                description="Start a conversation with your counselor"
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
