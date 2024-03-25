import '@/styles/global.css';

import clsx from 'clsx';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

import env from '@/env.mjs';
import AnalyticsWrapper from '@/components/analytics';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { auth } from '@/lib/auth';
import { getBlogPosts } from '@/lib/blog';

import type { AbstractIntlMessages } from 'next-intl';
import type { Metadata, Viewport } from 'next/types';

const CommandPalette = dynamic(() => import('@/components/command-palette'));

interface LayoutProps {
  params: {
    locale: string;
  };
}

export function generateMetadata({
  params: { locale },
}: LayoutProps): Metadata {
  return {
    metadataBase: new URL(env.NEXT_PUBLIC_WEBSITE_URL),
    title: {
      default: 'Alexander Konietzko',
      template: '%s | Alexander Konietzko',
    },
    authors: [{ name: 'Alexander Konietzko' }],
    applicationName: 'Alexander Konietzko',
    description: 'Software developer, TypeScript enthusiast and dual student',
    openGraph: {
      title: 'Alexander Konietzko',
      description: 'Software developer, TypeScript enthusiast and dual student',
      url: env.NEXT_PUBLIC_WEBSITE_URL,
      siteName: 'Alexander Konietzko',
      images: [
        {
          url: `${env.NEXT_PUBLIC_WEBSITE_URL}/api/og`,
          width: 1920,
          height: 1080,
        },
      ],
      locale: locale === 'en' ? 'en-US' : 'de-DE',
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
      title: 'Alexander Konietzko',
      card: 'summary_large_image',
      description: 'Software developer, TypeScript enthusiast and dual student',
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og`],
    },
    icons: {
      shortcut: '/static/favicon.ico',
      apple: '/static/icon/apple-touch-icon.png',
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/static/icon/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: '/static/icon/favicon-16x16.png',
        },
      ],
    },
    manifest: '/static/site.webmanifest',
    verification: {
      google: '64Pb4e1oRhhlHgM6aJGvqSunCfPa38sJ5ZHPfLNtzts',
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9fafb' },
    { media: '(prefers-color-scheme: dark)', color: '#222222' },
  ],
  initialScale: 1,
  width: 'device-width',
  colorScheme: 'light dark',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages: AbstractIntlMessages;
  try {
    messages = (
      (await import(`../../messages/${params.locale}.json`)) as {
        default: AbstractIntlMessages;
      }
    ).default;
  } catch (error) {
    notFound();
  }
  const session = await auth();

  return (
    <html
      lang={params.locale}
      className={clsx(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning>
      <body className="bg-gray-50 dark:bg-gray-800">
        <NextIntlClientProvider
          messages={messages}
          locale={params.locale}
          timeZone="Europe/Berlin"
          now={new Date()}>
          <ThemeProvider attribute="class">
            <a
              href="#skip"
              className="absolute -top-8 left-1/4 -translate-y-12 px-4 py-2 transition-transform duration-200 focus:translate-y-3">
              Skip to content
            </a>
            <CommandPalette session={session} />
            <Navbar posts={getBlogPosts()} />
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
