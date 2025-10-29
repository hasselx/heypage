"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check } from "lucide-react"

interface Profile {
  id: string
  username: string
  display_name: string
  bio: string
  avatar_url: string
}

interface ProfileEditorProps {
  profile: Profile
  userId: string
}

export default function ProfileEditor({ profile, userId }: ProfileEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(profile?.avatar_url || null)
  const [formData, setFormData] = useState({
    display_name: profile?.display_name || "",
    bio: profile?.bio || "",
    username: profile?.username || "",
  })
  const supabase = createClient()

  const profileUrl = `https://heypage.vercel.app/${profile?.username}`

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(profileUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    try {
      // Create a preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${userId}-avatar.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, {
        upsert: true,
      })

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath)

      // Update profile with avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", userId)

      if (updateError) throw updateError
    } catch (error) {
      console.error("Error uploading avatar:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: formData.display_name,
          bio: formData.bio,
          username: formData.username,
        })
        .eq("id", userId)

      if (error) throw error
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-purple-200 shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Your Profile</CardTitle>
          <Button
            onClick={() => {
              if (isEditing) {
                setFormData({
                  display_name: profile?.display_name || "",
                  bio: profile?.bio || "",
                  username: profile?.username || "",
                })
                setAvatarPreview(profile?.avatar_url || null)
              }
              setIsEditing(!isEditing)
            }}
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label>Profile Picture</Label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview || "/placeholder.svg"}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    profile?.display_name?.charAt(0).toUpperCase()
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  disabled={isLoading}
                  className="border-gray-300"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled
                className="bg-gray-100 border-gray-300"
              />
              <p className="text-xs text-gray-500">Your profile URL: heypage.com/{formData.username}</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="display_name">Display Name</Label>
              <Input
                id="display_name"
                value={formData.display_name}
                onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                className="border-gray-300"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell people about yourself..."
                className="flex min-h-24 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button onClick={handleSave} disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-2xl font-bold overflow-hidden flex-shrink-0">
                {avatarPreview ? (
                  <img src={avatarPreview || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  profile?.display_name?.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Username</p>
                <p className="text-lg font-semibold text-gray-800">{profile?.username}</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 mb-2">Your Profile Link</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-mono text-purple-600 break-all">{profileUrl}</code>
                <Button
                  onClick={handleCopyUrl}
                  size="sm"
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-100 gap-2 flex-shrink-0 bg-transparent"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">Display Name</p>
              <p className="text-lg font-semibold text-gray-800">{profile?.display_name || "Not set"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Bio</p>
              <p className="text-gray-700">{profile?.bio || "No bio yet. Add one to tell people about yourself!"}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
