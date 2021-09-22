import { useRouter } from 'next/router';

import en from '@/locales/en.json';
import de from '@/locales/de.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const locales: any = {
  en,
  de,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const get = (obj: any, path: any, defValue?: any) => {
  if (!path) {
    return undefined;
  }
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result = pathArray.reduce(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prevObj: any, key: any) => prevObj && prevObj[key],
    obj
  );
  return result === undefined ? defValue : result;
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
