import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { SettingsPage } from "@/components/seeker/settings-page"

export const metadata = {
  title: "Settings | Harmony",
  description: "Manage your account settings, privacy, notifications, and preferences",
}

export default function Settings() {
  return (
    <SeekerLayout>
      <SettingsPage />
    </SeekerLayout>
  )
}
