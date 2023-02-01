import '@/styles/global.css';

import { Inter } from '@next/font/google';

import { ServerThemeProvider } from '@wits/next-themes';

import globalMetadata from '@/app/metadata';
import AnalyticsWrapper from '@/components/analytics';
import ProviderWrapper from '@/components/theme';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter();
export const metadata = globalMetadata;

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <ServerThemeProvider attribute="class">
      <html lang={params.lang} className={inter.className}>
        <body className="bg-gray-50 dark:bg-gray-800">
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
        </body>
      </html>
    </ServerThemeProvider>
  );
}
