"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GuideLayout } from "./guide-layout"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, FileText, Save, Loader2, Calendar, Clock, Video, MessageSquare } from "lucide-react"
import { getGuideClientHistory, type HistoryClient, type HistoryBooking } from "@/app/actions/history"
import { saveSessionNote } from "@/app/actions/session-notes"
import { toast } from "sonner"

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "Africa/Addis_Ababa",
  })
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Addis_Ababa",
  })
}

export function HistoryPage() {
  const [clients, setClients] = useState<HistoryClient[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState<HistoryClient | null>(null)

  useEffect(() => {
    getGuideClientHistory()
      .then(setClients)
      .catch(() => toast.error("Failed to load history"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <GuideLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </GuideLayout>
    )
  }

  return (
    <GuideLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {selectedClient ? "Client History" : "History"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {selectedClient
              ? `Viewing session history for ${selectedClient.name}`
              : "View and manage notes for all your clients"}
          </p>
        </div>

        {selectedClient ? (
          <ClientDetailView client={selectedClient} onBack={() => setSelectedClient(null)} />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clients.map((client) => (
              <ClientCard key={client.seekerId} client={client} onClick={() => setSelectedClient(client)} />
            ))}
            {clients.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                <FileText className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>No session history yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </GuideLayout>
  )
}

function ClientCard({ client, onClick }: { client: HistoryClient; onClick: () => void }) {
  const lastBooking = client.bookings[0]
  const lastDate = lastBooking ? formatDate(lastBooking.scheduledAt) : "N/A"

  return (
    <Card className="cursor-pointer transition-colors hover:border-primary/50" onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={client.avatar || ""} alt={client.name} />
            <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{client.name}</p>
            <p className="text-xs text-muted-foreground">
              {client.totalSessions} session{client.totalSessions !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">Last session: {lastDate}</div>
      </CardContent>
    </Card>
  )
}

function ClientDetailView({ client, onBack }: { client: HistoryClient; onBack: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10">
          <AvatarImage src={client.avatar || ""} alt={client.name} />
          <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{client.name}</p>
          <p className="text-xs text-muted-foreground">
            {client.totalSessions} session{client.totalSessions !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {client.bookings.map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}
        {client.bookings.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">No sessions found</p>
        )}
      </div>
    </div>
  )
}

function BookingCard({ booking: initial }: { booking: HistoryBooking }) {
  const [showEditor, setShowEditor] = useState(false)
  const [noteContent, setNoteContent] = useState(initial.note?.content || "")
  const [savedNote, setSavedNote] = useState(initial.note)
  const [saving, setSaving] = useState(false)

  const statusBadge = (status: string) => {
    const variants: Record<string, string> = {
      completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      confirmed: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    }
    return variants[status] || "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
  }

  async function handleSaveNote() {
    if (!noteContent.trim()) return
    setSaving(true)
    try {
      const res = await saveSessionNote(initial.id, noteContent)
      if (res?.success) {
        setSavedNote({ content: noteContent, createdAt: null, updatedAt: new Date() })
        setShowEditor(false)
        toast.success("Session note saved")
      }
    } catch (err) {
      console.error("save session note error:", err)
      toast.error("Failed to save session note")
    } finally {
      setSaving(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      handleSaveNote()
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{formatDate(initial.scheduledAt)}</span>
            <Clock className="ml-1 h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{formatTime(initial.scheduledAt)}</span>
          </div>
          <Badge className={statusBadge(initial.status)}>
            {initial.status.replace("_", " ")}
          </Badge>
        </div>

        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
          {initial.sessionType === "video" ? <Video className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
          <span className="capitalize">{initial.sessionType}</span>
          {initial.duration && (
            <>
              <span>·</span>
              <span>{initial.duration} min</span>
            </>
          )}
        </div>

        <div className="mt-2 border-t border-border pt-3">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <FileText className="h-3.5 w-3.5" />
              Session Notes
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs"
              onClick={() => setShowEditor(!showEditor)}
            >
              {showEditor ? "Cancel" : savedNote ? "Edit" : "Add Note"}
            </Button>
          </div>

          {showEditor ? (
            <div className="space-y-2">
              <Textarea
                placeholder="Write your private notes for this session..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                onKeyDown={handleKeyDown}
                className="min-h-[80px] resize-none text-sm"
              />
              <div className="flex items-center justify-between">
                <Button
                  size="sm"
                  onClick={handleSaveNote}
                  disabled={saving || !noteContent.trim()}
                  className="gap-1.5"
                >
                  {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
                  Save
                </Button>
                <span className="text-xs text-muted-foreground">Ctrl+Enter to save</span>
              </div>
            </div>
          ) : savedNote ? (
            <p className="whitespace-pre-wrap text-sm">{savedNote.content}</p>
          ) : (
            <p className="text-xs italic text-muted-foreground">No notes for this session</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
