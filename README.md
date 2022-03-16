# Portfolio

My own personal portfolio website

Inspired by [leerob](https://github.com/leerob/leerob.io)

- **Framework**: [Next.js](https://nextjs.org/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Overview

- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction). Health check and stuff.
- `pages/dashboard` - containing metrics from health api
- `pages/*` - All other static pages.
- `public/*` - Static assets including fonts and images.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.
- `locales/*` - All translations objects

## Running Locally

```bash
$ git clone https://github.com/Alex289/Portfolio.git
$ cd Portfolio
$ yarn
$ yarn dev
```

Create a `.env` file  similar to [`.env.example`](https://github.com/Alex289/Portfolio/blob/main/.env.example)

## Cloning / Forking

Please review the [license](https://github.com/Alex289/Portfolio/blob/main/LICENSE) and remove all of my personal information (resume, blog posts, images, etc.).
