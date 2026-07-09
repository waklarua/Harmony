import { StewardDashboard } from "@/components/steward/steward-dashboard"
import { getSession } from "@/lib/auth-utils"
import { getPlatformStats, getPendingCounselors, getSupportTickets, getWeeklySessionTrend } from "@/app/actions/admin"
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

  const [stats, pendingCounselors, supportTickets, sessionTrendData] = await Promise.all([
    getPlatformStats(),
    getPendingCounselors(),
    getSupportTickets(),
    getWeeklySessionTrend(),
  ])

  return (
    <StewardDashboard
      stats={stats}
      pendingCounselors={pendingCounselors}
      supportTickets={supportTickets}
      sessionTrendData={sessionTrendData}
    />
  )
}
