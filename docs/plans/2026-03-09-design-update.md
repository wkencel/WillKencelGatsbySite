# Design & Content Update Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update the Next.js site's design from a junior portfolio template to a clean, minimal, senior engineer's professional brand.

**Architecture:** Update Tailwind classes across existing components, rewrite content pages, replace MDX projects page with a TypeScript data-driven card layout. No structural changes to the app — same pages, same routing.

**Tech Stack:** Same as migration (Next.js 16, React 19, TypeScript, Tailwind CSS v4, next-mdx-remote)

---

### Task 1: Update Color Scheme and Header

**Files:**
- Modify: `components/header.tsx`
- Modify: `components/navigation.tsx`
- Modify: `app/globals.css`

**Step 1: Update the Header to white background with border**

Modify `components/header.tsx`:
```tsx
import Navigation from "./navigation"

export default function Header() {
  return (
    <header className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold text-neutral-900 no-underline">
          Will Kencel
        </a>
        <Navigation />
      </div>
    </header>
  )
}
```

**Step 2: Update Navigation colors**

Modify `components/navigation.tsx`:
```tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { RiMenu3Line, RiCloseLine } from "react-icons/ri"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
]

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav>
      <button
        className="text-neutral-900 lg:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
      </button>

      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute right-0 top-full z-50 flex-col border-b border-neutral-200 bg-white px-6 py-4 lg:static lg:flex lg:flex-row lg:gap-6 lg:border-0 lg:p-0`}
      >
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-2 text-neutral-500 transition-colors hover:text-neutral-900 lg:py-0"
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

**Step 3: Commit**

```bash
git add components/header.tsx components/navigation.tsx
git commit -m "feat: update header and nav to white/neutral color scheme"
```

---

### Task 2: Update Footer

**Files:**
- Modify: `components/footer.tsx`

**Step 1: Update footer accent colors**

Modify `components/footer.tsx` — keep the dark background but update hover colors to blue:
```tsx
import { FaLinkedin, FaGithub } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function Footer() {
  return (
    <footer className="bg-neutral-900 py-8 text-neutral-400">
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
            className="transition-colors hover:text-white"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://github.com/wkencel"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-white"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="mailto:wkencel1@gmail.com"
            aria-label="Email"
            className="transition-colors hover:text-white"
          >
            <MdEmail size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
```

**Step 2: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: update footer styling"
```

---

### Task 3: Redesign Home Page

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/post-card.tsx`
- Modify: `app/layout.tsx` (update metadata description)

**Step 1: Update PostCard with blue accent**

Modify `components/post-card.tsx`:
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
```

**Step 2: Redesign the Home page**

Replace `app/page.tsx`:
```tsx
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
```

**Step 3: Update root layout metadata**

In `app/layout.tsx`, update the metadata:
```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://willkencel.io"),
  title: {
    default: "Will Kencel",
    template: "%s | Will Kencel",
  },
  description:
    "Will Kencel — Software Engineer at Microsoft. Writing about software engineering, AI, and technology.",
  openGraph: {
    title: "Will Kencel",
    description: "Software Engineer at Microsoft",
    url: "https://willkencel.io",
    siteName: "Will Kencel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@captkubernetes",
  },
}
```

**Step 4: Verify**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add app/page.tsx components/post-card.tsx app/layout.tsx
git commit -m "feat: redesign home page with clean minimal style"
```

---

### Task 4: Rebuild Projects Page as Card Layout

**Files:**
- Modify: `app/projects/page.tsx`

**Step 1: Replace the MDX projects page with a data-driven card layout**

Replace `app/projects/page.tsx`:
```tsx
import type { Metadata } from "next"
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa"

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
      "Founded a software consultancy helping companies build full-stack applications and integrate AI tools. Notable client work includes Property.com — an AI-driven platform with LLM-powered function-calling, vector database, and conversational memory using OpenAI + LangChain — and OpenMotionAI, a physical therapy app leveraging ML and computer vision with AWS microservices.",
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
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-12 text-3xl font-bold text-neutral-900">Projects</h1>

      <div className="space-y-8">
        {projects.map(project => (
          <article
            key={project.title}
            className="rounded-xl border border-neutral-200 bg-white p-6"
          >
            <div className="mb-1 text-sm font-medium text-blue-600">
              {project.company}
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">
              {project.title}
            </h2>
            <p className="mt-3 text-neutral-600">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Open Source
        </h2>
        <article className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-1 text-sm font-medium text-blue-600">
                {openSource.org}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {openSource.title}
              </h3>
            </div>
            <a
              href={openSource.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-blue-600"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
          </div>
          <p className="mt-2 text-neutral-600">{openSource.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {openSource.tech.map(t => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
              >
                {t}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
```

