"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileDown, ExternalLink } from "lucide-react"

export default function ResumePage() {
  const [pdfError, setPdfError] = useState(false)
  const resumePath = "/jake_abendroth_resume.pdf"

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">Resume</h1>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <a 
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              View PDF
            </a>
          </Button>
          <Button asChild>
            <a 
              href={resumePath}
              download="jake_abendroth_resume.pdf"
            >
              <FileDown className="mr-2 h-5 w-5" />
              Download
            </a>
          </Button>
        </div>
      </div>

      <Card className="w-full overflow-hidden bg-muted/50">
        <div className="aspect-[8.5/11] w-full relative">
          {pdfError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <p className="text-lg font-medium mb-4">Unable to display PDF preview</p>
              <p className="text-sm text-muted-foreground mb-6">
                Please use the buttons above to view or download the PDF directly
              </p>
              <Button asChild variant="outline">
                <a 
                  href={resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-5 w-5" />
                  Open PDF in New Tab
                </a>
              </Button>
            </div>
          ) : (
            <object
              data={resumePath}
              type="application/pdf"
              className="w-full h-full"
              onError={() => setPdfError(true)}
            >
              <embed
                src={resumePath}
                type="application/pdf"
                className="w-full h-full"
              />
            </object>
          )}
        </div>
      </Card>
    </div>
  )
}

