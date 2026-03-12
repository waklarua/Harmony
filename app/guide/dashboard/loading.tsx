import { GuideLayout } from "@/components/guide/guide-layout"
import { GuideDashboardSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <GuideLayout>
      <GuideDashboardSkeleton />
    </GuideLayout>
  )
}
