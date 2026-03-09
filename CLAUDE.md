# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and blog for Will Kencel, built with Gatsby 4 and Netlify CMS. Hosted on AWS (S3/CloudFront/Route 53).

## Commands

- **Dev server**: `gatsby develop` (runs on localhost:8000)
- **Build**: `gatsby build`
- **Format**: `prettier --write "**/*.{js,jsx,json,md}"`
- **Clean cache**: `gatsby clean`
- **GraphQL explorer**: Available at localhost:8000/___graphql during dev
- **Local CMS**: `npx netlify-cms-proxy-server` (run alongside dev server)

## Architecture

### Content Pipeline

All content is Markdown with YAML frontmatter, sourced via `gatsby-source-filesystem` and processed by `gatsby-transformer-remark`. Pages are created dynamically in `gatsby-node.js` by matching each Markdown file's `template` frontmatter field to a component in `src/templates/`.

Two content types:
- **Pages** (`src/content/pages/`): Static pages (home, about, contact, projects). Each has a fixed slug and dedicated template.
- **Posts** (`src/content/posts/`): Blog posts using the `blog-post` template. Paginated at 9 posts per page on `/blog`.

### Post frontmatter schema

```yaml
template: blog-post
title: "Post Title"
slug: /url-path
date: YYYY-MM-DDTHH:mm:ss.000Z
description: "SEO description"
featuredImage: /assets/image.png  # optional
```

### Theming

Uses Theme UI (`src/gatsby-plugin-theme-ui/index.js`) with light/dark mode support. Color tokens are defined there. SCSS styles live in `src/assets/scss/` for layout and utilities.

### Site Configuration

- `src/util/site.json`: Site metadata (title, description, URL, social, GA tracking)
- `src/util/socialmedia.json`: Social media icons configuration
- `static/admin/config.yml`: Netlify CMS collection definitions and field schemas

### Key Conventions

- Prettier config: no semicolons, avoid arrow function parens (`.prettierrc`)
- Static assets go in `static/assets/`, referenced as `/assets/` in content
- Components use React class-style with `react-helmet` for SEO
