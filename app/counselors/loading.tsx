import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"
import { CounselorBrowserSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageHeader />
      <main id="main-content" className="flex-1 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <CounselorBrowserSkeleton />
      </main>
      <PageFooter />
    </div>
  )
}
