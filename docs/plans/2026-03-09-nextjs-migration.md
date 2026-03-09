# Next.js Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate Will Kencel's personal site from Gatsby 4 to Next.js 15 with App Router, Tailwind CSS, and MDX content.

**Architecture:** Static-export Next.js 15 site using App Router. Content lives as MDX files in `content/`, processed by `gray-matter` + `next-mdx-remote`. Tailwind CSS v4 for styling. Deployed as static HTML to S3/CloudFront.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, next-mdx-remote, gray-matter, rehype-prism-plus, remark-gfm, next-sitemap, react-icons

---

### Task 1: Initialize Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.mjs`, `.prettierrc`, `.gitignore`

**Step 1: Create a new Next.js project in a separate directory**

Run from parent directory:
```bash
npx create-next-app@latest willkencel-nextjs --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack
```

**Step 2: Move into the new project and verify it runs**

```bash
cd willkencel-nextjs
npm run dev
```
Expected: Dev server starts on localhost:3000 with the default Next.js page.

**Step 3: Configure `.prettierrc` to match existing style**

Create `.prettierrc`:
```json
{
  "arrowParens": "avoid",
  "semi": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Step 4: Configure `next.config.mjs` for static export**

```ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

Note: Rename `next.config.ts` to `next.config.mjs` if create-next-app generated `.ts`. The static export config with `output: "export"` and `images.unoptimized: true` is required for S3 deployment.

**Step 5: Install additional dependencies**

```bash
npm install next-mdx-remote gray-matter rehype-prism-plus rehype-slug remark-gfm react-icons next-sitemap
npm install -D prettier prettier-plugin-tailwindcss @tailwindcss/typography
```

**Step 6: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Next.js 15 project with Tailwind and MDX deps"
```

---

### Task 2: Set Up Content Utilities

**Files:**
- Create: `lib/content.ts`
- Create: `types/content.ts`

**Step 1: Create content types**

Create `types/content.ts`:
```ts
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
```

**Step 2: Create content loading utilities**

Create `lib/content.ts`:
```ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import type { Post, PostFrontmatter, Page, PageFrontmatter } from "@/types/content"

const POSTS_DIR = path.join(process.cwd(), "content", "posts")
const PAGES_DIR = path.join(process.cwd(), "content", "pages")

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".mdx"))

  const posts = files.map(filename => {
    const filePath = path.join(POSTS_DIR, filename)
    const fileContent = fs.readFileSync(filePath, "utf-8")
    const { data, content } = matter(fileContent)

    return {
      frontmatter: data as PostFrontmatter,
      content,
    }
  })

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  )
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts()
  return posts.find(post => post.frontmatter.slug === slug)
}

