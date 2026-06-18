"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Lock,
  Clock,
  Send,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  FileText,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  X,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Camera,
  Globe,
  Wifi,
  RefreshCw,
  CheckCircle2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { sendMessage, getSessionEncryptionKey } from "@/app/actions/booking"
import { decryptMessage } from "@/lib/client-encryption"
import Pusher from "pusher-js"

interface SessionRoomProps {
  sessionId: string
  counselorId: string
  counselorName: string
  counselorAvatar?: string | null
  currentUserId: string
  currentUserAvatar?: string | null
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

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  timestamp: string
  isOwn: boolean
}

function TroubleshootingPanel({
  onSwitchToChat,
  onSwitchToAudioOnly,
}: {
  onSwitchToChat: () => void
  onSwitchToAudioOnly: () => void
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})

  const toggleChecked = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const troubleshootingSteps = [
    {
      id: "camera",
      icon: Camera,
      title: "Camera not working?",
      steps: [
        "Check if another app is using your camera",
        "Click the camera icon in your browser's address bar",
        "Select 'Allow' for camera permissions",
        "Try refreshing the page",
      ],
    },
    {
      id: "audio",
      icon: Mic,
      title: "Audio issues?",
      steps: [
        "Check if your microphone is muted on your device",
        "Ensure headphones are properly connected",
        "Select the correct audio input in browser settings",
        "Close other apps that might use the microphone",
      ],
    },
    {
      id: "browser",
      icon: Globe,
      title: "Browser compatibility",
      steps: [
        "Use Chrome, Firefox, or Edge for best experience",
        "Update your browser to the latest version",
        "Disable browser extensions that might interfere",
        "Try using incognito/private mode",
      ],
    },
    {
      id: "connection",
      icon: Wifi,
      title: "Slow or unstable connection?",
      steps: [
        "Move closer to your WiFi router",
        "Close other tabs and applications",
        "Ask others on your network to reduce usage",
        "Switch to mobile data if WiFi is unreliable",
      ],
    },
  ]

  return (
    <div className="absolute left-4 top-4 z-10">
      <div className="rounded-lg bg-background/95 shadow-lg backdrop-blur">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <HelpCircle className="h-4 w-4" />
          <span>Having trouble?</span>
          {isExpanded ? <ChevronUp className="h-4 w-4 ml-auto" /> : <ChevronDown className="h-4 w-4 ml-auto" />}
        </button>

        {isExpanded && (
          <div className="border-t border-border px-3 pb-3 pt-2 w-72 max-h-80 overflow-y-auto">
            <div className="space-y-3">
              {troubleshootingSteps.map((section) => (
                <div key={section.id} className="space-y-1.5">
                  <button
                    onClick={() => toggleChecked(section.id)}
                    className="flex items-center gap-2 text-sm font-medium w-full text-left"
                  >
                    <section.icon className="h-4 w-4 text-primary" />
                    <span className="flex-1">{section.title}</span>
                    {checkedItems[section.id] && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  </button>
                  <ul className="ml-6 space-y-1">
                    {section.steps.map((step, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground">
                        • {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Quick fixes:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs bg-transparent"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs bg-transparent"
                  onClick={onSwitchToAudioOnly}
                >
                  <Mic className="h-3 w-3 mr-1" />
                  Audio only
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent" onClick={onSwitchToChat}>
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Switch to chat
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MessageBubble({
  message,
  counselorAvatar,
}: {
  message: ChatMessage
  counselorAvatar?: string | null
}) {
  return (
    <div className={`flex ${message.isOwn ? "justify-end" : "gap-2"}`}>
      {!message.isOwn && (
        <Avatar className="mt-1 h-8 w-8 flex-shrink-0">
          <AvatarImage
            src={message.senderAvatar || counselorAvatar || "/placeholder.svg"}
            alt={message.senderName}
          />
          <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div className="max-w-[75%]">
        <div
          className={`inline-block rounded-2xl px-4 py-2 text-sm leading-relaxed ${
            message.isOwn
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted rounded-bl-sm"
          }`}
        >
          {message.content}
        </div>
        <div className={`mt-0.5 flex ${message.isOwn ? "justify-end" : "justify-start"} px-1`}>
          <span className="text-[10px] text-muted-foreground">{message.timestamp}</span>
        </div>
      </div>
    </div>
  )
}

export function ChatPanel({
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  messagesEndRef,
  counselorAvatar,
  showSessionNotice = false,
}: {
  messages: ChatMessage[]
  newMessage: string
  setNewMessage: (v: string) => void
  handleSendMessage: (e: React.FormEvent) => void
  messagesEndRef: React.RefObject<HTMLDivElement | null>
  counselorAvatar?: string | null
  showSessionNotice?: boolean
}) {
  return (
    <>
      {showSessionNotice && (
        <div className="flex-shrink-0 py-3 text-center">
          <div className="inline-block rounded-full bg-muted px-4 py-1.5 text-xs text-muted-foreground">
            Session started • End-to-end encrypted • All times in EAT
          </div>
        </div>
      )}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} counselorAvatar={counselorAvatar} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex-shrink-0 border-t border-border p-3">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </>
  )
}

export function SessionRoom({
  sessionId,
  counselorId,
  counselorName,
  counselorAvatar,
  currentUserId,
  currentUserAvatar,
  initialMessages,
}: SessionRoomProps) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [sessionTime, setSessionTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [mode, setMode] = useState<"video" | "text">("video")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState("")
  const [showEndDialog, setShowEndDialog] = useState(false)
  const [showMobileChat, setShowMobileChat] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const encKeyRef = useRef<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let pusherClient: Pusher | null = null
    let channel: ReturnType<Pusher["subscribe"]> | null = null

    getSessionEncryptionKey(sessionId)
      .then(({ key }) => {
        encKeyRef.current = key
      })
      .catch(() => {})

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
      // Skip own messages — already added optimistically in handleSendMessage
      if (data.senderId === currentUserId) return

      if (!encKeyRef.current) return
      let decrypted: string
      try {
        decrypted = await decryptMessage(data.content, data.iv, encKeyRef.current)
      } catch {
        return
      }

      setMessages((prev) => [
        ...prev,
        {
          id: data.id,
          senderId: data.senderId,
          senderName: counselorName,
          senderAvatar: counselorAvatar || undefined,
          content: decrypted,
          timestamp: new Date(data.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            timeZone: "Africa/Addis_Ababa",
          }) + " EAT",
          isOwn: false,
        },
      ])
    })

    return () => {
      if (channel) {
        channel.unbind_all()
        channel.unsubscribe()
      }
      if (pusherClient) pusherClient.disconnect()
    }
  }, [sessionId, counselorName, counselorAvatar, currentUserId, currentUserAvatar])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

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

  const handleSwitchToAudioOnly = () => {
    setIsVideoOn(false)
  }

  const handleSwitchToChat = () => {
    setMode("text")
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* ── Header ── */}
      <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/seeker/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-4 w-4 text-primary-foreground" />
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={counselorAvatar || "/placeholder.svg"} alt={counselorName} />
              <AvatarFallback>{counselorName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{counselorName}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(sessionTime)}
                </span>
                <Badge variant="outline" className="text-xs px-1.5 py-0">
                  <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                  Live
                </Badge>
                <span>EAT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground sm:flex">
            <Lock className="h-3 w-3 text-green-500" />
            <span>E2EE</span>
          </div>

          {/* Mode Toggle — prominent segmented control */}
          <div className="flex rounded-lg bg-muted p-0.5">
            <button
              onClick={() => setMode("video")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                mode === "video"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Video className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Video</span>
            </button>
            <button
              onClick={() => setMode("text")}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                mode === "text"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Text</span>
            </button>
          </div>

          <Button variant="ghost" size="icon" onClick={() => setShowNotes(!showNotes)} className="hidden sm:flex">
            <FileText className="h-4 w-4" />
            <span className="sr-only">Session notes</span>
          </Button>

          <Dialog open={showEndDialog} onOpenChange={setShowEndDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                End
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>End this session?</DialogTitle>
                <DialogDescription>
                  Are you sure you want to end this session? You can always schedule another one.
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowEndDialog(false)}>
                  Continue Session
                </Button>
                <Link href="/seeker/dashboard">
                  <Button variant="destructive">End Session</Button>
                </Link>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* ── Main Content ── */}
      <div className="relative flex flex-1 overflow-hidden">
        {mode === "video" ? (
          /* ═══ VIDEO MODE ═══ */
          <>
            {/* Video Area */}
            <div className="relative flex-1 bg-muted/50">
              <TroubleshootingPanel onSwitchToChat={handleSwitchToChat} onSwitchToAudioOnly={handleSwitchToAudioOnly} />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32 sm:h-48 sm:w-48">
                    <AvatarImage src={counselorAvatar || "/placeholder.svg"} alt={counselorName} />
                    <AvatarFallback className="text-4xl">{counselorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-medium">{counselorName}</p>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 h-24 w-32 overflow-hidden rounded-lg border-2 border-background bg-muted shadow-lg sm:h-32 sm:w-44">
                <div className="flex h-full items-center justify-center">
                  {isVideoOn ? (
                    <div className="flex flex-col items-center gap-1">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={currentUserAvatar || "/placeholder.svg"} alt="You" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">You</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <VideoOff className="h-6 w-6" />
                      <span className="text-xs">Camera off</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-background/90 p-2 shadow-lg backdrop-blur">
                <Button
                  variant={isMuted ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
                </Button>
                <Button
                  variant={!isVideoOn ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                >
                  {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  <span className="sr-only">{isVideoOn ? "Turn off camera" : "Turn on camera"}</span>
                </Button>
                <Button
                  variant={!isAudioOn ? "destructive" : "secondary"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsAudioOn(!isAudioOn)}
                >
                  {isAudioOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  <span className="sr-only">{isAudioOn ? "Mute audio" : "Unmute audio"}</span>
                </Button>
                <div className="mx-1 h-6 w-px bg-border" />
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  <span className="sr-only">{isFullscreen ? "Exit fullscreen" : "Fullscreen"}</span>
                </Button>
              </div>
            </div>

            {/* Chat Sidebar — always visible on desktop in video mode */}
            <div className="hidden lg:flex w-96 flex-col border-l border-border bg-background">
              <div className="flex items-center justify-between border-b px-4 py-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Chat</span>
                </div>
                <span className="text-xs text-muted-foreground">{messages.length}</span>
              </div>
              <ChatPanel
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
                messagesEndRef={messagesEndRef}
                counselorAvatar={counselorAvatar}
              />
            </div>
          </>
        ) : (
          /* ═══ TEXT MODE ═══ — full WhatsApp-style chat */
          <div className="flex flex-1 flex-col mx-auto w-full max-w-3xl">
            <ChatPanel
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              messagesEndRef={messagesEndRef}
              counselorAvatar={counselorAvatar}
              showSessionNotice
            />
          </div>
        )}

        {/* Notes Panel — overlays from right */}
        {showNotes && (
          <div className="absolute right-0 top-0 bottom-0 w-80 border-l border-border bg-card p-4 shadow-xl z-20 overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Session Notes</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowNotes(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close notes</span>
              </Button>
            </div>
            <Textarea
              placeholder="Take private notes during your session..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <p className="mt-2 text-xs text-muted-foreground">Notes are private and only visible to you</p>
          </div>
        )}
      </div>

      {/* ── Mobile Chat FAB — video mode only ── */}
      {mode === "video" && (
        <button
          onClick={() => setShowMobileChat(true)}
          className="lg:hidden fixed bottom-6 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
        >
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Open chat</span>
        </button>
      )}

      {/* ── Mobile Chat Drawer ── */}
      {showMobileChat && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileChat(false)} />
          <div className="absolute bottom-0 left-0 right-0 h-[75vh] rounded-t-2xl bg-background shadow-xl flex flex-col">
            <div className="flex items-center justify-between border-b px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Chat</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setShowMobileChat(false)}>
                <ChevronDown className="h-5 w-5" />
              </Button>
            </div>
            <ChatPanel
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              messagesEndRef={messagesEndRef}
              counselorAvatar={counselorAvatar}
            />
          </div>
        </div>
      )}
    </div>
  )
}
