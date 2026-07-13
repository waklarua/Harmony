import { SessionRoom } from "@/components/session/session-room"
import { getSessionData, startSession } from "@/app/actions/booking"
import { canJoinSession } from "@/lib/session-utils"
import { redirect } from "next/navigation"

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let data
  try {
    data = await getSessionData(id)
  } catch {
    redirect("/seeker/dashboard")
  }

  if (!data.currentUser) redirect("/login")

  let bookingStatus: string = data.bookingStatus || 'pending'
  let bookingStartedAt: string | null = data.bookingStartedAt

  if (bookingStatus === 'confirmed' && canJoinSession(data.booking.scheduledAt, data.booking.duration)) {
    try {
      await startSession(id)
      bookingStatus = 'in_progress'
      bookingStartedAt = new Date().toISOString()
    } catch {
      // If start fails, continue with current status
    }
  }

  const formattedMessages = data.messages.map((m: { id: string; senderId: string; senderName: string; senderAvatar?: string; content: string; timestamp: string; isOwn: boolean }) => ({
    id: m.id,
    senderId: m.senderId,
    senderName: m.senderName,
    senderAvatar: m.senderAvatar,
    content: m.content,
    timestamp: m.timestamp,
    isOwn: m.isOwn,
  }))

  return (
    <SessionRoom
      sessionId={id}
      otherUserId={data.otherUserId}
      counselorId={data.counselor?.id || ""}
      counselorName={data.counselor?.name || "Counselor"}
      counselorAvatar={data.counselor?.image}
      currentUserId={data.currentUser.id}
      currentUserAvatar={data.currentUser.image}
      isCounselor={data.isCounselor}
      initialMessages={formattedMessages}
      bookingStatus={bookingStatus}
      bookingStartedAt={bookingStartedAt}
      bookingScheduledAt={data.booking.scheduledAt?.toISOString() || null}
      bookingDuration={data.booking.duration}
    />
  )
}
