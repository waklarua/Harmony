"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GuideLayout } from "./guide-layout"
import { Search, Calendar, MessageSquare, FileText, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockClients } from "@/lib/mock-data"
import { EmptyState } from "@/components/shared/empty-state"

export function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const activeClients = mockClients.filter((c) => c.status === "active")
  const newClients = mockClients.filter((c) => c.status === "new")
  const inactiveClients = mockClients.filter((c) => c.status === "inactive")

  const filterClients = (clients: typeof mockClients) => {
    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.notes?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  const ClientCard = ({ client }: { client: (typeof mockClients)[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{client.name}</h3>
                <Badge
                  variant={client.status === "active" ? "default" : client.status === "new" ? "secondary" : "outline"}
                  className="text-xs capitalize"
                >
                  {client.status}
                </Badge>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>{client.totalSessions} sessions</span>
                <span>Last: {client.lastSession}</span>
              </div>
              {client.notes && <p className="mt-2 text-sm text-muted-foreground">{client.notes}</p>}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Send Message
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Calendar className="h-4 w-4" />
                Schedule Session
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <FileText className="h-4 w-4" />
                View Notes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" className="gap-1">
            <Calendar className="h-3 w-3" />
            {client.nextSession ? "Reschedule" : "Schedule"}
          </Button>
          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
            <MessageSquare className="h-3 w-3" />
            Message
          </Button>
          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
            <FileText className="h-3 w-3" />
            Notes
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <GuideLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">My Clients</h1>
          <p className="mt-1 text-muted-foreground">Manage your client relationships and session notes</p>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active" className="gap-2">
              Active
              <Badge variant="secondary" className="ml-1">
                {activeClients.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="new" className="gap-2">
              New
              {newClients.length > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {newClients.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="inactive">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="grid gap-4">
              {filterClients(activeClients).map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
              {filterClients(activeClients).length === 0 && (
                <EmptyState variant={searchQuery ? "no-search-results" : "no-clients"} searchQuery={searchQuery} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-6">
            <div className="grid gap-4">
              {filterClients(newClients).map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
              {filterClients(newClients).length === 0 && (
                <EmptyState variant={searchQuery ? "no-search-results" : "no-new-clients"} searchQuery={searchQuery} />
              )}
            </div>
          </TabsContent>

          <TabsContent value="inactive" className="mt-6">
            <div className="grid gap-4">
              {filterClients(inactiveClients).map((client) => (
                <ClientCard key={client.id} client={client} />
              ))}
              {filterClients(inactiveClients).length === 0 && (
                <EmptyState variant={searchQuery ? "no-search-results" : "no-past-clients"} searchQuery={searchQuery} />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </GuideLayout>
  )
}
