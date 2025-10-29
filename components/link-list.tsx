"use client"

import { useState } from "react"

import { Trash2, Edit2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Link {
  id: string
  title: string
  url: string
  category: string
  icon: string
}

interface LinkListProps {
  links: Link[]
  editingId: string | null
  onEdit: (id: string | null) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, data: Partial<Link>) => void
}

export function LinkList({ links, editingId, onEdit, onDelete, onUpdate }: LinkListProps) {
  const [editData, setEditData] = useState<Partial<Link>>({})

  return (
    <div className="space-y-2">
      {links.map((link) => (
        <div
          key={link.id}
          className="rounded-lg border border-sidebar-border bg-sidebar-accent/30 p-3 transition-all hover:bg-sidebar-accent/50"
        >
          {editingId === link.id ? (
            <div className="space-y-2">
              <Input
                value={editData.title || link.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                placeholder="Title"
                className="bg-sidebar-accent"
              />
              <Input
                value={editData.url || link.url}
                onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                placeholder="URL"
                className="bg-sidebar-accent"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    onUpdate(link.id, editData)
                    onEdit(null)
                  }}
                  className="flex-1"
                >
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={() => onEdit(null)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-sidebar-foreground">{link.title}</p>
                <p className="text-xs text-sidebar-foreground/60">{link.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditData(link)
                    onEdit(link.id)
                  }}
                  className="rounded p-1 hover:bg-sidebar-accent transition-colors"
                >
                  <Edit2 className="h-4 w-4 text-sidebar-foreground" />
                </button>
                <button
                  onClick={() => onDelete(link.id)}
                  className="rounded p-1 hover:bg-destructive/20 transition-colors"
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