**Step 2: Verify**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add app/projects/page.tsx
git commit -m "feat: rebuild projects page with structured cards"
```

---

### Task 5: Rewrite About Page

**Files:**
- Modify: `content/pages/about.mdx`

**Step 1: Replace about.mdx content**

Replace `content/pages/about.mdx`:
```mdx
---
title: About
description: About Will Kencel - Software Engineer at Microsoft
---

I'm a Software Engineer at Microsoft on the Teams org with 6+ years of experience building large-scale systems. My work spans the full stack — React, React Native, TypeScript, C#/.NET, Python, and Go — with a focus on shipping software that serves millions of users. Previously, I worked on Xbox Payments (100M+ users, 120+ countries) and Xbox PC Gaming & Handhelds (50M+ MAU, ROG ALLY release), where I led features with $30M+ annual revenue impact.

Between my two stints at Microsoft, I founded Aurora Technologies, a software consultancy where I helped companies build full-stack applications and integrate AI tools — from LLM-powered platforms with function-calling and vector databases to ML-driven physical therapy apps using computer vision.

I hold an MS in Artificial Intelligence from the University of San Diego and a BS in Physics and Music from Skidmore College. I'm a lead instructor at Codesmith, where I teach advanced courses on LLMs, RAG pipelines, embeddings, and agentic systems. Outside of work, you'll find me hiking, rock climbing, or on an adventure with my bernedoodle, Coda.
```

**Step 2: Update about page component to use blue accent**

Modify `app/about/page.tsx` — update the prose accent color:
```tsx
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
```

**Step 3: Verify**

```bash
npm run build
```

**Step 4: Commit**

```bash
git add content/pages/about.mdx app/about/page.tsx
git commit -m "feat: rewrite about page with updated professional bio"
```

---

### Task 6: Update Blog Post Page Accent Color

**Files:**
- Modify: `app/blog/[slug]/page.tsx`

**Step 1: Update prose accent from maroon to blue**

In `app/blog/[slug]/page.tsx`, change the prose div class:
```
prose-a:text-[#5C2941]
```
to:
```
prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
```

**Step 2: Verify**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add app/blog/
git commit -m "feat: update blog post accent color to blue"
```

---

### Task 7: Update 404 Page Accent Color

**Files:**
- Modify: `app/not-found.tsx`

**Step 1: Update button color from maroon to blue**

In `app/not-found.tsx`, change:
```
bg-[#5C2941]
```
to:
```
bg-blue-600
```

And change:
```
hover:bg-[#7a3558]
```
to:
```
hover:bg-blue-700
```

**Step 2: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: update 404 page accent color"
```

---

### Task 8: Final Build Verification

**Step 1: Clean and rebuild**

```bash
rm -rf out .next
npm run build
```
Expected: Build completes with no errors, all pages generated.

**Step 2: Start dev server and verify all pages**

```bash
npm run dev
```

Check each page:
- `/` — New hero with updated headshot, "Software Engineer at Microsoft", blue accents
- `/projects` — Card layout with 3 main projects + Venus open source
- `/about` — Rewritten 3-paragraph bio
- `/blog` — Card grid with blue hover accents
- `/blog/bunjs` — Blog post with blue link accents
- Random URL — 404 with blue button

**Step 3: Commit final state**

```bash
git add -A
git commit -m "feat: complete design update - clean minimal style with blue accents"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Update header/nav to white bg | `components/header.tsx`, `components/navigation.tsx` |
| 2 | Update footer | `components/footer.tsx` |
| 3 | Redesign home page | `app/page.tsx`, `components/post-card.tsx`, `app/layout.tsx` |
| 4 | Rebuild projects as cards | `app/projects/page.tsx` |
| 5 | Rewrite about page | `content/pages/about.mdx`, `app/about/page.tsx` |
| 6 | Update blog accent color | `app/blog/[slug]/page.tsx` |
| 7 | Update 404 accent color | `app/not-found.tsx` |
| 8 | Final build verification | Full build + manual testing |
