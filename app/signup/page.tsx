import { Suspense } from "react"
import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupFormSkeleton />}>
      <SignupForm />
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
