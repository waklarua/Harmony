"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff, Shield } from "lucide-react"

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication - in production, this would call your auth API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Route based on demo email patterns
    if (email.includes("guide") || email.includes("counselor")) {
      router.push("/guide/dashboard")
    } else if (email.includes("admin") || email.includes("steward")) {
      router.push("/steward/dashboard")
    } else {
      router.push("/seeker/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-border px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Harmony</span>
        </Link>
      </header>

      {/* Form */}
      <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-md border-border">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Sign in to continue your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-muted-foreground hover:text-primary">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              New to Harmony?{" "}
              <Link href="/signup" className="text-primary hover:underline">
                Create an account
              </Link>
            </div>

            {/* Demo accounts hint */}
            <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4">
              <p className="text-xs text-muted-foreground">
                <strong>Demo:</strong> Use any email. Include &quot;guide&quot; for counselor view, &quot;steward&quot;
                for admin view, or any other email for seeker view.
              </p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" />
          <span>Your data is protected with end-to-end encryption</span>
        </div>
      </footer>
    </div>
  )
}
