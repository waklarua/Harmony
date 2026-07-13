import { MessagesPage } from "@/components/seeker/messages-page"
import { getConversations } from "@/app/actions/messages"
import { getUserId } from "@/lib/auth-utils"

export default async function SeekerMessagesPage() {
  const currentUserId = await getUserId()
  const conversations = await getConversations()

  const mapped = conversations.map((c) => ({
    id: c.id,
    counselorName: c.otherName,
    counselorAvatar: c.otherAvatar,
    lastMessage: c.lastMessage,
    timestamp: c.timestamp,
    unread: c.unread,
    status: c.status,
  }))

  return <MessagesPage conversations={mapped} currentUserId={currentUserId} />
}
