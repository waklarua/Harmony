"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StewardLayout } from "./steward-layout"
import { Search, MoreVertical, UserPlus, Download } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockUsers = [
  {
    id: "u1",
    name: "Alex Thompson",
    email: "alex@example.com",
    avatar: "/person-portrait-neutral.jpg",
    role: "seeker",
    status: "active",
    joined: "Nov 15, 2024",
    sessions: 3,
  },
  {
    id: "u2",
    name: "Morgan Bailey",
    email: "morgan@example.com",
    avatar: "/young-person-portrait.png",
    role: "seeker",
    status: "active",
    joined: "Oct 20, 2024",
    sessions: 8,
  },
  {
    id: "u3",
    name: "Sam Patel",
    email: "sam@example.com",
    avatar: "/professional-portrait.png",
    role: "seeker",
    status: "active",
    joined: "Dec 1, 2024",
    sessions: 2,
  },
  {
    id: "u4",
    name: "Riley Chen",
    email: "riley@example.com",
    avatar: "/casual-portrait.png",
    role: "seeker",
    status: "inactive",
    joined: "Aug 10, 2024",
    sessions: 12,
  },
  {
    id: "u5",
    name: "Casey Smith",
    email: "casey@example.com",
    avatar: "/thoughtful-artist.png",
    role: "seeker",
    status: "active",
    joined: "Dec 18, 2024",
    sessions: 1,
  },
]

export function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <StewardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Users</h1>
            <p className="mt-1 text-muted-foreground">Manage platform users and their accounts</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-sm text-muted-foreground">Active This Month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">156</div>
              <p className="text-sm text-muted-foreground">New This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>All Users</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"} className="capitalize">
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>{user.sessions}</TableCell>
                    <TableCell>
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
                          <DropdownMenuItem>Send Message</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Suspend Account</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </StewardLayout>
  )
}
