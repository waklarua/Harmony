import { CounselorBrowser } from "@/components/seeker/counselor-browser"
import { getCounselors } from "@/app/actions/dashboard"

export default async function CounselorsPage() {
  const counselors = await getCounselors()

  return <CounselorBrowser counselors={counselors} />
}
