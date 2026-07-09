import { ResourcesPage } from "@/components/seeker/resources-page"
import { getResources } from "@/app/actions/wellness"
import { getSession } from "@/lib/auth-utils"
import { redirect } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function SeekerResourcesPage() {
  const session = await getSession()
  if (!session?.user) {
    redirect("/login")
  }

  const resources = await getResources()

  return <ResourcesPage resources={resources} />
}
