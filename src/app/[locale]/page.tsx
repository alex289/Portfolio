import profilePic from 'public/static/images/konietzko_alexander.jpg';

import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import FeaturedPost from '@/components/blog/featured-post';
import Project from '@/components/projects';
import { getProjects } from '@/lib/github';

interface IndexProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

const Index = async ({ params }: IndexProps) => {
  const locale = (await params).locale;
  const [projects, t] = await Promise.all([
    getProjects(3),
    getTranslations({ locale }),
  ]);
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
            placeholder="blur-sm"
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
        <FeaturedPost
          title={t('index-page.posts.1.title')}
          slug={t('index-page.posts.1.slug')}
          gradient="from-[#D8B4FE] via-[#726dde] to-[#818CF8]"
        />
        <FeaturedPost
          title={t('index-page.posts.2.title')}
          slug={t('index-page.posts.2.slug')}
          gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
        />
        <FeaturedPost
          title={t('index-page.posts.3.title')}
          slug={t('index-page.posts.3.slug')}
          gradient="from-[#9333EA] via-[#818CF8] to-[#3B82F6]"
        />
      </div>

      <Link
        href={`/${locale}/blog`}
        className="mb-16 mt-8 flex h-6 cursor-pointer items-center rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
        {t('index-page.posts.read-all')}
        <ArrowRight strokeWidth={1.5} className="ml-1" />
      </Link>

      <h3
        id="projects"
        className="mb-4 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
        {t('main.projects')}
      </h3>

      <Project projects={projects} />
      {projects.length === 0 && t('projects.not-found')}

      <Link
        href={`/${locale}/projects`}
        className="mb-16 mt-4 flex h-6 cursor-pointer items-center rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
        {t('projects.see-more')}
        <ArrowRight strokeWidth={1.5} className="ml-1" />
      </Link>
    </>
  );
};

export default Index;
