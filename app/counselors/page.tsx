import { getSession } from "@/lib/auth-utils"
import { redirect } from "next/navigation"

export default async function Page() {
  const session = await getSession()

  if (session?.user) {
    const role = (session.user as { role?: string })?.role || "seeker"
    if (role === "guide") redirect("/guide/dashboard")
    if (role === "steward") redirect("/steward/dashboard")
    redirect("/seeker/dashboard")
  }

  redirect("/login")
}
