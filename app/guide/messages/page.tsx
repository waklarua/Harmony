import { GuideMessagesPage } from "@/components/guide/messages-page"
import { getConversations } from "@/app/actions/messages"

export default async function GuideMessagesPageRoute() {
  const conversations = await getConversations()

  const mapped = conversations.map((c) => ({
    id: c.id,
    clientName: c.otherName,
    clientAvatar: c.otherAvatar,
    lastMessage: c.lastMessage,
    timestamp: c.timestamp,
    unread: c.unread,
    status: c.status,
  }))

  return <GuideMessagesPage conversations={mapped} />
}
