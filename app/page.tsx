"use client"

import Link from "next/link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import BackgroundPattern from "@/components/background-pattern"
import TypingEffect from "@/components/typing-effect"
import SkillsSection from "@/components/skills-section"
import { Github, FileText, ExternalLink, ChevronRight, Cpu, Shield, Code2, Terminal } from "lucide-react"

export default function Home() {
  // Add terminal demo animation
  useEffect(() => {
    const terminalDemo = document.getElementById("terminal-demo")
    if (!terminalDemo) return

    const lines = Array.from(terminalDemo.children)
    lines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.remove("opacity-0")
      }, index * 300)
    })
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <BackgroundPattern />
      </div>

      {/* Hero section */}
      <section className="relative z-10 container max-w-5xl mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Jake Abendroth</h1>
        <h2 className="text-xl md:text-2xl text-muted-foreground mb-8">
          Software Developer | Systems & Cybersecurity Specialist
        </h2>
        <div className="mb-8 h-12">
          <TypingEffect
            phrases={[
              "Building secure, efficient systems",
              "Developing in Rust, C/C++, Python, and Java",
              "Focusing on low-level programming",
              "Creating open-source security tools",
              "Based in San Francisco, CA",
            ]}
          />
        </div>
        <p className="text-lg max-w-2xl mb-10">
          I'm a versatile developer with expertise across multiple domains, with a particular passion for systems
          programming and cybersecurity. Currently studying Computer Science at the University of San Francisco.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/projects">View My Projects</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://github.com/abendrothj" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/resume">
              <FileText className="mr-2 h-5 w-5" />
              Resume
            </Link>
          </Button>
        </div>
      </section>

      {/* About section with emphasis on multiple areas */}
      <section className="relative z-10 py-16 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">About Me</h2>
              <p className="text-lg mb-4">
                I'm a software developer with a diverse skill set spanning multiple domains, from web development to
                embedded systems.
              </p>
              <p className="text-lg mb-6">
                My true passion lies in <span className="font-semibold">systems programming</span> and
                <span className="font-semibold"> cybersecurity</span>, where I enjoy building efficient, secure, and
                reliable software that operates close to the hardware.
              </p>
              <Button asChild variant="outline">
                <Link href="/about" className="group">
                  Learn more about me
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
            <div className="bg-card rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Areas of Expertise</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-medium">Systems Programming</span>
                    <p className="text-sm text-muted-foreground">
                      Building efficient, low-level software that interacts directly with hardware
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-medium">Cybersecurity</span>
                    <p className="text-sm text-muted-foreground">
                      Developing secure systems and tools for threat detection and prevention
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-medium">Software Development</span>
                    <p className="text-sm text-muted-foreground">
                      Creating applications across various domains with a focus on performance
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 p-1 rounded-full bg-primary/10 text-primary mt-0.5">
                    <Terminal className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-medium">Linux & Command Line</span>
                    <p className="text-sm text-muted-foreground">
                      Proficient in Unix-based systems, shell scripting, and system administration
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills section */}
      <section className="relative z-10 py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Technical Skills</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            My technical expertise spans multiple domains, with particular depth in systems programming, cybersecurity,
            and low-level development.
          </p>

          <SkillsSection />
        </div>
      </section>

      {/* Terminal demo */}
      <section className="relative z-10 py-16 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Argus: File Integrity Monitor</h2>
              <p className="text-lg mb-4">
                Argus is a high-performance file integrity monitor built in Rust that recursively scans directories and
                calculates SHA-256 checksums to detect unauthorized modifications.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Recursively scan directories and subdirectories</li>
                <li>Calculate SHA-256 checksums for each file</li>
                <li>Output results in NDJSON format</li>
                <li>Support for command-line arguments</li>
              </ul>
              <Button asChild>
                <a href="https://github.com/abendrothj/argus" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </a>
              </Button>
            </div>
            <div className="bg-black rounded-lg p-4 font-mono text-sm text-green-400 h-80 overflow-hidden">
              <div className="terminal-content h-full overflow-y-auto" id="terminal-demo">
                <div className="opacity-0 animate-pulse">$ ./argus --scan /home/user/documents</div>
                <div className="opacity-0 mt-2">[INFO] Argus File Integrity Monitor v1.0.0</div>
                <div className="opacity-0">[INFO] Scanning directory: /home/user/documents</div>
                <div className="opacity-0">[INFO] Found 1,248 files to process</div>
                <div className="opacity-0">[INFO] Calculating checksums: ████████████████████ 100%</div>
                <div className="opacity-0">[INFO] Writing results to output.ndjson</div>
                <div className="opacity-0 mt-2">[INFO] Sample output:</div>
                <div className="opacity-0 text-yellow-300">
                  {"{"}
                  "path":"/home/user/documents/config.json","hash":"e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                  {"}"}
                </div>
                <div className="opacity-0 text-yellow-300">
                  {"{"}
                  "path":"/home/user/documents/report.pdf","hash":"f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2"
                  {"}"}
                </div>
                <div className="opacity-0 mt-2">[INFO] Completed in 3.42 seconds</div>
                <div className="opacity-0 animate-pulse mt-2">_</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects preview */}
      <section className="relative z-10 py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video relative bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&auto=format&fit=crop&q=80"
                  alt="Argus Project Preview"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                    e.currentTarget.alt = "Argus Project (Placeholder)"
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Argus</h3>
                <p className="text-muted-foreground mb-4">
                  A directory checksum/monitoring tool built in Rust that recursively scans directories and calculates
                  SHA-256 checksums.
                </p>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/projects/argus">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video relative bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80"
                  alt="BaseX Project Preview"
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                    e.currentTarget.alt = "BaseX Project (Placeholder)"
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">BaseX</h3>
                <p className="text-muted-foreground mb-4">
                  A Base8/Base32/Base64 encoder/decoder implemented in C for efficient file encoding and decoding.
                </p>
                <div className="flex justify-end">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/projects/basex">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Learn More
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button asChild>
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

