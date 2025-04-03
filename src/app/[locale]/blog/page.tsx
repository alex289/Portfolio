import { routing } from '@/i18n/routing';

import env from '@/env.mjs';
import PostList from '@/components/blog/post-list';
import { getBlogPosts } from '@/lib/blog';

import type { Metadata } from 'next/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function generateMetadata(): Metadata {
  return {
    title: 'Blog',
    openGraph: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=Blog`],
    },
    twitter: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=Blog`],
    },
  };
}

const BlogPage = () => {
  return <PostList allBlogs={getBlogPosts()} />;
};

export default BlogPage;
