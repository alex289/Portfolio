import createIntlMiddleware from 'next-intl/middleware';

export default createIntlMiddleware({
  locales: ['en', 'de'],
  defaultLocale: 'en',
});

export const config = {
  matcher: ['/((?!api|_next|static|images).*)'],
};
