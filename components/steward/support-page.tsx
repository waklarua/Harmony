"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StewardLayout } from "./steward-layout"
import { Search, MessageSquare, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { mockSupportTickets } from "@/lib/mock-data"

export function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const openTickets = mockSupportTickets.filter((t) => t.status === "open")
  const inProgressTickets = mockSupportTickets.filter((t) => t.status === "in-progress")
  const resolvedTickets = mockSupportTickets.filter((t) => t.status === "resolved")

  const filterTickets = (tickets: typeof mockSupportTickets) => {
    return tickets.filter(
      (ticket) =>
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.userName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-primary" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-accent" />
      default:
        return null
    }
  }

  const TicketCard = ({ ticket }: { ticket: (typeof mockSupportTickets)[0] }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            {getStatusIcon(ticket.status)}
            <div>
              <h3 className="font-medium">{ticket.subject}</h3>
              <p className="text-sm text-muted-foreground">
                {ticket.userName} • {ticket.createdAt}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Last updated: {ticket.lastUpdate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                ticket.priority === "high" ? "destructive" : ticket.priority === "medium" ? "default" : "secondary"
              }
              className="capitalize"
            >
              {ticket.priority}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {ticket.status.replace("-", " ")}
            </Badge>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {ticket.status !== "resolved" && (
            <>
              <Button size="sm">Reply</Button>
              {ticket.status === "open" && (
                <Button variant="outline" size="sm" className="bg-transparent">
                  Assign
                </Button>
              )}
              <Button variant="outline" size="sm" className="bg-transparent">
                Mark Resolved
              </Button>
            </>
          )}
          {ticket.status === "resolved" && (
            <Button variant="outline" size="sm" className="bg-transparent">
              Reopen
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <StewardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Support Tickets</h1>
          <p className="mt-1 text-muted-foreground">Manage user support requests and issues</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div className="text-2xl font-bold">{openTickets.length}</div>
              </div>
              <p className="text-sm text-muted-foreground">Open</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <div className="text-2xl font-bold">{inProgressTickets.length}</div>
              </div>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <div className="text-2xl font-bold">{resolvedTickets.length}</div>
              </div>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div className="text-2xl font-bold">{mockSupportTickets.length}</div>
              </div>
              <p className="text-sm text-muted-foreground">Total Tickets</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="open">
          <TabsList>
            <TabsTrigger value="open" className="gap-2">
              Open
              {openTickets.length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {openTickets.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="gap-2">
              In Progress
              {inProgressTickets.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {inProgressTickets.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="mt-6">
            {filterTickets(openTickets).length > 0 ? (
              <div className="space-y-4">
                {filterTickets(openTickets).map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-medium">No open tickets</h3>
                  <p className="mt-1 text-sm text-muted-foreground">All tickets have been addressed</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="in-progress" className="mt-6">
            {filterTickets(inProgressTickets).length > 0 ? (
              <div className="space-y-4">
                {filterTickets(inProgressTickets).map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Clock className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-medium">No tickets in progress</h3>
                  <p className="mt-1 text-sm text-muted-foreground">No tickets currently being worked on</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="resolved" className="mt-6">
            {filterTickets(resolvedTickets).length > 0 ? (
              <div className="space-y-4">
                {filterTickets(resolvedTickets).map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 font-medium">No resolved tickets</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Resolved tickets will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </StewardLayout>
  )
}
