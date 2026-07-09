import { Suspense } from "react"
import { SignupForm } from "@/components/auth/signup-form"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth-utils"

export const metadata = {
  title: "Create Account | Harmony",
  description: "Sign up for Harmony to connect with mental health support",
}

async function SignupPageContent() {
  const session = await getSession()

  if (session?.user) {
    redirect("/")
  }

  return <SignupForm />
}

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFormSkeleton />}>
      <SignupPageContent />
    </Suspense>
  )
}

function SignupFormSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  )
}
