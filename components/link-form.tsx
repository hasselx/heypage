"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LinkFormProps {
  onSubmit: (data: {
    title: string
    url: string
    category: string
    notes: string
    is_archived: boolean
  }) => Promise<void>
  initialData?: {
    id: string
    title: string
    url: string
    category: string
    notes: string
    is_archived: boolean
    position: number
  } | null
  isLoading: boolean
}

const CATEGORIES = ["Featured", "Big Projects", "Hobby", "Development Stage", "Professional", "Social Media", "Other"]

export function LinkForm({ onSubmit, initialData, isLoading }: LinkFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    url: initialData?.url || "",
    category: initialData?.category || "Featured",
    notes: initialData?.notes || "",
    is_archived: initialData?.is_archived || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.url) {
      await onSubmit(formData)
      setFormData({
        title: "",
        url: "",
        category: "Featured",
        notes: "",
        is_archived: false,
      })
    }
  }

  return (
    <Card className="mb-6 border-purple-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{initialData ? "Edit Link" : "Add New Link"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Link Title</Label>
              <Input
                id="title"
                placeholder="e.g., My Portfolio"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="border-gray-300"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
                className="border-gray-300"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="flex h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <textarea
                id="notes"
                placeholder="Add any notes or description for this link..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="flex min-h-20 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading} className="flex-1 bg-purple-600 hover:bg-purple-700">
              {isLoading ? "Saving..." : initialData ? "Update Link" : "Add Link"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default LinkForm
