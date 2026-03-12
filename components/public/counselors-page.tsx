"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { PageFooter } from "@/components/shared/page-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, Clock, CheckCircle, ArrowRight } from "lucide-react"
import { formatCurrency } from "@/lib/format"
import { counselors } from "@/lib/mock-data"

export function CounselorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialty, setSpecialty] = useState("all")

  const filteredCounselors = counselors.filter((counselor) => {
    const matchesSearch =
      counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      counselor.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSpecialty =
      specialty === "all" || counselor.specialties.some((s) => s.toLowerCase().includes(specialty.toLowerCase()))
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="min-h-screen bg-background">
      <PageHeader />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Find Your Counselor</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse our network of 150+ verified, licensed counselors ready to support you.
          </p>
        </div>

        {/* Filters */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or specialty..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Specialties" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              <SelectItem value="anxiety">Anxiety</SelectItem>
              <SelectItem value="depression">Depression</SelectItem>
              <SelectItem value="relationships">Relationships</SelectItem>
              <SelectItem value="trauma">Trauma</SelectItem>
              <SelectItem value="stress">Stress</SelectItem>
              <SelectItem value="grief">Grief</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Counselor Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCounselors.map((counselor) => (
            <Card
              key={counselor.id}
              className="overflow-hidden border-border bg-card transition-shadow hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full bg-muted">
                    <img
                      src={
                        counselor.image || "/placeholder.svg?height=64&width=64&query=professional therapist portrait"
                      }
                      alt={counselor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{counselor.name}</h3>
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">{counselor.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-sm">
                      <Star className="h-3 w-3 fill-primary text-primary" />
                      <span>{counselor.rating}</span>
                      <span className="text-muted-foreground">({counselor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {counselor.specialties.slice(0, 3).map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>

                <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{counselor.bio}</p>

                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Next: {counselor.nextAvailable}</span>
                  </div>
                  <div className="text-sm font-medium">{formatCurrency(counselor.rate)}/session</div>
                </div>

                <Link href={`/signup?counselor=${counselor.id}`} className="block mt-4">
                  <Button className="w-full gap-2">
                    Book Session
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCounselors.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">No counselors found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchQuery("")
                setSpecialty("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <PageFooter />
    </div>
  )
}
