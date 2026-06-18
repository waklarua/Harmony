"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SeekerLayout } from "./seeker-layout"
import {
  Star,
  CheckCircle,
  Calendar,
  Clock,
  Globe,
  Award,
  ArrowLeft,
  Video,
  MessageSquare,
  Phone,
  Loader2,
} from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { createBooking } from "@/app/actions/booking"
import type { CounselorProfileData } from "@/app/actions/dashboard"

interface CounselorProfileProps {
  counselor: CounselorProfileData
}

function getNextWeekDates() {
  const dates: { day: string; date: string; full: string; iso: string }[] = []
  const today = new Date()
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  for (let i = 1; i <= 7; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    dates.push({
      day: dayNames[d.getDay()],
      date: d.getDate().toString(),
      full: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      iso: d.toISOString().split("T")[0],
    })
  }
  return dates
}

interface TimeSlot {
  label: string
  value: string
}

const timeSlots: TimeSlot[] = [
  { label: "9:00 AM", value: "09:00" },
  { label: "10:00 AM", value: "10:00" },
  { label: "11:00 AM", value: "11:00" },
  { label: "2:00 PM", value: "14:00" },
  { label: "3:00 PM", value: "15:00" },
  { label: "4:00 PM", value: "16:00" },
]

export function CounselorProfile({ counselor }: CounselorProfileProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<{ full: string; iso: string } | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)

  const availableDates = getNextWeekDates()

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) return
    setIsBooking(true)
    setBookingError(null)
    try {
      const time = timeSlots.find((t) => t.label === selectedTime)
      if (!time) throw new Error("Invalid time selected")
      await createBooking({
        counselorId: counselor.id,
        sessionType: "video",
        scheduledAt: `${selectedDate.iso}T${time.value}:00.000Z`,
      })
      router.push("/seeker/dashboard")
      router.refresh()
    } catch (err: any) {
      setBookingError(err?.message || "Failed to book session. Please try again.")
      setIsBooking(false)
    }
  }

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
                      {counselor.certifications.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Award className="h-4 w-4" />
                          <span>{counselor.certifications.length} certifications</span>
                        </div>
                      )}
                      {counselor.languages.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          <span>{counselor.languages.join(", ")}</span>
                        </div>
                      )}
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
                    {counselor.reviewCount > 0 ? (
                      <div className="space-y-6">
                        <p className="text-muted-foreground">No reviews to display yet.</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">No reviews yet. Be the first to leave a review after your session.</p>
                    )}
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
                    {availableDates.map((d) => (
                      <button
                        key={d.iso}
                        onClick={() => setSelectedDate(d)}
                        className={`flex flex-col items-center rounded-lg border-2 p-2 transition-colors ${
                          selectedDate?.iso === d.iso
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <span className="text-xs text-muted-foreground">{d.day}</span>
                        <span className="text-lg font-semibold">{d.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div>
                    <label className="text-sm font-medium">Select a Time (EAT)</label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time.value}
                          onClick={() => setSelectedTime(time.label)}
                          className={`flex items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-sm transition-colors ${
                            selectedTime === time.label
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Clock className="h-3 w-3" />
                          {time.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {bookingError && (
                  <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                    <p className="text-sm text-destructive">{bookingError}</p>
                  </div>
                )}

                {/* Book Button */}
                <Button
                  className="w-full"
                  size="lg"
                  disabled={!selectedDate || !selectedTime || isBooking}
                  onClick={handleBook}
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : selectedDate && selectedTime ? (
                    `Book ${selectedDate.full} at ${selectedTime}`
                  ) : (
                    "Select date and time"
                  )}
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
