"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Sparkles, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import {
  crisisKeywords,
  crisisResponse,
  contextQuickReplies,
  fallbackResponse,
  fallbackQuickReplies,
} from "@/lib/chatbot-responses"

interface Message {
  id: string
  role: "user" | "assistant" | "bot"
  content: string
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Sparkles className="h-4 w-4 text-primary" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
      </div>
    </div>
  )
}

function getContextKey(pathname: string, role: string | undefined): string {
  if (!role || role === "seeker") {
    if (pathname.startsWith("/seeker/counselors")) return "seeker_counselors"
    if (pathname.startsWith("/seeker/assessment")) return "seeker_assessment"
    if (pathname.startsWith("/seeker/messages")) return "seeker_messages"
    if (pathname.startsWith("/session/")) return "seeker_session"
    if (pathname.startsWith("/seeker/")) return "seeker_dashboard"
    return "unauthenticated"
  }
  if (role === "guide") {
    if (pathname.startsWith("/guide/schedule")) return "guide_schedule"
    if (pathname.startsWith("/guide/clients")) return "guide_clients"
    if (pathname.startsWith("/guide/")) return "guide_dashboard"
    return "unauthenticated"
  }
  if (role === "steward") {
    if (pathname.startsWith("/steward/")) return "steward"
    return "unauthenticated"
  }
  return "unauthenticated"
}

export function ChatbotWidget() {
  const pathname = usePathname()
  const { data: session } = authClient.useSession()
  const role = (session?.user as { role?: string })?.role

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [currentFollowUps, setCurrentFollowUps] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    if (open && !hasOpened) {
      setHasOpened(true)
      const ctxKey = getContextKey(pathname, role)
      const greetingQuickReplies = contextQuickReplies[ctxKey] ?? contextQuickReplies.unauthenticated
      setCurrentFollowUps(greetingQuickReplies)
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "bot",
          content:
            "Hi, I'm your Harmony Assistant. I'm here to help with anything about Harmony — booking, payments, your account, and more. What can I help with today?",
        },
      ])
    }
  }, [open, hasOpened, pathname, role])

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const addBotMessage = useCallback((content: string, followUps?: string[]) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", content }])
    setIsTyping(false)
    if (followUps) setCurrentFollowUps(followUps)
    else setCurrentFollowUps([])
  }, [])

  const addUserMessage = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: text }])
  }, [])

  const handleSend = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return
      setCurrentFollowUps([])
      setInput("")

      const lower = trimmed.toLowerCase()
      const isCrisis = crisisKeywords.some((kw) => lower.includes(kw))

      addUserMessage(trimmed)

      if (isCrisis) {
        setIsTyping(true)
        setTimeout(() => {
          addBotMessage(crisisResponse.response, crisisResponse.followUps)
        }, 500)
        return
      }

      setIsTyping(true)

      try {
        const chatHistory = messages.map((m) => ({
          role: m.role === "bot" ? "assistant" : "user",
          content: m.content,
        }))
        chatHistory.push({ role: "user", content: trimmed })

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: chatHistory }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "API error")
        }

        const ctxKey = getContextKey(pathname, role)
        const followUps = contextQuickReplies[ctxKey] ?? fallbackQuickReplies
        addBotMessage(data.response, followUps)
      } catch {
        const ctxKey = getContextKey(pathname, role)
        const fallbackButtons = contextQuickReplies[ctxKey] ?? fallbackQuickReplies
        addBotMessage(fallbackResponse, fallbackButtons)
      }
    },
    [addBotMessage, addUserMessage, messages, pathname, role],
  )

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  const handleQuickReply = (text: string) => {
    if (text === "Browse Help Center") {
      window.open("/help", "_blank")
      return
    }
    if (text === "Contact support") {
      window.open("/contact", "_blank")
      return
    }
    if (text === "Crisis resources") {
      window.open("/crisis", "_blank")
      return
    }
    if (text === "Take PHQ-9 assessment") {
      window.open("/seeker/assessment", "_blank")
      return
    }
    handleSend(text)
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95",
          open ? "scale-0 opacity-0" : "shadow-[0_0_20px] shadow-primary/50",
        )}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, delay: 0.5 }}
        aria-label="Open chat assistant"
      >
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10"
        >
          <MessageCircle className="h-5 w-5" />
        </motion.span>
        <span className="pr-4 text-sm font-medium">AI Assistant</span>
        <motion.span
          className="absolute -inset-1 rounded-full bg-primary"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ zIndex: -1 }}
        />
      </motion.button>

      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 flex flex-col bg-background shadow-2xl transition-all duration-300 ease-in-out overflow-hidden",
          "border border-border sm:bottom-4 sm:right-4 sm:rounded-xl",
          open
            ? "h-full w-full translate-y-0 opacity-100 sm:h-[500px] sm:w-[360px]"
            : "pointer-events-none h-0 w-0 translate-y-4 opacity-0",
        )}
      >
        <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3 bg-primary/5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">AI Assistant</p>
            <p className="text-xs text-muted-foreground">Here to help 💙</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ScrollArea className="min-h-0 flex-1 px-4 py-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="animate-in fade-in slide-in-from-bottom-1 duration-300"
              >
                <div
                  className={cn(
                    "flex items-start gap-3",
                    msg.role === "user" && "flex-row-reverse",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      msg.role === "user" ? "bg-primary" : "bg-primary/10",
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="h-4 w-4 text-primary-foreground" />
                    ) : (
                      <Sparkles className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md bg-muted text-foreground",
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            {messages.length > 0 && currentFollowUps.length > 0 && !isTyping && (
              <div className="ml-11 mt-2 flex flex-wrap gap-2 animate-in fade-in slide-in-from-bottom-1 duration-300">
                {currentFollowUps.map((text) => (
                  <button
                    key={text}
                    onClick={() => handleQuickReply(text)}
                    className="rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/15 hover:border-primary/50"
                  >
                    {text}
                  </button>
                ))}
              </div>
            )}

            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="shrink-0 border-t border-border p-3">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
              className="h-10 rounded-full border-border bg-muted/50 text-sm"
              disabled={isTyping}
            />
            <Button
              size="icon"
              onClick={() => handleSend(input)}
              disabled={!input.trim() || isTyping}
              className="h-10 w-10 shrink-0 rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            Responses are automated. For urgent help,{" "}
            <Link href="/crisis" className="text-destructive hover:underline" onClick={() => setOpen(false)}>
              tap here
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  )
}
