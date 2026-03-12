import Link from "next/link"

interface SkipLink {
  href: string
  label: string
}

interface SkipLinksProps {
  links?: SkipLink[]
}

const defaultLinks: SkipLink[] = [{ href: "#main-content", label: "Skip to main content" }]

export function SkipLinks({ links = defaultLinks }: SkipLinksProps) {
  return (
    <div className="sr-only focus-within:not-sr-only">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="fixed left-4 top-4 z-[100] rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
