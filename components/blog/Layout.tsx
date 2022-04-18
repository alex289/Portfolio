import Image from 'next/image';
import { parseISO, format } from 'date-fns';

import Layout from '@/components/Layout';
import ViewCounter from '@/components/blog/ViewCounter';

import type { PropsWithChildren } from 'react';
import type { Blog } from 'contentlayer/generated';

const editUrl = (slug: string) =>
  `https://github.com/alex289/portfolio/edit/main/data/blog/${slug}.mdx`;

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post: Blog }>) {
  return (
    <Layout
      title={`${post.title} – Alexander Konietzko`}
      description={post.summary}
      date={new Date(post.publishedAt).toISOString()}
      type="article">
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Alexander Konietzko"
              height={24}
              width={24}
              src="/static/images/konietzko_alexander.jpg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-[#c2c2c2]">
              {'Alexander Konietzko / '}
              {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-[#c2c2c2] min-w-32 md:mt-0">
            {post.readingTime.text}
            {` • `}
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          {children}
        </div>
        <div className="mt-4 text-sm text-gray-700 dark:text-[#c2c2c2]">
          <a
            href={editUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer">
            {'Edit on GitHub'}
          </a>
        </div>
      </article>
    </Layout>
  );
}
