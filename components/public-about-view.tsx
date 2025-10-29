"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, Share2 } from "lucide-react"
import { useState } from "react"

interface Profile {
  id: string
  username: string
  display_name: string
  bio: string
  avatar_url: string
}

interface PublicAboutViewProps {
  profile: Profile
  links: any[]
}

export default function PublicAboutView({ profile, links }: PublicAboutViewProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    const url = `${window.location.origin}/${profile.username}/about`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Group links by category
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

  // Get featured links
  const featuredLinks = linksByCategory["Featured"] || []
  const otherCategories = Object.entries(linksByCategory).filter(([category]) => category !== "Featured")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <Link href={`/${profile.username}`}>
            <Button variant="outline" className="text-gray-600 hover:text-purple-600 bg-transparent">
              ← Back to Profile
            </Button>
          </Link>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-purple-700 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            {copied ? "Copied!" : "Share"}
          </button>
        </div>

        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url || "/placeholder.svg"}
                alt={profile.display_name}
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-200 shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                {profile.display_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-2">{profile.display_name}</h1>
          <p className="text-purple-600 text-lg font-medium mb-6">@{profile.username}</p>

          {profile.bio && <p className="text-gray-700 max-w-2xl mx-auto text-lg leading-relaxed mb-8">{profile.bio}</p>}

          {/* Contact CTA */}
          <div className="flex justify-center gap-4">
            <Link href={`/${profile.username}`}>
              <Button className="bg-purple-600 hover:bg-purple-700">View All Links</Button>
            </Link>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-12">
          <Card className="border-purple-200 bg-white">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{profile.bio || "No bio provided yet."}</p>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Profile</p>
                  <p className="text-lg font-semibold text-gray-900">@{profile.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Links Shared</p>
                  <p className="text-lg font-semibold text-gray-900">{links.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Links Section */}
        {featuredLinks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured</h2>
            <div className="space-y-4">
              {featuredLinks.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block">
                  <Card className="border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all cursor-pointer group">
                    <CardContent className="pt-5 pb-5">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors mb-1">
                            {link.title}
                          </h3>
                          <p className="text-sm text-gray-500">{new URL(link.url).hostname}</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-purple-400 group-hover:text-purple-600 transition-colors flex-shrink-0 ml-4" />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Category-wise Links */}
        {otherCategories.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Links</h2>
            {otherCategories.map(([category, categoryLinks]) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 text-purple-600">{category}</h3>
                <div className="space-y-3">
                  {categoryLinks.map((link) => (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="block">
                      <Card className="border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group">
                        <CardContent className="pt-4 pb-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors">
                                {link.title}
                              </h4>
                              <p className="text-xs text-gray-500 truncate">{new URL(link.url).hostname}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-colors flex-shrink-0 ml-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {links.length === 0 && (
          <Card className="border-dashed border-2 border-purple-200 bg-purple-50">
            <CardContent className="pt-12 pb-12 text-center">
              <p className="text-gray-600 text-lg">No links shared yet.</p>
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
