import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { SettingsPage } from "@/components/seeker/settings-page"
import { getSession } from "@/lib/auth-utils"

export const metadata = {
  title: "Settings | Harmony",
  description: "Manage your account settings, privacy, notifications, and preferences",
}

export default async function Settings() {
  const session = await getSession()
  const user = session?.user

  return (
    <SeekerLayout>
      <SettingsPage
        userName={user?.name || "User"}
        userAvatar={user?.image || ""}
        userEmail={user?.email || ""}
      />
    </SeekerLayout>
  )
}
