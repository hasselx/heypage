"use client"

import Link from "next/link"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import LinkForm from "./link-form"
import LinkListManager from "./link-list-manager"
import ProfileEditor from "./profile-editor"
import { Eye } from "lucide-react"

interface DashboardLink {
  id: string
  title: string
  url: string
  category: string
  notes: string
  is_archived: boolean
  position: number
}

interface Profile {
  id: string
  username: string
  display_name: string
  bio: string
  avatar_url: string
}

export default function DashboardClient({
  user,
  profile,
  initialLinks,
}: {
  user: any
  profile: Profile
  initialLinks: DashboardLink[]
}) {
  const [links, setLinks] = useState<DashboardLink[]>(initialLinks)
  const [showForm, setShowForm] = useState(false)
  const [editingLink, setEditingLink] = useState<DashboardLink | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const handleAddLink = async (linkData: Omit<DashboardLink, "id" | "position">) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("links")
        .insert({
          user_id: user.id,
          ...linkData,
          position: links.length,
        })
        .select()
        .single()

      if (error) throw error
      setLinks([...links, data])
      setShowForm(false)
    } catch (error) {
      console.error("Error adding link:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateLink = async (linkData: Omit<DashboardLink, "id" | "position">) => {
    if (!editingLink) return
    setIsLoading(true)
    try {
      const { error } = await supabase.from("links").update(linkData).eq("id", editingLink.id)

      if (error) throw error
      setLinks(links.map((link) => (link.id === editingLink.id ? { ...link, ...linkData } : link)))
      setEditingLink(null)
      setShowForm(false)
    } catch (error) {
      console.error("Error updating link:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteLink = async (linkId: string) => {
    try {
      const { error } = await supabase.from("links").delete().eq("id", linkId)

      if (error) throw error
      setLinks(links.filter((link) => link.id !== linkId))
    } catch (error) {
      console.error("Error deleting link:", error)
    }
  }

  const handleArchiveLink = async (linkId: string) => {
    try {
      const { error } = await supabase.from("links").update({ is_archived: true }).eq("id", linkId)

      if (error) throw error
      setLinks(links.map((link) => (link.id === linkId ? { ...link, is_archived: true } : link)))
    } catch (error) {
      console.error("Error archiving link:", error)
    }
  }

  const handleUnarchiveLink = async (linkId: string) => {
    try {
      const { error } = await supabase.from("links").update({ is_archived: false }).eq("id", linkId)

      if (error) throw error
      setLinks(links.map((link) => (link.id === linkId ? { ...link, is_archived: false } : link)))
    } catch (error) {
      console.error("Error unarchiving link:", error)
    }
  }

  const activeLinks = links.filter((link) => !link.is_archived)
  const archivedLinks = links.filter((link) => link.is_archived)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-purple-600">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your links and profile</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/preview">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 gap-2">
                <Eye className="w-4 h-4" />
                Preview
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Profile Section */}
        <ProfileEditor profile={profile} userId={user.id} />

        {/* Links Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Links</h2>
            <Button
              onClick={() => {
                setEditingLink(null)
                setShowForm(!showForm)
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {showForm ? "Cancel" : "+ Add Link"}
            </Button>
          </div>

          {showForm && (
            <LinkForm
              onSubmit={editingLink ? handleUpdateLink : handleAddLink}
              initialData={editingLink}
              isLoading={isLoading}
            />
          )}

          {/* Active Links */}
          {activeLinks.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Active Links ({activeLinks.length})</h3>
              <LinkListManager
                links={activeLinks}
                onEdit={(link) => {
                  setEditingLink(link)
                  setShowForm(true)
                }}
                onDelete={handleDeleteLink}
                onArchive={handleArchiveLink}
              />
            </div>
          )}

          {/* Archived Links */}
          {archivedLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Archived Links ({archivedLinks.length})</h3>
              <LinkListManager
                links={archivedLinks}
                onEdit={(link) => {
                  setEditingLink(link)
                  setShowForm(true)
                }}
                onDelete={handleDeleteLink}
                onArchive={handleUnarchiveLink}
                isArchived
              />
            </div>
          )}

          {links.length === 0 && !showForm && (
            <Card className="border-dashed border-2 border-purple-200 bg-purple-50">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-gray-600 mb-4">No links yet. Create your first one!</p>
                <Button onClick={() => setShowForm(true)} className="bg-purple-600 hover:bg-purple-700">
                  Add Your First Link
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
