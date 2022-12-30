import Link from 'next/link';
import { useRouter } from 'next/router';

import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

import type { Views } from '@/lib/types';

type Props = {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[];
};

export default function BlogPost({ title, excerpt, slug, date, tags }: Props) {
  const { locale } = useRouter();
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <div className="mb-8 w-full md:rounded-md md:p-3 md:hover:bg-gray-200 md:dark:hover:bg-gray-700">
      <div className="flex flex-col justify-between md:flex-row">
        <Link
          href={`/blog/${slug}`}
          className="mb-2 w-full cursor-pointer text-lg font-medium text-gray-900 dark:text-gray-100 md:text-xl">
          {title}
        </Link>
        <p className="mb-4 min-w-fit max-w-full text-left text-gray-900 dark:text-[#c2c2c2] md:mb-0 md:text-right">
          {`${views ? new Number(views).toLocaleString() : '–––'} views`} |{' '}
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
              <div key={key} className="mx-2 text-primary">
                <Link href={`/blog?search=${tag}&filter=tag`} replace shallow>
                  {tag}
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
