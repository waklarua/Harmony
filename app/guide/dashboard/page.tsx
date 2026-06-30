import { GuideDashboard } from "@/components/guide/guide-dashboard"
import { getSession } from "@/lib/auth-utils"
import { getGuideDashboardData } from "@/app/actions/dashboard"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Counselor Dashboard | Harmony",
  description: "Counselor dashboard",
}

export default async function GuideDashboardPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== 'guide') {
    redirect("/login")
  }

  const data = await getGuideDashboardData(session.user.id)

  return (
    <GuideDashboard
      todaysSessions={data.todaysSessions}
      activeClients={data.activeClients}
      bookingRequests={data.bookingRequests}
      guideName={data.guideName}
      earningsData={data.earningsData}
    />
  )
}
