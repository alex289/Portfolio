import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '@/components/Layout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Container(props: any) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Alexander Konietzko',
    description: `Full-Stack developer, JavaScript enthusiast, and musician.`,
    type: 'website',
    ...customMeta,
  };

  return (
    <Layout title={meta.title}>
      <Head>
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://alexanderkonietzko.vercel.app${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://alexanderkonietzko.vercel.app${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Alexander Konietzko" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      {children}
    </Layout>
  );
}
