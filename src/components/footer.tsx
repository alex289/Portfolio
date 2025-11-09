'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import NowPlaying from './now-playing';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const links = [
    {
      href: '/projects',
      id: 'footer.projects',
      text: t('main.projects'),
    },
    {
      href: 'https://github.com/Daniel21b',
      id: 'footer.github',
      text: 'GitHub',
    },
    {
      href: 'mailto:dberhane@terpmail.umd.edu',
      id: 'footer.contact',
      text: t('footer.contact'),
    },
  ];
  return (
    <div className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-800">
      <footer className="mx-auto mb-8 flex w-full max-w-3xl flex-col items-start justify-center">
        <hr className="mb-8 w-full border border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700" />
        <NowPlaying />
        <div className="flex w-full max-w-3xl gap-6 pb-12 justify-center">
          {links.map((link) =>
            link.href.startsWith('/') ? (
              <Link
                key={link.id}
                // @ts-expect-error Cant type this link
                href={`${link.noTranslate !== true ? '/' + locale : ''}${
                  link.href
                }`}
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
        <p className="mx-auto text-sm text-gray-500 dark:text-gray-300">
          © {new Date().getFullYear()} Daniel Berhane
        </p>
      </footer>
    </div>
  );
}
