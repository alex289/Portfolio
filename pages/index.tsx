import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import useTranslation from '@/lib/useTranslation';
import { BACKUP_REPOS_URL, DAY_IN_SECONDS } from '@/lib/constants';

import profilePic from '../public/static/images/konietzko_alexander.jpg';

import Layout from '@/components/Layout';
import BlogPostCard from '@/components/blog/BlogPostCard';
import Project from '@/components/Projects';

import type { GetStaticProps, NextPage } from 'next';
import type { Projects } from '@/lib/types';

type Props = {
  fallbackData: Projects[];
};

const Index: NextPage<Props> = ({ fallbackData }) => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Suspense>
        <div className="mx-auto mb-16 flex max-w-3xl flex-col items-start justify-center">
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
              gradient="from-[#D8B4FE] via-[#726dde] to-[#818CF8]"
            />
            <BlogPostCard
              title={t('index-page.posts.2.title')}
              slug={t('index-page.posts.2.slug')}
              gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
            />
            <BlogPostCard
              title={t('index-page.posts.3.title')}
              slug={t('index-page.posts.3.slug')}
              gradient="from-[#9333EA] via-[#818CF8] to-[#3B82F6]"
            />
          </div>
          <Link
            href="/blog"
            className="mt-8 mb-16 flex h-6 cursor-pointer rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
            {t('index-page.posts.read-all')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="ml-1 h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
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
            <div className="mt-4 mb-16 flex h-6 cursor-pointer rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
              {t('projects.see-more')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-1 h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </div>
          </Link>
        </div>
      </Suspense>
    </Layout>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async () => {
  const reposResponse = await fetch(
    'https://api.github.com/users/alex289/repos?per_page=3&sort=pushed'
  );

  let fallbackData = await reposResponse.json();

  if (!reposResponse.ok) {
    const backupResponse = await fetch(BACKUP_REPOS_URL);

    fallbackData = await backupResponse.json();
    fallbackData = fallbackData.slice(0, 3);
  }

  return {
    props: {
      fallbackData,
    },
    revalidate: DAY_IN_SECONDS,
  };
};
