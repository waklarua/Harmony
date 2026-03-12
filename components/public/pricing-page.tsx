"use client"

import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircle, HelpCircle } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const plans = [
  {
    name: "Pay Per Session",
    description: "Flexibility when you need it",
    price: 5700,
    period: "per session",
    features: [
      "50-minute video sessions",
      "Chat with your counselor",
      "Secure messaging between sessions",
      "Session notes access",
      "Cancel anytime",
    ],
    popular: false,
  },
  {
    name: "Monthly Plan",
    description: "Our most popular option",
    price: 17100,
    period: "per month",
    features: [
      "4 sessions per month",
      "Priority scheduling",
      "Unlimited messaging",
      "Progress tracking",
      "Wellness resources library",
      "Save 25% vs pay-per-session",
    ],
    popular: true,
  },
  {
    name: "Intensive Support",
    description: "For those who need more",
    price: 28500,
    period: "per month",
    features: [
      "8 sessions per month",
      "Same-day scheduling",
      "Unlimited messaging",
      "Crisis support line access",
      "Personalized care plan",
      "Save 35% vs pay-per-session",
    ],
    popular: false,
  },
]

const pricingFaqs = [
  {
    question: "Can I switch plans anytime?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards, debit cards, Telebirr, CBE Birr, and bank transfers. All payments are processed securely.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "We offer a free 15-minute consultation call with a counselor so you can find the right match before committing.",
  },
  {
    question: "What if I'm not satisfied?",
    answer:
      "Your wellbeing is our priority. If you're not satisfied with your first session, we'll help you find a better match or offer a full refund.",
  },
  {
    question: "Do unused sessions roll over?",
    answer:
      "Sessions from monthly plans do not roll over. We encourage regular sessions for the best therapeutic outcomes.",
  },
]

export function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, Transparent Pricing</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Quality mental health care should be accessible. Choose what works for you.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border-border bg-card ${plan.popular ? "ring-2 ring-primary" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{formatCurrency(plan.price)}</span>
                  <span className="text-muted-foreground">/{plan.period.split(" ")[1]}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" className="block mt-6">
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight">Pricing FAQs</h2>
          </div>

          <div className="mx-auto mt-8 max-w-2xl">
            <Accordion type="single" collapsible className="w-full">
              {pricingFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}
