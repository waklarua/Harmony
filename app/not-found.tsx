"use client"

import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search, MessageCircle, HelpCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PageHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="text-center max-w-lg mx-auto">
          <p className="text-8xl font-bold text-primary">404</p>
          <h1 className="mt-6 text-3xl font-semibold">Page not found</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;re sorry, the page you&apos;re looking for can&apos;t be found. It may have been moved or no longer
            exists.
          </p>

          {/* Primary Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="gap-2 w-full sm:w-auto">
                <Home className="h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.history.back()}
              className="gap-2 w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-4">Here are some helpful links instead:</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/counselors">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Search className="h-4 w-4" />
                  Find a Counselor
                </Button>
              </Link>
              <Link href="/faq">
                <Button variant="ghost" size="sm" className="gap-2">
                  <HelpCircle className="h-4 w-4" />
                  FAQ
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}
