import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth-utils'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Reset Password | Harmony',
  description: 'Reset your Harmony account password',
}

export default async function ForgotPasswordPage() {
  const session = await getSession()

  if (session?.user) {
    redirect('/seeker/dashboard')
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

      {/* Content */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-border bg-card p-8">
            <h1 className="text-2xl font-bold">Reset your password</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Password reset functionality is coming soon. Please contact support for assistance.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="/login"
                className="flex-1 rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Back to Login
              </Link>
              <Link
                href="/signup"
                className="flex-1 rounded-lg border border-border px-4 py-2 text-center text-sm font-medium hover:bg-muted"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
