"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MessageCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I sign up for Harmony?",
        answer:
          "Signing up is simple. Click 'Get Started', create your account with your email, and complete a brief questionnaire about what you're looking for. We'll then help match you with counselors who fit your needs.",
      },
      {
        question: "How are counselors verified?",
        answer:
          "All counselors on Harmony are licensed mental health professionals. We verify their credentials, education, and professional standing. Each counselor undergoes a background check and interview process.",
      },
      {
        question: "Can I try Harmony before committing?",
        answer:
          "Yes! We offer a free 15-minute consultation call with a counselor so you can see if it's a good fit before booking a full session.",
      },
    ],
  },
  {
    category: "Sessions & Scheduling",
    questions: [
      {
        question: "How long are sessions?",
        answer:
          "Standard sessions are 50 minutes, similar to traditional in-person therapy. This gives you quality time while allowing counselors to prepare for each client.",
      },
      {
        question: "Can I reschedule or cancel a session?",
        answer:
          "You can reschedule or cancel up to 24 hours before your session at no charge. Cancellations within 24 hours may incur a fee to respect your counselor's time.",
      },
      {
        question: "What if I'm running late?",
        answer:
          "If you're running late, join as soon as you can. Your counselor will wait up to 15 minutes. The session will end at the scheduled time to respect everyone's schedule.",
      },
      {
        question: "Can I choose between video and text sessions?",
        answer:
          "Yes! Depending on your counselor's availability, you can choose video calls, voice calls, or text-based sessions. Many clients mix formats based on their needs that day.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Is my information confidential?",
        answer:
          "Absolutely. All communications are protected by end-to-end encryption and we adhere to strict privacy standards. Your counselor is bound by professional confidentiality requirements.",
      },
      {
        question: "Who can see my session notes?",
        answer:
          "Only you and your counselor can see your session notes. We never share your information with third parties without your explicit consent.",
      },
      {
        question: "Can I delete my data?",
        answer:
          "Yes. You can request deletion of your account and all associated data at any time through your settings or by contacting support.",
      },
    ],
  },
  {
    category: "Payment & Billing",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer:
          "We accept major credit cards, debit cards, Telebirr, CBE Birr, and bank transfers. All payments are securely processed.",
      },
      {
        question: "When am I charged?",
        answer:
          "For monthly plans, you're charged at the start of each billing cycle. For individual sessions, you're charged when you book.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "If you're unsatisfied with your first session, we'll help find a better match or offer a full refund. Contact support within 48 hours of your session.",
      },
    ],
  },
]

export function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground">Find answers to common questions about Harmony.</p>
        </div>

        {/* Search */}
        <div className="relative mt-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* FAQ Categories */}
        <div className="mt-12 space-y-10">
          {filteredCategories.map((category) => (
            <div key={category.category}>
              <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`${category.category}-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">No questions found matching your search.</p>
            <Button variant="outline" className="mt-4 bg-transparent" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 rounded-xl bg-muted/30 p-8 text-center">
          <MessageCircle className="mx-auto h-10 w-10 text-primary" />
          <h3 className="mt-4 text-xl font-semibold">Still have questions?</h3>
          <p className="mt-2 text-muted-foreground">Our support team is here to help.</p>
          <Link href="/contact">
            <Button className="mt-4">Contact Support</Button>
          </Link>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}
