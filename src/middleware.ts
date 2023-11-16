import createIntlMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from '@/lib/navigation';

export default createIntlMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
});

export const config = {
  matcher: ['/((?!api|_next|static|images|sitemap|feed|robots).*)'],
};
