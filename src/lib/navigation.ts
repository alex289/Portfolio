import { createLocalizedPathnamesNavigation } from 'next-intl/navigation';

import type { Pathnames } from 'next-intl/routing';

export const defaultLocale = 'en';
export const locales = ['en', 'de'] as const;

export const pathnames = {
  '/': '/',
  '/about': '/about',
  '/blog': '/blog',
  '/blog/[slug]': '/blog/[slug]',
  '/dashboard': '/dashboard',
  '/guestbook': '/guestbook',
  '/projects': '/projects',
} satisfies Pathnames<typeof locales>;

export const { Link, useRouter, usePathname, redirect } =
  createLocalizedPathnamesNavigation({ locales, pathnames });
