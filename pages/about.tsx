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
    <Layout>
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {t('main.about')}
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2]">
          <p className="mb-6">
            {t('about-page.text-1').replace('$AGE', age.toString())}
          </p>
          <p className="mb-6">{t('about-page.text-2')}</p>
          <p>{t('about-page.text-3')}</p>
        </h2>
        <h1 className="mb-4 text-xl font-bold tracking-tight text-black md:text-3xl dark:text-white">
          Links
        </h1>
        <h2 className="mb-16 text-gray-600 dark:text-[#c2c2c2] prose dark:prose-dark">
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

        <h1 className="mb-4 text-xl font-bold tracking-tight text-black md:text-3xl dark:text-white">
          Timeline
        </h1>
        <ol className="relative mb-16 border-l border-gray-200 dark:border-gray-700">
          <li className="mb-10 ml-4">
            <div className="absolute w-3 h-3 bg-gray-200 border border-white rounded-full -left-1.5 dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-500 dark:text-[#c2c2c2]">
              August 2021
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('about-page.timeline.2.title')}
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-[#c2c2c2]">
              {t('about-page.timeline.2.description')}
            </p>
            <a
              target="_blank"
              rel="noreferrer noopener"
              href="https://www.netgo.de/">
              <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 focus:z-10 focus:ring-2 dark:bg-gray-800 dark:text-[#c2c2c2] dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                {t('about-page.timeline.learn-more')}{' '}
                <svg
                  className="w-3 h-3 ml-2"
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
            <div className="absolute w-3 h-3 bg-gray-200 border border-white rounded-full -left-1.5 dark:border-gray-900 dark:bg-gray-700"></div>
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

        <h1 className="mb-4 text-xl font-bold tracking-tight text-black md:text-3xl dark:text-white">
          Headshots
        </h1>
        <div className="flex space-x-8">
          <a href="/static/images/konietzko_alexander.jpg">
            <Image
              alt="Lee Robinson headshot"
              width={400}
              quality={100}
              src={avatar}
              className="rounded-full"
            />
          </a>
          <a href="/static/images/konietzko_alexander.jpg">
            <Image
              alt="Lee Robinson headshot"
              width={400}
              quality={100}
              src={avatar}
              className="rounded-full filter grayscale"
            />
          </a>
        </div>
      </div>
    </Layout>
  );
}
