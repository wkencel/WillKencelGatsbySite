# Blue Presence Design

**Date:** 2026-03-09
**Status:** Approved
**Branch:** feature/nextjs-migration (worktree: .worktrees/nextjs-migration)

## Goal

Make willkencel.io more visually engaging with a cohesive blue identity, subtle scroll animations, and better visual rhythm between sections. No layout or content changes.

## 1. Color Palette Shift

Swap `neutral-*` for `slate-*` globally. Slate has a subtle blue undertone vs neutral's pure gray.

| Element | Current | New |
|---------|---------|-----|
| Body text | `neutral-600` | `slate-600` |
| Headings | `neutral-900` | `slate-900` |
| Light text (dates, descriptions) | `neutral-400`/`500` | `slate-400`/`500` |
| Card borders | `neutral-200` | `slate-200` |
| Section backgrounds | `neutral-50` | `slate-50` |
| Header border | `neutral-200` | `slate-200` |
| Nav links | `neutral-500` hover `neutral-900` | `slate-500` hover `blue-600` |
| Footer bg | `neutral-900` | `slate-900` |
| Footer text | `neutral-400` | `slate-400` |
| Tech tags (projects) | `neutral-100` bg / `neutral-600` text | `blue-50` bg / `blue-700` text |
| Social icons (hero) | `neutral-300` | `slate-400` |
| Accent color | `blue-600` (stays) | `blue-600` (more visible with blue tags/hovers) |

Active nav link: `border-b-2 border-blue-600`.
Nav hover: `hover:text-blue-600`.
Footer social hover: `hover:text-blue-400`.

## 2. Motion & Transitions

### FadeIn component
- Client component using Intersection Observer
- Initially: `opacity-0`, `translateY(16px)`
- In viewport: `opacity-1`, `translateY(0)`
- Transition: 400ms ease-out
- Optional `delay` prop for staggering
- `threshold: 0.1`, triggers once

### What animates
| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero (photo, name, bio) | Fade up, 400ms | Page load |
| Blog post cards | Fade up, 400ms, stagger 100ms | Scroll into view |
| Project cards | Fade up, 400ms, stagger 100ms | Scroll into view |
| About prose | Fade up, 400ms | Scroll into view |
| Section headings | Fade up, 300ms | Scroll into view |

### What does NOT animate
- Header and footer
- Navigation interactions (just color transitions)
- Page-to-page transitions

### Card hover upgrade
- Current: `hover:shadow-md`
- New: `hover:shadow-md hover:-translate-y-1 transition-all duration-200`
- Project cards: `hover:border-blue-300`

## 3. Visual Rhythm & Section Backgrounds

### Home page
- Hero: `bg-slate-50` (tinted)
- Latest Posts: `bg-white`
- Border between: `border-t border-slate-200`

### Projects page
- Page background: `bg-slate-50`
- Cards: white on tinted background (cards pop)
- Open Source: separated by `border-t border-slate-200`

### Blog listing
- Page background: `bg-slate-50`
- White cards pop off tinted background

### Blog post (individual)
- White background (clean reading)
- Header block: `border-l-4 border-blue-600` accent

### About page
- White background
- Blue accent line under heading: `<div className="mt-4 h-1 w-12 rounded bg-blue-600" />`

### Footer
- `bg-slate-900` (blue-tinted dark)
- Social hover: `hover:text-blue-400`

## Files to modify

- `components/FadeIn.tsx` (new -- client component)
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/navigation.tsx`
- `components/post-card.tsx`
- `app/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/projects/page.tsx`
- `app/about/page.tsx`

## Dependencies

None. Pure CSS transitions + Intersection Observer. No new packages.
