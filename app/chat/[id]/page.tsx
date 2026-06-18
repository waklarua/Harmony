import { SimpleChatRoom } from "@/components/chat/simple-chat-room"
import { getSessionData } from "@/app/actions/booking"
import { redirect } from "next/navigation"

export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let data
  try {
    data = await getSessionData(id)
  } catch {
    redirect("/seeker/dashboard")
  }

  if (!data.currentUser) redirect("/login")

  return (
    <SimpleChatRoom
      sessionId={id}
      otherName={data.counselor?.name || "Counselor"}
      otherAvatar={data.counselor?.image}
      currentUserId={data.currentUser.id}
      currentUserAvatar={data.currentUser.image}
      initialMessages={data.messages}
    />
  )
}