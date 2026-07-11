"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { initialQuickReplies, crisisKeywords, crisisResponse } from "@/lib/chatbot-responses"

interface Message {
  id: string
  role: "user" | "bot"
  content: string
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
        <Bot className="h-4 w-4 text-primary" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
      </div>
    </div>
  )
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  useEffect(() => {
    if (open && !hasOpened) {
      setHasOpened(true)
      addBotMessage(
        "Hi! I'm your Harmony assistant. I can help you with questions about booking sessions, payments, your account, and more. How can I help?",
      )
    }
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  const addBotMessage = useCallback((content: string) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "bot", content }])
    setIsTyping(false)
  }, [])

  const handleSend = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      const lower = trimmed.toLowerCase()
      const isCrisis = crisisKeywords.some((kw) => lower.includes(kw))

      setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "user", content: trimmed }])
      setInput("")

      if (isCrisis) {
        setIsTyping(true)
        setTimeout(() => {
          addBotMessage(crisisResponse.response)
        }, 800)
        return
      }

      setIsTyping(true)

      try {
        const history = messages.map((m) => ({ role: m.role === "user" ? "user" : "model", content: m.content }))

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        })

        if (!res.ok) throw new Error("API error")

        const data = await res.json()
        addBotMessage(data.response)
      } catch {
        addBotMessage("Sorry, I couldn't reach the AI right now. Please try again or visit our Help Center.")
      }
    },
    [addBotMessage, messages],
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
    handleSend(text)
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95",
          open && "scale-0 opacity-0",
        )}
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat panel */}
      <div
        className={cn(
          "fixed bottom-0 right-0 z-50 flex flex-col bg-background shadow-2xl transition-all duration-300 ease-in-out overflow-hidden",
          "border border-border sm:bottom-4 sm:right-4 sm:rounded-xl",
          open
            ? "h-full w-full translate-y-0 opacity-100 sm:h-[500px] sm:w-[360px]"
            : "pointer-events-none h-0 w-0 translate-y-4 opacity-0",
        )}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3 border-b border-border px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Harmony Assistant</p>
            <p className="text-xs text-muted-foreground">I'm here to help</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <ScrollArea className="min-h-0 flex-1 px-4 py-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id}>
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
                      <Bot className="h-4 w-4 text-primary" />
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

            {/* Quick reply suggestions on first message */}
            {messages.length === 1 && messages[0].role === "bot" && (
              <div className="ml-11 mt-2 flex flex-wrap gap-2">
                {initialQuickReplies.map((text) => (
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

        {/* Input */}
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
