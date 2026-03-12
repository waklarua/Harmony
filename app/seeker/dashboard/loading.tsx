import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { SeekerDashboardSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <SeekerLayout>
      <SeekerDashboardSkeleton />
    </SeekerLayout>
  )
}
