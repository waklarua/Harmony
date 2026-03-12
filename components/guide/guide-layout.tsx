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
import { Heart, Home, Users, Calendar, Settings, LogOut, Menu, X, Bell, User, TrendingUp, ChevronLeft, MessageSquare } from "lucide-react"
import { mockGuide } from "@/lib/mock-data"
import { ThemeToggle } from "@/components/theme-toggle"
import { SkipLinks } from "@/components/shared/skip-links"

const navigation = [
  { name: "Dashboard", href: "/guide/dashboard", icon: Home },
  { name: "My Clients", href: "/guide/clients", icon: Users },
  { name: "Messages", href: "/guide/messages", icon: MessageSquare },
  { name: "Schedule", href: "/guide/schedule", icon: Calendar },
  { name: "Earnings", href: "/guide/earnings", icon: TrendingUp },
  { name: "Settings", href: "/guide/settings", icon: Settings },
]

export function GuideLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <SkipLinks
        links={[
          { href: "#main-content", label: "Skip to main content" },
          { href: "/guide/clients", label: "Skip to My Clients" },
        ]}
      />

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-screen bg-background/50 border-r border-border overflow-y-auto transition-all duration-300 z-50 lg:sticky lg:z-auto flex flex-col ${
            sidebarOpen ? "w-64 lg:w-64" : "w-0 lg:w-20"
          }`}
        >
          <div className="p-4 flex flex-col h-full">
            {/* Header with Toggle */}
            <div className="flex items-center justify-between mb-8">
              {sidebarOpen && (
                <Link href="/guide/dashboard" className="flex items-center gap-2 flex-1">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary flex-shrink-0">
                    <Heart className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="hidden lg:block">
                    <span className="text-xl font-semibold tracking-tight block">Harmony</span>
                    <span className="text-xs font-medium text-muted-foreground">Guide</span>
                  </div>
                </Link>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex items-center justify-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle sidebar"
              >
                <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${sidebarOpen ? "" : "rotate-180"}`} />
              </button>
            </div>

            {/* Main Navigation */}
            <nav className="space-y-2 flex-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start gap-3 rounded-lg transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                      }`}
                      title={!sidebarOpen ? item.name : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                    </Button>
                  </Link>
                )
              })}
            </nav>

            {/* Logout */}
            <div className="border-t border-border pt-4 mt-auto">
              <Link href="/">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-destructive transition-colors"
                  title={!sidebarOpen ? "Logout" : undefined}
                >
                  <LogOut className="h-4 w-4 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
                </Button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-4 sm:px-6">
              <div className="flex items-center gap-4">
                {/* Mobile sidebar toggle */}
                <button
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  aria-label="Toggle sidebar"
                >
                  {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                <Link href="/guide/dashboard" className="flex lg:hidden items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Heart className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <span className="text-xl font-semibold tracking-tight block">Harmony</span>
                    <span className="text-xs font-medium text-muted-foreground">Guide</span>
                  </div>
                </Link>
              </div>

              <ThemeToggle />

              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
                <span className="sr-only">Notifications</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={mockGuide.avatar || "/placeholder.svg"} alt={mockGuide.name} />
                      <AvatarFallback>{mockGuide.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={mockGuide.avatar || "/placeholder.svg"} alt={mockGuide.name} />
                      <AvatarFallback>{mockGuide.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{mockGuide.name}</span>
                      <span className="text-xs text-muted-foreground">{mockGuide.email}</span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
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
          </header>



          {/* Main Content */}
          <main id="main-content" className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
