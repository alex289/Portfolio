import { createSharedPathnamesNavigation } from 'next-intl/navigation';

const locales = ['en', 'de'] as const;
export const { Link, useRouter, usePathname, redirect } =
  createSharedPathnamesNavigation({ locales });
