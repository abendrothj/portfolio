"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchGitHubStats } from "@/lib/github"

interface GitHubStatsData {
  totalRepos: number
  totalStars: number
  totalForks: number
  topLanguages: { name: string; percentage: number }[]
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStatsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getStats = async () => {
      try {
        const data = await fetchGitHubStats()
        setStats(data)
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error)
      } finally {
        setLoading(false)
      }
    }

    getStats()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub Stats</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20" />
              ))}
            </div>
            <Skeleton className="h-40" />
          </div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <span className="text-2xl font-bold">{stats.totalRepos}</span>
                <span className="text-sm text-muted-foreground">Repositories</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <span className="text-2xl font-bold">{stats.totalStars}</span>
                <span className="text-sm text-muted-foreground">Stars</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
                <span className="text-2xl font-bold">{stats.totalForks}</span>
                <span className="text-sm text-muted-foreground">Forks</span>
              </div>
            </div>

            <h3 className="text-sm font-medium mb-3">Top Languages</h3>
            <div className="space-y-3">
              {stats.topLanguages.map((lang) => (
                <div key={lang.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{lang.name}</span>
                    <span>{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${lang.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-muted-foreground">Failed to load GitHub stats</div>
        )}
      </CardContent>
    </Card>
  )
}

