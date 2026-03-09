import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypePrismPlus from "rehype-prism-plus"
import { getAllPosts, getPostBySlug } from "@/lib/content"

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(post => ({ slug: post.frontmatter.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      images: post.frontmatter.featuredImage
        ? [post.frontmatter.featuredImage]
        : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { frontmatter, content } = post

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-8">
        <time className="text-sm text-neutral-500">
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-2 text-4xl font-bold text-neutral-900">
          {frontmatter.title}
        </h1>
      </header>

      {frontmatter.featuredImage && (
        <img
          src={frontmatter.featuredImage}
          alt={frontmatter.title}
          className="mb-8 w-full rounded-lg"
        />
      )}

      <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
        <MDXRemote
          source={content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug, rehypePrismPlus],
            },
          }}
        />
      </div>
    </article>
  )
}
