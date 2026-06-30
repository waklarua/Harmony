import { EarningsPage } from "@/components/guide/earnings-page"
import { getSession } from "@/lib/auth-utils"
import { getCounselorEarnings } from "@/app/actions/earnings"
import { redirect } from "next/navigation"

export default async function GuideEarningsPage() {
  const session = await getSession()
  if (!session?.user || session.user.role !== 'guide') redirect("/login")

  const data = await getCounselorEarnings(session.user.id)

  return <EarningsPage earningsData={data} />
}
