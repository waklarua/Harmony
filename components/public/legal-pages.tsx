import type React from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"
import { Shield, Lock, Eye, Database, FileText, Scale, Heart, Mail, Phone, MapPin } from "lucide-react"

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
    <LegalLayout title="Privacy Policy" lastUpdated="July 2026">
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
            <li>• Profile information and counseling preferences</li>
            <li>• Session history and session notes (encrypted before storage)</li>
            <li>• Payment transaction records (processed via Telebirr or CBE Birr)</li>
            <li>• Communications with counselors and support team</li>
            <li>• Counselor credentials (license information, certifications, professional bio)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            How We Use Your Information
          </h2>
          <p className="mt-4 text-muted-foreground">We use the information we collect to:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Provide, maintain, and improve our counseling platform</li>
            <li>• Match clients with appropriate counselors based on their needs</li>
            <li>• Process payments and send booking confirmations</li>
            <li>• Send technical notices, updates, and support messages</li>
            <li>• Respond to your comments, questions, and refund requests</li>
            <li>• Verify counselor credentials and professional licenses</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Information Security
          </h2>
          <p className="mt-4 text-muted-foreground">
            All communications between you and your counselor — including video calls, voice calls, messages, and session
            notes — are protected with end-to-end encryption. Session notes are encrypted before being stored in our
            database. We use industry-standard security measures to protect your personal information from unauthorized
            access, disclosure, alteration, and destruction.
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
            <li>• Correct inaccurate information through your profile settings</li>
            <li>• Request deletion of your account and all associated data</li>
            <li>• Request a copy of your data for export</li>
            <li>• Withdraw consent for data processing (subject to legal obligations)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Data Sharing
          </h2>
          <p className="mt-4 text-muted-foreground">
            We never share your personal information or session data with third parties without your explicit consent,
            except as required by Ethiopian law. Your session content is only accessible to you and your assigned
            counselor.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Contact Us
          </h2>
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
    <LegalLayout title="Terms of Service" lastUpdated="July 2026">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Acceptance of Terms
          </h2>
          <p className="mt-4 text-muted-foreground">
            By accessing or using Harmony (accessible at v0-harmony-h3.vercel.app), you agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Description of Services</h2>
          <p className="mt-4 text-muted-foreground">
            Harmony provides a platform connecting individuals seeking mental health support with licensed counselors in
            Ethiopia. Our services include:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Access to a network of verified, licensed counselors</li>
            <li>• Secure video, voice, and text-based counseling sessions via Jitsi Meet</li>
            <li>• Scheduling and session management tools</li>
            <li>• Encrypted session notes and progress tracking</li>
            <li>• Counselor discovery with search and filtering by specialty</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">User Responsibilities</h2>
          <p className="mt-4 text-muted-foreground">As a user, you agree to:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Provide accurate and complete information during registration</li>
            <li>• Maintain the confidentiality of your account credentials</li>
            <li>• Not share session access links with others</li>
            <li>• Treat counselors and support staff with respect</li>
            <li>• Not use the platform for illegal purposes or to harm others</li>
            <li>• Comply with session cancellation and rescheduling policies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Counselor Representations</h2>
          <p className="mt-4 text-muted-foreground">
            All counselors on Harmony represent that they are licensed mental health professionals in Ethiopia. Counselors
            agree to maintain accurate credential information, conduct sessions professionally, and maintain client
            confidentiality in accordance with professional ethics and Ethiopian law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Payments and Fees</h2>
          <p className="mt-4 text-muted-foreground">
            Clients pay the counselor's listed hourly rate per session. Payments are processed via Telebirr or CBE Birr
            at the time of booking. Counselors earn 80% of the session fee, with the remaining 20% retained as a
            platform commission. All prices are displayed in Ethiopian Birr (ETB).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Medical Disclaimer</h2>
          <p className="mt-4 text-muted-foreground">
            Harmony provides access to counseling services but does not replace emergency mental health care. If you are
            in crisis or experiencing a medical emergency, please contact emergency services immediately or reach out to
            a crisis helpline. Harmony is not responsible for the specific advice or services provided by individual
            counselors.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Scale className="h-5 w-5 text-primary" />
            Limitation of Liability
          </h2>
          <p className="mt-4 text-muted-foreground">
            Harmony provides a platform for connecting users with counselors but is not liable for the advice, services,
            or conduct of individual counselors. We make no guarantees about specific outcomes from using our services.
            Our liability is limited to the amount paid for the specific session giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Changes to Terms</h2>
          <p className="mt-4 text-muted-foreground">
            We may update these Terms of Service from time to time. Continued use of the platform after changes
            constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Governing Law</h2>
          <p className="mt-4 text-muted-foreground">
            These terms are governed by the laws of the Federal Democratic Republic of Ethiopia.
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
    <LegalLayout title="Security" lastUpdated="July 2026">
      <div className="space-y-8">
        <section>
          <p className="text-lg text-muted-foreground">
            Your security is our priority. Harmony is built with industry-leading security measures to protect your
            most sensitive mental health information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            End-to-End Encryption
          </h2>
          <p className="mt-4 text-muted-foreground">
            All communications between you and your counselor — video calls (via Jitsi Meet), voice calls, text
            messages, and session notes — are protected with end-to-end encryption. Only you and your counselor can
            access the content of your sessions. Not even Harmony staff can read your messages or view your sessions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Data Protection
          </h2>
          <p className="mt-4 text-muted-foreground">We employ multiple layers of security to protect your data:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Encryption for data at rest using industry-standard algorithms</li>
            <li>• TLS encryption for all data in transit</li>
            <li>• Session notes encrypted before storage</li>
            <li>• Strict access controls — only you and your counselor can view session content</li>
            <li>• Secure authentication powered by Better Auth</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Account Security
          </h2>
          <p className="mt-4 text-muted-foreground">We provide tools to help you secure your account:</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• Strong password requirements (minimum 8 characters)</li>
            <li>• Session management — view and manage your active sessions</li>
            <li>• Automatic session timeouts on inactivity</li>
            <li>• Email-based password recovery</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Counselor Verification</h2>
          <p className="mt-4 text-muted-foreground">
            Every counselor on Harmony undergoes a thorough verification process:
          </p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>• License verification — counselors must provide their license number and documentation</li>
            <li>• Professional background review — years of experience, specializations, and certifications are reviewed</li>
            <li>• Identity verification through account registration</li>
            <li>• Ongoing monitoring of counselor credentials</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Infrastructure Security</h2>
          <p className="mt-4 text-muted-foreground">
            Harmony is hosted on Vercel's secure infrastructure with automated deployments. The database is managed
            through a secure connection with encrypted access. Regular security updates are applied to all system
            dependencies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Reporting Security Issues</h2>
          <p className="mt-4 text-muted-foreground">
            If you discover a security vulnerability, please report it to us immediately at{" "}
            <span className="text-primary">support@harmonyhealth.et</span>. We take all reports seriously and will
            respond promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Our Commitment
          </h2>
          <p className="mt-4 text-muted-foreground">
            Based in Ethiopia, Harmony is committed to protecting the privacy and security of everyone seeking mental
            health support. We continuously review and improve our security practices to maintain the trust you place
            in us.
          </p>
        </section>
      </div>
    </LegalLayout>
  )
}
