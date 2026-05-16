# 🎯 PROJECT TARGET — SaaPify Website (Headless WordPress + Next.js 15)

> This file is the single source of truth for Claude Code.
> Read this fully before making any decisions or writing any code.

---

## 📌 PROJECT GOAL

Build a **SEO-first, performance-optimized company website** with a blog.
- Frontend: **Next.js 15** (App Router, React Server Components)
- CMS: **WordPress** running as a headless backend (content only)
- Data Layer: **WPGraphQL** plugin (GraphQL API from WordPress)
- Styling: **Tailwind CSS v4**
- Language: **TypeScript (strict)**
- Package Manager: **pnpm 9**
- Deployment: **Vercel** (GitHub auto-deploy, already connected)

---

## 🖥️ SYSTEM REQUIREMENTS — INSTALL THESE FIRST

### Step 1 — Install Node.js 22 LTS

```bash
# Install nvm (Node Version Manager) if not already installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Restart terminal, then:
nvm install 22
nvm use 22
nvm alias default 22

# Verify
node -v   # should show v22.x.x
npm -v    # should show 10.x.x
```

### Step 2 — Install pnpm 9

```bash
npm install -g pnpm@latest

# Verify
pnpm -v   # should show 9.x.x
```

### Step 3 — Install LocalWP (WordPress local environment)

Download and install from: https://localwp.com/
- Free desktop app for Mac/Windows/Linux
- Runs WordPress locally with zero config
- No Docker, no MAMP, no manual MySQL needed

---

## 🗂️ WORDPRESS SETUP (Headless CMS)

### Step 1 — Create a Local WordPress Site in LocalWP

1. Open LocalWP → Click **"+ Create New Site"**
2. Site name: `saapify-cms`
3. Choose: **Preferred** environment
4. Set admin username + password (save these)
5. Click **"Finish"** — WordPress installs automatically

Your local WordPress will be at: `http://saapify-cms.local`
Admin dashboard: `http://saapify-cms.local/wp-admin`

### Step 2 — Install Required WordPress Plugins

Log into WordPress admin, go to **Plugins → Add New**, search and install:

| Plugin | Purpose |
|--------|---------|
| **WPGraphQL** | Exposes a GraphQL API at `/graphql` |
| **WPGraphQL for ACF** | (Optional) Exposes Advanced Custom Fields via GraphQL |
| **Advanced Custom Fields (ACF)** | (Optional) Add custom fields to posts/pages |
| **Yoast SEO** | SEO metadata — title, description, og:image per post |
| **WPGraphQL Yoast SEO Addon** | Exposes Yoast SEO data through the GraphQL API |

After installing WPGraphQL:
- Go to **GraphQL → Settings**
- Enable **"Public Introspection"** (for development)
- Your GraphQL endpoint: `http://saapify-cms.local/graphql`

### Step 3 — Test the GraphQL Endpoint

Open browser and go to:
`http://saapify-cms.local/graphql`

Or use the built-in IDE:
**WordPress Admin → GraphQL → GraphiQL IDE**

Test query:
```graphql
{
  posts {
    nodes {
      title
      slug
      date
      excerpt
    }
  }
}
```

### Step 4 — Create Sample Content

In WordPress admin:
- **Posts → Add New** — create 2-3 sample blog posts
- **Pages → Add New** — create: Home, About, Services, Contact
- Add a **Featured Image** to each post (important for SEO og:image)
- Fill in **Yoast SEO** fields (focus keyword, meta description) per post

---

## 🚀 NEXT.JS PROJECT SETUP

### Step 1 — Scaffold the Project

```bash
# Navigate to where you keep your projects
cd ~/Projects  # or wherever you prefer

# Create Next.js 15 app
pnpm create next-app@latest saapify-website \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-eslint

# Move into project
cd saapify-website
```

### Step 2 — Install All Required Dependencies

```bash
# GraphQL client (lightweight, no Apollo overhead)
pnpm add graphql-request graphql

# SEO (next-seo for easy meta management)
pnpm add next-seo

# Date formatting for blog posts
pnpm add date-fns

# HTML parser (to safely render WordPress post content)
pnpm add html-react-parser sanitize-html
pnpm add -D @types/sanitize-html

# Sitemap generation
pnpm add next-sitemap

# Environment variable validation
pnpm add @t3-oss/env-nextjs zod
```

