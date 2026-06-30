import { SessionsPage } from "@/components/seeker/sessions-page"
import { getSession } from "@/lib/auth-utils"
import { getSeekerSessions } from "@/app/actions/dashboard"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function SeekerSessionsPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== 'seeker') {
    redirect("/login")
  }

  const data = await getSeekerSessions(session.user.id)

  return <SessionsPage upcoming={data.upcoming} active={data.active} past={data.past} />
}
