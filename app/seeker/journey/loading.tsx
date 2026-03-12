import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { DashboardSkeleton } from "@/components/skeletons"

export default function JourneyLoading() {
  return (
    <SeekerLayout>
      <DashboardSkeleton />
    </SeekerLayout>
  )
}
