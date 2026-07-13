"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, Lock, FileText, X } from "lucide-react"
import { sendMessage, getSessionEncryptionKey } from "@/app/actions/booking"
import { markConversationAsRead } from "@/app/actions/messages"
import { decryptMessage } from "@/lib/client-encryption"
import { ChatPanel } from "@/components/session/session-room"
import { SessionNotesPanel } from "@/components/session/session-notes"
import Pusher from "pusher-js"

interface SimpleChatRoomProps {
  sessionId: string
  otherUserId: string
  otherName: string
  otherAvatar?: string | null
  currentUserId: string
  currentUserAvatar?: string | null
  isCounselor?: boolean
  initialMessages: {
    id: string
    senderId: string
    senderName: string
    senderAvatar?: string
    content: string
    timestamp: string
    isOwn: boolean
  }[]
}

export function SimpleChatRoom({
  sessionId,
  otherUserId,
  otherName,
  otherAvatar,
  currentUserId,
  currentUserAvatar,
  isCounselor = false,
  initialMessages,
}: SimpleChatRoomProps) {
  const router = useRouter()
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [showNotes, setShowNotes] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const encKeyRef = useRef<string | null>(null)
  const pendingMessagesRef = useRef<Array<{
    id: string
    senderId: string
    content: string
    iv: string
    createdAt: string
  }>>([])

  // Mark messages from other user as read on mount
  useEffect(() => {
    markConversationAsRead(otherUserId).catch(() => {})
  }, [otherUserId])

  // Fetch encryption key and subscribe to Pusher
  useEffect(() => {
    let pusherClient: Pusher | null = null
    let channel: ReturnType<Pusher["subscribe"]> | null = null

    const processIncomingMessage = async (data: {
      id: string
      senderId: string
      content: string
      iv: string
      createdAt: string
    }) => {
      if (!encKeyRef.current) return
      let decrypted: string
      try {
        decrypted = await decryptMessage(data.content, data.iv, encKeyRef.current)
      } catch (err) {
        console.error("[chat] decrypt failed:", err)
        return
      }

      setMessages((prev) => {
        if (prev.some((m) => m.id === data.id)) return prev
        return [
          ...prev,
          {
            id: data.id,
            senderId: data.senderId,
            senderName: otherName,
            senderAvatar: otherAvatar || undefined,
            content: decrypted,
            timestamp: new Date(data.createdAt).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              timeZone: "Africa/Addis_Ababa",
            }) + " EAT",
            isOwn: false,
          },
        ]
      })
    }

    getSessionEncryptionKey(sessionId)
      .then(({ key }) => {
        encKeyRef.current = key
        const pending = pendingMessagesRef.current.splice(0)
        for (const data of pending) {
          processIncomingMessage(data)
        }
      })
      .catch((err) => console.error("[chat] encryption key fetch failed:", err))

    const pk = process.env.NEXT_PUBLIC_PUSHER_KEY
    const pc = process.env.NEXT_PUBLIC_PUSHER_CLUSTER

    if (!pk || !pc) return

    pusherClient = new Pusher(pk, {
      cluster: pc,
      channelAuthorization: {
        endpoint: "/api/pusher/auth",
        transport: "ajax",
      },
    })

    channel = pusherClient.subscribe(`private-session-${sessionId}`)

    channel.bind("new-message", async (data: {
      id: string
      senderId: string
      content: string
      iv: string
      createdAt: string
    }) => {
      if (data.senderId === currentUserId) return

      if (!encKeyRef.current) {
        pendingMessagesRef.current.push(data)
        return
      }

      await processIncomingMessage(data)
    })

    return () => {
      if (channel) {
        channel.unbind_all()
        channel.unsubscribe()
      }
      if (pusherClient) pusherClient.disconnect()
    }
  }, [sessionId, otherName, otherAvatar, currentUserId])

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mark messages as read on mount
  useEffect(() => {
    markConversationAsRead(otherUserId).catch(() => {})
  }, [otherUserId])

  const formatTimestamp = () => {
    return (
      new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Africa/Addis_Ababa",
      }) + " EAT"
    )
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const msg = {
      id: `m${Date.now()}`,
      senderId: currentUserId,
      senderName: "You",
      content: newMessage,
      timestamp: formatTimestamp(),
      isOwn: true,
    }

    setMessages((prev) => [...prev, msg])
    setNewMessage("")

    sendMessage(sessionId, newMessage).catch(() => {})
  }

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex h-14 items-center gap-3 border-b border-border bg-background px-4 flex-shrink-0">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Back</span>
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src={otherAvatar || "/placeholder.svg"} alt={otherName} />
          <AvatarFallback>{otherName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-sm font-medium">{otherName}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3 w-3 text-green-500" />
            <span>End-to-end encrypted</span>
          </div>
        </div>
        {isCounselor && (
          <Button variant="ghost" size="icon" onClick={() => setShowNotes(!showNotes)}>
            <FileText className="h-4 w-4" />
            <span className="sr-only">Session notes</span>
          </Button>
        )}
      </header>

      {/* Main content */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Chat */}
        <div className="flex flex-1 flex-col mx-auto w-full max-w-3xl overflow-hidden">
          <ChatPanel
            messages={messages}
            systemMessages={[]}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            handleSendMessage={handleSendMessage}
            messagesEndRef={messagesEndRef}
            counselorAvatar={otherAvatar}
            showSessionNotice
          />
        </div>

        {/* Notes Panel — overlays from right, only for counselors */}
        {isCounselor && showNotes && (
          <div className="absolute right-0 top-0 bottom-0 w-80 border-l border-border bg-card p-4 shadow-xl z-20 overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Session Notes</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowNotes(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close notes</span>
              </Button>
            </div>
            <SessionNotesPanel bookingId={sessionId} />
          </div>
        )}
      </div>
    </div>
  )
}