import { useState } from 'react';

import { useRouter } from 'next/router';
import { allBlogs } from 'contentlayer/generated';
import { pick } from 'contentlayer/client';

import Layout from '@/components/Layout';
import BlogPost from '@/components/blog/BlogPost';

import type { InferGetStaticPropsType } from 'next';
import useTranslation from '@/lib/useTranslation';

export default function Blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const filteredBlogPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter((post) => post.lang === locale);

  return (
    <Layout
      title="Blog – Alexander Konietzko"
      description="Thoughts on programming, tech, music, and my personal life.">
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Blog
        </h1>
        <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
          {t('blog.description').replace(
            '$AMOUNT',
            posts.filter((post) => post.lang === locale).length.toString()
          )}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          {t('blog.all-posts')}
        </h2>
        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
            {t('blog.no-posts')}
          </p>
        )}
        {filteredBlogPosts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Layout>
  );
}

export function getStaticProps() {
  const posts = allBlogs
    .map((post) =>
      pick(post, ['slug', 'title', 'summary', 'publishedAt', 'lang', 'tags'])
    )
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  return { props: { posts } };
}
