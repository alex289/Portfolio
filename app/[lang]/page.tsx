'use client';
import useTranslation from '@/lib/i18n/use-translation';
import Image from 'next/image';
import profilePic from '@/public/static/images/konietzko_alexander.jpg';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const Index = () => {
  const { t, locale } = useTranslation();
  return (
    <>
      <div className="flex flex-col-reverse items-start sm:flex-row">
        <div className="flex flex-col pr-8">
          <h1 className="mb-1 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
            Alexander Konietzko
          </h1>
          <h2 className="mb-4 text-gray-700 dark:text-gray-200">
            {t('index-page.title')} Netgo
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

      <Link
        href={`/${locale}/blog`}
        className="mt-8 mb-16 flex h-6 cursor-pointer items-center rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
        {t('index-page.posts.read-all')}
        <ArrowRight strokeWidth={1.5} className="ml-1" />
      </Link>

      <h3
        id="projects"
        className="mb-4 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
        {t('main.projects')}
      </h3>

      <Link
        href={`/${locale}/projects`}
        className="mt-4 mb-16 flex h-6 cursor-pointer items-center rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
        {t('projects.see-more')}
        <ArrowRight strokeWidth={1.5} className="ml-1" />
      </Link>
    </>
  );
};

export default Index;
