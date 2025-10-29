import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import PublicProfileView from "@/components/public-profile-view"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function PreviewPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Fetch user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

  // Fetch user links
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", data.user.id)
    .eq("is_archived", false)
    .order("position", { ascending: true })

  if (!profile) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto p-6">
        {/* Header with back button */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Edit
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-600">Preview</h1>
            <p className="text-sm text-gray-600">This is how your profile looks publicly</p>
          </div>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        {/* Preview content */}
        <PublicProfileView profile={profile} links={links || []} />
      </div>
    </div>
  )
}