### Step 3 — Environment Variables

Create `.env.local` in the project root:

```bash
# .env.local

# WordPress GraphQL endpoint (local development)
NEXT_PUBLIC_WORDPRESS_API_URL=http://saapify-cms.local/graphql

# WordPress REST API base (fallback)
NEXT_PUBLIC_WORDPRESS_URL=http://saapify-cms.local

# Site info (used for SEO and sitemap)
NEXT_PUBLIC_SITE_URL=https://www.saapify.in
NEXT_PUBLIC_SITE_NAME=SaaPify
```

Create `.env.production` for Vercel:
```bash
NEXT_PUBLIC_WORDPRESS_API_URL=https://cms.saapify.in/graphql
NEXT_PUBLIC_WORDPRESS_URL=https://cms.saapify.in
NEXT_PUBLIC_SITE_URL=https://www.saapify.in
NEXT_PUBLIC_SITE_NAME=SaaPify
```

> ⚠️ Add `.env.local` and `.env.production` to `.gitignore` — NEVER commit secrets.
> Set the production env vars in Vercel Dashboard → Project → Settings → Environment Variables.

---

## 🗃️ PROJECT STRUCTURE

```
saapify-website/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (fonts, global SEO, navbar, footer)
│   │   ├── page.tsx                  # Homepage
│   │   ├── about/
│   │   │   └── page.tsx              # About page
│   │   ├── services/
│   │   │   └── page.tsx              # Services page
│   │   ├── contact/
│   │   │   └── page.tsx              # Contact page
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog listing (all posts)
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual blog post (dynamic route)
│   │   ├── sitemap.ts                # Auto-generated sitemap (Next.js built-in)
│   │   └── robots.ts                 # robots.txt (Next.js built-in)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── blog/
│   │   │   ├── PostCard.tsx          # Blog listing card
│   │   │   ├── PostContent.tsx       # Renders WP post HTML safely
│   │   │   └── PostMeta.tsx          # Author, date, reading time
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       └── Container.tsx
│   │
│   ├── lib/
│   │   ├── wordpress.ts              # All GraphQL query functions
│   │   ├── graphql-client.ts         # graphql-request client setup
│   │   └── utils.ts                  # Helpers (formatDate, readingTime, etc.)
│   │
│   ├── types/
│   │   └── wordpress.ts              # TypeScript types for WP data
│   │
│   └── styles/
│       └── globals.css               # Tailwind base + custom CSS vars
│
├── public/
│   ├── favicon.ico
│   ├── og-default.jpg                # Default Open Graph image
│   └── robots.txt                    # (override if not using next robots.ts)
│
├── next.config.ts                    # Next.js config (image domains, etc.)
├── next-sitemap.config.js            # Sitemap config
├── tailwind.config.ts                # Tailwind config
├── tsconfig.json                     # TypeScript config
├── .env.local                        # Local env vars (gitignored)
├── .env.example                      # Env template (committed to git)
├── .gitignore
└── package.json
```

---

## 📡 GRAPHQL QUERIES (lib/wordpress.ts)

Claude Code should build this file with the following queries:

### Queries to implement:

```typescript
// All functions should use ISR revalidation: next: { revalidate: 60 }

getAllPosts()           // Blog listing page — title, slug, excerpt, date, featuredImage, categories
getPostBySlug(slug)    // Single post page — full content, SEO metadata (via Yoast), author
getAllPostSlugs()       // generateStaticParams() for [slug] route
getPageBySlug(slug)    // Fetch page content from WordPress
getSiteSettings()      // Blog name, description from WordPress settings
```

### GraphQL query pattern:

```typescript
// lib/graphql-client.ts
import { GraphQLClient } from 'graphql-request';

export const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL!
);
```

---

## 🔍 SEO IMPLEMENTATION

### Metadata per page (Next.js 15 built-in Metadata API)

Every `page.tsx` must export a `generateMetadata` function:

