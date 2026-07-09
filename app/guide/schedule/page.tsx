import { SchedulePage } from "@/components/guide/schedule-page"
import { getSession } from "@/lib/auth-utils"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Schedule | Harmony",
  description: "Manage your availability and view upcoming sessions",
}

export default async function GuideSchedulePage() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== 'guide') {
    redirect("/login")
  }

  return <SchedulePage userId={session.user.id} />
}
