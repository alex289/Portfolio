import Image from 'next/future/image';

import type { Projects } from '@/lib/types';

import useTranslation from '@/lib/useTranslation';

import Layout from '@/components/Layout';
import Project from '@/components/Projects';

import profilePic from '../public/static/images/konietzko_alexander.jpg';

import type { GetStaticProps } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import BlogPostCard from '@/components/blog/BlogPostCard';

export default function Index({
  fallbackData,
}: {
  fallbackData: Projects[];
}): JSX.Element {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="flex flex-col-reverse items-start sm:flex-row">
          <div className="flex flex-col pr-8">
            <h1 className="mb-1 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
              Alexander Konietzko
            </h1>
            <h2 className="mb-4 text-gray-700 dark:text-gray-200">
              Software Engineer and Student at{' '}
              <span className="font-semibold">Netgo</span>
            </h2>
            <p className="mb-16 text-gray-600 dark:text-gray-400">
              {t('index-page.intro')}
            </p>
          </div>
          <div className="relative mb-8 mr-auto w-[80px] sm:w-[176px] sm:mb-0">
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

        <h3 className="mb-6 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          Featured Posts
        </h3>
        <div className="flex flex-col mb-16 gap-6 md:flex-row">
          <BlogPostCard
            title="Initial Commit"
            slug="initial-commit"
            gradient="from-[#D8B4FE] to-[#818CF8]"
          />
          <BlogPostCard
            title="Best Terminal Setup"
            slug="terminal-setup"
            gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
          />
          <BlogPostCard
            title="Best Terminal Setup"
            slug="terminal-setup"
            gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
          />
        </div>

        <h3
          id="projects"
          className="mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          {t('main.projects')}
        </h3>
        <Suspense fallback={null}>
          <h2 className="text-gray-600 dark:text-gray-200">
            <Project fallbackData={fallbackData} />
          </h2>
          <div className="underline underline-offset-1">
            <Link href="/projects">See more</Link>
          </div>
        </Suspense>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const reposResponse = await fetch(
    'https://api.github.com/users/Alex289/repos?per_page=3&sort=pushed'
  );

  const fallbackData = await reposResponse.json();

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
};
