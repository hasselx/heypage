"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Edit2, Archive, ArchiveRestore } from "lucide-react"

interface Link {
  id: string
  title: string
  url: string
  category: string
  is_archived: boolean
  position: number
}

interface LinkListManagerProps {
  links: Link[]
  onEdit: (link: Link) => void
  onDelete: (linkId: string) => void
  onArchive: (linkId: string) => void
  isArchived?: boolean
}

export default function LinkListManager({
  links,
  onEdit,
  onDelete,
  onArchive,
  isArchived = false,
}: LinkListManagerProps) {
  return (
    <div className="space-y-3">
      {links.map((link) => (
        <Card key={link.id} className="border-gray-200 hover:border-purple-300 hover:shadow-md transition-all">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{link.title}</h3>
                <p className="text-sm text-gray-500 truncate">{link.url}</p>
                <div className="flex gap-2 mt-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded">
                    {link.category}
                  </span>
                  {isArchived && (
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                      Archived
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button
                  onClick={() => onEdit(link)}
                  size="sm"
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  title="Edit link"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>

                <Button
                  onClick={() => onArchive(link.id)}
                  size="sm"
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  title={isArchived ? "Unarchive link" : "Archive link"}
                >
                  {isArchived ? <ArchiveRestore className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                </Button>

                <Button
                  onClick={() => onDelete(link.id)}
                  size="sm"
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  title="Delete link"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
