import type React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"
import { Shield, Lock, Eye, Database, FileText, Scale } from "lucide-react"

function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>
        <div className="prose prose-neutral dark:prose-invert max-w-none">{children}</div>
      </main>
      <PageFooter />
    </div>
  )
}

export function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="December 2024">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Information We Collect
          </h2>
          <p className="mt-4 text-muted-foreground">
            We collect information you provide directly to us, such as when you create an account, book a session, or
            contact us for support. This includes:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Name, email address, and phone number</li>
            <li>• Profile information and preferences</li>
            <li>• Session history and notes (encrypted)</li>
            <li>• Payment information (processed securely by our payment partners)</li>
            <li>• Communications with counselors and support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            How We Use Your Information
          </h2>
          <p className="mt-4 text-muted-foreground">We use the information we collect to:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Provide, maintain, and improve our services</li>
            <li>• Match you with appropriate counselors</li>
            <li>• Process payments and send related information</li>
            <li>• Send you technical notices and support messages</li>
            <li>• Respond to your comments and questions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Information Security
          </h2>
          <p className="mt-4 text-muted-foreground">
            We take the security of your information seriously. All communications between you and your counselor are
            protected with end-to-end encryption. We use industry-standard security measures to protect your personal
            information from unauthorized access, disclosure, alteration, and destruction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Your Rights
          </h2>
          <p className="mt-4 text-muted-foreground">You have the right to:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Access your personal information</li>
            <li>• Correct inaccurate information</li>
            <li>• Delete your account and data</li>
            <li>• Export your data</li>
            <li>• Opt out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="mt-4 text-muted-foreground">
            If you have questions about this Privacy Policy, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}

export function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="December 2024">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Acceptance of Terms
          </h2>
          <p className="mt-4 text-muted-foreground">
            By accessing or using Harmony, you agree to be bound by these Terms of Service. If you do not agree to these
            terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Use of Services</h2>
          <p className="mt-4 text-muted-foreground">
            Harmony provides a platform connecting individuals seeking mental health support with licensed counselors.
            Our services include:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Access to our counselor matching platform</li>
            <li>• Secure video, voice, and text-based sessions</li>
            <li>• Scheduling and session management tools</li>
            <li>• Progress tracking features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">User Responsibilities</h2>
          <p className="mt-4 text-muted-foreground">As a user, you agree to:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Provide accurate and complete information</li>
            <li>• Maintain the confidentiality of your account</li>
            <li>• Not share session access with others</li>
            <li>• Treat counselors and staff with respect</li>
            <li>• Not use the platform for illegal purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Counselor Services</h2>
          <p className="mt-4 text-muted-foreground">
            All counselors on Harmony are licensed mental health professionals. However, our services do not replace
            emergency mental health care. If you are in crisis, please contact emergency services immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Limitation of Liability
          </h2>
          <p className="mt-4 text-muted-foreground">
            Harmony provides a platform for connecting users with counselors but is not responsible for the advice or
            services provided by individual counselors. We make no guarantees about specific outcomes from using our
            services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Changes to Terms</h2>
          <p className="mt-4 text-muted-foreground">
            We may update these Terms of Service from time to time. We will notify you of significant changes by email
            or through the platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="mt-4 text-muted-foreground">
            If you have questions about these Terms of Service, please{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}

export function SecurityPage() {
  return (
    <LegalLayout title="Security" lastUpdated="December 2024">
      <div className="space-y-8">
        <section>
          <p className="text-lg text-muted-foreground">
            Your security is our priority. We've built Harmony with industry-leading security measures to protect your
            most sensitive information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            End-to-End Encryption
          </h2>
          <p className="mt-4 text-muted-foreground">
            All communications between you and your counselor—video calls, voice calls, and messages—are protected with
            end-to-end encryption. This means only you and your counselor can access the content of your sessions. Not
            even Harmony staff can read your messages or view your sessions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Protection
          </h2>
          <p className="mt-4 text-muted-foreground">We employ multiple layers of security to protect your data:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• AES-256 encryption for data at rest</li>
            <li>• TLS 1.3 for data in transit</li>
            <li>• Regular security audits and penetration testing</li>
            <li>• Secure data centers with physical security controls</li>
            <li>• Strict access controls and authentication</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Account Security
          </h2>
          <p className="mt-4 text-muted-foreground">We provide tools to help you secure your account:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Two-factor authentication (2FA)</li>
            <li>• Secure password requirements</li>
            <li>• Session management and device tracking</li>
            <li>• Automatic session timeouts</li>
            <li>• Login notifications for new devices</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Counselor Verification</h2>
          <p className="mt-4 text-muted-foreground">
            Every counselor on Harmony undergoes a thorough verification process:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• License verification with relevant authorities</li>
            <li>• Background checks</li>
            <li>• Identity verification</li>
            <li>• Ongoing credential monitoring</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Reporting Security Issues</h2>
          <p className="mt-4 text-muted-foreground">
            If you discover a security vulnerability, please report it to us immediately at{" "}
            <span className="text-primary">security@harmonyhealth.et</span>. We take all reports seriously and will
            respond promptly.
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}
