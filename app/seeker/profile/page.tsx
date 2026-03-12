import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { ProfilePage } from "@/components/seeker/profile-page"

export const metadata = {
  title: "Profile | Harmony",
  description: "View and edit your profile",
}

export default function Profile() {
  return (
    <SeekerLayout>
      <ProfilePage />
    </SeekerLayout>
  )
}
