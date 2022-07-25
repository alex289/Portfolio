import Link from 'next/link';
import Image from 'next/future/image';

import useTranslation from '@/lib/useTranslation';

import avatar from '../public/static/images/konietzko_alexander.jpg';

import Layout from '@/components/Layout';

export default function About() {
  const { t } = useTranslation();
  const age = Math.floor(
    (new Date().getTime() - new Date('2002-09-28').getTime()) / 3.15576e10
  );
  return (
    <Layout title={t('main.about') + ' - Alexander Konietzko'}>
      <div className="mx-auto mb-16 flex w-full max-w-2xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {t('main.about')}
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2]">
          <p className="mb-6">
            {t('about-page.text-1').replace('$AGE', age.toString())}
          </p>
          <p className="mb-6">{t('about-page.text-2')}</p>
          <p>{t('about-page.text-3')}</p>
        </h2>
        <h1 className="mb-4 text-xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
          Links
        </h1>
        <h2 className="prose mb-16 text-gray-600 dark:prose-dark dark:text-[#c2c2c2]">
          <ul className="list-disc">
            <li>
              Github: <Link href="https://github.com/alex289">@alex289</Link>
            </li>
            <li>
              Website:{' '}
              <Link href="https://alexanderkonietzko.vercel.app">
                https://alexanderkonietzko.vercel.app
              </Link>
            </li>
          </ul>
        </h2>

        <h1 className="mb-4 text-xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
          Timeline
        </h1>
        <ol className="relative mb-16 border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-4">
            <div className="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-[#c2c2c2]">
              August 2021
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
              href="https://www.netgo.de/"
              aria-label="Netgo homepage">
              <div className="inline-flex cursor-pointer items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:text-[#c2c2c2] dark:hover:bg-gray-700 dark:hover:text-white">
                {t('about-page.timeline.learn-more')}{' '}
                <svg
                  className="ml-2 h-3 w-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </div>
            </a>
          </li>
          <li className="ml-4">
            <div className="absolute -left-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700"></div>
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
          Headshots
        </h1>
        <div className="flex space-x-8">
          <a href="/static/images/konietzko_alexander.jpg">
            <Image
              alt="Alexander Konietzko headshot"
              width={400}
              quality={100}
              src={avatar}
              className="rounded-full"
            />
          </a>
          <a href="/static/images/konietzko_alexander.jpg">
            <Image
              alt="Alexander Konietzko headshot"
              width={400}
              quality={100}
              src={avatar}
              className="rounded-full grayscale filter"
            />
          </a>
        </div>
      </div>
    </Layout>
  );
}
