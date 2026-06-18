import { CounselorsPage } from "@/components/steward/counselors-page"
import { getPendingCounselors, getApprovedCounselors } from "@/app/actions/admin"
import { getSession } from "@/lib/auth-utils"
import { redirect } from "next/navigation"

export default async function StewardCounselorsRoute() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== "steward") {
    redirect("/login")
  }

  const [pendingCounselors, approvedCounselors] = await Promise.all([
    getPendingCounselors(),
    getApprovedCounselors(),
  ])

  return (
    <CounselorsPage
      pendingCounselors={pendingCounselors}
      approvedCounselors={approvedCounselors}
    />
  )
}