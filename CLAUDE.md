# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and blog for Will Kencel, built with Next.js 16 (App Router), TypeScript, and Tailwind CSS v4. Static export deployed to AWS (S3/CloudFront/Route 53).

## Commands

- **Dev server**: `npm run dev` (runs on localhost:3000)
- **Build**: `npm run build` (static export to `out/`)
- **Lint**: `npm run lint`
- **Format**: `prettier --write "**/*.{ts,tsx,json,mdx,md}"`

## Architecture

### Content Pipeline

Blog posts are MDX files in `content/posts/` with YAML frontmatter, loaded via `gray-matter` and rendered with `next-mdx-remote`. Pages (about) use MDX in `content/pages/`. Content utilities live in `lib/content.ts`.

Two content types:
- **Pages** (`content/pages/`): MDX pages (about). Rendered by dedicated route handlers.
- **Posts** (`content/posts/`): Blog posts listed at `/blog`, individual posts at `/blog/[slug]`.

### Post frontmatter schema

```yaml
title: "Post Title"
slug: url-path
date: YYYY-MM-DDTHH:mm:ss.000Z
description: "SEO description"
featuredImage: /assets/image.png  # optional
```

### Styling

Tailwind CSS v4 with `@tailwindcss/typography` for prose content. Light theme only with neutral palette and blue accents. Global styles in `app/globals.css`.

### Key Files

- `app/layout.tsx`: Root layout with metadata, Inter font, Header/Footer
- `app/page.tsx`: Home page with hero and latest posts
- `app/blog/page.tsx`: Blog listing
- `app/blog/[slug]/page.tsx`: Individual blog post (uses async params for Next.js 16)
- `app/projects/page.tsx`: Projects page (data-driven, not MDX)
- `app/about/page.tsx`: About page (renders about.mdx)
- `components/`: Header, Footer, Navigation (client component), PostCard
- `lib/content.ts`: Content loading utilities (getAllPosts, getPostBySlug, getPage)
- `types/content.ts`: TypeScript interfaces for Post/Page
- `next.config.ts`: Static export config (`output: "export"`)
- `next-sitemap.config.js`: Sitemap generation for willkencel.io

### Key Conventions

- TypeScript throughout, React 19 server components (Navigation is only client component)
- Prettier config: no semicolons, avoid arrow function parens, Tailwind plugin (`.prettierrc`)
- Static assets in `public/assets/`, referenced as `/assets/` in content
- Next.js Metadata API for SEO (no react-helmet)
- `generateStaticParams` for pre-rendering blog posts
