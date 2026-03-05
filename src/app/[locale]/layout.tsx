import type { Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import AnalyticsWrapper from '@/components/analytics';
import { Toaster } from '@/components/ui/sonner';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/navbar';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { EasterEgg } from '@/components/easter-egg';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('metadata');
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_WEBSITE_URL as string),
    title: {
      default: 'Alexander Konietzko',
      template: '%s | Alexander Konietzko',
    },
    authors: [{ name: 'Alexander Konietzko' }],
    applicationName: 'Alexander Konietzko',
    description: t('description'),
    openGraph: {
      title: 'Alexander Konietzko',
      description: t('description'),
      url: process.env.NEXT_PUBLIC_WEBSITE_URL,
      siteName: 'Alexander Konietzko',
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
      description: t('description'),
    },
    icons: {
      shortcut: '/favicon.ico',
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
      google: 'Ix7FlAE1lxVsGj4EhSc23niVmi9-sLS9MKa0seaDdog',
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_WEBSITE_URL,
      languages: {
        en: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/en`,
        de: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/de`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <NextIntlClientProvider>
            <EasterEgg />
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
          <AnalyticsWrapper />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
