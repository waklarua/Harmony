import { getUserAdminProfile } from "@/app/actions/admin"
import { UserProfilePage } from "@/components/steward/user-profile-page"
import { redirect } from "next/navigation"

export default async function StewardUserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  let data
  try {
    data = await getUserAdminProfile(id)
  } catch {
    redirect("/steward/users")
  }

  return <UserProfilePage user={data} />
}
