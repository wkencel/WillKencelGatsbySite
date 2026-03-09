import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getPage } from "@/lib/content"

export const metadata: Metadata = {
  title: "About",
  description: "About Will Kencel - Software Engineer at Microsoft.",
}

export default function AboutPage() {
  const page = getPage("about")

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-neutral-900">
        {page.frontmatter.title}
      </h1>
      <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
        <MDXRemote
          source={page.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </div>
  )
}
