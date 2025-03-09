import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileDown } from "lucide-react"

export const metadata = {
  title: "Resume | Jake Abendroth",
  description: "View and download Jake Abendroth's resume",
}

export default function ResumePage() {
  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">Resume</h1>
        <Button asChild>
          <a href="/jake_abendroth_resume.pdf" download>
            <FileDown className="mr-2 h-5 w-5" />
            Download PDF
          </a>
        </Button>
      </div>

      <Card className="w-full overflow-hidden">
        <div className="aspect-[8.5/11] w-full">
          <iframe src="/jake_abendroth_resume.pdf" className="w-full h-full border-0" title="Jake Abendroth's Resume" />
        </div>
      </Card>
    </div>
  )
}

