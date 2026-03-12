import { GuideLayout } from "@/components/guide/guide-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { StatsGridSkeleton, EarningsChartSkeleton } from "@/components/skeletons"

export default function Loading() {
  return (
    <GuideLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-5 w-64" />
        </div>

        {/* Stats */}
        <StatsGridSkeleton count={4} />

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          <EarningsChartSkeleton />
          <EarningsChartSkeleton />
        </div>

        {/* Payout History */}
        <Card>
          <CardHeader>
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </GuideLayout>
  )
}
