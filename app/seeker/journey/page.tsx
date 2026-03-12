import { SeekerLayout } from "@/components/seeker/seeker-layout"
import { JourneyProgress } from "@/components/seeker/journey-progress"

export default function JourneyPage() {
  return (
    <SeekerLayout>
      <JourneyProgress variant="full" />
    </SeekerLayout>
  )
}
