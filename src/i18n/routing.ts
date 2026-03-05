import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'de'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about': '/about',
    '/guestbook': '/guestbook',
    '/projects': '/projects',
    '/imprint': '/imprint',
    '/privacy': '/privacy',
  },
});
