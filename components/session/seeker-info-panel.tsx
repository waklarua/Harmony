"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Heart, CheckCircle2, Phone, Mail, User, Calendar } from "lucide-react"
import { getSeekerEmergencyContacts, getSeekerTherapyGoals } from "@/app/actions/seeker-info"

interface EmergencyContact {
  id: string
  name: string
  relationship: string | null
  phone: string
  email: string | null
}

interface TherapyGoal {
  id: string
  goal: string
  status: string
  targetDate: string | null
}

interface SeekerInfoPanelProps {
  seekerId: string
  onClose: () => void
}

export function SeekerInfoPanel({ seekerId, onClose }: SeekerInfoPanelProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [goals, setGoals] = useState<TherapyGoal[]>([])

  useEffect(() => {
    Promise.all([
      getSeekerEmergencyContacts(seekerId),
      getSeekerTherapyGoals(seekerId),
    ])
      .then(([contactsData, goalsData]) => {
        setContacts(contactsData)
        setGoals(goalsData)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load seeker info")
      })
      .finally(() => setLoading(false))
  }, [seekerId])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-6">
      {/* Emergency Contacts */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Heart className="h-4 w-4 text-destructive" />
          <h4 className="text-sm font-medium">Emergency Contacts</h4>
        </div>
        {contacts.length === 0 ? (
          <p className="text-xs text-muted-foreground">No emergency contacts saved</p>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                <div className="mb-1.5 flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-medium">{contact.name}</span>
                  {contact.relationship && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {contact.relationship}
                    </Badge>
                  )}
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Phone className="h-3 w-3" />
                    <a href={`tel:${contact.phone}`} className="hover:text-foreground transition-colors">
                      {contact.phone}
                    </a>
                  </div>
                  {contact.email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-3 w-3" />
                      <a href={`mailto:${contact.email}`} className="hover:text-foreground transition-colors truncate">
                        {contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Therapy Goals */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <h4 className="text-sm font-medium">Therapy Goals</h4>
        </div>
        {goals.length === 0 ? (
          <p className="text-xs text-muted-foreground">No therapy goals set</p>
        ) : (
          <div className="space-y-2">
            {goals.map((goal) => (
              <div key={goal.id} className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
                <div className="mb-1.5 flex items-start justify-between gap-2">
                  <span className="font-medium">{goal.goal}</span>
                  <Badge
                    variant={goal.status === "achieved" ? "secondary" : "outline"}
                    className={`shrink-0 text-[10px] px-1.5 py-0 ${
                      goal.status === "achieved" ? "bg-green-500/10 text-green-600 border-green-200" : ""
                    }`}
                  >
                    {goal.status}
                  </Badge>
                </div>
                {goal.targetDate && (
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Target: {goal.targetDate}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
