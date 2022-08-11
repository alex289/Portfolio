import Link from 'next/link';
import useSWR from 'swr';
import { parseISO, format } from 'date-fns';

import fetcher from '@/lib/fetcher';

import { Views } from '@/lib/types';

type Props = {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  tags: string[];
};

export default function BlogPost({ title, excerpt, slug, date, tags }: Props) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <div className="w-full">
      <div className="mb-8 w-full">
        <div className="flex flex-col justify-between md:flex-row">
          <Link href={`/blog/${slug}`}>
            <a className="mb-2 w-full text-lg font-medium text-gray-900 dark:text-gray-100 md:text-xl">
              {title}
            </a>
          </Link>
          <p className="mb-4 min-w-fit max-w-full text-left text-gray-900 dark:text-[#c2c2c2] md:mb-0 md:text-right">
            {`${views ? new Number(views).toLocaleString() : '–––'} views`} |{' '}
            {format(parseISO(date), 'MMMM dd, yyyy')}
          </p>
        </div>
        <p className="text-gray-600 dark:text-[#c2c2c2]">{excerpt}</p>
        <div className="mt-1 flex">
          {tags &&
            tags.map((tag, key) => {
              return (
                <div
                  key={key}
                  className="mx-2 text-purple-700 dark:text-primary">
                  <Link href={`/blog?search=${tag}&filter=tag`} replace shallow>
                    {tag}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
