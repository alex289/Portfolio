'use client';

import { Link, useTranslations } from 'next-intl';

export default function Error() {
  const t = useTranslations('404');

  return (
    <div className="mx-auto mb-16 flex max-w-3xl flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        Oops – {t('title')}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        {t('description')}
      </p>
      <Link
        href="/"
        className="mx-auto w-64 rounded-md bg-gray-200 p-1 py-3 text-center font-bold text-black hover:bg-[#c9c9c9] dark:bg-gray-700 dark:text-white hover:dark:bg-gray-600 sm:p-4">
        {t('return-home')}
      </Link>
    </div>
  );
}
