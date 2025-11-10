import '@/styles/global.css';

import { routing } from '@/i18n/routing';
import clsx from 'clsx';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import env from '@/env.mjs';
import AnalyticsWrapper from '@/components/analytics';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { auth } from '@/lib/auth';

import type { Metadata, Viewport } from 'next/types';

const CommandPalette = dynamic(() => import('@/components/command-palette'));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_WEBSITE_URL),
    title: {
      default: 'Daniel Berhane',
      template: '%s | Daniel Berhane',
    },
    authors: [{ name: 'Daniel Berhane' }],
    applicationName: 'Daniel Berhane',
    description: 'Data Analyst specializing in cloud-based analytics and ETL pipelines',
    openGraph: {
      title: 'Daniel Berhane',
      description: 'Data Analyst specializing in cloud-based analytics and ETL pipelines',
      url: env.NEXT_PUBLIC_WEBSITE_URL,
      siteName: 'Daniel Berhane',
      images: [
        {
          url: `${env.NEXT_PUBLIC_WEBSITE_URL}/api/og`,
          width: 1920,
          height: 1080,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: 'Daniel Berhane',
      card: 'summary_large_image',
      description: 'Data Analyst specializing in cloud-based analytics and ETL pipelines',
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og`],
    },
    icons: {
      icon: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.png',
        },
      ],
      apple: '/favicon.png',
    },
    manifest: '/static/site.webmanifest',
    verification: {
      google: '64Pb4e1oRhhlHgM6aJGvqSunCfPa38sJ5ZHPfLNtzts',
    },
    alternates: {
      canonical: env.NEXT_PUBLIC_WEBSITE_URL,
      types: {
        'application/rss+xml': `${env.NEXT_PUBLIC_WEBSITE_URL}/feed.xml`,
      },
    },
  };
}

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  colorScheme: 'light dark',
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const session = await auth();

  return (
    <html
      lang={locale}
      className={clsx(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-800">
        <NextIntlClientProvider>
          <ThemeProvider attribute="class">
            <a
              href="#skip"
              className="absolute -top-8 left-1/4 -translate-y-12 px-4 py-2 transition-transform duration-200 focus:translate-y-3">
              Skip to content
            </a>
            <CommandPalette session={session} />
            <Navbar />
            <main
              className="mx-auto mb-16 flex max-w-3xl flex-col justify-center px-8 dark:bg-gray-800 md:mt-6 md:px-0"
              id="skip">
              {children}
              <AnalyticsWrapper />
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
