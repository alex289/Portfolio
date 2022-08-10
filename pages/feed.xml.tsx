import RSS from 'rss';

import { sanityClient } from '@/lib/sanity/sanity-server';
import { indexQuery } from '@/lib/sanity/queries';

import type { GetServerSideProps } from 'next';
import type { Post } from '@/lib/types';

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = new RSS({
    title: 'Alexander Konietzko',
    site_url: 'https://alexanderkonietzko.vercel.app',
    feed_url: 'https://alexanderkonietzko.vercel.app/feed.xml',
  });

  const allPosts = await sanityClient.fetch(indexQuery);
  allPosts.map((post: Post) => {
    feed.item({
      title: post.title,
      url: `https://alexanderkonietzko.vercel.app/${
        post.language === 'de' ? 'de/' : ''
      }blog/${post.slug}`,
      date: post.date,
      description: post.excerpt,
    });
  });

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );
  res.write(feed.xml({ indent: true }));
  res.end();

  return {
    props: {},
  };
};

export default function RSSFeed() {
  return null;
}
