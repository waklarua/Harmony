import { ClientsPage } from "@/components/guide/clients-page"
import { getGuideClients } from "@/app/actions/dashboard"
import { getSession } from "@/lib/auth-utils"
import { redirect } from "next/navigation"

export default async function GuideClientsPage() {
  const session = await getSession()
  if (!session?.user) redirect("/login")

  const clients = await getGuideClients(session.user.id)

  return <ClientsPage clients={clients} />
}
