import env from '@/env';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${env.NEXT_PUBLIC_VERCEL_URL}/sitemap.xml`,
    host: `${env.NEXT_PUBLIC_VERCEL_URL}`,
  };
}
