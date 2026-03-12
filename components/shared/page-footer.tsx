import Link from "next/link"
import { Heart, Facebook, Linkedin, Youtube } from "lucide-react"
import { CrisisLink } from "@/components/shared/crisis-banner"

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

export function PageFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">Harmony</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Providing professional, confidential mental health support to empower individuals across Ethiopia.
            </p>
            <div className="mt-3">
              <CrisisLink />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <TelegramIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="group rounded-xl border border-primary/20 bg-background/50 p-4 shadow-[0_0_15px_rgba(74,247,255,0.15)] transition-all duration-300 hover:border-primary/40 hover:bg-background/70 hover:shadow-[0_0_25px_rgba(74,247,255,0.35)]">
            <h4 className="font-semibold">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/counselors" className="hover:text-foreground transition-colors">
                  Find a Counselor
                </Link>
              </li>
              <li>
                <Link href="/#for-counselors" className="hover:text-foreground transition-colors">
                  For Counselors
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="group rounded-xl border border-primary/20 bg-background/50 p-4 shadow-[0_0_15px_rgba(74,247,255,0.15)] transition-all duration-300 hover:border-primary/40 hover:bg-background/70 hover:shadow-[0_0_25px_rgba(74,247,255,0.35)]">
            <h4 className="font-semibold">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/help" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/crisis" className="hover:text-foreground transition-colors">
                  Crisis Resources
                </Link>
              </li>
            </ul>
          </div>
          <div className="group rounded-xl border border-primary/20 bg-background/50 p-4 shadow-[0_0_15px_rgba(74,247,255,0.15)] transition-all duration-300 hover:border-primary/40 hover:bg-background/70 hover:shadow-[0_0_25px_rgba(74,247,255,0.35)]">
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-foreground transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 Harmony. All rights reserved. Made with care in Ethiopia.
          </p>
        </div>
      </div>
    </footer>
  )
}
