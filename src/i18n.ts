import { type AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return {
    messages: (
      (await import(`./messages/${locale}.json`)) as {
        default: AbstractIntlMessages;
      }
    ).default,
    timeZone: 'Europe/Berlin',
    now: new Date(),
    locale,
  };
});
