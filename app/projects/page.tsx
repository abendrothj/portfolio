"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, ExternalLink } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchGitHubProjects } from "@/lib/github"
import type { Project } from "@/types/project"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchGitHubProjects()
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoading(false)
      }
    }

    getProjects()
  }, [])

  const categories = ["all", "rust", "python", "c-cpp", "cybersecurity", "systems"]

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.topics.includes(filter) || project.language?.toLowerCase() === filter)

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">My Projects</h1>
      <p className="text-muted-foreground mb-8">A collection of my open-source work and personal projects</p>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} onClick={() => setFilter(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1).replace("-", "/")}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={filter}>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-24 w-full" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects found with this filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProjects.map((project) => (
                    <Card key={project.id} className="flex flex-col h-full">
                      <CardHeader>
                        <CardTitle className="flex items-start justify-between">
                          <span>{project.name}</span>
                          {project.language && <Badge variant="outline">{project.language}</Badge>}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.topics.map((topic) => (
                            <Badge key={topic} variant="secondary">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button asChild variant="outline" size="sm">
                          <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            Repository
                          </a>
                        </Button>
                        {project.homepage && (
                          <Button asChild variant="outline" size="sm">
                            <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Demo
                            </a>
                          </Button>
                        )}
                        {project.isFeatured && (
                          <Button asChild size="sm">
                            <Link href={`/projects/${project.name.toLowerCase()}`}>Case Study</Link>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