```typescript
// For static pages
export const metadata: Metadata = {
  title: 'About Us | SaaPify',
  description: '...',
};

// For dynamic blog posts — pull from WordPress/Yoast
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.seo?.title || post.title,
    description: post.seo?.metaDesc || post.excerpt,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.metaDesc,
      images: [post.featuredImage?.node?.sourceUrl],
      type: 'article',
      publishedTime: post.date,
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}
```

### Rendering Strategy per Route

| Route | Strategy | Why |
|-------|----------|-----|
| `/` (homepage) | SSG | Never changes unless redeployed |
| `/about`, `/services`, `/contact` | SSG | Static content |
| `/blog` (listing) | ISR (60s) | New posts appear within 60 seconds |
| `/blog/[slug]` | ISR (60s) | Post edits appear within 60 seconds |

```typescript
// Enable ISR — add this to every fetch call in blog routes
fetch(url, { next: { revalidate: 60 } })
```

### Sitemap (app/sitemap.ts)

```typescript
export default async function sitemap() {
  const posts = await getAllPosts();
  const postUrls = posts.map(post => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    { url: process.env.NEXT_PUBLIC_SITE_URL, priority: 1.0 },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`, priority: 0.9 },
    { url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`, priority: 0.9 },
    ...postUrls,
  ];
}
```

---

## 🖼️ NEXT.JS CONFIG (next.config.ts)

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'saapify-cms.local',   // local WordPress
      },
      {
        protocol: 'https',
        hostname: 'cms.saapify.in',      // production WordPress
      },
    ],
  },
};

export default nextConfig;
```

---

## 🎨 TAILWIND CONFIG

Tailwind v4 uses CSS-first config. In `src/styles/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-primary: #your-brand-color;
  --color-secondary: #your-secondary-color;
  --font-sans: 'Your Font', sans-serif;
}
```

---

## 🧪 DEVELOPMENT WORKFLOW

```bash
# Start development server
pnpm dev          # runs on http://localhost:3000

# Build for production (check for errors before deploying)
pnpm build

# Start production server locally
pnpm start

# Type check
pnpm tsc --noEmit

# Check for issues
pnpm build 2>&1 | head -50
```

---

## 🚢 DEPLOYMENT CHECKLIST (Vercel)

- [ ] GitHub repo is connected to Vercel project
- [ ] All env vars set in Vercel Dashboard → Settings → Environment Variables
- [ ] `NEXT_PUBLIC_WORDPRESS_API_URL` points to **production** WordPress (not localhost)
- [ ] WordPress production is live and WPGraphQL plugin is active
- [ ] `.env.local` is in `.gitignore`
- [ ] `pnpm build` passes locally with zero errors before pushing
- [ ] `next/image` `remotePatterns` includes production WordPress hostname

---

## 📦 FINAL PACKAGE.JSON SCRIPTS

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "postbuild": "next-sitemap"
  }
}
```

---

## ⚠️ IMPORTANT RULES FOR CLAUDE CODE

1. **Never use `getServerSideProps` or `getStaticProps`** — those are Pages Router (old). Use App Router conventions only.
2. **All data fetching happens in Server Components** (default in App Router) — no `useEffect` for data fetching.
3. **Mark Client Components explicitly** with `"use client"` at the top — only when needed (interactivity, browser APIs).
4. **Always use `next/image`** instead of `<img>` tags.
5. **Always use `next/link`** instead of `<a>` tags for internal navigation.
6. **Sanitize WordPress HTML** before rendering with `sanitize-html` to prevent XSS.
7. **TypeScript strict mode is ON** — no `any` types, no implicit errors.
8. **ISR over SSG for blog** — use `revalidate: 60` on all WordPress fetches so new posts appear without redeploying.

---

## 🔗 KEY REFERENCE LINKS

- Next.js 15 Docs: https://nextjs.org/docs
- WPGraphQL Docs: https://www.wpgraphql.com/docs
- Tailwind v4 Docs: https://tailwindcss.com/docs
- graphql-request: https://github.com/jasonkuhrt/graphql-request
- next-sitemap: https://github.com/iamvishnusankar/next-sitemap
- LocalWP: https://localwp.com

---

*Last updated: May 2026 | SaaPify (saapify.in) | Stack: Next.js 15 + React 19 + TypeScript + Tailwind v4 + WordPress Headless + WPGraphQL*