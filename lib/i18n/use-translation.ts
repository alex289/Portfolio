import { usePathname } from 'next/navigation';

import en from '@/locales/en.json';
import de from '@/locales/de.json';

type LocalesJsonObject = {
  [x: string]: string | LocalesJsonObject;
};
type UseTranslation = {
  t: (key: string) => string;
  locale: string | undefined;
};

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
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] ?? 'en';

  const t = (key: string): string => {
    return get(locales[locale || 'en'], key);
  };

  return { t, locale };
};

export default useTranslation;
