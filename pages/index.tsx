import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/future/image';

import useTranslation from '@/lib/useTranslation';
import { BACKUP_REPOS_URL } from '@/lib/constants';

import profilePic from '../public/static/images/konietzko_alexander.jpg';

import Layout from '@/components/Layout';
import BlogPostCard from '@/components/blog/BlogPostCard';
import Project from '@/components/Projects';

import type { GetStaticProps } from 'next';
import type { Projects } from '@/lib/types';

type Props = {
  fallbackData: Projects[];
};

export default function Index({ fallbackData }: Props) {
  const { t } = useTranslation();
  return (
    <Layout>
      <Suspense fallback={null}>
        <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
          <div className="flex flex-col-reverse items-start sm:flex-row">
            <div className="flex flex-col pr-8">
              <h1 className="mb-1 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
                Alexander Konietzko
              </h1>
              <h2 className="mb-4 text-gray-700 dark:text-gray-200">
                {t('index-page.title')}{' '}
                <span className="font-semibold">Netgo</span>
              </h2>
              <p className="mb-16 text-gray-600 dark:text-gray-300">
                {t('index-page.intro')}
              </p>
            </div>
            <div className="relative mb-8 mr-auto w-[80px] sm:mb-0 sm:w-[176px]">
              <Image
                alt="Alexander Konietzko"
                height={500}
                width={500}
                src={profilePic}
                placeholder="blur"
                sizes="30vw"
                priority
                className="rounded-full"
              />
            </div>
          </div>

          <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            Featured Posts
          </h3>
          <div className="flex flex-col gap-6 md:flex-row">
            <BlogPostCard
              title={t('index-page.posts.1.title')}
              slug={t('index-page.posts.1.slug')}
              gradient="from-[#D8B4FE] to-[#818CF8]"
            />
            <BlogPostCard
              title={t('index-page.posts.2.title')}
              slug={t('index-page.posts.2.slug')}
              gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
            />
            <BlogPostCard
              title={t('index-page.posts.3.title')}
              slug={t('index-page.posts.3.slug')}
              gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
            />
          </div>
          <Link href="/blog">
            <a className="mt-8 mb-16 flex h-6 rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
              {t('index-page.posts.read-all')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="ml-1 h-6 w-6">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                />
              </svg>
            </a>
          </Link>

          <h3
            id="projects"
            className="mb-4 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            {t('main.projects')}
          </h3>
          <h2 className="text-gray-600 dark:text-gray-200">
            <Project fallbackData={fallbackData} />
          </h2>
          <Link href="/projects">
            <a className="mt-4 mb-16 flex h-6 rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
              {t('projects.see-more')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="ml-1 h-6 w-6">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
                />
              </svg>
            </a>
          </Link>
        </div>
      </Suspense>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const reposResponse = await fetch(
    'https://api.github.com/users/Alex289/repos?per_page=3&sort=pushed'
  );

  let fallbackData = await reposResponse.json();

  if (!reposResponse.ok) {
    const backupResponse = await fetch(BACKUP_REPOS_URL);

    fallbackData = await backupResponse.json();
  }

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
};
