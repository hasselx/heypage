"use client"

import { LinkCard } from "./link-card"

interface Link {
  id: string
  title: string
  url: string
  category: string
  icon: string
}

interface LinkCategoriesProps {
  links: Link[]
  onEditClick: () => void
}

export function LinkCategories({ links, onEditClick }: LinkCategoriesProps) {
  const categories = Array.from(new Set(links.map((link) => link.category)))

  return (
    <div className="space-y-8">
      {categories.map((category, index) => (
        <div key={category} className="animate-slide-up space-y-3" style={{ animationDelay: `${index * 100}ms` }}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{category}</h2>

          <div className="space-y-2">
            {links
              .filter((link) => link.category === category)
              .map((link) => (
                <LinkCard key={link.id} link={link} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
