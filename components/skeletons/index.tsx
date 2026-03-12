import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// Counselor card skeleton - matches counselor-browser.tsx card layout
export function CounselorCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Skeleton className="h-16 w-16 flex-shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="mt-3 flex gap-1.5">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <div className="mt-3 space-y-1.5">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 w-28 rounded-md" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Counselor grid skeleton - for the full browser page
export function CounselorGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <CounselorCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Session card skeleton - matches sessions-page.tsx card layout
export function SessionCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Session list skeleton
export function SessionListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SessionCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Stat card skeleton - matches dashboard stat cards
export function StatCardSkeleton() {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

// Stats grid skeleton
export function StatsGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  )
}

// Upcoming session widget skeleton - matches seeker dashboard upcoming session
export function UpcomingSessionSkeleton() {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 rounded-md" />
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Mood tracker widget skeleton
export function MoodTrackerSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-44" />
          </div>
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full flex items-end gap-2 px-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <Skeleton className="w-full rounded-t-sm" style={{ height: `${40 + Math.random() * 100}px` }} />
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Recent sessions widget skeleton
export function RecentSessionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start justify-between rounded-lg border border-border p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-36" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Quick actions widget skeleton
export function QuickActionsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-28" />
      </CardHeader>
      <CardContent className="grid gap-3">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </CardContent>
    </Card>
  )
}

// Resources widget skeleton
export function ResourcesSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-36" />
      </CardHeader>
      <CardContent className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
            <div className="space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
            <Skeleton className="h-4 w-4" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

// Client card skeleton - for guide dashboard
export function ClientCardSkeleton() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-5 w-14 rounded-full" />
    </div>
  )
}

// Clients list skeleton
export function ClientsListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: count }).map((_, i) => (
            <ClientCardSkeleton key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Today's schedule skeleton - for guide dashboard
export function TodaysScheduleSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-52" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-8 w-28 rounded-md" />
                <Skeleton className="h-8 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Earnings chart skeleton
export function EarningsChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-52" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full flex items-end gap-4 px-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <Skeleton className="w-full rounded-t-md" style={{ height: `${80 + i * 30}px` }} />
              <Skeleton className="h-3 w-8" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Full seeker dashboard skeleton
export function SeekerDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-80" />
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          <UpcomingSessionSkeleton />
          <MoodTrackerSkeleton />
          <RecentSessionsSkeleton />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActionsSkeleton />
          <ResourcesSkeleton />
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Skeleton className="h-5 w-5" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

// Full guide dashboard skeleton
export function GuideDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-72" />
          <Skeleton className="h-5 w-56" />
        </div>
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>

      {/* Stats Grid */}
      <StatsGridSkeleton count={4} />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          <TodaysScheduleSkeleton />
          <EarningsChartSkeleton />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <ClientsListSkeleton count={4} />
          <QuickActionsSkeleton />
        </div>
      </div>
    </div>
  )
}

// Counselor browser page skeleton
export function CounselorBrowserSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Skeleton className="h-10 flex-1 rounded-md" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-[180px] rounded-md" />
              <Skeleton className="h-10 w-[150px] rounded-md" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <Skeleton className="h-4 w-32" />

      {/* Counselor Grid */}
      <CounselorGridSkeleton count={6} />
    </div>
  )
}

// Sessions page skeleton
export function SessionsPageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex gap-2">
          <Skeleton className="h-9 w-28 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
        <SessionListSkeleton count={3} />
      </div>
    </div>
  )
}

// Generic DashboardSkeleton alias for journey page loading
export { SeekerDashboardSkeleton as DashboardSkeleton }
