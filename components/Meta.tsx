import Head from 'next/head';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

type Props = {
  title?: string;
  description?: string;
  type?: string;
  date?: string;
  tags?: string[];
};

const Meta = ({
  title = 'Alexander Konietzko',
  type = 'website',
  description = 'Software developer, TypeScript enthusiast and dual student',
  date,
  tags,
}: Props): JSX.Element => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta charSet="utf-8" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="robots" content="follow, index" />
      <meta
        name="viewport"
        content="initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
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
      <meta name="description" content={description} />
      {mounted && (
        <meta
          name="theme-color"
          content={theme === 'light' ? '#f9fafb' : '#222222'}
        />
      )}
      <meta property="og:image" content={`/api/og?title=${title}`} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Alexander Konietzko" />
      <meta property="og:url" content="https://alexanderkonietzko.vercel.app" />
      <link rel="canonical" href="https://alexanderkonietzko.vercel.app" />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {date && <meta property="article:published_time" content={date} />}
      {tags && <meta property="article:tag" content={tags.join(', ')} />}
      {tags ? (
        <meta property="keywords" content={tags.join(', ')} />
      ) : (
        <meta
          name="keywords"
          content="Alexander Konietzko, Portfolio, Next.js, TailwindCSS"
        />
      )}
      <meta name="application-name" content="Alexander Konietzko" />
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
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:url"
        content="https://alexanderkonietzko.vercel.app"
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`/api/og?title=${title}`} />
      <meta
        name="google-site-verification"
        content="64Pb4e1oRhhlHgM6aJGvqSunCfPa38sJ5ZHPfLNtzts"
      />
    </Head>
  );
};

export default Meta;
