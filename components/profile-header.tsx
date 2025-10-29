"use client"

import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

interface ProfileHeaderProps {
  onEditClick: () => void
}

export function ProfileHeader({ onEditClick }: ProfileHeaderProps) {
  return (
    <div className="animate-fade-in mb-12 text-center">
      <div className="mb-6 flex justify-center">
        <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br from-primary to-accent shadow-lg">
          <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-primary-foreground">
            A
          </div>
        </div>
      </div>

      <h1 className="mb-2 text-4xl font-bold text-foreground">Alex Johnson</h1>
      <p className="mb-6 text-lg text-muted-foreground">Designer, Developer & Creative Thinker</p>

      <Button onClick={onEditClick} variant="outline" size="sm" className="gap-2 bg-transparent">
        <Settings className="h-4 w-4" />
        Manage Links
      </Button>
    </div>
  )
}
