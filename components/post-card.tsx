import Link from "next/link"
import type { PostFrontmatter } from "@/types/content"

export default function PostCard({
  frontmatter,
}: {
  frontmatter: PostFrontmatter
}) {
  const { title, slug, date, description, featuredImage } = frontmatter

  return (
    <article className="overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-md">
      {featuredImage && (
        <Link href={`/blog/${slug}`}>
          <img
            src={featuredImage}
            alt={title}
            className="h-48 w-full object-cover"
          />
        </Link>
      )}
      <div className="p-5">
        <time className="text-sm text-neutral-400">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h3 className="mt-1 text-lg font-semibold">
          <Link
            href={`/blog/${slug}`}
            className="text-neutral-900 no-underline hover:text-blue-600"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-neutral-500">{description}</p>
      </div>
    </article>
  )
}
