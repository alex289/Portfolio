'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import NowPlaying from './now-playing';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const links = [
    {
      href: '/',
      id: 'footer.home',
      text: t('main.home'),
    },
    {
      href: '/blog',
      id: 'footer.blog',
      text: 'Blog',
    },
    {
      href: 'https://github.com/alex289/dotfiles',
      id: 'footer.my-setup',
      text: t('footer.my-setup'),
    },
    {
      href: 'https://alexanderkonietzko-analytics.vercel.app/share/iGO3fY48/alexanderkonietzko',
      id: 'footer.analytics',
      text: t('footer.analytics'),
    },
    {
      href: '/about',
      id: 'footer.about',
      text: t('main.about'),
    },
    {
      href: '/guestbook',
      id: 'footer.guestbook',
      text: t('guestbook.title'),
    },
    {
      href: 'https://github.com/alex289/Portfolio',
      id: 'footer.sourcecode',
      text: t('footer.sourcecode'),
    },
    {
      href: 'https://alexanderkonietzko.vercel.app/feed.xml',
      id: 'footer.feed',
      text: 'Feed',
    },
    {
      href: '/projects',
      id: 'footer.projects',
      text: t('main.projects'),
    },
    {
      href: 'https://github.com/alex289',
      id: 'footer.github',
      text: 'GitHub',
    },
    {
      href: 'mailto:me@alexanderkonietzko.com',
      id: 'footer.contact',
      text: t('footer.contact'),
    },
    {
      href: 'sitemap.xml',
      id: 'footer.sitemap',
      text: t('footer.sitemap'),
    },
  ];
  return (
    <div className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-800">
      <footer className="mx-auto mb-8 flex w-full max-w-3xl flex-col items-start justify-center">
        <hr className="mb-8 w-full border border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700" />
        <NowPlaying />
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 pb-12 sm:grid-cols-4 sm:grid-rows-3">
          {links.map((link) =>
            link.href.startsWith('/') ? (
              <Link
                key={link.id}
                href={`/${locale}/${link.href}`}
                id={link.id}
                className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
                {link.text}
              </Link>
            ) : (
              <a
                key={link.id}
                href={link.href}
                id={link.id}
                target="blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
                {link.text}
              </a>
            ),
          )}
        </div>
        <p
          className="mx-auto text-sm text-gray-500 dark:text-gray-300"
          id="powered-by">
          {t('footer.powered')}
          <a
            className="text-indigo-500"
            target="_blank"
            rel="noopener noreferrer"
            href="https://nextjs.org/">
            Next.js
          </a>{' '}
          {t('footer.and')}
          <a
            className="text-indigo-500"
            target="_blank"
            rel="noopener noreferrer"
            href="https://tailwindcss.com/">
            TailwindCSS
          </a>
          . {t('footer.hosted')}{' '}
          <a
            className="text-indigo-500"
            target="_blank"
            rel="noopener noreferrer"
            href="https://vercel.com/">
            Vercel
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
