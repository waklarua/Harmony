"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Heart,
  Home,
  Users,
  UserCheck,
  TicketCheck,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  BarChart3,
} from "lucide-react"
import { mockSteward } from "@/lib/mock-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { SkipLinks } from "@/components/shared/skip-links"

const navigation = [
  { name: "Dashboard", href: "/steward/dashboard", icon: Home },
  { name: "Users", href: "/steward/users", icon: Users },
  { name: "Counselors", href: "/steward/counselors", icon: UserCheck },
  { name: "Support", href: "/steward/support", icon: TicketCheck },
  { name: "Analytics", href: "/steward/analytics", icon: BarChart3 },
]

export function StewardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <SkipLinks
        links={[
          { href: "#main-content", label: "Skip to main content" },
          { href: "#nav-users", label: "Skip to Users" },
        ]}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <Link href="/steward/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="hidden text-xl font-semibold tracking-tight sm:inline">Harmony</span>
              <span className="hidden rounded bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive sm:inline">
                Admin
              </span>
            </Link>
          </div>

          {/* Enhanced desktop Navigation */}
          <nav className="hidden items-center gap-2 rounded-full border border-border/50 bg-background/80 px-3 py-2 shadow-lg shadow-primary/5 backdrop-blur-sm lg:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`gap-2 rounded-full transition-all duration-300 ${
                      !isActive && "hover:scale-105 hover:shadow-md hover:shadow-primary/20"
                    } ${isActive && "shadow-sm"}`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                3
              </span>
              <span className="sr-only">Notifications</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={mockSteward.avatar || "/placeholder.svg"} alt={mockSteward.name} />
                    <AvatarFallback>{mockSteward.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mockSteward.avatar || "/placeholder.svg"} alt={mockSteward.name} />
                    <AvatarFallback>{mockSteward.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{mockSteward.name}</span>
                    <span className="text-xs text-muted-foreground">{mockSteward.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/steward/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/steward/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/" className="flex items-center gap-2 text-destructive">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-border bg-background p-4 lg:hidden">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant={isActive ? "secondary" : "ghost"} className="w-full justify-start gap-2">
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
