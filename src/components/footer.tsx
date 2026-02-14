'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

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
      href: '/projects',
      id: 'footer.projects',
      text: t('main.projects'),
    },
    {
      href: 'https://github.com/alex289',
      id: 'footer.github',
      text: 'GitHub',
    },
  ];
  return (
    <div className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-800">
      <footer className="mx-auto mb-8 flex w-full max-w-3xl flex-col items-start justify-center">
        <hr className="mb-8 w-full border border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700" />
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 pb-12 sm:grid-cols-4 sm:grid-rows-3">
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
        <p className="mx-auto text-sm text-gray-500 dark:text-gray-300">
          © {new Date().getFullYear()} Alexander Konietzko
        </p>
      </footer>
    </div>
  );
}
