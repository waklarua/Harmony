"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StewardLayout } from "./steward-layout"
import { ArrowLeft, Briefcase, Star, DollarSign, Calendar, Award, Phone, Mail, User } from "lucide-react"
import type { AdminUserProfile } from "@/app/actions/admin"

interface UserProfilePageProps {
  user: AdminUserProfile
}

export function UserProfilePage({ user }: UserProfilePageProps) {
  return (
    <StewardLayout>
      <div className="space-y-6">
        {/* Back button */}
        <Button variant="ghost" size="sm" asChild className="gap-2 -ml-2">
          <Link href="/steward/users">
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Link>
        </Button>

        {/* User header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-lg">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <Badge variant="outline" className="capitalize">{user.role}</Badge>
                  <Badge variant={user.status === "active" ? "default" : "secondary"} className="capitalize">
                    {user.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Joined {user.joined}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats row */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{user.sessionsCompleted}</div>
                <p className="text-sm text-muted-foreground">Sessions Completed</p>
              </div>
            </CardContent>
          </Card>

          {user.role === "guide" && user.counselorProfile && (
            <>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="rounded-full bg-green-500/10 p-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      ETB {user.counselorProfile.totalEarnings.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="rounded-full bg-yellow-500/10 p-3">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {user.counselorProfile.rating ? `${user.counselorProfile.rating} / 5` : 'N/A'}
                    </div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Counselor details */}
        {user.role === "guide" && user.counselorProfile && (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Counselor Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5" />
                      Specializations
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {user.counselorProfile.specializations.length > 0 ? (
                        user.counselorProfile.specializations.map((s) => (
                          <Badge key={s} variant="secondary">{s}</Badge>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">None specified</span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Years of Experience</p>
                    <p className="font-medium">{user.counselorProfile.yearsOfExperience ?? 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">License Number</p>
                    <p className="font-medium">{user.counselorProfile.licenseNumber ?? 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                    <p className="font-medium">
                      {user.counselorProfile.hourlyRate ? `ETB ${user.counselorProfile.hourlyRate}` : 'N/A'}
                    </p>
                  </div>
                </div>
                {user.counselorProfile.bio && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Bio</p>
                    <p className="text-sm">{user.counselorProfile.bio}</p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-xl font-bold">ETB {user.counselorProfile.totalEarnings.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-xl font-bold">ETB {user.counselorProfile.earningsThisMonth.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Seeker details */}
        {user.role === "seeker" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              {user.emergencyContacts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No emergency contacts saved</p>
              ) : (
                <div className="space-y-3">
                  {user.emergencyContacts.map((contact) => (
                    <div key={contact.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
                      <div className="rounded-full bg-muted p-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-medium">{contact.name}</p>
                          {contact.relationship && (
                            <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                              {contact.relationship}
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1 space-y-0.5 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <Phone className="h-3 w-3" />
                            {contact.phone}
                          </div>
                          {contact.email && (
                            <div className="flex items-center gap-1.5">
                              <Mail className="h-3 w-3" />
                              <span className="truncate">{contact.email}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </StewardLayout>
  )
}
