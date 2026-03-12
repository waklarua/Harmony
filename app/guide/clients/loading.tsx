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
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-16 rounded-md" />
          <Skeleton className="h-9 w-16 rounded-md" />
        </div>

        {/* Client Cards */}
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-8 w-24 rounded-md" />
                    <Skeleton className="h-8 w-28 rounded-md" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </GuideLayout>
  )
}