export function getPage(name: string): Page {
  const filePath = path.join(PAGES_DIR, `${name}.mdx`)
  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return {
    frontmatter: data as PageFrontmatter,
    content,
  }
}
```

**Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: No errors

**Step 4: Commit**

```bash
git add lib/ types/
git commit -m "feat: add content loading utilities and types"
```

---

### Task 3: Migrate Content Files

**Files:**
- Create: `content/posts/blue-origin.mdx` (from `src/content/posts/first-post.md`)
- Create: `content/posts/bunjs.mdx` (from `src/content/posts/bun.md`)
- Create: `content/posts/hermes-react-native.mdx` (from `src/content/posts/hermes_reactNative.md`)
- Create: `content/posts/nfts.mdx` (from `src/content/posts/NFTs.md`)
- Create: `content/pages/home.mdx` (from `src/content/pages/index.md`)
- Create: `content/pages/about.mdx` (from `src/content/pages/about.md`)
- Create: `content/pages/projects.mdx` (from `src/content/pages/projects.md`)
- Copy: `static/assets/*` -> `public/assets/`

**Step 1: Create content directories**

```bash
mkdir -p content/posts content/pages
```

**Step 2: Copy and rename post files from the Gatsby repo**

Copy each post from the old repo's `src/content/posts/` to `content/posts/`. For each file:
1. Rename `.md` to `.mdx`
2. Remove `template: blog-post` from frontmatter
3. Change `slug` from `/bunjs` to `bunjs` (remove leading slash)
4. Fix image paths: change `../assets/` to `/assets/` (they'll resolve from `public/`)

Example transformed frontmatter for `content/posts/bunjs.mdx`:
```yaml
---
title: Bun.js - What It Is and What are its Implications for Software Engineers
slug: bunjs
date: 2023-11-03
description: Bun.js
featuredImage: /assets/bun.image.1.png
---
```

Example transformed frontmatter for `content/posts/blue-origin.mdx`:
```yaml
---
title: Blue Origin and Beyond
slug: blue-origin-bezos
date: 2021-03-07
description: Blue Origin
featuredImage: /assets/blueoriginlogo.png
---
```

For image references in markdown body, replace `../assets/` and `../../assets/` with `/assets/`.

**Step 3: Copy and transform page files**

For `content/pages/home.mdx`:
```yaml
---
title: Will Kencel
description: Will Kencel's personal website and blog
---
```
Keep the body content minimal — the home page layout will be mostly in the component.

For `content/pages/about.mdx`:
```yaml
---
title: About Me
description: About Will Kencel - Software Engineer at Microsoft
---
```
Keep the full body content. Fix image paths from `../../assets/` to `/assets/`.

For `content/pages/projects.mdx`:
```yaml
---
title: Projects
description: Will Kencel's projects and portfolio
---
```
Keep the full body content. Fix image paths from `../assets/` to `/assets/`.

**Step 4: Copy static assets**

```bash
cp -r <gatsby-repo>/static/assets/ public/assets/
```

Also copy `static/favicon.ico` to `app/favicon.ico` (Next.js convention).

**Step 5: Verify content loads**

Create a temporary test script or verify via the dev server in the next task.

**Step 6: Commit**

```bash
git add content/ public/assets/
git commit -m "feat: migrate content files and static assets from Gatsby"
```

---

### Task 4: Build Root Layout and Shared Components

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `components/header.tsx`
- Create: `components/navigation.tsx` (client component)
- Create: `components/footer.tsx`

**Step 1: Set up global styles**

Modify `app/globals.css`:
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

**Step 2: Create the Header component**

Create `components/header.tsx`:
```tsx
import Navigation from "./navigation"

export default function Header() {
  return (
    <header className="bg-[#5C2941] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="text-xl font-bold text-white no-underline">
          Will Kencel
        </a>
        <Navigation />
      </div>
    </header>
  )
}
```

**Step 3: Create the Navigation component (client component)**

Create `components/navigation.tsx`:
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
        className="text-white lg:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
      </button>

      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } absolute right-0 top-full flex-col bg-[#5C2941] px-6 py-4 lg:static lg:flex lg:flex-row lg:gap-6 lg:p-0`}
      >
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-2 text-white/80 transition-colors hover:text-white lg:py-0"
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

**Step 4: Create the Footer component**

Create `components/footer.tsx`:
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

**Step 5: Build the root layout**

Modify `app/layout.tsx`:
```tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Will Kencel",
    template: "%s | Will Kencel",
  },
  description:
    "Will Kencel - Software Engineer at Microsoft. Personal website and blog about software, technology, and engineering.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

**Step 6: Run dev server and verify layout renders**

```bash
npm run dev
```
Expected: Page loads with header, main area, and footer. Navigation links visible.

**Step 7: Commit**

```bash
git add app/ components/
git commit -m "feat: add root layout with header, navigation, and footer"
```

---

### Task 5: Build Home Page

**Files:**
- Modify: `app/page.tsx`
- Create: `components/post-card.tsx`

**Step 1: Create the PostCard component**

Create `components/post-card.tsx`:
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
    <article className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md">
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
        <time className="text-sm text-neutral-500">
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <h3 className="mt-1 text-lg font-semibold">
          <Link
            href={`/blog/${slug}`}
            className="text-neutral-900 no-underline hover:text-[#5C2941]"
          >
            {title}
          </Link>
        </h3>
        <p className="mt-2 text-sm text-neutral-600">{description}</p>
      </div>
    </article>
  )
}
```

**Step 2: Build the Home page**

Modify `app/page.tsx`:
```tsx
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
```

**Step 3: Verify home page renders with content**

```bash
npm run dev
```
Expected: Home page shows hero section with photo, name, tagline, social links, CTA button, and 3 latest post cards.

**Step 4: Commit**

```bash
git add app/page.tsx components/post-card.tsx
git commit -m "feat: build home page with hero and latest posts"
```

---

### Task 6: Build Blog Listing and Post Pages

**Files:**
- Create: `app/blog/page.tsx`
- Create: `app/blog/[slug]/page.tsx`

**Step 1: Build the blog listing page**

Create `app/blog/page.tsx`:
```tsx
import type { Metadata } from "next"
import { getAllPosts } from "@/lib/content"
import PostCard from "@/components/post-card"

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts about software engineering, technology, and science.",
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
```

**Step 2: Build the individual blog post page**

Create `app/blog/[slug]/page.tsx`:
```tsx
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

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const post = getPostBySlug(params.slug)
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

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug(params.slug)
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

      <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-a:text-[#5C2941]">
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
```

**Step 3: Verify blog pages work**

```bash
npm run dev
```
Visit `/blog` — should show all 4 posts.
Visit `/blog/bunjs` — should render the Bun.js post with syntax highlighting.

**Step 4: Commit**

```bash
git add app/blog/
git commit -m "feat: add blog listing and individual post pages"
```

---

### Task 7: Build About and Projects Pages

**Files:**
- Create: `app/about/page.tsx`
- Create: `app/projects/page.tsx`

**Step 1: Build the About page**

Create `app/about/page.tsx`:
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
      <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-a:text-[#5C2941]">
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

**Step 2: Build the Projects page**

Create `app/projects/page.tsx`:
```tsx
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
```

**Step 3: Verify both pages render**

```bash
npm run dev
```
Visit `/about` and `/projects` — content should render with proper styling.

**Step 4: Commit**

```bash
git add app/about/ app/projects/
git commit -m "feat: add about and projects pages"
```

---

### Task 8: Build 404 Page

**Files:**
- Create: `app/not-found.tsx`

**Step 1: Create the 404 page**

Create `app/not-found.tsx`:
```tsx
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-6xl font-bold text-neutral-900">404</h1>
      <p className="mt-4 text-xl text-neutral-600">Page not found</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-[#5C2941] px-6 py-3 text-white no-underline transition-colors hover:bg-[#7a3558]"
      >
        Go home
      </Link>
    </div>
  )
}
```

**Step 2: Verify 404 page works**

```bash
npm run dev
```
Visit `/nonexistent-page` — should show the 404 page.

**Step 3: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: add custom 404 page"
```

---

### Task 9: Add Sitemap and SEO Finalization

**Files:**
- Create: `next-sitemap.config.js`
- Modify: `package.json` (add postbuild script)

**Step 1: Configure next-sitemap**

Create `next-sitemap.config.js`:
```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://willkencel.io",
  generateRobotsTxt: true,
  outDir: "./out",
}
```

**Step 2: Add postbuild script to package.json**

Add to `scripts` in `package.json`:
```json
{
  "scripts": {
    "postbuild": "next-sitemap --config next-sitemap.config.js"
  }
}
```

**Step 3: Test the full build**

```bash
npm run build
```
Expected: Build succeeds, `out/` directory created with static HTML files, `out/sitemap.xml` and `out/robots.txt` generated.

**Step 4: Verify all pages are in the build output**

```bash
ls out/
ls out/blog/
```
Expected: `index.html`, `about.html`, `projects.html`, `blog/index.html`, `blog/bunjs.html`, `blog/blue-origin-bezos.html`, `blog/hermes-react-native.html`, `blog/nfts.html`, `404.html`, `sitemap.xml`, `robots.txt`

**Step 5: Commit**

```bash
git add next-sitemap.config.js package.json
git commit -m "feat: add sitemap generation and finalize SEO"
```

---

### Task 10: Add Syntax Highlighting Styles

**Files:**
- Modify: `app/globals.css`

**Step 1: Add Prism theme CSS**

Add to `app/globals.css` after the Tailwind imports:
```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Prism.js syntax highlighting */
code[class*="language-"],
pre[class*="language-"] {
  color: #f8f8f2;
  background: #1e1e1e;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 0.9em;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.5;
  tab-size: 4;
  border-radius: 0.5rem;
}

