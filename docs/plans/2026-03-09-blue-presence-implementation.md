# Blue Presence Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform willkencel.io from a gray/neutral template into a cohesive blue-accented site with subtle scroll animations and better visual rhythm.

**Architecture:** Pure CSS transitions + a single `FadeIn` client component using Intersection Observer. No new dependencies. All changes are Tailwind class swaps (`neutral-*` to `slate-*`), new blue accent placements, and the FadeIn wrapper.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript

---

### Task 1: Create FadeIn component

**Files:**
- Create: `components/fade-in.tsx`

**Step 1: Create the FadeIn client component**

```tsx
"use client"

import { useEffect, useRef, useState } from "react"

export default function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
```

**Step 2: Verify dev server still runs**

Run: `npm run dev` (should compile without errors)

**Step 3: Commit**

```bash
git add components/fade-in.tsx
git commit -m "feat: add FadeIn component with Intersection Observer"
```

---

### Task 2: Update Header and Navigation (palette + active state)

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/navigation.tsx`

**Step 1: Update Header**

In `components/header.tsx`, change:
- `border-neutral-200` to `border-slate-200`
- `text-neutral-900` to `text-slate-900`

Result:
```tsx
import Link from "next/link"
import Navigation from "./navigation"

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-slate-900 no-underline">
          Will Kencel
        </Link>
        <Navigation />
      </div>
    </header>
  )
}
```

**Step 2: Update Navigation**

In `components/navigation.tsx`, change:
- `text-neutral-900 lg:hidden` to `text-slate-900 lg:hidden`
- `border-neutral-200 bg-white` stays (mobile menu should match header)
- Nav link classes: `text-neutral-500 transition-colors hover:text-neutral-900` to `text-slate-500 transition-colors hover:text-blue-600`

Add active link detection using `usePathname`:

```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav>
      <button
        className="text-slate-900 lg:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
      </button>

      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute right-0 top-full z-50 flex-col border-b border-slate-200 bg-white px-6 py-4 lg:static lg:flex lg:flex-row lg:gap-6 lg:border-0 lg:p-0`}
      >
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block py-2 transition-colors lg:py-0 ${
                isActive(link.href)
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-500 hover:text-blue-600"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

**Step 3: Verify in browser**

Check: nav links should be slate-gray, hover blue, active page has blue underline.

**Step 4: Commit**

```bash
git add components/header.tsx components/navigation.tsx
git commit -m "feat: update header/nav to slate palette with blue active state"
```

---

### Task 3: Update Footer (palette + blue hover)

**Files:**
- Modify: `components/footer.tsx`

**Step 1: Update Footer**

Change:
- `bg-neutral-900` to `bg-slate-900`
- `text-neutral-400` to `text-slate-400`
- `hover:text-white` to `hover:text-blue-400`

Result:
```tsx
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-8 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Will Kencel
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/will-kencel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-blue-400"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/wkencel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-blue-400"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="mailto:wkencel1@gmail.com"
            aria-label="Email"
            className="transition-colors hover:text-blue-400"
          >
            <MdEmail size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: Verify in browser**

Check: footer should have a slightly blue-tinted dark background, icons glow blue on hover.

**Step 3: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: update footer to slate palette with blue hover accents"
```

---

### Task 4: Update PostCard (palette + hover lift)

**Files:**
- Modify: `components/post-card.tsx`

**Step 1: Update PostCard**

Changes:
- Card border: `border-neutral-200` to `border-slate-200`
- Hover: add `hover:-translate-y-1 transition-all duration-200`
- Date: `text-neutral-400` to `text-slate-400`
- Title hover: `hover:text-blue-600` (already correct)
- Title default: `text-neutral-900` to `text-slate-900`
- Description: `text-neutral-500` to `text-slate-500`

Result:
```tsx
import Link from "next/link"
import type { PostFrontmatter } from "@/types/content"

