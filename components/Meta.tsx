import Head from 'next/head';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {
  title?: string;
  description?: string;
  type?: string;
  date?: string;
};

const Meta = ({
  title = 'Alexander Konietzko',
  type = 'website',
  description = 'Software developer, Typescript enthusiast and dual student',
  date,
}: Props): JSX.Element => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { theme } = useTheme();

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="robots" content="follow, index" />
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <link
        rel="preload"
        href="/static/fonts/ibm-plex-sans-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover"
      />
      <meta name="description" content={description} />
      {mounted && (
        <meta
          name="theme-color"
          content={theme === 'light' ? '#ffffff' : '#000000'}
        />
      )}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Alexander Konietzko" />
      <meta
        property="og:url"
        content={`https://alexanderkonietzko.vercel.app${router.asPath}`}
      />
      <link
        rel="canonical"
        href={`https://alexanderkonietzko.vercel.app${router.asPath}`}
      />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {date && <meta property="article:published_time" content={date} />}
      <meta name="application-name" content="Alexander Konietzko" />
      <meta
        name="keywords"
        content="Alexander Konietzko, Portfolio, NextJs, TailwindCss"
      />
      <meta name="author" content="Alexander Konietzko" />
      <meta name="HandheldFriendly" content="true" />
      <link
        rel="icon"
        type="image/png"
        href="/static/icon/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/static/icon/favicon-16x16.png"
        sizes="16x16"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/icon/apple-touch-icon.png"
      />
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content="https://alexanderkonietzko.vercel.app/"
      />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta
        name="google-site-verification"
        content="64Pb4e1oRhhlHgM6aJGvqSunCfPa38sJ5ZHPfLNtzts"
      />
    </Head>
  );
};

export default Meta;
