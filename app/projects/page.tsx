import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getPage } from "@/lib/content"

export const metadata: Metadata = {
  title: "Projects",
  description: "Will Kencel's projects and portfolio.",
}

export default function ProjectsPage() {
  const page = getPage("projects")

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-neutral-900">
        {page.frontmatter.title}
      </h1>
      <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-a:text-[#5C2941] prose-img:rounded-lg">
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
