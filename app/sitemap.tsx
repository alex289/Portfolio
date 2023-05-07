import env from '@/env';
import { allBlogs } from 'contentlayer/generated';

export default async function sitemap() {
  const blogs = allBlogs.map((post) => ({
    url: `${env.NEXT_PUBLIC_VERCEL_URL}/${post.language}/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ['', '/about', '/blog', '/guestbook', '/projects'].map(
    (route) => ({
      url: `${env.NEXT_PUBLIC_VERCEL_URL}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...blogs];
}
