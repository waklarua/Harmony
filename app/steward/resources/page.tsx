import { ResourcesPage } from "@/components/steward/resources-page"
import { getResources } from "@/app/actions/wellness"
import { getSession } from "@/lib/auth-utils"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function StewardResourcesRoute() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== "steward") {
    redirect("/login")
  }

  const resources = await getResources()

  return <ResourcesPage resources={resources} />
}
