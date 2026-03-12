import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { SessionsPageSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <SeekerLayout>
      <SessionsPageSkeleton />
    </SeekerLayout>
  )
}
