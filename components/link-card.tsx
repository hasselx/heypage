"use client"

import { ExternalLink } from "lucide-react"

interface Link {
  id: string
  title: string
  url: string
  category: string
  icon: string
}

interface LinkCardProps {
  link: Link
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/20"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{link.icon}</span>
          <span className="font-medium text-card-foreground group-hover:text-primary transition-colors">
            {link.title}
          </span>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100" />
      </div>

      {/* Animated gradient background on hover */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </a>
  )
}
