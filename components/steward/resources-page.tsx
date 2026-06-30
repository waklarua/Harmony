"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { StewardLayout } from "./steward-layout"
import { Plus, FileText } from "lucide-react"
import { createResource } from "@/app/actions/wellness"

const CATEGORIES = [
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
  category: string | null
  body: string | null
  createdAt: Date | null
}

export function ResourcesPage({ resources }: { resources: Resource[] }) {
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState(CATEGORIES[0])
  const [body, setBody] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setPending(true)

    try {
      await createResource({ title, category, body })
      setTitle("")
      setBody("")
      setShowForm(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create resource")
    } finally {
      setPending(false)
    }
  }

  return (
    <StewardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Resources</h1>
            <p className="text-muted-foreground">Manage self-help resource library</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Resource
          </Button>
        </div>

        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>New Resource</CardTitle>
              <CardDescription>Create a new self-help article for seekers</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title</label>
                  <Input
                    placeholder="Article title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Body</label>
                  <Textarea
                    placeholder="Write the article content here..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows={12}
                    required
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <div className="flex gap-2">
                  <Button type="submit" disabled={pending}>
                    {pending ? "Saving..." : "Save Resource"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {resources.map((resource) => (
            <Card key={resource.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{resource.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {resource.category && (
                        <Badge variant="outline" className="text-xs">{resource.category}</Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {resource.body ? `${Math.max(1, Math.ceil(resource.body.split(" ").length / 200))} min read` : "Article"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StewardLayout>
  )
}
