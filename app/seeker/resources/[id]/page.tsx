import { ResourceDetail } from "@/components/seeker/resource-detail"
import { getResourceById } from "@/app/actions/wellness"
import { getSession } from "@/lib/auth-utils"
import { redirect, notFound } from "next/navigation"

export const dynamic = 'force-dynamic'

export default async function ResourceDetailPage(props: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session?.user) {
    redirect("/login")
  }

  const { id } = await props.params
  const resource = await getResourceById(id)

  if (!resource) {
    notFound()
  }

  return <ResourceDetail resource={resource} />
}
