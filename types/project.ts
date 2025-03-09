export interface Project {
  id: number
  name: string
  description: string | null
  language: string | null
  topics: string[]
  html_url: string
  homepage: string | null
  isFeatured?: boolean
}

