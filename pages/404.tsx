import Link from 'next/link';

import useTranslation from '@/lib/useTranslation';

import Layout from '@/components/Layout';

export default function NotFound(): JSX.Element {
  const { t } = useTranslation();
  return (
    <Layout title="404 - Alexander Konietzko">
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          404 – {t('404.title')}
        </h1>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          {t('404.description')}
        </p>
        <Link href="/">
          <a className="w-64 p-1 py-3 mx-auto font-bold text-center text-black bg-gray-200 sm:p-4 dark:bg-gray-700 hover:dark:bg-gray-600 hover:bg-[#c9c9c9] rounded-md dark:text-white">
            {t('404.return-home')}
          </a>
        </Link>
      </div>
    </Layout>
  );
}
