"use client"

import { useState, useEffect } from "react"
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
import { PaymentModal } from "./payment-modal"
import { getAvailableTimeSlots } from "@/app/actions/availability"
import { getMyWaitlistStatus, joinWaitlist, leaveWaitlist } from "@/app/actions/waitlist"
import type { CounselorProfileData } from "@/app/actions/dashboard"

interface CounselorProfileProps {
  counselor: CounselorProfileData
}

function getNextWeekDates() {
  const dates: { day: string; date: string; full: string; iso: string }[] = []
  const today = new Date()
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  for (let i = 0; i < 7; i++) {
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

export function CounselorProfile({ counselor }: CounselorProfileProps) {
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState<{ full: string; iso: string } | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingError, setBookingError] = useState<string | null>(null)
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])
  const [slotsLoading, setSlotsLoading] = useState(false)
  const [isFullyBooked, setIsFullyBooked] = useState<boolean | null>(null)
  const [waitlistStatus, setWaitlistStatus] = useState<{ onWaitlist: boolean; position: number | null }>({
    onWaitlist: false,
    position: null,
  })
  const [waitlistLoading, setWaitlistLoading] = useState(true)
  const [showPayment, setShowPayment] = useState(false)
  const [pendingBooking, setPendingBooking] = useState<{
    date: string
    time: string
    timeValue: string
  } | null>(null)

  const availableDates = getNextWeekDates()

  useEffect(() => {
    setWaitlistLoading(true)
    const today = new Date()
    const checks = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today)
      d.setDate(d.getDate() + i)
      return getAvailableTimeSlots(counselor.id, d.toISOString().split('T')[0])
    })
    Promise.all([
      Promise.all(checks).then((results) => results.every((slots) => slots.length === 0)),
      getMyWaitlistStatus(counselor.id).catch(() => ({ onWaitlist: false, position: null })),
    ])
      .then(([fullyBooked, wlStatus]) => {
        setIsFullyBooked(fullyBooked)
        setWaitlistStatus(wlStatus)
      })
      .catch(() => setIsFullyBooked(false))
      .finally(() => setWaitlistLoading(false))
  }, [counselor.id])

  useEffect(() => {
    if (isFullyBooked) return
    if (!selectedDate) {
      setAvailableSlots([])
      setSelectedTime(null)
      return
    }
    setSlotsLoading(true)
    setSelectedTime(null)
    getAvailableTimeSlots(counselor.id, selectedDate.iso)
      .then(setAvailableSlots)
      .catch(() => setAvailableSlots([]))
      .finally(() => setSlotsLoading(false))
  }, [selectedDate, counselor.id, isFullyBooked])

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return
    const time = availableSlots.find((t) => t.label === selectedTime)
    if (!time) return
    const [h, m] = time.value.split(':').map(Number)
    const utcH = (h - 3 + 24) % 24
    const utcVal = `${utcH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    setPendingBooking({
      date: selectedDate.full,
      time: selectedTime,
      timeValue: `${selectedDate.iso}T${utcVal}:00.000Z`,
    })
    setShowPayment(true)
  }

  const handlePaymentConfirm = async (method: string, reference: string) => {
    if (!pendingBooking || !selectedDate) return
    setIsBooking(true)
    setBookingError(null)
    try {
      await createBooking({
        counselorId: counselor.id,
        sessionType: "video",
        scheduledAt: pendingBooking.timeValue,
        amount: counselor.hourlyRate,
        paymentStatus: "paid",
        paymentReference: reference,
        paymentMethod: method,
      })
      setShowPayment(false)
      router.push("/seeker/dashboard")
      router.refresh()
    } catch (err: any) {
      setBookingError(err?.message || "Failed to book session. Please try again.")
      setIsBooking(false)
    }
  }

  const handleJoinWaitlist = async () => {
    setWaitlistLoading(true)
    setBookingError(null)
    try {
      await joinWaitlist(counselor.id)
      const wlStatus = await getMyWaitlistStatus(counselor.id)
      setWaitlistStatus(wlStatus)
    } catch (err: any) {
      setBookingError(err?.message || 'Failed to join waitlist')
    } finally {
      setWaitlistLoading(false)
    }
  }

  const handleLeaveWaitlist = async () => {
    setWaitlistLoading(true)
    setBookingError(null)
    try {
      await leaveWaitlist(counselor.id)
      setWaitlistStatus({ onWaitlist: false, position: null })
    } catch (err: any) {
      setBookingError(err?.message || 'Failed to leave waitlist')
    } finally {
      setWaitlistLoading(false)
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
                {waitlistLoading && isFullyBooked === null ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : isFullyBooked ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-muted bg-muted/30 p-4 text-center">
                      <Calendar className="mx-auto h-8 w-8 text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        This counselor is fully booked for the next 7 days.
                      </p>
                    </div>

                    {bookingError && (
                      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                        <p className="text-sm text-destructive">{bookingError}</p>
                      </div>
                    )}

                    {waitlistStatus.onWaitlist ? (
                      <div className="space-y-3">
                        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
                          <p className="text-sm font-medium">You're on the waitlist</p>
                          {waitlistStatus.position && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              #{waitlistStatus.position} in line
                            </p>
                          )}
                        </div>
                        <Button
                          className="w-full"
                          variant="outline"
                          size="lg"
                          disabled={waitlistLoading}
                          onClick={handleLeaveWaitlist}
                        >
                          {waitlistLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : null}
                          Leave Waitlist
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="w-full"
                        size="lg"
                        disabled={waitlistLoading}
                        onClick={handleJoinWaitlist}
                      >
                        {waitlistLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        Join Waitlist
                      </Button>
                    )}
                  </div>
                ) : (
                  <>
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
                          {slotsLoading ? (
                            <div className="col-span-2 flex items-center justify-center py-4 text-sm text-muted-foreground">
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Loading times...
                            </div>
                          ) : availableSlots.length === 0 ? (
                            <p className="col-span-2 py-2 text-sm text-muted-foreground">
                              No available times for this date. Try another day.
                            </p>
                          ) : (
                            availableSlots.map((time) => (
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
                            ))
                          )}
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
                  </>
                )}
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

      <PaymentModal
        open={showPayment}
        onOpenChange={setShowPayment}
        amount={counselor.hourlyRate}
            counselorName={counselor.name}
        sessionDate={pendingBooking?.date || ""}
        sessionTime={pendingBooking?.time || ""}
        onConfirm={handlePaymentConfirm}
      />
    </SeekerLayout>
  )
}
