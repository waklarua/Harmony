"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Save, FileText, Loader2 } from "lucide-react"
import { getSessionNote, saveSessionNote } from "@/app/actions/session-notes"
import { toast } from "sonner"

interface SessionNotesPanelProps {
  bookingId: string
}

export function SessionNotesPanel({ bookingId }: SessionNotesPanelProps) {
  const [content, setContent] = useState("")
  const [savedContent, setSavedContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getSessionNote(bookingId)
      .then((note) => {
        if (note) {
          setContent(note.content)
          setSavedContent(note.content)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [bookingId])

  const hasChanges = content !== savedContent

  const handleSave = useCallback(async () => {
    if (!content.trim()) return
    setSaving(true)
    try {
      await saveSessionNote(bookingId, content)
      setSavedContent(content)
      toast.success("Session note saved")
    } catch {
      toast.error("Failed to save session note")
    } finally {
      setSaving(false)
    }
  }, [content, bookingId])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault()
      handleSave()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2">
        <FileText className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">
          {hasChanges ? "Unsaved changes" : "Saved"}
        </span>
      </div>
      <Textarea
        placeholder="Write your private session notes here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        className="min-h-0 flex-1 resize-none text-sm"
      />
      <div className="mt-3 flex items-center gap-2">
        <Button
          size="sm"
          onClick={handleSave}
          disabled={!hasChanges || saving}
          className="gap-1.5"
        >
          {saving ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          Save
        </Button>
        <span className="text-xs text-muted-foreground">
          Ctrl+Enter to save
        </span>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        These notes are encrypted and only visible to you
      </p>
    </div>
  )
}
