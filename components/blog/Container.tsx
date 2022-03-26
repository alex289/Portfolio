import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/layout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Container(props: any) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Lee Robinson – Developer, writer, creator.',
    description: `Front-end developer, JavaScript enthusiast, and course creator.`,
    image: 'https://alexanderkonietzko.vercel.app/static/images/banner.png',
    type: 'website',
    ...customMeta,
  };

  return (
    <Layout>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
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
        <meta property="og:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      {children}
    </Layout>
  );
}
