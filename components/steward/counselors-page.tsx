"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StewardLayout } from "./steward-layout"
import { Search, CheckCircle, XCircle, Clock, ExternalLink, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { approveCounselor, rejectCounselor } from "@/app/actions/admin"
import type { PendingCounselorData, ApprovedCounselorData } from "@/app/actions/admin"

interface CounselorsPageProps {
  pendingCounselors: PendingCounselorData[]
  approvedCounselors: ApprovedCounselorData[]
}

export function CounselorsPage({ pendingCounselors, approvedCounselors }: CounselorsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isPending, startTransition] = useTransition()
  const [localPending, setLocalPending] = useState(pendingCounselors)
  const [localApproved, setLocalApproved] = useState(approvedCounselors)

  const filteredApproved = localApproved.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specializations?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleApprove = (userId: string) => {
    startTransition(async () => {
      await approveCounselor(userId)
      setLocalPending((prev) => prev.filter((c) => c.userId !== userId))
    })
  }

  const handleReject = (userId: string) => {
    startTransition(async () => {
      await rejectCounselor(userId)
      setLocalPending((prev) => prev.filter((c) => c.userId !== userId))
    })
  }

  return (
    <StewardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Counselors</h1>
          <p className="mt-1 text-muted-foreground">Manage counselor applications and verified professionals</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{localApproved.length + localPending.length}</div>
              <p className="text-sm text-muted-foreground">Total Counselors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{localPending.length}</div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{localApproved.length}</div>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{localPending.length > 0 ? "!" : "0"}</div>
              <p className="text-sm text-muted-foreground">Needs Review</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              Pending
              {localPending.length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {localPending.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
          </TabsList>

          {/* Pending Tab */}
          <TabsContent value="pending" className="mt-6">
            {localPending.length > 0 ? (
              <div className="space-y-4">
                {localPending.map((counselor) => (
                  <Card key={counselor.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                            <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-2">
                            <div>
                              <h3 className="font-semibold">{counselor.name}</h3>
                              <p className="text-sm text-muted-foreground">{counselor.email}</p>
                            </div>

                            {counselor.specializations.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {counselor.specializations.map((s) => (
                                  <Badge key={s} variant="secondary" className="text-xs">
                                    {s}
                                  </Badge>
                                ))}
                              </div>
                            )}

                            {counselor.bio && (
                              <p className="text-sm text-muted-foreground line-clamp-2">{counselor.bio}</p>
                            )}

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                              {counselor.yearsOfExperience != null && (
                                <span>{counselor.yearsOfExperience} years of experience</span>
                              )}
                              {counselor.licenseNumber && (
                                <span>License: {counselor.licenseNumber}</span>
                              )}
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Submitted {counselor.submittedAt}
                              </span>
                            </div>

                            {counselor.licenseDocumentUrl && (
                              <a
                                href={counselor.licenseDocumentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" />
                                View License Document
                              </a>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="gap-1"
                            onClick={() => handleApprove(counselor.userId)}
                            disabled={isPending}
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            className="gap-1 bg-transparent"
                            onClick={() => handleReject(counselor.userId)}
                            disabled={isPending}
                          >
                            <XCircle className="h-4 w-4" />
                            Decline
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-medium">All caught up!</h3>
                  <p className="mt-1 text-sm text-muted-foreground">No pending applications to review</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Verified Tab */}
          <TabsContent value="verified" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <CardTitle>Verified Counselors</CardTitle>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search counselors..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredApproved.length > 0 ? (
                  <div className="space-y-4">
                    {filteredApproved.map((counselor) => (
                      <div
                        key={counselor.id}
                        className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                            <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{counselor.name}</p>
                              <CheckCircle className="h-4 w-4 text-primary" />
                            </div>
                            <p className="text-sm text-muted-foreground">{counselor.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {counselor.specializations.length > 0 && (
                            <div className="hidden md:flex flex-wrap gap-1 max-w-[200px]">
                              {counselor.specializations.slice(0, 3).map((s) => (
                                <Badge key={s} variant="secondary" className="text-xs">
                                  {s}
                                </Badge>
                              ))}
                              {counselor.specializations.length > 3 && (
                                <span className="text-xs text-muted-foreground">+{counselor.specializations.length - 3}</span>
                              )}
                            </div>
                          )}
                          {counselor.yearsOfExperience != null && (
                            <Badge variant="outline">{counselor.yearsOfExperience} yrs</Badge>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>View Sessions</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">
                      {searchQuery ? "No counselors match your search" : "No verified counselors yet"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StewardLayout>
  )
}