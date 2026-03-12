"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SitemapSVG } from "@/components/sitemap-svg"
import { JourneyMapSVG } from "@/components/journey-map-svg"
import { StyleGuide } from "@/components/style-guide"
import { WireframeDescriptions } from "@/components/wireframe-descriptions"
import { FileDown, Layout, Map, Palette, Layers } from "lucide-react"

export function DesignDocumentation() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Harmony</h1>
              <p className="text-sm text-muted-foreground">Design System Documentation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-muted/50 p-1">
            <TabsTrigger value="overview" className="gap-2">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="sitemap" className="gap-2">
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Sitemap</span>
            </TabsTrigger>
            <TabsTrigger value="journey" className="gap-2">
              <Layers className="w-4 h-4" />
              <span className="hidden sm:inline">Journey Map</span>
            </TabsTrigger>
            <TabsTrigger value="style" className="gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Style Guide</span>
            </TabsTrigger>
            <TabsTrigger value="wireframes" className="gap-2">
              <FileDown className="w-4 h-4" />
              <span className="hidden sm:inline">Wireframes</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <OverviewSection />
          </TabsContent>

          <TabsContent value="sitemap" className="space-y-6">
            <SectionHeader
              title="Structural Sitemap"
              description="Complete information architecture mapping all three user roles and their navigation pathways."
            />
            <SitemapSVG />
          </TabsContent>

          <TabsContent value="journey" className="space-y-6">
            <SectionHeader
              title="Dual-Perspective User Journey Map"
              description="Side-by-side visualization of the Seeker and Guide experiences during a first introductory session."
            />
            <JourneyMapSVG />
          </TabsContent>

          <TabsContent value="style" className="space-y-6">
            <SectionHeader
              title="Trust & Calm Style Guide"
              description="Visual language system designed to build credibility and reduce anxiety at every touchpoint."
            />
            <StyleGuide />
          </TabsContent>

          <TabsContent value="wireframes" className="space-y-6">
            <SectionHeader
              title="Low-Fidelity Wireframe Descriptions"
              description="Detailed specifications for the five most critical screens in the platform."
            />
            <WireframeDescriptions />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      <p className="text-muted-foreground max-w-2xl">{description}</p>
    </div>
  )
}

function OverviewSection() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Design Foundation v1.0
        </div>
        <h2 className="text-4xl font-semibold text-foreground text-balance">Designing for Trust, Calm & Connection</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          The Harmony platform bridges the gap between individuals seeking mental health support and licensed
          professional counselors through a secure, accessible, and destigmatized experience.
        </p>
      </div>

      {/* User Archetypes */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">User Archetypes</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <ArchetypeCard
            title="The Seeker"
            description="Individuals needing support—students, remote workers, caregivers. Often anxious, time-poor, and fear judgment."
            needs={["Safe, private access", "Qualified help", "Easy navigation", "Cost transparency"]}
            color="bg-[oklch(0.55_0.08_220)]"
          />
          <ArchetypeCard
            title="The Guide"
            description="Licensed counselors and therapists seeking efficient tools to manage their practice professionally."
            needs={["Efficient workflows", "Clear scheduling", "Secure communication", "Client management"]}
            color="bg-[oklch(0.75_0.1_160)]"
          />
          <ArchetypeCard
            title="The Steward"
            description="Platform administrators requiring robust oversight to maintain system integrity."
            needs={["User management", "Credential verification", "Resource curation", "System monitoring"]}
            color="bg-[oklch(0.85_0.08_85)]"
          />
        </div>
      </div>

      {/* Design Constraints */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Non-Negotiable Design Constraints</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ConstraintCard
            icon="🔒"
            title="Security-First"
            description="Every design decision must reinforce trust with clear privacy indicators."
          />
          <ConstraintCard
            icon="📱"
            title="Universal Access"
            description="Responsive web app providing flawless experience across all devices."
          />
          <ConstraintCard
            icon="💚"
            title="Stigma-Reduction"
            description="Non-pathologizing language and warm, approachable aesthetics."
          />
          <ConstraintCard
            icon="⚠️"
            title="Scope Boundaries"
            description="Counseling support only—no AI therapy, crisis intervention, or diagnosis."
          />
        </div>
      </div>

      {/* Deliverables Navigation */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-foreground">Design Deliverables</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <DeliverableCard
            number="01"
            title="Structural Sitemap"
            description="Complete information architecture mapping the three primary user roles with hierarchical relationships and key entry points."
            format="SVG"
          />
          <DeliverableCard
            number="02"
            title="User Journey Map"
            description="Dual-perspective visualization of emotional and interaction timelines for Seeker and Guide during first session."
            format="SVG"
          />
          <DeliverableCard
            number="03"
            title="Style Guide"
            description="Visual language system including color palette, typography, imagery guidelines, and microcopy examples."
            format="Interactive"
          />
          <DeliverableCard
            number="04"
            title="Wireframe Descriptions"
            description="Detailed specifications for the five most critical screens with layout, components, and navigation flows."
            format="Documentation"
          />
        </div>
      </div>
    </div>
  )
}

function ArchetypeCard({
  title,
  description,
  needs,
  color,
}: {
  title: string
  description: string
  needs: string[]
  color: string
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
        <span className="text-2xl text-white font-semibold">{title[4]}</span>
      </div>
      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Primary Needs</p>
        <ul className="space-y-1">
          {needs.map((need, i) => (
            <li key={i} className="text-sm text-foreground flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
              {need}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ConstraintCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
    </div>
  )
}

function DeliverableCard({
  number,
  title,
  description,
  format,
}: {
  number: string
  title: string
  description: string
  format: string
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex gap-4 hover:border-primary/30 transition-colors cursor-pointer">
      <div className="text-3xl font-light text-primary/40">{number}</div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-foreground">{title}</h4>
          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{format}</span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
