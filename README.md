![cover](https://repository-images.githubusercontent.com/386759878/da75b7f3-2f50-4797-a36a-0d6dd8f7c6b3)

# Portfolio

My own personal portfolio website

Inspired by [leerob](https://github.com/leerob/leerob.io)

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Vercel Postgres](https://vercel.com)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Overview

- `src/content/*` - MDX data that is used for my blog
- `src/lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `src/app/*` - The actual pages.
- `public/*` - Static assets including fonts and images.
- `src/styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.
- `src/messages/*` - All translations objects

## Running Locally

```bash
git clone https://github.com/alex289/Portfolio.git
cd Portfolio
pnpm i
pnpm dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/alex289/Portfolio/blob/main/.env.example)

## Deploying to Vercel

For detailed instructions on deploying this portfolio to Vercel with all environment variables configured, see **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)**.

Quick deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Daniel21b/daniel-portfolio)

**Note**: The site will build successfully even without all environment variables. Features like authentication, guestbook, and Spotify integration require their respective API credentials to be configured.

## Cloning / Forking

Please review the [license](https://github.com/alex289/Portfolio/blob/main/LICENSE) and remove all of my personal information (resume, blog posts, images, etc.).
