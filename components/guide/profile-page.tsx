"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { GuideLayout } from "./guide-layout"
import { updateGuideProfile } from "@/app/actions/user"
import { Calendar, Save, Loader2, CheckCircle2, X } from "lucide-react"

interface GuideProfileData {
  id: string
  name: string
  email: string
  image: string
  role: string
  joinedAt: string
  bio: string
  specializations: string[]
  certifications: string[]
  yearsOfExperience: number
  licenseNumber: string
  hourlyRate: number
}

export function GuideProfilePage({ profile }: { profile: GuideProfileData }) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState(profile.name)
  const [image, setImage] = useState(profile.image)
  const [bio, setBio] = useState(profile.bio)
  const [yearsOfExperience, setYearsOfExperience] = useState(profile.yearsOfExperience)
  const [hourlyRate, setHourlyRate] = useState(profile.hourlyRate)
  const [specializations, setSpecializations] = useState<string[]>(profile.specializations)
  const [specInput, setSpecInput] = useState("")

  const addSpecialization = () => {
    const s = specInput.trim()
    if (s && !specializations.includes(s)) {
      setSpecializations([...specializations, s])
    }
    setSpecInput("")
  }

  const removeSpecialization = (s: string) => {
    setSpecializations(specializations.filter((x) => x !== s))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateGuideProfile({
        name,
        image,
        bio,
        specializations,
        yearsOfExperience,
        hourlyRate,
      })
      setSaved(true)
      setEditing(false)
      setTimeout(() => setSaved(false), 3000)
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setName(profile.name)
    setImage(profile.image)
    setBio(profile.bio)
    setYearsOfExperience(profile.yearsOfExperience)
    setHourlyRate(profile.hourlyRate)
    setSpecializations(profile.specializations)
    setEditing(false)
  }

  return (
    <GuideLayout>
      <div className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">Your professional information</p>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button variant="outline" onClick={handleCancel} disabled={saving}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saving} className="gap-1.5">
                  {saving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : saved ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  {saving ? 'Saving...' : saved ? 'Saved' : 'Save'}
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditing(true)}>Edit Profile</Button>
            )}
          </div>
        </div>

        {/* Avatar + Name Card */}
        <Card>
          <CardContent className="flex items-center gap-6 p-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={image || "/placeholder.svg"} alt={name} />
              <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <Label htmlFor="image">Avatar URL</Label>
                    <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                  <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="capitalize">{profile.role}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Joined {new Date(profile.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                    </span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Bio */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Your professional bio</CardDescription>
          </CardHeader>
          <CardContent>
            {editing ? (
              <Textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell clients about yourself, your approach, and experience..."
                rows={5}
              />
            ) : (
              <p className="text-sm text-muted-foreground">{bio || 'No bio added yet.'}</p>
            )}
          </CardContent>
        </Card>

        {/* Specializations */}
        <Card>
          <CardHeader>
            <CardTitle>Specializations</CardTitle>
            <CardDescription>Areas you specialize in</CardDescription>
          </CardHeader>
          <CardContent>
            {editing ? (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {specializations.map((s) => (
                    <Badge key={s} variant="secondary" className="gap-1">
                      {s}
                      <button onClick={() => removeSpecialization(s)} className="hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={specInput}
                    onChange={(e) => setSpecInput(e.target.value)}
                    placeholder="Add specialization..."
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSpecialization() } }}
                  />
                  <Button variant="outline" onClick={addSpecialization} type="button">Add</Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {specializations.length > 0 ? specializations.map((s) => (
                  <Badge key={s} variant="secondary">{s}</Badge>
                )) : (
                  <p className="text-sm text-muted-foreground">No specializations listed.</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>Your professional background</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {editing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                    className="max-w-xs"
                  />
                </div>
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate (ETB)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    min={0}
                    step={50}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="max-w-xs"
                    placeholder="e.g. 1500"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Set your fee per session. This will be shown to clients when they search for counselors.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Years of Experience</span>
                  <span className="font-medium">{yearsOfExperience > 0 ? yearsOfExperience : 'Not specified'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">Hourly Rate</span>
                  <span className="font-medium">{hourlyRate > 0 ? `ETB ${hourlyRate.toLocaleString()}/session` : 'Not set'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="text-sm text-muted-foreground">License Number</span>
                  <span className="font-medium">{profile.licenseNumber || 'Not specified'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Certifications</span>
                  <span className="font-medium">{profile.certifications.length > 0 ? profile.certifications.length : 'None'}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </GuideLayout>
  )
}
