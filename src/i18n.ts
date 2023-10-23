import { type AbstractIntlMessages } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (
    (await import(`./messages/${locale}.json`)) as {
      default: AbstractIntlMessages;
    }
  ).default,
  timeZone: 'Europe/Berlin',
  now: new Date(),
}));
