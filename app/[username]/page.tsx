import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import PublicProfileView from "@/components/public-profile-view"

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createClient()

  // Fetch profile by username
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username.toLowerCase())
    .single()

  if (profileError || !profile) {
    notFound()
  }

  // Fetch active links for this user
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .eq("is_archived", false)
    .order("position", { ascending: true })

  return <PublicProfileView profile={profile} links={links || []} />
}
