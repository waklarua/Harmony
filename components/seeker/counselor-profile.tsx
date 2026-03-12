"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeekerLayout } from "./seeker-layout"
import { Star, CheckCircle, Calendar, Clock, Globe, Award, ArrowLeft, Video, MessageSquare, Phone } from "lucide-react"
import { mockCounselors } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/format"

interface CounselorProfileProps {
  counselorId: string
}

export function CounselorProfile({ counselorId }: CounselorProfileProps) {
  const counselor = mockCounselors.find((c) => c.id === counselorId) || mockCounselors[0]
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const availableTimes = ["9:00 AM EAT", "10:00 AM EAT", "11:00 AM EAT", "2:00 PM EAT", "3:00 PM EAT", "4:00 PM EAT"]
  const availableDates = [
    { day: "Mon", date: "23", full: "Dec 23" },
    { day: "Wed", date: "25", full: "Dec 25" },
    { day: "Fri", date: "27", full: "Dec 27" },
    { day: "Mon", date: "30", full: "Dec 30" },
  ]

  return (
    <SeekerLayout>
      <div className="space-y-6">
        {/* Back Button */}
        <Link href="/seeker/counselors">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Counselors
          </Button>
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Profile Info */}
          <div className="space-y-6 lg:col-span-2">
            {/* Profile Header */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <Avatar className="h-24 w-24 flex-shrink-0">
                    <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                    <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="text-2xl font-bold">{counselor.name}</h1>
                          {counselor.verified && <CheckCircle className="h-5 w-5 text-primary" />}
                        </div>
                        <p className="text-muted-foreground">{counselor.title}</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-muted px-3 py-1.5">
                        <Star className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-semibold">{counselor.rating}</span>
                        <span className="text-sm text-muted-foreground">({counselor.reviewCount} reviews)</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>{counselor.yearsExperience} years experience</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="h-4 w-4" />
                        <span>{counselor.languages.join(", ")}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {counselor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="about">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="approach">Approach</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold">About Me</h3>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{counselor.bio}</p>

                    <h3 className="mt-6 font-semibold">Session Types</h3>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                        <Video className="h-4 w-4 text-primary" />
                        <span className="text-sm">Video Sessions</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                        <MessageSquare className="h-4 w-4 text-primary" />
                        <span className="text-sm">Chat Sessions</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm">Voice Calls</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approach" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold">Therapeutic Approach</h3>
                    <p className="mt-2 text-muted-foreground">{counselor.approach}</p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      My goal is to create a warm, supportive environment where you feel heard and understood. Together,
                      we will work on developing practical strategies and insights that you can apply to your daily
                      life.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {[
                        {
                          author: "B.T.",
                          date: "2 weeks ago",
                          rating: 5,
                          text: "Incredibly understanding and helpful. I've made more progress in a few sessions than I did in months elsewhere.",
                        },
                        {
                          author: "T.L.",
                          date: "1 month ago",
                          rating: 5,
                          text: "Creates such a safe and comfortable space. I always feel heard and supported.",
                        },
                      ].map((review, index) => (
                        <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{review.author}</span>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="mt-1 flex gap-0.5">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                            ))}
                          </div>
                          <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Book a Session</span>
                  <span className="text-xl font-bold text-primary">{formatCurrency(counselor.hourlyRate)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Date Selection */}
                <div>
                  <label className="text-sm font-medium">Select a Date</label>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {availableDates.map((date) => (
                      <button
                        key={date.full}
                        onClick={() => setSelectedDate(date.full)}
                        className={`flex flex-col items-center rounded-lg border-2 p-2 transition-colors ${
                          selectedDate === date.full
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-xs text-muted-foreground">{date.day}</span>
                        <span className="text-lg font-semibold">{date.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <label className="text-sm font-medium">Select a Time (EAT)</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-sm transition-colors ${
                            selectedTime === time
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          {time.replace(" EAT", "")}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Book Button */}
                <Button className="w-full" size="lg" disabled={!selectedDate || !selectedTime}>
                  {selectedDate && selectedTime
                    ? `Book ${selectedDate} at ${selectedTime.replace(" EAT", "")}`
                    : "Select date and time"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">Free cancellation up to 24 hours before</p>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Typically available</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{counselor.availability.join(", ")}</p>
                <p className="mt-2 text-xs text-muted-foreground">All times in East Africa Time (EAT, UTC+3)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SeekerLayout>
  )
}
