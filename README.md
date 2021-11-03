# Portfolio

My own personal portfolio website

Inspired by [leerob](https://github.com/leerob/leerob.io)

- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: Basic Authentication with NextJs middleware

## Overview

- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction). Currently only health check
- `pages/dashboard` - containing metrics from health api
- `pages/*` - All static pages. (Index and 404)

## Running Locally

```bash
$ git clone https://github.com/Alex289/Portfolio.git
$ cd Portfolio
$ yarn
$ yarn dev
```

Create a `.env` file  similar to [`.env.example`](https://github.com/Alex289/Portfolio/blob/main/.env.example)

