"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SeekerLayout } from "./seeker-layout"
import { Search, FileText, Sparkles, ArrowRight } from "lucide-react"
import { EmptyState } from "@/components/shared/empty-state"
import Link from "next/link"

const CATEGORIES = [
  "All",
  "Anxiety",
  "Depression",
  "Stress Management",
  "Trauma/PTSD",
  "Relationships",
  "Grief/Loss",
  "Self-Esteem",
  "Life Transitions",
  "Addiction",
  "Eating Disorders",
]

interface Resource {
  id: string
  title: string
  description: string | null
  category: string | null
  body: string | null
  createdAt: Date | null
}

export function ResourcesPage({ resources }: { resources: Resource[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <SeekerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Wellness Resources</h1>
          <p className="mt-1 text-muted-foreground">
            Explore articles and guides to support your well-being
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <Link key={resource.id} href={`/seeker/resources/${resource.id}`}>
                <Card className="transition-shadow hover:shadow-md cursor-pointer h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      {resource.category && (
                        <Badge variant="outline">{resource.category}</Badge>
                      )}
                    </div>
                    <CardTitle className="mt-3 text-lg">{resource.title}</CardTitle>
                    {resource.description && (
                      <CardDescription>{resource.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {resource.body ? `${Math.max(1, Math.ceil(resource.body.split(" ").length / 200))} min read` : "Article"}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Read
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState variant="no-resources" />
        )}
      </div>
    </SeekerLayout>
  )
}
