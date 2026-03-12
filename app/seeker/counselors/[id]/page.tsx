import { CounselorProfile } from "@/components/seeker/counselor-profile"

export default async function CounselorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <CounselorProfile counselorId={id} />
}
