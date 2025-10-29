import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import DashboardClient from "@/components/dashboard-client"

export default async function DashboardPage() {
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
    .order("position", { ascending: true })

  return <DashboardClient user={data.user} profile={profile} initialLinks={links || []} />
}
