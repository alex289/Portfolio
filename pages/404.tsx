import Link from 'next/link';

import useTranslation from '@/lib/useTranslation';

import Layout from '@/components/layout';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          404 – {t('page-not-found')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">{t('404-text')}</p>
        <Link href="/">
          <a className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-100 dark:bg-gray-900 text-center rounded-md text-black dark:text-white">
            {t('return-home')}
          </a>
        </Link>
      </div>
    </Layout>
  );
}