pre[class*="language-"] {
  padding: 1em;
  margin: 0.5em 0;
  overflow: auto;
}

.token.comment,
.token.prolog,
.token.doctype,
.token.cdata {
  color: #6a9955;
}

.token.punctuation {
  color: #d4d4d4;
}

.token.property,
.token.tag,
.token.boolean,
.token.number,
.token.constant,
.token.symbol {
  color: #b5cea8;
}

.token.selector,
.token.attr-name,
.token.string,
.token.char,
.token.builtin {
  color: #ce9178;
}

.token.operator,
.token.entity,
.token.url {
  color: #d4d4d4;
}

.token.atrule,
.token.attr-value,
.token.keyword {
  color: #569cd6;
}

.token.function,
.token.class-name {
  color: #dcdcaa;
}

.token.regex,
.token.important,
.token.variable {
  color: #d16969;
}
```

**Step 2: Verify syntax highlighting works on a blog post with code**

```bash
npm run dev
```
Visit `/blog/bunjs` — any inline code should be styled.

**Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: add syntax highlighting styles"
```

---

### Task 11: Final Build Verification

**Step 1: Clean and rebuild**

```bash
rm -rf out .next
npm run build
```
Expected: Build completes with no errors.

**Step 2: Serve the static output locally**

```bash
npx serve out
```
Expected: Site serves on localhost:3000. Navigate through all pages:
- `/` — Home with hero and latest posts
- `/blog` — All 4 posts listed
- `/blog/bunjs` — Full post renders with images and code highlighting
- `/about` — Full about content with images
- `/projects` — Full projects content with images
- Random URL — 404 page

**Step 3: Verify all images load**

Check that all `/assets/` images display correctly on every page.

**Step 4: Commit final state**

```bash
git add -A
git commit -m "feat: complete Next.js migration - all pages verified"
```

---

## Summary

| Task | Description | Key Files |
|------|-------------|-----------|
| 1 | Initialize Next.js project | `package.json`, `next.config.mjs`, `tailwind.config.ts` |
| 2 | Content utilities | `lib/content.ts`, `types/content.ts` |
| 3 | Migrate content files | `content/**/*.mdx`, `public/assets/` |
| 4 | Root layout + shared components | `app/layout.tsx`, `components/header.tsx`, `navigation.tsx`, `footer.tsx` |
| 5 | Home page | `app/page.tsx`, `components/post-card.tsx` |
| 6 | Blog listing + post pages | `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` |
| 7 | About + Projects pages | `app/about/page.tsx`, `app/projects/page.tsx` |
| 8 | 404 page | `app/not-found.tsx` |
| 9 | Sitemap + SEO | `next-sitemap.config.js` |
| 10 | Syntax highlighting | `app/globals.css` |
| 11 | Final build verification | Full build + manual testing |
