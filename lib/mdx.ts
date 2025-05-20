import type React from "react"
import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"
import { useMDXComponents } from "@/components/mdx-components"

export interface Frontmatter {
  title: string
  description?: string
  date?: string
  tags?: string[]
  [key: string]: any
}

export interface MDXPage {
  frontmatter: Frontmatter
  content: React.ReactElement
  slug: string
}

const contentDir = path.join(process.cwd(), "content")
const components = useMDXComponents({})

export async function getMDXPage(slug: string[]): Promise<MDXPage | null> {
  const filePath = path.join(contentDir, ...slug) + ".mdx"

  try {
    if (!fs.existsSync(filePath)) {
      return null
    }

    const source = fs.readFileSync(filePath, "utf8")

    const { frontmatter, content } = await compileMDX<Frontmatter>({
      source,
      components,
      options: {
        parseFrontmatter: true,
      },
    })

    return {
      frontmatter,
      content,
      slug: slug.join("/"),
    }
  } catch (error) {
    console.error("Error loading MDX file:", error)
    return null
  }
}

export async function getAllMDXPages(directory = ""): Promise<MDXPage[]> {
  const dir = path.join(contentDir, directory)

  if (!fs.existsSync(dir)) {
    return []
  }

  const files = fs.readdirSync(dir)

  const pages = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        return getAllMDXPages(path.join(directory, file))
      }

      if (file.endsWith(".mdx")) {
        const slug = path.join(directory, file.replace(/\.mdx$/, "")).split(path.sep)
        const page = await getMDXPage(slug)
        return page ? [page] : []
      }

      return []
    }),
  )

  return pages.flat().filter(Boolean)
}
