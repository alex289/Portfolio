import '@/styles/global.css';

import { Inter } from '@next/font/google';

import clsx from 'clsx';

import globalMetadata from '@/app/metadata';
import AnalyticsWrapper from '@/components/analytics';
import { ServerThemeProvider } from '@wits/next-themes';
import ProviderWrapper from '@/components/theme';

const inter = Inter();
export const metadata = globalMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ServerThemeProvider attribute="class">
      <html
        lang="en"
        className={clsx(
          'bg-white text-black dark:bg-[#111010] dark:text-white',
          inter.className
        )}>
        <body className="mx-4 mb-40 mt-8 flex max-w-4xl flex-col antialiased md:mt-20 md:flex-row lg:mx-auto lg:mt-32">
          <ProviderWrapper>
            <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:mt-0 md:px-0">
              {children}
              <AnalyticsWrapper />
            </main>
          </ProviderWrapper>
        </body>
      </html>
    </ServerThemeProvider>
  );
}
