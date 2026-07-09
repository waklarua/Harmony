import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { JourneyProgress } from "@/components/seeker/journey-progress"
import { getSession } from "@/lib/auth-utils"
import { getSeekerDashboardData } from "@/app/actions/dashboard"
import { redirect } from "next/navigation"

export default async function JourneyPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/login")
  }

  const data = await getSeekerDashboardData(session.user.id)

  return (
    <SeekerLayout>
      <JourneyProgress
        variant="full"
        completedSessions={data.completedSessions.length}
        moodData={data.moodData}
        joinedAt={data.joinedAt}
      />
    </SeekerLayout>
  )
}
