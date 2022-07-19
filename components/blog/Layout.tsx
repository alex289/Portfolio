import Image from 'next/future/image';
import { parseISO, format } from 'date-fns';

import Layout from '@/components/Layout';
import ViewCounter from '@/components/blog/ViewCounter';

import useTranslation from '@/lib/useTranslation';

import { PropsWithChildren, Suspense } from 'react';
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
      blogTranslation={post.translation}>
      <article className="mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center">
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
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <Suspense fallback={null}>
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
        </Suspense>
      </article>
    </Layout>
  );
}
