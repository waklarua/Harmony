"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff, Shield, CheckCircle } from "lucide-react"

export function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialRole = searchParams.get("role") || "seeker"

  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"seeker" | "guide">(initialRole as "seeker" | "guide")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      setStep(2)
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (role === "guide") {
      router.push("/guide/dashboard")
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
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription>
              {step === 1 ? "Tell us a bit about yourself" : "Almost there! Set up your login"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Progress indicator */}
            <div className="mb-6 flex gap-2">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  {/* Role Selection */}
                  <div className="space-y-3">
                    <Label>I am here to...</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setRole("seeker")}
                        className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                          role === "seeker" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Heart className={`h-6 w-6 ${role === "seeker" ? "text-primary" : "text-muted-foreground"}`} />
                        <span className="text-sm font-medium">Find Support</span>
                        <span className="text-xs text-muted-foreground">Connect with counselors</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole("guide")}
                        className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                          role === "guide" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Shield className={`h-6 w-6 ${role === "guide" ? "text-primary" : "text-muted-foreground"}`} />
                        <span className="text-sm font-medium">Provide Support</span>
                        <span className="text-xs text-muted-foreground">I am a counselor</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-background"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Continue
                  </Button>
                </>
              ) : (
                <>
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
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
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
                    <p className="text-xs text-muted-foreground">At least 8 characters</p>
                  </div>

                  {/* Privacy notice */}
                  <div className="rounded-lg border border-border bg-muted/50 p-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <p className="text-xs text-muted-foreground">
                        By creating an account, you agree to our{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                        . Your data is encrypted and protected.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
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
