import { SeekerDashboard } from "@/components/seeker/seeker-dashboard"
import { getSession } from "@/lib/auth-utils"
import { getSeekerDashboardData } from "@/app/actions/dashboard"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Dashboard | Harmony",
  description: "Your Harmony dashboard",
}

export default async function SeekerDashboardPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== 'seeker') {
    redirect("/login")
  }

  const data = await getSeekerDashboardData(session.user.id)

  return (
    <SeekerDashboard
      upcomingSessions={data.upcomingSessions}
      completedSessions={data.completedSessions}
      moodData={data.moodData}
      userName={data.userName}
      joinedAt={data.joinedAt}
      latestAssessment={data.latestAssessment}
    />
  )
}
