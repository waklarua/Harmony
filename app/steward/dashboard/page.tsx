import { StewardDashboard } from "@/components/steward/steward-dashboard"
import { getSession } from "@/lib/auth-utils"
import { getPlatformStats, getPendingCounselors, getSupportTickets } from "@/app/actions/admin"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Admin Dashboard | Harmony",
  description: "Admin dashboard",
}

export default async function StewardDashboardPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== 'steward') {
    redirect("/login")
  }

  const [stats, pendingCounselors, supportTickets] = await Promise.all([
    getPlatformStats(),
    getPendingCounselors(),
    getSupportTickets(),
  ])

  return (
    <StewardDashboard
      stats={stats}
      pendingCounselors={pendingCounselors}
      supportTickets={supportTickets}
    />
  )
}
