import Link from "next/link"
import { getAllPosts } from "@/lib/content"
import PostCard from "@/components/post-card"
import { FaLinkedin, FaGithub } from "react-icons/fa"

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <>
      {/* Hero Section */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <img
            src="/assets/WillK.headshot.closeup.jpeg"
            alt="Will Kencel"
            className="mx-auto mb-6 h-32 w-32 rounded-full object-cover"
          />
          <h1 className="text-4xl font-bold text-neutral-900">Will Kencel</h1>
          <p className="mt-2 text-xl text-neutral-600">
            Software Engineer
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/will-kencel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-[#5C2941]"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="https://github.com/wkencel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-[#5C2941]"
            >
              <FaGithub size={24} />
            </a>
          </div>
          <div className="mt-6">
            <Link
              href="/about"
              className="inline-block rounded-lg bg-[#5C2941] px-6 py-3 text-white no-underline transition-colors hover:bg-[#7a3558]"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-8 text-2xl font-bold text-neutral-900">
            Latest Posts
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map(post => (
              <PostCard
                key={post.frontmatter.slug}
                frontmatter={post.frontmatter}
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="text-[#5C2941] hover:underline"
            >
              View all posts
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
