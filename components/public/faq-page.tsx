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
          "Visit the Harmony homepage and click 'Get Started'. You'll choose your role — 'Find Support' as a client or 'Provide Support' as a counselor. Fill in your name, email, and password. Counselors additionally provide their license number, professional bio, and specializations. Once submitted, clients get immediate access while counselors are placed under review.",
      },
      {
        question: "How are counselors verified?",
        answer:
          "Every counselor on Harmony is a licensed mental health professional in Ethiopia. We verify their license number and documentation during the signup process. Counselors also provide their years of experience, specializations, and certifications which are reviewed by our team before approval.",
      },
      {
        question: "Do I need to download any software?",
        answer:
          "No. Harmony works entirely in your browser. Video sessions run on Jitsi Meet — no installation required. You just need a supported browser (Chrome, Firefox, Safari, or Edge), a stable internet connection, a camera, and a microphone.",
      },
      {
        question: "Can I use Harmony on my phone?",
        answer:
          "Yes. Harmony is responsive and works on mobile browsers. For the best video experience on mobile, you can also use the Jitsi Meet app available on iOS and Android.",
      },
    ],
  },
  {
    category: "Sessions & Scheduling",
    questions: [
      {
        question: "How do I book a session?",
        answer:
          "Browse counselors from the Find a Counselor page, view their profile and availability, select a date and time slot that works for you, choose between video, voice, or chat session type, make payment via Telebirr or CBE Birr, and enter your payment reference number to confirm the booking.",
      },
      {
        question: "How long are sessions?",
        answer:
          "Sessions are scheduled in 1-hour time slots. The exact duration is agreed upon between you and your counselor during the session.",
      },
      {
        question: "Can I reschedule or cancel a session?",
        answer:
          "You can cancel or reschedule up to 24 hours before the scheduled time with no charge. Cancellations made within 24 hours may be subject to the full session fee. If your counselor cancels, you'll receive a full refund and can book with another counselor.",
      },
      {
        question: "What session types are available?",
        answer:
          "You can choose between video calls, voice-only calls, or text-based chat sessions depending on your comfort level and what your counselor offers. All session types are end-to-end encrypted.",
      },
      {
        question: "What time zone are sessions scheduled in?",
        answer:
          "All session times are displayed in East Africa Time (EAT, UTC+3).",
      },
    ],
  },
  {
    category: "Privacy & Security",
    questions: [
      {
        question: "Is my information confidential?",
        answer:
          "Absolutely. All communications are protected by end-to-end encryption. Only you and your counselor can access session content. Your counselor is bound by professional confidentiality requirements and we never share your personal information with third parties without your explicit consent.",
      },
      {
        question: "Who can see my session notes?",
        answer:
          "Session notes are encrypted before being stored. Only you and your assigned counselor can access them. Harmony staff cannot view your session content or notes.",
      },
      {
        question: "Can I delete my data?",
        answer:
          "Yes. You can request permanent deletion of your account and all associated data by contacting support. You can also request a copy of your data before deletion.",
      },
    ],
  },
  {
    category: "Payment & Billing",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer:
          "Harmony accepts Telebirr (dial *806# or use the app) and CBE Birr. After completing the transfer, enter your payment reference number on the booking page to confirm your session.",
      },
      {
        question: "How much does a session cost?",
        answer:
          "Each counselor sets their own hourly rate, which is displayed on their profile. There are no subscription fees — you only pay per session. The platform charges a 20% commission on each session.",
      },
      {
        question: "When am I charged?",
        answer:
          "Payment is made at the time of booking. Your booking is confirmed once your payment reference number is verified.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "If you cancel more than 24 hours before a session, you're eligible for a full refund. If a counselor cancels on you, you'll receive an automatic refund. Contact support at support@harmonyhealth.et for refund requests, which are processed within 5-7 business days.",
      },
    ],
  },
  {
    category: "For Counselors",
    questions: [
      {
        question: "How do I join as a counselor?",
        answer:
          "Sign up and select 'Provide Support'. Fill in your professional details including your license number (with an optional license document URL), years of experience, specializations, and a professional bio. Our team will review your application and notify you once approved.",
      },
      {
        question: "How much do counselors earn?",
        answer:
          "Counselors earn 80% of their hourly rate per session. The remaining 20% is the platform commission. For example, if your rate is 500 ETB per session, you earn 400 ETB. You can track your total and monthly earnings from your dashboard.",
      },
      {
        question: "How do I set my availability?",
        answer:
          "Go to your Schedule page and set your weekly working hours. For each day of the week, define your start and end times. Clients will see your available slots in 1-hour increments and can book directly.",
      },
      {
        question: "How do I manage my clients?",
        answer:
          "Your Clients page shows all active clients with their session history. You can view session notes, communicate through the platform, and use the waitlist feature to manage demand when fully booked.",
      },
    ],
  },
  {
    category: "Technical Support",
    questions: [
      {
        question: "What browsers are supported?",
        answer:
          "Harmony and Jitsi Meet work on the latest versions of Chrome, Firefox, Safari, and Edge.",
      },
      {
        question: "What internet speed do I need?",
        answer:
          "A stable connection with at least 1 Mbps upload/download speed is recommended for video sessions. For audio-only or chat sessions, slower connections work fine.",
      },
      {
        question: "What if I have technical issues during a session?",
        answer:
          "Try refreshing the page, switching to audio-only mode, or closing other bandwidth-heavy applications. If problems persist, you can reschedule the session.",
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

        <div className="relative mt-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search questions..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

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
