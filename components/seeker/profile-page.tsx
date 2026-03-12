"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Edit2, User, Heart, Target, MessageSquare, Star } from "lucide-react"
import { mockUser, mockCounselors } from "@/lib/mock-data"

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [bio, setBio] = useState(
    "I'm on a journey to better understand myself and improve my mental well-being. Looking forward to growing with the support of professional guidance.",
  )
  const [pronouns, setPronouns] = useState("she/her")
  const [goals, setGoals] = useState(["anxiety", "stress", "self-esteem"])
  const [communicationStyle, setCommunicationStyle] = useState("balanced")
  const [reminderPreference, setReminderPreference] = useState("1-hour")

  const upcomingSessions = [
    {
      id: 1,
      counselor: mockCounselors[0],
      date: "Tomorrow",
      time: "10:00 AM EAT",
      type: "Video Session",
    },
    {
      id: 2,
      counselor: mockCounselors[1],
      date: "Jan 25, 2024",
      time: "2:00 PM EAT",
      type: "Chat Session",
    },
  ]

  const pastSessions = [
    { id: 1, counselor: mockCounselors[0], date: "Jan 15, 2024", rating: 5 },
    { id: 2, counselor: mockCounselors[0], date: "Jan 8, 2024", rating: 5 },
    { id: 3, counselor: mockCounselors[1], date: "Jan 5, 2024", rating: 4 },
    { id: 4, counselor: mockCounselors[0], date: "Dec 28, 2023", rating: 5 },
    { id: 5, counselor: mockCounselors[1], date: "Dec 20, 2023", rating: 4 },
  ]

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
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <Avatar className="h-24 w-24">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
              <AvatarFallback className="text-3xl">{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">{mockUser.name}</h1>
                  <p className="text-muted-foreground">{pronouns}</p>
                </div>
                <Button variant="outline" className="gap-2 bg-transparent" onClick={() => setIsEditing(!isEditing)}>
                  <Edit2 className="h-4 w-4" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined December 2023</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  <span>12 Sessions Completed</span>
                </div>
                <Badge variant="secondary">Active Member</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* About Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              About
            </CardTitle>
            <CardDescription>Tell counselors a bit about yourself</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    placeholder="Share a bit about yourself..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pronouns">Preferred Pronouns</Label>
                  <Select value={pronouns} onValueChange={setPronouns}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="she/her">She/Her</SelectItem>
                      <SelectItem value="he/him">He/Him</SelectItem>
                      <SelectItem value="they/them">They/Them</SelectItem>
                      <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button>Save Changes</Button>
              </>
            ) : (
              <p className="text-muted-foreground">{bio}</p>
            )}
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

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center gap-3 rounded-lg border p-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={session.counselor.avatar || "/placeholder.svg"} alt={session.counselor.name} />
                  <AvatarFallback>{session.counselor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{session.counselor.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {session.date} at {session.time}
                  </p>
                </div>
                <Badge variant="outline">{session.type}</Badge>
              </div>
            ))}
            <Link href="/seeker/sessions">
              <Button variant="link" className="h-auto p-0 text-sm">
                View All Sessions
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Past Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Session History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pastSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.counselor.avatar || "/placeholder.svg"} alt={session.counselor.name} />
                    <AvatarFallback>{session.counselor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{session.counselor.name}</p>
                    <p className="text-xs text-muted-foreground">{session.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{session.rating}</span>
                </div>
              </div>
            ))}
            <Link href="/seeker/sessions">
              <Button variant="link" className="h-auto p-0 text-sm">
                View All Sessions
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Session Preferences
          </CardTitle>
          <CardDescription>Help us match you with the right counselor</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Preferred Communication Style</Label>
                <Select value={communicationStyle} onValueChange={setCommunicationStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct">Direct & Straightforward</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="gentle">Gentle & Supportive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Session Reminder</Label>
                <Select value={reminderPreference} onValueChange={setReminderPreference}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30-min">30 minutes before</SelectItem>
                    <SelectItem value="1-hour">1 hour before</SelectItem>
                    <SelectItem value="1-day">1 day before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium">Communication Style</p>
                <p className="text-sm text-muted-foreground capitalize">{communicationStyle.replace("-", " & ")}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Session Reminder</p>
                <p className="text-sm text-muted-foreground">{reminderPreference.replace("-", " ")} before</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
