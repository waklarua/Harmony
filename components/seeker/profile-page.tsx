"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar, Heart, Edit2, Target } from "lucide-react"

interface ProfilePageProps {
  userName?: string
  userEmail?: string
  userAvatar?: string
  joinedAt?: string
  completedSessionsCount?: number
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
  const [goals, setGoals] = useState(["anxiety", "stress", "self-esteem"])

  const therapyGoals = [
    { id: "anxiety", label: "Managing Anxiety" },
    { id: "depression", label: "Coping with Depression" },
    { id: "stress", label: "Stress Management" },
    { id: "relationships", label: "Relationship Issues" },
    { id: "self-esteem", label: "Building Self-Esteem" },
    { id: "grief", label: "Grief & Loss" },
    { id: "trauma", label: "Trauma Recovery" },
    { id: "career", label: "Career Guidance" },
  ]

  const toggleGoal = (goalId: string) => {
    setGoals((prev) => (prev.includes(goalId) ? prev.filter((g) => g !== goalId) : [...prev, goalId]))
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
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Therapy Goals
          </CardTitle>
          <CardDescription>What you&apos;re working on</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-3">
              {therapyGoals.map((goal) => (
                <div key={goal.id} className="flex items-center gap-2">
                  <Checkbox
                    id={goal.id}
                    checked={goals.includes(goal.id)}
                    onCheckedChange={() => toggleGoal(goal.id)}
                  />
                  <Label htmlFor={goal.id} className="text-sm font-normal cursor-pointer">
                    {goal.label}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {goals.map((goalId) => {
                const goal = therapyGoals.find((g) => g.id === goalId)
                return goal ? (
                  <Badge key={goalId} variant="secondary">
                    {goal.label}
                  </Badge>
                ) : null
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
