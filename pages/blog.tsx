import { Suspense, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Search } from 'lucide-react';

import Layout from '@/components/Layout';

import useTranslation from '@/lib/hooks/useTranslation';
import { indexQuery } from '@/lib/sanity/queries';
import { getClient } from '@/lib/sanity/sanity-server';

const BlogPost = dynamic(() => import('@/components/blog/BlogPost'), {
  suspense: true,
});

const BlogFilter = dynamic(() => import('@/components/blog/BlogFilter'), {
  suspense: true,
});

import type { GetStaticProps, NextPage } from 'next';
import type { Post } from '@/lib/types';

const Blog: NextPage<{ posts: Post[] }> = ({ posts }) => {
  const { t, locale } = useTranslation();
  const { query } = useRouter();
  const [searchValue, setSearchValue] = useState('');
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
            tag.toLowerCase().includes(searchValue.toLowerCase()),
          );
        }
      })
      .filter((post) => post.language === locale);
  }, [posts, filterBy, searchValue, locale]);

  return (
    <Layout
      title="Blog – Alexander Konietzko"
      description="Thoughts on programming, tech, music, and my personal life.">
      <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          Blog
        </h1>
        <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
          {t('blog.description').replace(
            '$AMOUNT',
            posts.filter((post) => post.language === locale).length.toString(),
          )}
        </p>
        <div className="relative mb-4 w-full">
          <input
            aria-label={t('blog.search')}
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={t('blog.search')}
            defaultValue={searchValue}
            className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-primary focus:ring-primary dark:border-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-500"
          />

          <Suspense>
            <BlogFilter filterBy={filterBy} setFilter={setFilterBy} />
          </Suspense>

          <Search
            strokeWidth={1.5}
            className="absolute right-3 top-3 h-5 w-5 cursor-pointer text-gray-400 dark:text-gray-300"
          />
        </div>
        <Suspense>
          <h2 className="mb-5 mt-8 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            {t('blog.all-posts')} ({filteredBlogPosts.length})
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
};

export default Blog;

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const posts = await getClient(preview).fetch<Post[]>(indexQuery);

  return {
    props: { posts },
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};
