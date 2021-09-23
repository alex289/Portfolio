import { useRouter } from 'next/router';

import en from '@/locales/en.json';
import de from '@/locales/de.json';

type localesType = {
  [x: string]: string;
};

const locales: { [x: string]: localesType } = {
  en,
  de,
};

const get = (obj: localesType, path: string) => {
  if (!path) {
    return undefined;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pathArray: any = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result = pathArray?.reduce(
    (prevObj: localesType, key: string) => prevObj && prevObj[key],
    obj
  );
  return result;
};

const useTranslation = () => {
  const router = useRouter();
  const { locale } = router;
  const language = locale || 'en';

  const t = (key = ''): string => {
    return get(locales[language], key) || key;
  };

  const changeLanguage = (locale: string): void => {
    router.push(router.pathname, router.asPath, { locale, scroll: false });
  };

  return {
    t,
    language,
    changeLanguage,
  };
};

export default useTranslation;
