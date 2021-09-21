import Image from 'next/image';

import useTranslation from '@/lib/useTranslation';

import Layout from '@/components/layout';
import Project from '@/components/projects';

import profilePic from '../public/static/images/konietzko_alexander.jpg';

export default function Index() {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <div className="w-41 h-41 mx-auto mb-16">
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
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {t('title')}
        </h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">{t('intro')}</h2>
        <h3
          id="about"
          className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white"
        >
          {t('about')}
        </h3>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          <p className="mb-6">
            {t('about-1').replace('$AGE', new Date().getFullYear() - 2002)}
          </p>
          <p className="mb-6">{t('about-2')}</p>
          <p>{t('about-3')}</p>
        </h2>
        <h3
          id="projects"
          className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white"
        >
          {t('projects')}
        </h3>
        <h2 className="text-gray-600 dark:text-gray-400 mb-16">
          <Project />
        </h2>
      </div>
    </Layout>
  );
}
