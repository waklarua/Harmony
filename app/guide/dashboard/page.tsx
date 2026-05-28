import { GuideDashboard } from "@/components/guide/guide-dashboard"
import { getSession } from "@/lib/auth-utils"
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

  return <GuideDashboard />
}
