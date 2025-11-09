import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/dashboard': '/dashboard',
    '/guestbook': '/guestbook',
    '/projects': '/projects',
  },
});
