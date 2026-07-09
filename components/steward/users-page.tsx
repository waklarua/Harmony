"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StewardLayout } from "./steward-layout"
import { Search, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface UserData {
  id: string
  name: string
  email: string
  avatar: string | null
  role: string
  status: string
  joined: string
  sessions: number
  banned: boolean
}

interface UsersPageProps {
  users: UserData[]
}

export function UsersPage({ users }: UsersPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [suspendTarget, setSuspendTarget] = useState<UserData | null>(null)

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const totalUsers = users.length
  const counselorCount = users.filter((u) => u.role === 'guide').length
  const clientCount = users.filter((u) => u.role === 'seeker').length

  const handleSuspend = useCallback(async (userId: string) => {
    const { suspendUser } = await import('@/app/actions/admin')
    try {
      await suspendUser(userId)
      toast.success('Account suspended')
      window.location.reload()
    } catch {
      toast.error('Failed to suspend account')
    }
  }, [])

  const handleUnsuspend = useCallback(async (userId: string) => {
    const { unsuspendUser } = await import('@/app/actions/admin')
    try {
      await unsuspendUser(userId)
      toast.success('Account unsuspended')
      window.location.reload()
    } catch {
      toast.error('Failed to unsuspend account')
    }
  }, [])

  return (
    <StewardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Users</h1>
            <p className="mt-1 text-muted-foreground">Manage platform users and their accounts</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{counselorCount.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Counselors</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{clientCount.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Client</p>
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
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Sessions</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={u.avatar || "/placeholder.svg"} alt={u.name} />
                          <AvatarFallback>{u.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-sm text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {u.role === 'guide' ? 'Counselor' : u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={u.banned ? "destructive" : u.status === "active" ? "default" : "secondary"} className="capitalize">
                        {u.banned ? 'Banned' : u.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{u.joined}</TableCell>
                    <TableCell>{u.sessions}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/steward/users/${u.id}`}>View Profile</Link>
                          </DropdownMenuItem>
                          {u.banned ? (
                            <DropdownMenuItem onClick={() => handleUnsuspend(u.id)}>
                              Unsuspend Account
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => setSuspendTarget(u)}
                            >
                              Suspend Account
                            </DropdownMenuItem>
                          )}
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

      <Dialog open={!!suspendTarget} onOpenChange={(open) => !open && setSuspendTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to suspend {suspendTarget?.name}? They will be unable to log in until unsuspended.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSuspendTarget(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (suspendTarget) {
                  handleSuspend(suspendTarget.id)
                  setSuspendTarget(null)
                }
              }}
            >
              Suspend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </StewardLayout>
  )
}
