import { LoginForm } from "@/components/auth/login-form"
import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth-utils"

export const metadata = {
  title: "Sign In | Harmony",
  description: "Sign in to your Harmony account",
}

export default async function LoginPage() {
  const session = await getSession()

  if (session?.user) {
    redirect("/seeker/dashboard")
  }

  return <LoginForm />
}
