import Link from 'next/link';

import clsx from 'clsx';
import { useLocale } from 'next-intl';

import ViewCounter from './views-counter';

type Props = {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[];
};

export default function PostCard({ title, excerpt, slug, date, tags }: Props) {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/blog/${slug}`}
      className="mb-8 w-full md:rounded-md md:p-3 md:hover:bg-gray-200 md:dark:hover:bg-gray-700">
      <div className="flex flex-col justify-between md:flex-row">
        <div className="mb-2 w-full cursor-pointer text-lg font-medium text-gray-900 dark:text-gray-100 md:text-xl">
          {title}
        </div>
        <p className="mb-4 min-w-fit max-w-full text-left text-gray-900 dark:text-[#c2c2c2] md:mb-0 md:text-right">
          <ViewCounter slug={slug} trackView={false} /> |{' '}
          {new Date(date).toLocaleDateString(
            locale === 'de' ? 'de-DE' : 'en-US',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }
          )}
        </p>
      </div>
      <p className="text-gray-600 dark:text-[#c2c2c2]">{excerpt}</p>
      <div className="mt-1 flex">
        {tags &&
          tags.map((tag, key) => {
            return (
              <Link
                key={key}
                className={clsx(
                  'mx-2 mt-1 rounded border border-indigo-500 py-1 px-3 text-sm text-indigo-500',
                  'hover:border-indigo-600 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400'
                )}
                href={`/${locale}/blog?search=${tag}&filter=tag`}
                replace
                shallow>
                {tag}
              </Link>
            );
          })}
      </div>
    </Link>
  );
}
