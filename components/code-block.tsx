"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface CodeBlockProps {
  code: string
  language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50">
        <span className="text-sm font-medium">{language}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 w-8 p-0">
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span className="sr-only">{copied ? "Copied" : "Copy code"}</span>
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto bg-muted/30">
        <code className="text-sm">{code}</code>
      </pre>
    </div>
  )
}

