import { routing } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import env from '@/env.mjs';
import Tools from '@/components/tools';

import type { Metadata } from 'next/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale, namespace: 'main' });
  return {
    title: t('about'),
    openGraph: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('about')}`],
    },
    twitter: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('about')}`],
    },
  };
}

const AboutPage = () => {
  const t = useTranslations();
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        {t('main.about')}
      </h1>
      <div className="mb-16 text-gray-600 dark:text-[#c2c2c2]">
        <p className="mb-6">{t('about-page.text-1')}</p>
        <p className="mb-6">{t('about-page.text-2')}</p>
        <p>{t('about-page.text-3')}</p>
      </div>
      <h1 className="text-xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
        Links
      </h1>
      <div className="prose mb-16 text-gray-600 dark:text-[#c2c2c2]">
        <ul className="list-disc">
          <li>
            GitHub:{' '}
            <a
              href="https://github.com/Daniel21b"
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              @Daniel21b
            </a>
          </li>
          <li>
            LinkedIn:{' '}
            <a
              href="https://linkedin.com/in/daniel-berhane"
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              linkedin.com/in/daniel-berhane
            </a>
          </li>
          <li>
            Email:{' '}
            <a
              href="mailto:dberhane@terpmail.umd.edu"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              dberhane@terpmail.umd.edu
            </a>
          </li>
        </ul>
      </div>

      <h1 className="mb-4 text-xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
        {t('about-page.timeline.title')}
      </h1>
      <ol className="relative mb-16 border-l border-gray-200 dark:border-gray-700">
        <li className="mb-10 ml-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-[#c2c2c2]">
            June 2025 - September 2025
          </time>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('about-page.timeline.2.title')}
          </h2>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-[#c2c2c2]">
            {t('about-page.timeline.2.description')}
          </p>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href="https://icatt.net/icatt-applied-data-analytics/"
            aria-label="ICATT Consulting">
            <div className="inline-flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-[#c2c2c2] dark:hover:bg-gray-700 dark:hover:text-white">
              {t('about-page.timeline.learn-more')}{' '}
              <ArrowRight className="ml-2 h-3 w-3" />
            </div>
          </a>
        </li>
        <li className="mb-10 ml-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-[#c2c2c2]">
            June 2024 - August 2024
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('about-page.timeline.3.title')}
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-[#c2c2c2]">
            {t('about-page.timeline.3.description')}
          </p>
        </li>
        <li className="ml-4">
          <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-[#c2c2c2]">
            {t('about-page.timeline.1.date')}
          </time>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('about-page.timeline.1.title')}
          </h3>
          <p className="text-base font-normal text-gray-500 dark:text-[#c2c2c2]">
            {t('about-page.timeline.1.description')}
          </p>
        </li>
      </ol>

      <h1 className="mb-4 text-xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
        {t('about-page.tools.title')}
      </h1>
      <div className="mb-16">
        <p className="text-gray-500 dark:text-[#c2c2c2]">
          {t('about-page.tools.text')}
        </p>
        <Tools />
      </div>

      <h1 className="mb-4 text-xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
        Skills & Technologies
      </h1>
      <p className="mb-6 text-gray-500 dark:text-[#c2c2c2]">
        Here&apos;s my technical stack for data analysis and engineering.
      </p>
      <div className="prose mb-16 text-gray-600 dark:text-[#c2c2c2]">
        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white md:text-xl">
          Programming Languages
        </h3>
        <ul className="list-disc">
          <li>Python, SQL, R, JavaScript, Java</li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white md:text-xl">
          Data Analysis & Visualization
        </h3>
        <ul className="list-disc">
          <li>Pandas, NumPy, Matplotlib, Seaborn</li>
          <li>Power BI, Tableau, Looker</li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white md:text-xl">
          Data Pipeline & Cloud
        </h3>
        <ul className="list-disc">
          <li>dbt, AWS (Glue, Lambda, EC2), Snowflake</li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white md:text-xl">
          Machine Learning & MLOps
        </h3>
        <ul className="list-disc">
          <li>scikit-learn, MLflow</li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white md:text-xl">
          Databases & Tools
        </h3>
        <ul className="list-disc">
          <li>MySQL, PostgreSQL, MongoDB</li>
          <li>Git, GitHub Actions, FastAPI</li>
        </ul>
      </div>

      <h1 className="mb-4 text-xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
        Profile
      </h1>
      <div className="flex space-x-8">
        <Image
          alt="Daniel Berhane profile"
          width={200}
          height={200}
          src="/favicon.png"
          className="rounded-full"
        />
      </div>
    </>
  );
};

export default AboutPage;
