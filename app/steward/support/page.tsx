import { SupportPage } from "@/components/steward/support-page"
import { getSupportTickets } from "@/app/actions/admin"

export default async function StewardSupportPage() {
  const tickets = await getSupportTickets()
  return <SupportPage tickets={tickets} />
}
