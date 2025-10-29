"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, ChevronDown } from "lucide-react"
import { useState } from "react"

interface Profile {
  id: string
  username: string
  display_name: string
  bio: string
  avatar_url: string
}

interface PublicProfileViewProps {
  profile: Profile
  links: any[]
}

export default function PublicProfileView({ profile, links }: PublicProfileViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const linksByCategory = links.reduce(
    (acc, link) => {
      if (!acc[link.category]) {
        acc[link.category] = []
      }
      acc[link.category].push(link)
      return acc
    },
    {} as Record<string, any[]>,
  )

  // Define category order
  const categoryOrder = [
    "Featured",
    "Big Projects",
    "Professional",
    "Development Stage",
    "Hobby",
    "Social Media",
    "Other",
  ]
  const sortedCategories = categoryOrder.filter((cat) => linksByCategory[cat])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url || "/placeholder.svg"}
                alt={profile.display_name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-purple-200 shadow-lg"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {profile.display_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.display_name}</h1>
          <p className="text-gray-600 text-lg mb-4">@{profile.username}</p>

          {profile.bio && <p className="text-gray-700 max-w-md mx-auto text-center mb-8">{profile.bio}</p>}
        </div>

        {/* Category-wise Links with Section Titles */}
        {sortedCategories.length > 0 ? (
          <div className="space-y-3">
            {sortedCategories.map((category) => (
              <div key={category}>
                {/* Category Button */}
                <button
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className="w-full"
                >
                  <Card className="border-purple-200 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group">
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full" />
                          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors text-left">
                            {category}
                          </h2>
                          <span className="text-sm text-gray-500 ml-auto">
                            {linksByCategory[category].length} link{linksByCategory[category].length !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-purple-400 transition-transform duration-300 ${
                            selectedCategory === category ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </button>

                {/* Links for selected category */}
                {selectedCategory === category && (
                  <div className="mt-3 ml-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    {linksByCategory[category].map((link) => (
                      <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block">
                        <Card className="border-purple-100 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group bg-white">
                          <CardContent className="pt-3 pb-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                                  {link.title}
                                </h3>
                                {link.notes && <p className="text-sm text-gray-600 mt-1">{link.notes}</p>}
                                <p className="text-xs text-gray-500 truncate mt-1">{new URL(link.url).hostname}</p>
                              </div>
                              <ExternalLink className="w-4 h-4 text-purple-400 group-hover:text-purple-600 transition-colors flex-shrink-0 mt-1" />
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-dashed border-2 border-purple-200 bg-purple-50">
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-gray-600">No links shared yet.</p>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm mb-4">Want to create your own link page?</p>
          <Link href="/auth/sign-up">
            <Button className="bg-purple-600 hover:bg-purple-700">Get Started Free</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
