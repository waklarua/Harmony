import { AssessmentForm } from "@/components/seeker/assessment-form"
import { getSession } from "@/lib/auth-utils"
import { getAssessmentHistory } from "@/app/actions/assessment"
import { redirect } from "next/navigation"

export const metadata = {
  title: "PHQ-9 Assessment | Harmony",
  description: "Depression screening questionnaire",
}

export default async function AssessmentPage() {
  const session = await getSession()

  if (!session?.user) {
    redirect("/login")
  }

  if (session.user.role !== "seeker") {
    redirect("/login")
  }

  const history = await getAssessmentHistory()

  return <AssessmentForm history={history} />
}
