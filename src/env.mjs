import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    POSTGRES_URL: z.string().url().optional(),
    ADMIN_EMAIL: z.string().email().optional(),
    AUTH_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),
    SPOTIFY_CLIENT_ID: z.string().optional(),
    SPOTIFY_CLIENT_SECRET: z.string().optional(),
    SPOTIFY_REFRESH_TOKEN: z.string().optional(),
    GITHUB_API_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_WEBSITE_URL: z
      .string()
      .default('http://localhost:3000')
      .transform((url) => {
        if (url === 'http://localhost:3000') {
          return url;
        }

        return 'https://' + url;
      }),
  },
  runtimeEnv: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    AUTH_SECRET: process.env.AUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
    GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});

export default env;
