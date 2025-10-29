"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { LinkForm } from "./link-form"
import { LinkList } from "./link-list"

interface Link {
  id: string
  title: string
  url: string
  category: string
  icon: string
}

interface SidebarManagerProps {
  isOpen: boolean
  onClose: () => void
  links: Link[]
  onAddLink: (link: Omit<Link, "id">) => void
  onDeleteLink: (id: string) => void
  onEditLink: (id: string, link: Partial<Link>) => void
}

export function SidebarManager({ isOpen, onClose, links, onAddLink, onDeleteLink, onEditLink }: SidebarManagerProps) {
  const [editingId, setEditingId] = useState<string | null>(null)

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-sidebar shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-sidebar-border px-6 py-4">
            <h2 className="text-xl font-bold text-sidebar-foreground">Manage Links</h2>
            <button onClick={onClose} className="rounded-lg p-2 hover:bg-sidebar-accent transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6 p-6">
              {/* Add New Link Form */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sidebar-foreground">
                  Add New Link
                </h3>
                <LinkForm
                  onSubmit={(data) => {
                    onAddLink(data)
                    setEditingId(null)
                  }}
                />
              </div>

              {/* Links List */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sidebar-foreground">
                  Your Links ({links.length})
                </h3>
                <LinkList
                  links={links}
                  editingId={editingId}
                  onEdit={setEditingId}
                  onDelete={onDeleteLink}
                  onUpdate={onEditLink}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
