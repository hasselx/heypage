"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      <div className="mx-auto max-w-2xl px-4 py-12">
        {/* Back Button */}
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-8 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Links
          </Button>
        </Link>

        {/* About Header */}
        <div className="animate-fade-in mb-12 text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full bg-gradient-to-br from-primary to-accent shadow-lg">
              <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-primary-foreground">
                A
              </div>
            </div>
          </div>

          <h1 className="mb-2 text-4xl font-bold text-foreground">Alex Johnson</h1>
          <p className="mb-8 text-xl text-muted-foreground">Designer, Developer & Creative Thinker</p>
        </div>

        {/* About Content */}
        <div className="space-y-8">
          {/* Bio Section */}
          <section className="animate-fade-in rounded-lg border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">About Me</h2>
            <p className="mb-4 leading-relaxed text-muted-foreground">
              I'm a passionate designer and developer with over 5 years of experience creating beautiful, functional
              digital experiences. I specialize in building modern web applications and designing intuitive user
              interfaces.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              When I'm not coding or designing, you'll find me exploring new technologies, capturing moments through
              photography, or enjoying gaming with friends.
            </p>
          </section>

          {/* Skills Section */}
          <section className="animate-fade-in rounded-lg border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Skills & Expertise</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Design</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• UI/UX Design</li>
                  <li>• Figma</li>
                  <li>• Design Systems</li>
                  <li>• Prototyping</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Development</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• React & Next.js</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                  <li>• Full Stack</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section className="animate-fade-in rounded-lg border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Experience</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground">Senior Product Designer</h3>
                <p className="text-sm text-muted-foreground">Tech Company • 2022 - Present</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Leading design initiatives and building scalable design systems.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Full Stack Developer</h3>
                <p className="text-sm text-muted-foreground">Startup • 2020 - 2022</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Built and maintained multiple web applications from concept to production.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="animate-fade-in rounded-lg border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-border hover:bg-card/80">
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Get In Touch</h2>
            <p className="mb-4 text-muted-foreground">
              I'm always interested in hearing about new projects and opportunities. Feel free to reach out!
            </p>
            <div className="flex gap-3">
              <Button variant="default" size="sm">
                Email Me
              </Button>
              <Button variant="outline" size="sm">
                Schedule Call
              </Button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
