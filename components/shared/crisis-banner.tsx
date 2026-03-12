"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CrisisBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="relative rounded-lg border border-destructive/20 bg-destructive/5 p-4">
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
        aria-label="Dismiss crisis resources banner"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
          <Phone className="h-4 w-4 text-destructive" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Need immediate help?</p>
          <p className="text-xs text-muted-foreground">
            If you&apos;re in crisis or having thoughts of self-harm, please reach out.
          </p>
          <Link href="/crisis">
            <Button variant="link" size="sm" className="h-auto p-0 text-xs text-destructive">
              View crisis resources →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export function CrisisLink() {
  return (
    <Link
      href="/crisis"
      className="inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20"
    >
      <AlertCircle className="h-3.5 w-3.5" />
      Need immediate help?
    </Link>
  )
}
