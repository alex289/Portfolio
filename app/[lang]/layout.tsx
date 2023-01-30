import '@/styles/global.css';

import { Inter } from '@next/font/google';

import globalMetadata from '@/app/metadata';
import AnalyticsWrapper from '@/components/analytics';
import { ServerThemeProvider } from '@wits/next-themes';
import ProviderWrapper from '@/components/theme';

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
        <body className="antialiased">
          <ProviderWrapper>
            <main className="">
              {children}
              <AnalyticsWrapper />
            </main>
          </ProviderWrapper>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
