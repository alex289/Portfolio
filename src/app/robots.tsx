import env from '@/env';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
      },
    ],
    sitemap: `${env.NEXT_PUBLIC_WEBSITE_URL}/sitemap.xml`,
    host: `${env.NEXT_PUBLIC_WEBSITE_URL}`,
  };
}
