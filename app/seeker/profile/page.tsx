import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { ProfilePage } from "@/components/seeker/profile-page"
import { getProfileData } from "@/app/actions/profile"

export const metadata = {
  title: "Profile | Harmony",
  description: "View and edit your profile",
}

export default async function Profile() {
  let data
  try {
    data = await getProfileData()
  } catch {
    return (
      <SeekerLayout>
        <ProfilePage />
      </SeekerLayout>
    )
  }

  return (
    <SeekerLayout>
      <ProfilePage
        userName={data.user.name}
        userAvatar={data.user.avatar}
        joinedAt={data.user.joinedAt}
        completedSessionsCount={data.completedSessionsCount}
        upcomingSessions={data.upcomingSessions}
        pastSessions={data.pastSessions}
      />
    </SeekerLayout>
  )
}
