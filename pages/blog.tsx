import { Suspense, useEffect, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import Layout from '@/components/Layout';
import BlogPost from '@/components/blog/BlogPost';

import useTranslation from '@/lib/useTranslation';
import { indexQuery } from '@/lib/sanity/queries';
import { getClient } from '@/lib/sanity/sanity-server';

import type { GetStaticProps } from 'next';
import type { Post } from '@/lib/types';

export default function Blog({ posts }: { posts: Post[] }) {
  const { t } = useTranslation();
  const { locale, query } = useRouter();
  const [searchValue, setSearchValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filterBy, setFilterBy] = useState<'name' | 'tag'>('name');

  useEffect(() => {
    if (query.search) {
      setSearchValue(query.search.toString());
    }
    if (query.filter) {
      setFilterBy(query.filter === 'tag' ? 'tag' : 'name');
    }
  }, [query]);

  const filteredBlogPosts = useMemo(() => {
    return posts
      .filter((post) => {
        if (filterBy === 'name') {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        }
        if (filterBy === 'tag') {
          return post.tags.some((tag) =>
            tag.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
      })
      .filter((post) => post.language === locale);
  }, [posts, filterBy, searchValue, locale]);

  return (
    <Layout
      title="Blog – Alexander Konietzko"
      description="Thoughts on programming, tech, music, and my personal life.">
      <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          Blog
        </h1>
        <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
          {t('blog.description').replace(
            '$AMOUNT',
            posts.filter((post) => post.language === locale).length.toString()
          )}
        </p>
        <div className="relative mb-4 w-full">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            defaultValue={searchValue}
            className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-800 dark:bg-gray-700 dark:text-gray-100"
          />
          <svg
            className="absolute right-3 top-3 h-5 w-5 cursor-pointer text-gray-400 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setShowDropdown(!showDropdown)}
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <div
            className={`absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-700 ${
              !showDropdown && 'hidden'
            }`}>
            <div className="py-1">
              <p className="text-semibold mb-1 block border-b px-4 py-2 text-sm text-gray-700 dark:border-gray-300 dark:text-gray-200">
                Filter
              </p>
              <div
                className={`block cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-200 ${
                  filterBy === 'name' && 'font-bold'
                }`}
                onClick={() => {
                  setFilterBy('name');
                  setShowDropdown(false);
                }}>
                Name
              </div>
              <div
                className={`block cursor-pointer px-4 py-2 text-sm text-gray-700 dark:text-gray-200 ${
                  filterBy === 'tag' && 'font-bold'
                }`}
                onClick={() => {
                  setFilterBy('tag');
                  setShowDropdown(false);
                }}>
                Tag
              </div>
            </div>
          </div>
        </div>
        <Suspense>
          <h2 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            {t('blog.all-posts')}
          </h2>
          {!filteredBlogPosts.length && (
            <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
              {t('blog.no-posts')}
            </p>
          )}
          {filteredBlogPosts.map((post) => (
            <BlogPost
              key={post.title}
              slug={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              tags={post.tags}
            />
          ))}
        </Suspense>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const posts: Post[] = await getClient(preview).fetch(indexQuery);

  return {
    props: { posts },
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};
