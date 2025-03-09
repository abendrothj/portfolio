export interface Project {
  id: number
  name: string
  description: string
  language: string
  topics: string[]
  html_url: string
  homepage: string | null
  isFeatured: boolean
}

