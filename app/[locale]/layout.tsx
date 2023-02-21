import '@/styles/global.css';

import { Inter } from '@next/font/google';
import { notFound } from 'next/navigation';

import { ServerThemeProvider } from '@wits/next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { useLocale } from 'next-intl';

import AnalyticsWrapper from '@/components/analytics';
import ProviderWrapper from '@/components/theme';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter();

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();
  const messages = (await import(`../../messages/${locale}.json`)).default;

  if (locale !== params.locale) {
    notFound();
  }

  return (
    <ServerThemeProvider attribute="class">
      <html lang={params.locale} className={inter.className}>
        <body className="bg-gray-50 dark:bg-gray-800">
          <NextIntlClientProvider messages={messages} locale={params.locale}>
            <ProviderWrapper>
              <a
                href="#skip"
                className="absolute left-1/4 -top-8 -translate-y-12 transform px-4 py-2 transition-transform duration-200 focus:translate-y-3">
                Skip to content
              </a>
              <Navbar />
              <main className="mx-auto mb-16 max-w-3xl" id="skip">
                {children}
                <AnalyticsWrapper />
              </main>
              <Footer />
            </ProviderWrapper>
          </NextIntlClientProvider>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
