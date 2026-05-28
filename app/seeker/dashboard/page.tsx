import { SeekerDashboard } from "@/components/seeker/seeker-dashboard"
import { getSession } from "@/lib/auth-utils"
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

  return <SeekerDashboard />
}
