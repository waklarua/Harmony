"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SeekerLayout } from "./seeker-layout"
import { Search, BookOpen, Play, FileText, Clock, ArrowRight, Heart, Brain, Moon, Sparkles } from "lucide-react"
import { EmptyState } from "@/components/shared/empty-state"

const resources = [
  {
    id: "1",
    title: "Understanding Anxiety",
    description: "Learn about the causes, symptoms, and coping strategies for anxiety.",
    type: "Article",
    duration: "8 min read",
    category: "Anxiety",
    icon: Brain,
  },
  {
    id: "2",
    title: "Guided Breathing Exercise",
    description: "A calming 5-minute breathing exercise to help reduce stress.",
    type: "Exercise",
    duration: "5 min",
    category: "Stress",
    icon: Heart,
  },
  {
    id: "3",
    title: "Sleep Hygiene Guide",
    description: "Tips and techniques for improving your sleep quality.",
    type: "Guide",
    duration: "6 min read",
    category: "Sleep",
    icon: Moon,
  },
  {
    id: "4",
    title: "Mindfulness Meditation",
    description: "An introduction to mindfulness and a guided meditation session.",
    type: "Video",
    duration: "10 min",
    category: "Mindfulness",
    icon: Sparkles,
  },
  {
    id: "5",
    title: "Building Self-Compassion",
    description: "Practical exercises for developing a kinder relationship with yourself.",
    type: "Article",
    duration: "7 min read",
    category: "Self-Care",
    icon: Heart,
  },
  {
    id: "6",
    title: "Stress Management Toolkit",
    description: "A collection of techniques for managing daily stress.",
    type: "Guide",
    duration: "12 min read",
    category: "Stress",
    icon: Brain,
  },
]

const categories = ["All", "Anxiety", "Stress", "Sleep", "Mindfulness", "Self-Care"]

export function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Article":
        return <FileText className="h-4 w-4" />
      case "Video":
        return <Play className="h-4 w-4" />
      case "Exercise":
        return <Heart className="h-4 w-4" />
      case "Guide":
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <SeekerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Wellness Resources</h1>
          <p className="mt-1 text-muted-foreground">
            Explore articles, exercises, and guides to support your well-being
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
            {categories.map((category) => (
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

        {/* Featured Resource */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <Badge className="mb-2">Featured</Badge>
                  <h3 className="text-lg font-semibold">Weekly Wellness Check-In</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Take a moment to reflect on your week and set intentions for the days ahead.
                  </p>
                </div>
              </div>
              <Button className="gap-2">
                Start Check-In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="transition-shadow hover:shadow-md cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <resource.icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="gap-1">
                      {getTypeIcon(resource.type)}
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {resource.duration}
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState variant="no-resources" />
        )}
      </div>
    </SeekerLayout>
  )
}
