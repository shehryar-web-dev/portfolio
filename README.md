# Shehryar — Portfolio

A fast, interactive portfolio built with **Next.js (App Router)**, **TypeScript**,
**Tailwind CSS v4**, and **Framer Motion**. It showcases full-stack, blockchain
(Solana), and AI engineering work. All content lives in code — no CMS, no
database, no separate backend.

## Features

- Clean dark theme: **#0F2B46** background with **#00CFD1** (bright cyan) accents
- Animated hero (clean dot-grid), scroll-reveal sections, smooth scrollspy navbar
- Sections: Hero · About · Skills · Projects · Experience · Blog · Contact
- File-based **MDX blog** (`content/blog/*.mdx`)
- **Contact form** that emails you via a Next.js Route Handler + **Nodemailer**
- SEO: metadata, dynamic Open Graph image, `sitemap.xml`, `robots.txt`

## Color Palette

| Token | Light & Dark | Usage |
| --- | --- | --- |
| Background | `#0F2B46` | Page background |
| Card | `#132F4E` | Cards, inputs, navbar |
| Border | `#1E3F5C` | Outlines, dividers |
| Foreground | `#D4E8F5` | Primary text |
| Muted Foreground | `#5080A0` | Secondary text |
| **Accent** | **`#00CFD1`** | **Buttons, badges, highlights** |
| Accent 2 | `#38BDF8` | Gradient secondary color |

All colors are defined in `app/globals.css` — update there to customize.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm run start
```

## Editing your content

Everything is plain TypeScript / MDX — edit and redeploy:

| What | File |
| --- | --- |
| **Colors & theme** | `app/globals.css` (CSS variables) |
| Name, headline, bio, socials, SEO | `data/profile.ts` |
| Projects (cards) | `data/projects.ts` |
| Skills (grouped) | `data/skills.ts` |
| Experience timeline | `data/experience.ts` |
| Blog posts | `content/blog/*.mdx` |
| Resume PDF | replace `public/resume.pdf` |
| Project screenshots | add to `public/projects/` and set `image` in `data/projects.ts` |

### Adding a blog post

Create `content/blog/my-post.mdx` with frontmatter:

```mdx
---
title: "My Post Title"
description: "Short summary for cards and SEO."
date: "2026-06-20"
tags: ["AI", "Next.js"]
---

Your **Markdown / MDX** content here.
```

## Contact form email

The form posts to `app/api/contact/route.ts`, which sends mail with Nodemailer.

- **Development:** with no SMTP env vars set, it uses an [Ethereal](https://ethereal.email)
  test inbox and logs a preview URL to the server console — no real email is sent.
- **Production:** copy `.env.example` to `.env.local` and set your SMTP creds:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-address@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO=where-to-receive@example.com
```

> For Gmail, create an **App Password** (not your normal password).

A hidden honeypot field silently drops bot submissions.

## Before you deploy

1. Replace `public/resume.pdf` with your real resume.
2. Update links in `data/profile.ts` (GitHub, LinkedIn, X, email).
3. Set `siteConfig.url` in `data/profile.ts` to your real domain (used for SEO/OG).
4. Add real project screenshots and the missing live/GitHub links.
5. Set SMTP env vars in your host.

## Tech

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
next-themes · next-mdx-remote · Nodemailer · lucide-react
