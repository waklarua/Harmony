import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { CounselorBrowserSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <SeekerLayout>
      <CounselorBrowserSkeleton />
    </SeekerLayout>
  )
}
