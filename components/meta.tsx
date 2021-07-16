import Head from 'next/head';

const Meta = () => (
  <Head>
    <title>Alexander Konietzko</title>
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    />
    <link
      rel="preload"
      href="static/fonts/inter-var-latin.woff2"
      as="font"
      type="font/woff2"
      crossOrigin="anonymous"
    />
    <link rel="manifest" href="/manifest.json" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover"
    />
    <meta name="description" content="Front-End and Back-End developer" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="theme-color" content="#ffffff" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Alexander Konietzko" />
    <meta
      property="og:description"
      content="Front-End and Back-End developer"
    />
    <meta property="og:title" content="Alexander Konietzko" />
    <meta name="application-name" content="Alexander Konietzko" />
    <meta
      name="keywords"
      content="Alexander Konietzko, Portfolio, NextJs, TailwindCss"
    />
    <meta name="author" content="Alexander Konietzko" />
    <meta name="HandheldFriendly" content="true" />
  </Head>
);

export default Meta;
