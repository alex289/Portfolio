import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/blog': '/blog',
    '/blog/[slug]': '/blog/[slug]',
    '/guestbook': '/guestbook',
    '/projects': '/projects',
  },
});
