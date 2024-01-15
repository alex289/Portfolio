'use client';

import { Search } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import PostCard from '@/components/blog/post-card';
import PostFilter from '@/components/blog/post-filter';

import type { BlogPost } from '@/lib/types';

const PostList = ({ allBlogs }: { allBlogs: BlogPost[] }) => {
  const t = useTranslations('blog');
  const locale = useLocale();

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search');
  const filterQuery = searchParams.get('filter');

  const [searchValue, setSearchValue] = useState('');
  const [filterBy, setFilterBy] = useState<'name' | 'tag'>('name');

  useEffect(() => {
    if (searchQuery) {
      setSearchValue(searchQuery);
    }
    if (filterQuery) {
      setFilterBy(filterQuery === 'tag' ? 'tag' : 'name');
    }
  }, [searchQuery, filterQuery]);

  const filteredBlogPosts = useMemo(() => {
    return allBlogs
      .filter((post) => {
        if (filterBy === 'name') {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        }

        // filterBy === 'tag'
        return post.tags.some((tag) =>
          tag.toLowerCase().includes(searchValue.toLowerCase()),
        );
      })
      .filter((post) => post.language === locale)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [allBlogs, filterBy, searchValue, locale]);

  return (
    <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        Blog
      </h1>
      <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
        {t('description', {
          amount: allBlogs.filter((post) => post.language === locale).length,
        })}
      </p>
      <div className="relative mb-4 w-full">
        <input
          aria-label={t('search')}
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={t('search')}
          defaultValue={searchValue}
          className="block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-blue-500"
        />

        <PostFilter filterBy={filterBy} setFilter={setFilterBy} />

        <Search
          strokeWidth={1.5}
          className="absolute right-3 top-3 h-5 w-5 cursor-pointer text-gray-400 dark:text-gray-300"
        />
      </div>
      <h2 className="mb-5 mt-8 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
        {t('all-posts')} ({filteredBlogPosts.length})
      </h2>
      {!filteredBlogPosts.length && (
        <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
          {t('no-posts')}
        </p>
      )}
      {filteredBlogPosts.map((post) => (
        <PostCard
          key={post.title}
          slug={post.slug}
          title={post.title}
          excerpt={post.summary}
          date={post.publishedAt}
          tags={post.tags}
        />
      ))}
    </div>
  );
};

export default PostList;
