import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import * as rootParams from 'next/root-params';
import { routing } from './routing';

export default getRequestConfig(async () => {
  const paramValue = await rootParams.locale();

  let locale;
  if (hasLocale(routing.locales, paramValue)) {
    locale = paramValue;
  } else {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
