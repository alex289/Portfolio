import { useRouter } from 'next/router';

import en from '@/locales/en.json';
import de from '@/locales/de.json';

import type { ObjectType, UseTranslation } from '@/lib/types';

const locales: { [x: string]: ObjectType } = {
  en,
  de,
};

const get = (obj: ObjectType, path: string) => {
  if (!path) {
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pathArray: any = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result = pathArray?.reduce(
    (prevObj: ObjectType, key: string) => prevObj && prevObj[key],
    obj
  );
  return result;
};

const useTranslation = (): UseTranslation => {
  const router = useRouter();
  const { locale } = router;
  const language = locale || 'en';

  const t = (key: string): string => {
    return get(locales[language], key) || key;
  };

  const changeLanguage = (locale: string): void => {
    router.push(router.pathname, router.asPath, {
      locale,
      scroll: false,
      shallow: true,
    });
  };

  return {
    t,
    language,
    changeLanguage,
  };
};

export default useTranslation;
