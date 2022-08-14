![cover](https://repository-images.githubusercontent.com/386759878/9e991155-c521-4a40-855d-3fa47f53fb3a)

# Portfolio

My own personal portfolio website

Inspired by [leerob](https://github.com/leerob/leerob.io)

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [PlanetScale](https://planetscale.com)
- **ORM**: [Prisma](https://prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **CMS**: [Sanity](https://sanity.io)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Overview

- `data/*` - MDX data that is used for my blog
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction). Health check, spotify, guestbook and blog post views.
- `pages/blog/*` - Static pre-rendered blog pages using MDX
- `pages/dashboard` - Containing metrics from health api
- `pages/projects` - Showcase of my current projects on GitHub
- `pages/about` - General information about me
- `pages/sitemap.xml.tsx` - Automatically generated sitemap
- `pages/*` - All other static pages.
- `public/*` - Static assets including fonts and images.
- `prisma/*` - My Prisma schema, which uses a PlanetScale MySQL database.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.
- `locales/*` - All translations objects

## Running Locally

```bash
$ git clone https://github.com/alex289/Portfolio.git
$ cd Portfolio
$ pnpm i
$ pnpm dev
```

Create a `.env` file  similar to [`.env.example`](https://github.com/alex289/Portfolio/blob/main/.env.example)

## Cloning / Forking

Please review the [license](https://github.com/alex289/Portfolio/blob/main/LICENSE) and remove all of my personal information (resume, blog posts, images, etc.).
