import { PropsWithChildren, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/future/image';

import { parseISO, format } from 'date-fns';

import Layout from '@/components/Layout';

import useTranslation from '@/lib/useTranslation';

const Comment = dynamic(() => import('@/components/Comment'), {
  suspense: true,
});
const ViewCounter = dynamic(() => import('@/components/blog/ViewCounter'), {
  suspense: true,
});

import type { Post } from '@/lib/types';

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post: Post }>) {
  const { t } = useTranslation();
  return (
    <Layout
      title={`${post.title} – Alexander Konietzko`}
      description={post.excerpt}
      date={new Date(post.date).toISOString()}
      type="article"
      blogTranslation={post.translation}
      tags={post.tags}>
      <article className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {post.title}
        </h1>
        <div className="mt-2 flex w-full flex-col items-start justify-between md:flex-row md:items-center">
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
              {format(parseISO(post.date), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="min-w-32 mt-2 text-sm text-gray-600 dark:text-[#c2c2c2] md:mt-0">
            {post.readingTime}
            {` • `}
            <Suspense>
              <ViewCounter slug={post.slug} />
            </Suspense>
          </p>
        </div>
        <div className="mt-2 flex w-full text-xs">
          {post.tags.map((tag) => (
            <Link href={`/blog?filter=tag&search=${tag}`} key={tag}>
              <a className="mx-2 rounded-xl border border-gray-600 px-2 py-1 hover:bg-gray-200 dark:border-gray-400 dark:hover:bg-gray-600">
                {tag}
              </a>
            </Link>
          ))}
        </div>
        <Suspense>
          <div className="prose mt-4 w-full max-w-none dark:prose-dark">
            {children}
          </div>
          <div className="mt-4 text-sm text-gray-700 dark:text-[#c2c2c2]">
            <a
              href="https://github.com/alex289/portfolio/issues"
              target="_blank"
              rel="noopener noreferrer">
              {t('blog.edit-post')}
            </a>
          </div>
          <Comment slug={post.slug} />
        </Suspense>
      </article>
    </Layout>
  );
}
