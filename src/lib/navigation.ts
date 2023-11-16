import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'de'] as const;

export const { Link, useRouter, usePathname, redirect } =
  createSharedPathnamesNavigation({ locales });
