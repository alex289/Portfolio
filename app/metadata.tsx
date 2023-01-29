const metadata = {
  title: {
    default: 'Alexander Konietzko',
    template: '%s | Alexander Konietzko',
  },
  robots: {
    index: true,
    follow: true,
  },
  description: 'Software developer and dual student',
  openGraph: {
    title: 'Alexander Konietzko',
    description: 'Software developer, TypeScript enthusiast and dual student',
    url: 'https://alexanderkonietzko.vercel.app',
    siteName: 'Alexander Konietzko',
    images: [
      {
        url: 'https://leerob.io/og.png',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    title: 'Alexander Konietzko',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
  other: {
    robots: 'max-snippet:-1, max-image-preview:large, max-video-preview:-1',
  },
};

export default metadata;
