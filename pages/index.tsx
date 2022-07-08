import Image from 'next/future/image';

import type { Projects } from '@/lib/types';

import useTranslation from '@/lib/useTranslation';

import Layout from '@/components/Layout';
import Project from '@/components/Projects';

import profilePic from '../public/static/images/konietzko_alexander.jpg';

import type { GetStaticProps } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';

export default function Index({
  fallbackData,
}: {
  fallbackData: Projects[];
}): JSX.Element {
  const { t } = useTranslation();
  const age = Math.floor(
    (new Date().getTime() - new Date('2002-09-28').getTime()) / 3.15576e10
  );
  return (
    <Layout>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="w-64 h-64 mx-auto mb-16">
          <Image
            className="rounded-full"
            src={profilePic}
            placeholder="blur"
            alt="Profile picture"
            width="500"
            height="500"
            quality={100}
            priority
          />
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {t('index-page.title')}
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2]">
          {t('index-page.intro')}
        </h2>
        <h3
          id="about"
          className="mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          {t('main.about')}
        </h3>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2]">
          <p className="mb-6">
            {t('index-page.about-1').replace('$AGE', age.toString())}
          </p>
          <p className="mb-6">{t('index-page.about-2')}</p>
          <p>{t('index-page.about-3')}</p>
        </h2>
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
