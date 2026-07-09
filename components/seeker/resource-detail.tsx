"use client"

import { SeekerLayout } from "./seeker-layout"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, Calendar } from "lucide-react"
import Link from "next/link"

interface Resource {
  id: string
  title: string
  description: string | null
  category: string | null
  body: string | null
  createdAt: Date | null
}

export function ResourceDetail({ resource }: { resource: Resource }) {
  const readTime = resource.body
    ? `${Math.max(1, Math.ceil(resource.body.split(" ").length / 200))} min read`
    : "Article"

  return (
    <SeekerLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" asChild className="gap-2">
          <Link href="/seeker/resources">
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>
        </Button>

        <div>
          <div className="flex items-center gap-3 mb-3">
            {resource.category && (
              <Badge>{resource.category}</Badge>
            )}
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {readTime}
            </span>
            {resource.createdAt && (
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(resource.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{resource.title}</h1>
          {resource.description && (
            <p className="mt-2 text-lg text-muted-foreground">{resource.description}</p>
          )}
        </div>

        {resource.body && (
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {resource.body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </SeekerLayout>
  )
}
