export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  description: string
  featuredImage?: string
}

export interface Post {
  frontmatter: PostFrontmatter
  content: string
}

export interface PageFrontmatter {
  title: string
  description?: string
}

export interface Page {
  frontmatter: PageFrontmatter
  content: string
}
