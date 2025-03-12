import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import SkillsSection from "@/components/skills-section"
import Timeline from "@/components/timeline"
import { MapPin } from "lucide-react"

export const metadata = {
  title: "About | Jake Abendroth",
  description: "Learn more about Jake Abendroth, a Computer Science Student and Systems & Cybersecurity Enthusiast",
}

export default function AboutPage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-1">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden">
            <Image
              src="/composite.jpg"
              alt="Jake Abendroth"
              width={400}
              height={400}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">My Journey</h2>
              <div className="space-y-4 text-lg">
                <p>
                  I'm a Computer Science student at the University of San Francisco with a passion for systems
                  programming, cybersecurity, and open-source development. My journey began with a curiosity about how
                  computers work at the lowest levels, which led me to explore operating systems, compilers, and
                  security mechanisms.
                </p>
                <p>
                  While I have experience across multiple domains of software development, my true passion lies in
                  building secure, efficient systems that operate close to the hardware. I enjoy the challenges of
                  optimizing performance, ensuring security, and creating reliable software.
                </p>
                <p>
                  When I'm not coding, I enjoy participating in CTF competitions, contributing to open-source projects,
                  and exploring new technologies that push the boundaries of what's possible in computing.
                </p>
                <p className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  San Francisco, CA
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
      <SkillsSection />

      <h2 className="text-3xl font-bold mt-16 mb-8">Education & Experience</h2>
      <Timeline />
    </div>
  )
}

