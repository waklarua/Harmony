import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { SettingsPage } from "@/components/seeker/settings-page"

export const metadata = {
  title: "Settings | Harmony",
  description: "Manage your account security and preferences",
}

export default async function Settings() {
  return (
    <SeekerLayout>
      <SettingsPage />
    </SeekerLayout>
  )
}
