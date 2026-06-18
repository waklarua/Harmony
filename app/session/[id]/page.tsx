import { SessionRoom } from "@/components/session/session-room"
import { getSessionData } from "@/app/actions/booking"
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

  return (
    <SessionRoom
      sessionId={id}
      counselorId={data.counselor?.id || ""}
      counselorName={data.counselor?.name || "Counselor"}
      counselorAvatar={data.counselor?.image}
      currentUserId={data.currentUser.id}
      currentUserAvatar={data.currentUser.image}
      initialMessages={data.messages}
    />
  )
}
