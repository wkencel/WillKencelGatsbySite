import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Post, PostFrontmatter, Page, PageFrontmatter } from "@/types/content"

const POSTS_DIR = path.join(process.cwd(), "content", "posts")
const PAGES_DIR = path.join(process.cwd(), "content", "pages")

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".mdx"))

  const posts = files.map(filename => {
    const filePath = path.join(POSTS_DIR, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return {
      frontmatter: data as PostFrontmatter,
      content,
    }
  })

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  )
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts()
  return posts.find(post => post.frontmatter.slug === slug)
}

export function getPage(name: string): Page {
  const filePath = path.join(PAGES_DIR, `${name}.mdx`)
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return {
    frontmatter: data as PageFrontmatter,
    content,
  }
}
