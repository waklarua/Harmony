"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StewardLayout } from "./steward-layout"
import { Search, CheckCircle, XCircle, Clock, Star, FileText, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockPendingCounselors, mockCounselors } from "@/lib/mock-data"

export function CounselorsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCounselors = mockCounselors.filter(
    (counselor) =>
      counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
              <div className="text-2xl font-bold">156</div>
              <p className="text-sm text-muted-foreground">Total Counselors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{mockPendingCounselors.length}</div>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">847</div>
              <p className="text-sm text-muted-foreground">Sessions This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending" className="gap-2">
              Pending
              {mockPendingCounselors.length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {mockPendingCounselors.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
          </TabsList>

          {/* Pending Tab */}
          <TabsContent value="pending" className="mt-6">
            {mockPendingCounselors.length > 0 ? (
              <div className="space-y-4">
                {mockPendingCounselors.map((counselor) => (
                  <Card key={counselor.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                            <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{counselor.name}</h3>
                            <p className="text-sm text-muted-foreground">{counselor.email}</p>
                            <p className="mt-1 text-sm">{counselor.credentials}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              Submitted {counselor.submittedAt}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-4">
                          <div>
                            <p className="mb-2 text-sm font-medium">Documents Submitted</p>
                            <div className="flex flex-wrap gap-2">
                              {counselor.documents.map((doc) => (
                                <Badge key={doc} variant="outline" className="gap-1">
                                  <FileText className="h-3 w-3" />
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button className="gap-1">
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                            <Button variant="outline" className="gap-1 bg-transparent">
                              <XCircle className="h-4 w-4" />
                              Decline
                            </Button>
                            <Button variant="ghost">Request More Info</Button>
                          </div>
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
                <div className="space-y-4">
                  {filteredCounselors.map((counselor) => (
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
                          <p className="text-sm text-muted-foreground">{counselor.title}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span className="text-sm font-medium">{counselor.rating}</span>
                          <span className="text-sm text-muted-foreground">({counselor.reviewCount})</span>
                        </div>
                        <Badge variant="secondary">{counselor.yearsExperience} years</Badge>
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
                            <DropdownMenuItem>View Documents</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </StewardLayout>
  )
}
