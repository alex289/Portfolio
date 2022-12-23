import { useRouter } from 'next/router';

import en from '@/locales/en.json';
import de from '@/locales/de.json';

import type { LocalesJsonObject, UseTranslation } from '@/lib/types';

const locales: { [x: string]: LocalesJsonObject } = {
  en,
  de,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = (obj: any, path: string) => {
  return path
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.')
    .reduce((prev, index) => (prev || {})[index], obj);
};

const useTranslation = (): UseTranslation => {
  const router = useRouter();
  const { locale } = router;

  const t = (key: string): string => {
    return get(locales[locale || 'en'], key);
  };

  return { t, locale };
};

export default useTranslation;
