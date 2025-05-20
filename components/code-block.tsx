"use client"

import React from "react"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CodeBlockProps {
  code: string
  language: string
  filename?: string
  highlightLines?: number[]
}

export function CodeBlock({ code, language, filename, highlightLines = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-gray-11 bg-gray-12">
      {filename && <div className="border-b border-gray-11 bg-gray-11 px-4 py-2 text-sm font-medium">{filename}</div>}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-4 z-10 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={copyToClipboard}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        <span className="sr-only">Copy code</span>
      </Button>
      <pre className="overflow-x-auto p-4 text-sm">
        <code className={`language-${language}`}>
          {code.split("\n").map((line, i) => (
            <div key={i} className={cn("px-4 py-0.5", highlightLines.includes(i + 1) && "bg-brand-rose-1/20")}>
              {line || " "}
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}

interface CodeGroupProps {
  children: React.ReactNode
}

export function CodeGroup({ children }: CodeGroupProps) {
  // Assuming children are CodeBlock components
  const childrenArray = React.Children.toArray(children)

  return (
    <Tabs defaultValue="0" className="my-6">
      <TabsList className="w-full justify-start rounded-t-lg rounded-b-none border border-b-0 border-gray-11 bg-gray-11">
        {childrenArray.map((child, index) => {
          const filename = (child as any).props?.filename || `Example ${index + 1}`
          return (
            <TabsTrigger key={index} value={index.toString()} className="rounded-none data-[state=active]:bg-gray-12">
              {filename}
            </TabsTrigger>
          )
        })}
      </TabsList>
      {childrenArray.map((child, index) => (
        <TabsContent key={index} value={index.toString()} className="mt-0 rounded-t-none">
          {child}
        </TabsContent>
      ))}
    </Tabs>
  )
}
