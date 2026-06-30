import { GuideProfilePage } from "@/components/guide/profile-page"
import { getSession } from "@/lib/auth-utils"
import { getFullGuideProfile } from "@/app/actions/user"
import { redirect } from "next/navigation"

export const metadata = {
  title: "Profile | Harmony",
  description: "Manage your counselor profile",
}

export default async function Profile() {
  const session = await getSession()
  if (!session?.user || session.user.role !== 'guide') redirect("/login")

  const profile = await getFullGuideProfile()

  return <GuideProfilePage profile={profile} />
}
