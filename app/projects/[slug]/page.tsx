import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import { getProjectBySlug, projectDetails } from "@/lib/projects"
import CodeBlock from "@/components/code-block"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

// Add this function to generate static paths
export async function generateStaticParams() {
  return projectDetails.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
            <p className="text-xl text-muted-foreground">{project.description}</p>
          </div>
          <div className="flex gap-4">
            <Button asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
            {project.demoUrl && (
              <Button asChild variant="outline">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Status</h3>
                  <p className="font-medium">{project.status}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Started</h3>
                  <p className="font-medium">{project.startDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h3>
                  <p className="font-medium">{project.lastUpdated}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Primary Language</h3>
                  <p className="font-medium">{project.primaryLanguage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h2>Overview</h2>
        <p>{project.overview}</p>

        <h2>Problem Statement</h2>
        <p>{project.problemStatement}</p>

        <h2>Solution</h2>
        <p>{project.solution}</p>

        {project.codeSnippets && project.codeSnippets.length > 0 && (
          <>
            <h2>Key Implementation</h2>
            {project.codeSnippets.map((snippet, index) => (
              <div key={index} className="my-6">
                <h3>{snippet.title}</h3>
                <p>{snippet.description}</p>
                <CodeBlock code={snippet.code} language={snippet.language || "rust"} />
              </div>
            ))}
          </>
        )}

        {project.benchmarks && (
          <>
            <h2>Performance Benchmarks</h2>
            <p>{project.benchmarks.description}</p>
            <div className="not-prose">
              <div className="bg-muted rounded-lg p-6 my-6">
                <h3 className="text-xl font-semibold mb-4">Benchmark Results</h3>
                <div className="space-y-4">
                  {project.benchmarks.results.map((result, index) => (
                    <div key={index}>
                      <h4 className="font-medium">{result.name}</h4>
                      <p className="text-muted-foreground mb-2">{result.description}</p>
                      <div className="w-full bg-secondary rounded-full h-4">
                        <div className="bg-primary h-4 rounded-full" style={{ width: `${result.percentage}%` }}></div>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span>{result.value}</span>
                        <span>{result.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        <h2>Challenges & Learnings</h2>
        <p>{project.challenges}</p>

        <h2>Future Improvements</h2>
        <ul>
          {project.futureImprovements.map((improvement, index) => (
            <li key={index}>{improvement}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

