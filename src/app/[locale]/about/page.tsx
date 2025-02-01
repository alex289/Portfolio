import avatar from 'public/static/images/konietzko_alexander.jpg';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

import env from '@/env.mjs';
import Tools from '@/components/tools';

import type { Metadata } from 'next/types';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const locale = (await params).locale;
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
  const age = Math.floor(
    (new Date().getTime() - new Date('2002-09-28').getTime()) / 3.15576e10,
  );
  return (
    <>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        {t('main.about')}
      </h1>
      <div className="mb-16 text-gray-600 dark:text-[#c2c2c2]">
        <p className="mb-6">{t('about-page.text-1', { age })}</p>
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
              href="https://github.com/alex289"
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              @alex289
            </a>
          </li>
          <li>
            Twitter:{' '}
            <a
              href="https://twitter.com/_alex289"
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              @_alex289
            </a>
          </li>
          <li>
            {t('about-page.website')}:{' '}
            <a
              href={env.NEXT_PUBLIC_WEBSITE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              {env.NEXT_PUBLIC_WEBSITE_URL}
            </a>
          </li>
          <li>
            Quicklinks:{' '}
            <a
              href="https://alexanderkonietzko-links.vercel.app"
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              https://alexanderkonietzko-links.vercel.app
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
              <ArrowRight className="ml-2 h-3 w-3" />
            </div>
          </a>
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
        {t('about-page.uses.title')}
      </h1>
      <p className="mb-6 text-gray-500 dark:text-[#c2c2c2]">
        {t('about-page.uses.text')}
      </p>
      <div className="prose mb-16 text-gray-600 dark:text-[#c2c2c2]">
        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white md:text-xl">
          {t('about-page.uses.office')}
        </h3>
        <ul className="list-disc">
          <li>14&quot; MacBook Pro, M1 Pro, 16GB RAM (2021)</li>
          <li>Logitech MX Master 3 Mouse</li>
          <li>
            Keychron K2 Keyboard (RGB Backlight, Gateron G Pro Brown Switches)
          </li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white md:text-xl">
          Coding
        </h3>
        <ul className="list-disc">
          <li>
            Editor: VS Code, Neovim {t('about-page.uses.and')} JetBrains Rider (
            <a
              href="https://github.com/alex289/dotfiles"
              target="_blank"
              rel="noreferrer noopener"
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              {t('about-page.uses.configuration')}
            </a>
            )
          </li>
          <li>Terminal: ITerm2 / zsh</li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white md:text-xl">
          Software
        </h3>
        <ul className="list-disc">
          <li>Arc</li>
          <li>Raycast</li>
          <li>Rectagle</li>
          <li>Spotify</li>
          <li>Alt-tab</li>
          <li>Docker</li>
        </ul>

        <h3 className="text-lg font-bold tracking-tight text-black dark:text-white md:text-xl">
          {t('about-page.uses.other-tech')}
        </h3>
        <ul className="list-disc">
          <li>Apple iPhone 15 Pro</li>
          <li>Apple AirPods Pro</li>
          <li>Apple Watch Series 5</li>
        </ul>
      </div>

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
            className="rounded-full grayscale"
          />
        </a>
      </div>
    </>
  );
};

export default AboutPage;
