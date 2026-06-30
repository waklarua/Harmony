import { HistoryPage } from "@/components/guide/history-page"
import { getSession } from "@/lib/auth-utils"
import { redirect } from "next/navigation"

export const metadata = {
  title: "History | Harmony",
  description: "View session history and notes for your clients",
}

export default async function GuideHistoryPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== 'guide') {
    redirect("/login")
  }

  return <HistoryPage />
}
