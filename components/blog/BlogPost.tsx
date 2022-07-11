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
    <Link href={`/blog/${slug}`}>
      <a className="w-full">
        <div className="w-full mb-8">
          <div className="flex flex-col justify-between md:flex-row">
            <h3 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
              {title}
            </h3>
            <p className="max-w-full mb-4 text-left text-gray-900 min-w-fit dark:text-[#c2c2c2] md:text-right md:mb-0">
              {`${views ? new Number(views).toLocaleString() : '–––'} views`} |{' '}
              {format(parseISO(date), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="text-gray-600 dark:text-[#c2c2c2]">{excerpt}</p>
          <div className="flex mt-1">
            {tags &&
              tags.map((tag, key) => {
                return (
                  <div
                    key={key}
                    className="mx-2 text-purple-700 dark:text-purple-500">
                    #{tag}
                  </div>
                );
              })}
          </div>
        </div>
      </a>
    </Link>
  );
}
