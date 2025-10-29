import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { ArrowRight, Link2, Users, Zap } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (data?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-600">heypage</h1>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-700 hover:text-purple-600">
                Login
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-purple-600 hover:bg-purple-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Share All Your Links
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
              In One Place
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create your personal link page and organize all your important links by category. Perfect for portfolios,
            projects, social media, and more.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 gap-2">
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 my-20">
          <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Link2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Organize Links</h3>
            <p className="text-gray-600">
              Categorize your links into Featured, Projects, Social Media, Hobbies, and more.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Profile</h3>
            <p className="text-gray-600">
              Get a unique profile URL to share with anyone. Let people discover all your links.
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Easy Management</h3>
            <p className="text-gray-600">
              Add, edit, delete, or archive links anytime. Full control over your link page.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to share your links?</h3>
          <p className="text-lg mb-8 opacity-90">Create your free account and start building your link page today.</p>
          <Link href="/auth/sign-up">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 gap-2">
              Create Free Account <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; 2025 heypage. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
