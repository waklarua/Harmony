import { SimpleChatRoom } from "@/components/chat/simple-chat-room"
import { getSessionData } from "@/app/actions/booking"
import { getAllMessagesBetween } from "@/app/actions/messages"
import { getSession } from "@/lib/auth-utils"
import { redirect } from "next/navigation"

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const session = await getSession()
  if (!session?.user) redirect("/login")

  let data
  try {
    data = await getSessionData(id)
  } catch {
    redirect(session.user.role === "guide" ? "/guide/dashboard" : "/seeker/dashboard")
  }

  if (!data.currentUser) redirect("/login")

  // Fetch all messages across all shared bookings with this person
  const allMessages = await getAllMessagesBetween(data.otherUserId)

  return (
    <SimpleChatRoom
      sessionId={id}
      otherUserId={data.otherUserId}
      otherName={data.counselor?.name || "Counselor"}
      otherAvatar={data.counselor?.image}
      currentUserId={data.currentUser.id}
      currentUserAvatar={data.currentUser.image}
      isCounselor={data.isCounselor}
      initialMessages={allMessages.messages.length > 0 ? allMessages.messages : data.messages}
    />
  )
}