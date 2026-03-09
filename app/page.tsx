import { getAllPosts } from "@/lib/content"
import PostCard from "@/components/post-card"
import { FaLinkedin, FaGithub } from "react-icons/fa"

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <>
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <img
            src="/assets/WillKencel.2026.headshot.PNG"
            alt="Will Kencel"
            className="mx-auto mb-8 h-36 w-36 rounded-full object-cover"
          />
          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            Will Kencel
          </h1>
          <p className="mt-3 text-xl text-neutral-500">
            Software Engineer at Microsoft
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/will-kencel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 transition-colors hover:text-blue-600"
            >
              <FaLinkedin size={22} />
            </a>
            <a
              href="https://github.com/wkencel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 transition-colors hover:text-blue-600"
            >
              <FaGithub size={22} />
            </a>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-lg text-neutral-600">
            I build software at scale, with a focus on full-stack systems and AI.
            Currently on the Microsoft Teams org.
          </p>
        </div>
      </section>

      <section className="border-t border-neutral-100 bg-neutral-50 py-16">
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
        </div>
      </section>
    </>
  )
}
