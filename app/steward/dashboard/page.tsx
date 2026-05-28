import { StewardDashboard } from "@/components/steward/steward-dashboard"
import { getSession } from "@/lib/auth-utils"
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

  return <StewardDashboard />
}
