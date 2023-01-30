import 'server-only';
import type { Locale } from './i18n-config';

// We enumerate all dictionaries here for better linting and typescript support
// We also get the defalt import for cleaner types^
const dictionaries = {
  en: () => import('@/locales/en.json').then((module) => module.default),
  de: () => import('@/locales/de.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
