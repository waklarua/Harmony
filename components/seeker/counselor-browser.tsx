"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SeekerLayout } from "./seeker-layout"
import { Search, Star, CheckCircle, Filter, ArrowRight } from "lucide-react"
import { mockCounselors } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/format"

const specialties = [
  "All Specialties",
  "Anxiety",
  "Depression",
  "Stress Management",
  "Relationships",
  "Trauma",
  "Self-Esteem",
  "Work Stress",
  "Family Dynamics",
]

export function CounselorBrowser() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [sortBy, setSortBy] = useState("rating")

  const filteredCounselors = mockCounselors
    .filter((counselor) => {
      const matchesSearch =
        counselor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        counselor.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesSpecialty =
        selectedSpecialty === "All Specialties" || counselor.specialties.includes(selectedSpecialty)
      return matchesSearch && matchesSpecialty
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "experience") return b.yearsExperience - a.yearsExperience
      if (sortBy === "price") return a.hourlyRate - b.hourlyRate
      return 0
    })

  return (
    <SeekerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Find Your Counselor</h1>
          <p className="mt-1 text-muted-foreground">
            Browse our network of verified professionals and find the right match for you
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or specialty..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex gap-3">
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="experience">Most Experienced</SelectItem>
                    <SelectItem value="price">Lowest Price</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results count */}
        <p className="text-sm text-muted-foreground">
          Showing {filteredCounselors.length} counselor{filteredCounselors.length !== 1 ? "s" : ""}
        </p>

        {/* Counselor Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCounselors.map((counselor) => (
            <Card key={counselor.id} className="overflow-hidden transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar className="h-16 w-16 flex-shrink-0">
                    <AvatarImage src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} />
                    <AvatarFallback>{counselor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{counselor.name}</h3>
                          {counselor.verified && <CheckCircle className="h-4 w-4 text-primary" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{counselor.title}</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-muted px-2 py-1">
                        <Star className="h-3 w-3 fill-primary text-primary" />
                        <span className="text-sm font-medium">{counselor.rating}</span>
                        <span className="text-xs text-muted-foreground">({counselor.reviewCount})</span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {counselor.specialties.slice(0, 3).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{counselor.bio}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm">
                        <span className="font-semibold">{formatCurrency(counselor.hourlyRate)}</span>
                        <span className="text-muted-foreground">/session</span>
                      </div>
                      <Link href={`/seeker/counselors/${counselor.id}`}>
                        <Button size="sm" className="gap-1">
                          View Profile
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCounselors.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 font-medium">No counselors found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </SeekerLayout>
  )
}