export default function PostCard({
  frontmatter,
}: {
  frontmatter: PostFrontmatter
}) {
  const { title, slug, date, description, featuredImage } = frontmatter

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {featuredImage && (
        <Link href={`/blog/${slug}`}>
          <img
            src={featuredImage}
            alt={title}
            className="w-full"
          />
        </Link>
      )}
      <div className="p-5">
        <time className="text-sm text-slate-400">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h3 className="mt-1 text-lg font-semibold">
          <Link
            href={`/blog/${slug}`}
            className="text-slate-900 no-underline hover:text-blue-600"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
    </article>
  )
}
```

**Step 2: Verify in browser**

Check: cards lift slightly on hover with smooth transition.

**Step 3: Commit**

```bash
git add components/post-card.tsx
git commit -m "feat: update post cards to slate palette with hover lift"
```

---

### Task 5: Update Home page (palette + rhythm + animations)

**Files:**
- Modify: `app/page.tsx`

**Step 1: Update Home page**

Changes:
- Hero section: `py-24` to `bg-slate-50 py-24` (tinted background)
- Heading: `text-neutral-900` to `text-slate-900`
- Subtitle: `text-neutral-500` to `text-slate-500`
- Social icons: `text-neutral-300` to `text-slate-400`
- Bio text: `text-neutral-600` to `text-slate-600`
- Latest Posts section: `border-neutral-100 bg-neutral-50` to `border-slate-100 bg-white`
- Section heading: `text-neutral-900` to `text-slate-900`
- Wrap hero content and post cards in FadeIn

Result:
```tsx
import { getAllPosts } from "@/lib/content"
import PostCard from "@/components/post-card"
import FadeIn from "@/components/fade-in"
import { FaLinkedin, FaGithub } from "react-icons/fa"

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <>
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <img
              src="/assets/WillKencel.2026.headshot.PNG"
              alt="Will Kencel"
              className="mx-auto mb-8 h-36 w-36 rounded-full object-cover"
            />
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">
              Will Kencel
            </h1>
            <p className="mt-3 text-xl text-slate-500">
              Software Engineer at Microsoft
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/will-kencel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-blue-600"
              >
                <FaLinkedin size={22} />
              </a>
              <a
                href="https://github.com/wkencel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 transition-colors hover:text-blue-600"
              >
                <FaGithub size={22} />
              </a>
            </div>
            <p className="mx-auto mt-8 max-w-xl text-lg text-slate-600">
              I build software at scale, with a focus on full-stack systems and
              AI. Currently a Software Engineer at Microsoft.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <h2 className="mb-8 text-2xl font-bold text-slate-900">
              Latest Posts
            </h2>
          </FadeIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, i) => (
              <FadeIn key={post.frontmatter.slug} delay={i * 100}>
                <PostCard frontmatter={post.frontmatter} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
```

**Step 2: Verify in browser**

Check: hero has subtle blue-gray background, cards fade in staggered on scroll, social icons are visible (slate-400 not neutral-300).

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: update home page with slate palette, tinted hero, scroll animations"
```

---

### Task 6: Update Blog listing page (palette + rhythm + animations)

**Files:**
- Modify: `app/blog/page.tsx`

**Step 1: Update Blog listing**

Changes:
- Page background: wrap in `bg-slate-50 min-h-screen` via outer div or change page container
- Heading: `text-neutral-900` to `text-slate-900`
- Wrap heading and cards in FadeIn

Result:
```tsx
import type { Metadata } from "next"
import { getAllPosts } from "@/lib/content"
import PostCard from "@/components/post-card"
import FadeIn from "@/components/fade-in"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog posts about software engineering, technology, and science.",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn>
          <h1 className="mb-8 text-3xl font-bold text-slate-900">Blog</h1>
        </FadeIn>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <FadeIn key={post.frontmatter.slug} delay={i * 100}>
              <PostCard frontmatter={post.frontmatter} />
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Verify in browser**

Check: slate-50 background, white cards pop, staggered fade-in.

**Step 3: Commit**

```bash
git add app/blog/page.tsx
git commit -m "feat: update blog listing with slate bg, fade-in animations"
```

---

### Task 7: Update individual blog post page (palette + blue accent)

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Step 1: Update blog post page**

Changes:
- Date: `text-neutral-500` to `text-slate-500`
- Title: `text-neutral-900` to `text-slate-900`
- Prose headings: `prose-headings:text-neutral-900` to `prose-headings:text-slate-900`
- Header block: add `border-l-4 border-blue-600 pl-4` for blue accent line

In the return JSX only (don't change generateStaticParams or generateMetadata), update:

```tsx
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-8 border-l-4 border-blue-600 pl-4">
        <time className="text-sm text-slate-500">
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">
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

      <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
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
```

**Step 2: Verify in browser**

Navigate to a blog post. Check: blue left border accent on header, slate text colors.

**Step 3: Commit**

```bash
git add app/blog/\[slug\]/page.tsx
git commit -m "feat: update blog post page with blue accent line and slate palette"
```

---

### Task 8: Update Projects page (palette + blue tags + rhythm + animations)

**Files:**
- Modify: `app/projects/page.tsx`

**Step 1: Update Projects page**

Changes:
- Page background: `bg-slate-50`
- Page heading: `text-neutral-900` to `text-slate-900`
- Card borders: `border-neutral-200` to `border-slate-200`
- Card hover: add `transition-all duration-200 hover:border-blue-300 hover:-translate-y-1 hover:shadow-md`
- Project title: `text-neutral-900` to `text-slate-900`
- Description: `text-neutral-600` to `text-slate-600`
- Tech tags: `bg-neutral-100 text-neutral-600` to `bg-blue-50 text-blue-700`
- Open Source heading: `text-neutral-900` to `text-slate-900`
- GitHub icon: `text-neutral-400 hover:text-blue-600` (already correct)
- Open Source separator: add `border-t border-slate-200 pt-12`
- Wrap in FadeIn

Result:
```tsx
import type { Metadata } from "next"
import { FaGithub } from "react-icons/fa"
import FadeIn from "@/components/fade-in"

export const metadata: Metadata = {
  title: "Projects",
  description: "Will Kencel's projects and portfolio.",
}

const projects = [
  {
    title: "Xbox PC Gaming & Handhelds",
    company: "Microsoft",
    description:
      "Delivered 40+ features serving 50M+ monthly active users across PC and handheld devices including the ROG ALLY release. Spearheaded subscription compliance infrastructure impacting $30M+ annual revenue across 7 countries. Sole engineer driving multiple end-to-end user-facing features integrating with broader runtime services.",
    tech: ["React", "React Native", "TypeScript", "C#/.NET", "Azure", "Kusto"],
  },
  {
    title: "Aurora Technologies",
    company: "Founder",
    description:
      "Founded a software consultancy helping companies build full-stack applications and integrate AI tools. Notable client work includes Property.com, an AI-driven platform with LLM-powered function-calling, vector database, and conversational memory using OpenAI + LangChain, and OpenMotionAI, a physical therapy app leveraging ML and computer vision with AWS microservices.",
    tech: ["Python", "LangChain", "React Native", "AWS", "OpenAI", "Computer Vision"],
  },
  {
    title: "Xbox Payments",
    company: "Microsoft",
    description:
      "Built, tested, and shipped the Xbox global payments application to 100M+ users across 120+ countries and 200+ languages. Developed React/React Native SDKs with 30+ reusable components. Created an internal automated testing framework covering 20+ user flows. Migrated React to React Native, reducing payment flow latency by 400%.",
    tech: ["React", "React Native", "TypeScript", "C#/.NET", "Selenium", "Azure"],
  },
]

const openSource = {
  title: "Venus",
  org: "OSLabs",
  description: "Open source microservice monitoring tool with real-time data visualization dashboards.",
  tech: ["React", "Node.js", "D3/VisX", "WebSockets"],
  github: "https://github.com/oslabs-beta/venus",
}

export default function ProjectsPage() {
  return (
    <div className="bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <h1 className="mb-12 text-3xl font-bold text-slate-900">Projects</h1>
        </FadeIn>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 100}>
              <article className="rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
                <div className="mb-1 text-sm font-medium text-blue-600">
                  {project.company}
                </div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {project.title}
                </h2>
                <p className="mt-3 text-slate-600">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-12">
          <FadeIn>
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Open Source
            </h2>
            <article className="rounded-xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-1 text-sm font-medium text-blue-600">
                    {openSource.org}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {openSource.title}
                  </h3>
                </div>
                <a
                  href={openSource.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-blue-600"
                  aria-label="GitHub"
                >
                  <FaGithub size={20} />
                </a>
              </div>
              <p className="mt-2 text-slate-600">{openSource.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {openSource.tech.map(t => (
                  <span
                    key={t}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
```

**Step 2: Verify in browser**

Check: blue-tinted tech tags, slate-50 background, cards hover with blue border tint, staggered fade-in.

**Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat: update projects page with blue tags, slate bg, animations"
```

---

### Task 9: Update About page (palette + blue accent + animation)

**Files:**
- Modify: `app/about/page.tsx`

**Step 1: Update About page**

Changes:
- Heading: `text-neutral-900` to `text-slate-900`
- Prose: `prose-headings:text-neutral-900` to `prose-headings:text-slate-900`
- Add decorative blue accent line under heading
- Wrap in FadeIn

Result:
```tsx
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { getPage } from "@/lib/content"
import FadeIn from "@/components/fade-in"

export const metadata: Metadata = {
  title: "About",
  description: "About Will Kencel - Software Engineer at Microsoft.",
}

export default function AboutPage() {
  const page = getPage("about")

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <h1 className="text-3xl font-bold text-slate-900">
          {page.frontmatter.title}
        </h1>
        <div className="mt-4 h-1 w-12 rounded bg-blue-600" />
      </FadeIn>
      <FadeIn delay={100}>
        <div className="mt-8 prose prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
          <MDXRemote
            source={page.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </FadeIn>
    </div>
  )
}
```

**Step 2: Verify in browser**

Check: blue accent bar under "About" heading, content fades in.

**Step 3: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: update about page with blue accent line and fade-in"
```

---

### Task 10: Visual review with Playwright screenshots

**Files:** None (verification only)

**Step 1: Take screenshots of all pages**

Use Playwright to navigate to each page and take full-page screenshots:
- http://localhost:3000 (home)
- http://localhost:3000/blog (blog listing)
- http://localhost:3000/blog/bunjs (blog post)
- http://localhost:3000/projects (projects)
- http://localhost:3000/about (about)

**Step 2: Review each screenshot for**

- Slate palette applied consistently (no remaining `neutral-*` artifacts)
- Blue accent visible in: nav active state, tech tags, social hovers, blog post accent line, about accent line
- Cards have hover lift effect
- Section backgrounds create visual rhythm (slate-50 vs white)
- No broken layouts or missing elements

**Step 3: Fix any issues found**

If any `neutral-*` classes remain or visual issues spotted, fix and commit.

**Step 4: Final commit if fixes needed**

```bash
git commit -m "fix: visual polish from screenshot review"
```
