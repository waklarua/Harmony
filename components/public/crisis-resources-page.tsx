import Link from "next/link"
import { Phone, MapPin, Clock, AlertTriangle, Heart, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"

const emergencyContacts = [
  {
    name: "National Health Hotline",
    phone: "952",
    description: "24/7 emergency health support line available nationwide",
    available: "24 hours, 7 days a week",
  },
  {
    name: "Amanuel Mental Specialized Hospital",
    phone: "+251-11-1-27-51-22",
    description: "Ethiopia's leading mental health facility with emergency services",
    available: "24 hours emergency services",
    address: "Addis Ababa, Ethiopia",
  },
  {
    name: "St. Paul's Hospital Millennium Medical College",
    phone: "+251-11-551-9222",
    description: "Major hospital with mental health emergency department",
    available: "24 hours emergency services",
    address: "Addis Ababa, Ethiopia",
  },
  {
    name: "Ethiopian Red Cross Society",
    phone: "+251-11-551-7440",
    description: "Humanitarian emergency support and crisis intervention",
    available: "24 hours",
    address: "Multiple locations across Ethiopia",
  },
  {
    name: "Abrhot Specialized Psychotherapy Center",
    phone: "+251-11-618-2828",
    description: "Specialized mental health crisis support and counseling",
    available: "24 hours emergency services",
    address: "Addis Ababa, Ethiopia",
  },
]

const selfCareSteps = [
  {
    title: "Ground yourself",
    description: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
  },
  {
    title: "Breathe slowly",
    description: "Inhale for 4 counts, hold for 4 counts, exhale for 4 counts. Repeat until you feel calmer.",
  },
  {
    title: "Reach out",
    description: "Call a trusted friend, family member, or one of the crisis lines listed above.",
  },
  {
    title: "Move to safety",
    description:
      "If you have access to anything you could use to harm yourself, move away from it or give it to someone.",
  },
  {
    title: "Stay present",
    description: "Focus on getting through the next 5 minutes. Then the next 5. One step at a time.",
  },
]

export function CrisisResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main id="main-content" className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Warning banner */}
        <div className="mb-8 rounded-lg border border-destructive bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-6 w-6 shrink-0 text-destructive" />
            <div>
              <h1 className="text-lg font-semibold text-destructive">If you are in immediate danger</h1>
              <p className="mt-1 text-sm text-foreground">
                Please call emergency services at <strong>911</strong> or go to your nearest hospital emergency room
                immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Reassurance message */}
        <div className="mb-8 rounded-lg border border-primary/20 bg-primary/5 p-6 text-center">
          <Heart className="mx-auto h-8 w-8 text-primary" />
          <h2 className="mt-3 text-xl font-semibold">You are not alone</h2>
          <p className="mt-2 text-muted-foreground">
            Whatever you&apos;re going through right now, help is available. Reaching out takes courage, and we&apos;re
            glad you&apos;re here.
          </p>
        </div>

        {/* Emergency contacts */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Ethiopian Crisis Resources</h2>
          <p className="mb-6 text-muted-foreground">
            These services provide immediate support. All calls are confidential.
          </p>
          <div className="space-y-4">
            {emergencyContacts.map((contact) => (
              <Card key={contact.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{contact.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 font-semibold text-primary hover:underline"
                    >
                      <Phone className="h-4 w-4" />
                      {contact.phone}
                    </a>
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {contact.available}
                    </span>
                  </div>
                  {contact.address && (
                    <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {contact.address}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Self-care steps */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">If You&apos;re Feeling Overwhelmed Right Now</h2>
          <p className="mb-6 text-muted-foreground">Try these steps while you wait for help or to calm yourself:</p>
          <div className="space-y-4">
            {selfCareSteps.map((step, index) => (
              <div key={step.title} className="flex gap-4 rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Non-emergency support */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Not in Crisis but Need Support?</h2>
          <Card>
            <CardContent className="p-6">
              <p className="mb-4 text-muted-foreground">
                If you&apos;re not in immediate danger but want to talk to a professional, our counselors are here to
                help.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/counselors">Find a Counselor</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/seeker/dashboard">Go to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Important note */}
        <div className="rounded-lg border border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
          <p>
            <strong>Note:</strong> Harmony is not a crisis service. If you are in immediate danger, please contact
            emergency services or one of the crisis resources listed above.
          </p>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}
