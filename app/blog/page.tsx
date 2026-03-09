import type { Metadata } from "next"
import { getAllPosts } from "@/lib/content"
import PostCard from "@/components/post-card"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog posts about software engineering, technology, and science.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-neutral-900">Blog</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <PostCard
            key={post.frontmatter.slug}
            frontmatter={post.frontmatter}
          />
        ))}
      </div>
    </div>
  )
}
