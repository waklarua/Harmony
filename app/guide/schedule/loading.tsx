import { GuideLayout } from "@/components/guide/guide-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <GuideLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-44" />
            <Skeleton className="h-5 w-72" />
          </div>
          <Skeleton className="h-10 w-40 rounded-md" />
        </div>

        {/* Calendar Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days header */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {Array.from({ length: 7 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full rounded-md" />
              ))}
            </div>
            {/* Time slots */}
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="grid grid-cols-8 gap-2">
                  <Skeleton className="h-12 w-full rounded-md" />
                  {Array.from({ length: 7 }).map((_, j) => (
                    <Skeleton key={j} className="h-12 w-full rounded-md" />
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </GuideLayout>
  )
}
