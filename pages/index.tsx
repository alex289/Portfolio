import Image from 'next/image';

import useTranslation from '@/lib/useTranslation';

import Layout from '@/components/layout';
import Project from '@/components/projects';

import profilePic from '../public/static/images/konietzko_alexander.jpg';

export default function Index(): JSX.Element {
  const { t } = useTranslation();
  const age = new Date().getFullYear() - 2002;
  return (
    <Layout>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <div className="mx-auto mb-16 w-41 h-41">
          <Image
            className="rounded-full"
            src={profilePic}
            placeholder="blur"
            alt="Profile picture"
            width="250"
            height="250"
            quality={100}
            loading="lazy"
          />
        </div>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {t('title')}
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-gray-400">{t('intro')}</h2>
        <h3
          id="about"
          className="mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white"
        >
          {t('about')}
        </h3>
        <h2 className="mb-16 text-gray-600 dark:text-gray-400">
          <p className="mb-6">{t('about-1').replace('$AGE', age.toString())}</p>
          <p className="mb-6">{t('about-2')}</p>
          <p>{t('about-3')}</p>
        </h2>
        <h3
          id="projects"
          className="mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white"
        >
          {t('projects')}
        </h3>
        <h2 className="mb-16 text-gray-600 dark:text-gray-400">
          <Project />
        </h2>
      </div>
    </Layout>
  );
}
