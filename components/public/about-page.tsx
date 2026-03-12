import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Shield, Globe, ArrowRight } from "lucide-react"

const team = [
  {
    name: "Dr. Yonas Alemayehu",
    role: "Founder & CEO",
    bio: "Clinical psychologist with 15+ years experience. Founded Harmony to make mental health accessible to all Ethiopians.",
  },
  {
    name: "Meron Hailu",
    role: "Head of Clinical Operations",
    bio: "Licensed therapist passionate about quality care. Oversees counselor training and standards.",
  },
  {
    name: "Dawit Bekele",
    role: "Chief Technology Officer",
    bio: "Former Google engineer. Built Harmony's secure platform from the ground up.",
  },
  {
    name: "Sara Tesfaye",
    role: "Head of User Experience",
    bio: "Designs the Harmony experience with empathy and accessibility at the core.",
  },
]

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description: "Every decision we make starts with empathy for those seeking support.",
  },
  {
    icon: Shield,
    title: "Trust & Privacy",
    description: "Your privacy is sacred. We protect your information with the highest standards.",
  },
  {
    icon: Users,
    title: "Accessibility",
    description: "Mental health care should be available to everyone, regardless of location or income.",
  },
  {
    icon: Globe,
    title: "Ethiopian Context",
    description: "Built by Ethiopians, for Ethiopians. We understand our cultural context.",
  },
]

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Making mental health care <span className="text-primary">accessible</span> for every Ethiopian
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Harmony was founded with a simple belief: everyone deserves access to quality mental health support. We're
              building the bridge between those who need help and the professionals who can provide it.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our Mission</h2>
                <p className="mt-4 text-muted-foreground">
                  To break down the barriers to mental health care in Ethiopia—stigma, accessibility, and
                  affordability—by connecting people with licensed counselors through a secure, user-friendly platform.
                </p>
                <p className="mt-4 text-muted-foreground">
                  We believe that seeking help is a sign of strength, not weakness. Our platform provides a safe,
                  confidential space for individuals to receive the support they need, when they need it.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Our Vision</h2>
                <p className="mt-4 text-muted-foreground">
                  A future where mental health care is as accessible and normalized as physical health care. Where every
                  Ethiopian can find support without judgment, regardless of where they live or their financial
                  situation.
                </p>
                <p className="mt-4 text-muted-foreground">
                  We're working toward a society that openly discusses mental health, where seeking help is celebrated,
                  and where quality care is just a click away.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">Our Values</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card key={value.title} className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mt-4 font-semibold">{value.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">Our Leadership</h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
              A dedicated team of mental health professionals, technologists, and advocates.
            </p>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <Card key={member.name} className="border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto h-20 w-20 overflow-hidden rounded-full bg-muted">
                      <img
                        src={`/professional-portrait.png?height=80&width=80&query=professional portrait ${member.name}`}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h3 className="mt-4 font-semibold">{member.name}</h3>
                    <p className="text-sm text-primary">{member.role}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">150+</div>
                <div className="mt-2 text-muted-foreground">Licensed Counselors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">12,000+</div>
                <div className="mt-2 text-muted-foreground">Sessions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">8,000+</div>
                <div className="mt-2 text-muted-foreground">Lives Touched</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">4.8</div>
                <div className="mt-2 text-muted-foreground">Average Rating</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
              Join us in transforming mental health care
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              Whether you're seeking support or you're a counselor looking to make a difference, we'd love to have you
              as part of the Harmony community.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup?role=guide">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  Join as a Counselor
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PageFooter />
    </div>
  )
}
