import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getArticle, getAllArticles } from "@/lib/help-content"
import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: "Article Not Found | Harmony" }
  return {
    title: `${article.title} | Harmony Help Center`,
    description: article.content[0],
  }
}

export default async function HelpArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)

  if (!article) notFound()

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/help"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Help Center
        </Link>

        <div className="mt-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <BookOpen className="h-3 w-3" />
            {article.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{article.title}</h1>

          <div className="mt-8 space-y-4">
            {article.content.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-xl bg-muted/30 p-8 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-primary" />
          <h3 className="mt-4 text-xl font-semibold">Still have questions?</h3>
          <p className="mt-2 text-muted-foreground">Browse other articles or contact our support team.</p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link href="/help">
              <Button variant="outline" className="bg-transparent">Browse All Articles</Button>
            </Link>
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}
