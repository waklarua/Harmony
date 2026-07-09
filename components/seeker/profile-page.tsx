"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Heart, Edit2, Target, Phone, Plus, Trash2, CheckCircle } from "lucide-react"
import { getEmergencyContacts, addEmergencyContact, deleteEmergencyContact } from "@/app/actions/emergency-contacts"
import { getTherapyGoals, addTherapyGoal, updateGoalStatus, deleteTherapyGoal } from "@/app/actions/therapy-goals"

interface ProfilePageProps {
  userName?: string
  userEmail?: string
  userAvatar?: string
  joinedAt?: string
  completedSessionsCount?: number
}

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

export function ProfilePage({
  userName = "User",
  userEmail = "",
  userAvatar = "",
  joinedAt = "Recently",
  completedSessionsCount = 0,
}: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(userName)
  const [pronouns, setPronouns] = useState("she/her")

  // Emergency contacts
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [showAddContact, setShowAddContact] = useState(false)
  const [newContact, setNewContact] = useState({ name: "", relationship: "", phone: "", email: "" })

  // Therapy goals
  const [goals, setGoals] = useState<TherapyGoal[]>([])
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({ goal: "", targetDate: "" })

  useEffect(() => {
    getEmergencyContacts().then(setContacts).catch(() => {})
    getTherapyGoals().then(setGoals).catch(() => {})
  }, [])

  const handleAddContact = async () => {
    if (!newContact.name || !newContact.phone) return
    await addEmergencyContact(newContact)
    setContacts(await getEmergencyContacts())
    setNewContact({ name: "", relationship: "", phone: "", email: "" })
    setShowAddContact(false)
  }

  const handleDeleteContact = async (id: string) => {
    await deleteEmergencyContact(id)
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }

  const handleAddGoal = async () => {
    if (!newGoal.goal) return
    await addTherapyGoal({ goal: newGoal.goal, targetDate: newGoal.targetDate || undefined })
    setGoals(await getTherapyGoals())
    setNewGoal({ goal: "", targetDate: "" })
    setShowAddGoal(false)
  }

  const handleToggleGoal = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "achieved" ? "active" : "achieved"
    await updateGoalStatus(id, nextStatus)
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, status: nextStatus } : g)))
  }

  const handleDeleteGoal = async (id: string) => {
    await deleteTherapyGoal(id)
    setGoals((prev) => prev.filter((g) => g.id !== id))
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
              <AvatarFallback className="text-3xl">{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="w-full">
                  {isEditing ? (
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-lg font-semibold"
                      />
                    </div>
                  ) : (
                    <>
                      <h1 className="text-2xl font-semibold">{name}</h1>
                      {userEmail && <p className="text-sm text-muted-foreground mt-1">{userEmail}</p>}
                    </>
                  )}
                </div>
                <Button variant="outline" className="gap-2 bg-transparent shrink-0" onClick={() => setIsEditing(!isEditing)}>
                  <Edit2 className="h-4 w-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
              {isEditing && (
                <div className="mt-2 space-y-2">
                  <Label htmlFor="pronouns">Preferred Pronouns</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={pronouns}
                    onChange={(e) => setPronouns(e.target.value)}
                  >
                    <option value="she/her">She/Her</option>
                    <option value="he/him">He/Him</option>
                    <option value="they/them">They/Them</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
              )}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {joinedAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>{completedSessionsCount} Sessions Completed</span>
                </div>
                <Badge variant="secondary">Active Member</Badge>
              </div>
              {isEditing && (
                <div className="mt-4">
                  <Button onClick={() => setIsEditing(false)}>Save Changes</Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Therapy Goals */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Therapy Goals
              </CardTitle>
              <CardDescription>What you&apos;re working on</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1 bg-transparent" onClick={() => setShowAddGoal(true)}>
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddGoal && (
            <div className="mb-4 space-y-3 rounded-lg border border-border p-4">
              <div>
                <Label htmlFor="goal">Goal</Label>
                <Input
                  id="goal"
                  value={newGoal.goal}
                  onChange={(e) => setNewGoal((p) => ({ ...p, goal: e.target.value }))}
                  placeholder="e.g. Manage anxiety better"
                />
              </div>
              <div>
                <Label htmlFor="targetDate">Target date (optional)</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal((p) => ({ ...p, targetDate: e.target.value }))}
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddGoal}>Save</Button>
                <Button variant="outline" size="sm" className="bg-transparent" onClick={() => setShowAddGoal(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {goals.length === 0 ? (
            <p className="text-sm text-muted-foreground">No goals set yet. Click &ldquo;Add Goal&rdquo; to get started.</p>
          ) : (
            <div className="space-y-2">
              {goals.map((g) => (
                <div key={g.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleToggleGoal(g.id, g.status)} className="focus:outline-none">
                      {g.status === "achieved" ? (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/40" />
                      )}
                    </button>
                    <div>
                      <p className={`text-sm font-medium ${g.status === "achieved" ? "line-through text-muted-foreground" : ""}`}>
                        {g.goal}
                      </p>
                      {g.targetDate && (
                        <p className="text-xs text-muted-foreground">Target: {g.targetDate}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={g.status === "achieved" ? "default" : "secondary"} className="text-xs">
                      {g.status}
                    </Badge>
                    <button onClick={() => handleDeleteGoal(g.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
              <CardDescription>People to reach out to in a crisis</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1 bg-transparent" onClick={() => setShowAddContact(true)}>
              <Plus className="h-4 w-4" />
              Add Contact
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddContact && (
            <div className="mb-4 space-y-3 rounded-lg border border-border p-4">
              <div>
                <Label htmlFor="contactName">Name</Label>
                <Input
                  id="contactName"
                  value={newContact.name}
                  onChange={(e) => setNewContact((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label htmlFor="relationship">Relationship (optional)</Label>
                <Input
                  id="relationship"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact((p) => ({ ...p, relationship: e.target.value }))}
                  placeholder="e.g. Mother, Friend"
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  id="contactPhone"
                  value={newContact.phone}
                  onChange={(e) => setNewContact((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+251 9XX XXX XXXX"
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email (optional)</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact((p) => ({ ...p, email: e.target.value }))}
                  placeholder="email@example.com"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddContact}>Save</Button>
                <Button variant="outline" size="sm" className="bg-transparent" onClick={() => setShowAddContact(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {contacts.length === 0 ? (
            <p className="text-sm text-muted-foreground">No emergency contacts added.</p>
          ) : (
            <div className="space-y-2">
              {contacts.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.relationship && `${c.relationship} • `}{c.phone}
                      {c.email && ` • ${c.email}`}
                    </p>
                  </div>
                  <button onClick={() => handleDeleteContact(c.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
