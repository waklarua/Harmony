import { CounselorProfile } from "@/components/seeker/counselor-profile"
import { getCounselorById } from "@/app/actions/dashboard"
import { redirect } from "next/navigation"

export default async function CounselorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const counselor = await getCounselorById(id)

  if (!counselor) {
    redirect("/seeker/counselors")
  }

  return <CounselorProfile counselor={counselor} />
}
