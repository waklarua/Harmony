import Link from "next/link"
import { Heart, Search, DollarSign, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SkipLinks } from "@/components/shared/skip-links"

export function PageHeader() {
  return (
    <>
      <SkipLinks
        links={[
          { href: "#main-content", label: "Skip to main content" },
          { href: "#find-counselor", label: "Skip to Find a Counselor" },
        ]}
      />

      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Harmony</span>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 shadow-lg shadow-primary/5 backdrop-blur-sm md:flex">
            <Link
              href="/counselors"
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:text-foreground hover:shadow-md hover:shadow-primary/20"
            >
              <Search className="h-4 w-4" />
              <span>Find a Counselor</span>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:text-foreground hover:shadow-md hover:shadow-primary/20"
            >
              <DollarSign className="h-4 w-4" />
              <span>Pricing</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/10 hover:text-foreground hover:shadow-md hover:shadow-primary/20"
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" className="hidden sm:block">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}
