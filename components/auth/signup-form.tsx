"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Eye, EyeOff, Shield, CheckCircle, AlertCircle, Sparkles } from "lucide-react"
import { authClient } from "@/lib/auth-client"

const SPECIALIZATIONS = [
  "Anxiety",
  "Depression",
  "Stress Management",
  "Trauma/PTSD",
  "Relationships",
  "Grief/Loss",
  "Self-Esteem",
  "Life Transitions",
  "Addiction",
  "Eating Disorders",
]

export function SignupForm() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"seeker" | "guide">("seeker")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [success, setSuccess] = useState(false)

  // Counselor-specific fields
  const [bio, setBio] = useState("")
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([])
  const [yearsOfExperience, setYearsOfExperience] = useState("")
  const [licenseNumber, setLicenseNumber] = useState("")
  const [licenseDocumentUrl, setLicenseDocumentUrl] = useState("")

  const totalSteps = role === "guide" ? 3 : 2

  const toggleSpecialization = (spec: string) => {
    setSelectedSpecializations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec],
    )
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        const dashboard = role === 'guide' ? '/guide/dashboard' : '/seeker/dashboard'
        router.push(dashboard)
        router.refresh()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, role, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      setStep(2)
      return
    }

    if (step === 2 && role === "guide") {
      setStep(3)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      if (role === "guide") {
        const res = await fetch("/api/auth/counselor-signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            name,
            bio: bio || undefined,
            specializations: selectedSpecializations.length > 0 ? selectedSpecializations : undefined,
            yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience, 10) : undefined,
            licenseNumber: licenseNumber || undefined,
            licenseDocumentUrl: licenseDocumentUrl || undefined,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Failed to create account")
        }
      } else {
        const result = await authClient.signUp.email({
          email,
          password,
          name,
        })

        if (result.error) {
          throw new Error(result.error.message || "Failed to create account")
        }
      }

      setSuccess(true)
      setIsLoading(false)
    } catch (err: any) {
      setError(err.message || "Failed to create account. Please try again.")
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <header className="flex h-16 items-center justify-between border-b border-border px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Harmony</span>
          </Link>
        </header>
        <main className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-md border-border">
            <CardHeader className="space-y-1 text-center">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold">Account Created!</CardTitle>
              <CardDescription>
                {role === "guide"
                  ? "Thank you for signing up! Your counselor account is under review. You'll be notified once approved."
                  : "Welcome to Harmony! Your account has been created successfully."}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground">
                Redirecting you shortly...
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    )
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
              {step === 1 && "Tell us a bit about yourself"}
              {step === 2 && (role === "guide" ? "Set up your login" : "Almost there! Set up your login")}
              {step === 3 && "Tell us about your professional background"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Progress indicator */}
            <div className="mb-6 flex gap-2">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
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
              ) : step === 2 ? (
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
                    <Button type="submit" className="flex-1">
                      {role === "guide" ? "Continue" : "Create Account"}
                    </Button>
                  </div>
                </>
              ) : (
                /* Step 3 — Counselor Details (guide only) */
                <>
                  <div className="space-y-2">
                    <Label>Specializations</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {SPECIALIZATIONS.map((spec) => (
                        <label
                          key={spec}
                          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm cursor-pointer transition-colors ${
                            selectedSpecializations.includes(spec)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <Checkbox
                            checked={selectedSpecializations.includes(spec)}
                            onCheckedChange={() => toggleSpecialization(spec)}
                          />
                          {spec}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Brief description of your background and approach..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[80px] resize-none bg-background"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        min={0}
                        placeholder="0"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license">License Number</Label>
                      <Input
                        id="license"
                        type="text"
                        placeholder="e.g. LPC-12345"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseUrl">
                      License Document URL <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Input
                      id="licenseUrl"
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={licenseDocumentUrl}
                      onChange={(e) => setLicenseDocumentUrl(e.target.value)}
                      className="bg-background"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
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