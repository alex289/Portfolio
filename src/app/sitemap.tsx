import env from '@/env.mjs';
import { getBlogPosts } from '@/lib/blog';

export default function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${env.NEXT_PUBLIC_WEBSITE_URL}/${post.language}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ['', '/about', '/blog', '/guestbook', '/projects'].map(
    (route) => ({
      url: `${env.NEXT_PUBLIC_WEBSITE_URL}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    }),
  );

  return [...routes, ...blogs];
}
