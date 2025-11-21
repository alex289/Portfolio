import RSS from 'rss';

import env from '@/env.mjs';
import { getBlogPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export function GET() {
  const feed = new RSS({
    title: 'Daniel Berhane',
    description: 'Blog of Daniel Berhane',
    site_url: env.NEXT_PUBLIC_WEBSITE_URL,
    feed_url: `${env.NEXT_PUBLIC_WEBSITE_URL}/feed.xml`,
  });

  getBlogPosts().forEach((post) => {
    feed.item({
      title: post.title,
      guid: `${env.NEXT_PUBLIC_WEBSITE_URL}/${post.language}/blog/${post.slug}`,
      url: `${env.NEXT_PUBLIC_WEBSITE_URL}/${post.language}/blog/${post.slug}`,
      date: post.publishedAt,
      description: post.summary,
      author: 'Daniel Berhane',
      categories: post.tags,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
