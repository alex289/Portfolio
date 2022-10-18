import Link from 'next/link';

import useSWR from 'swr';
import cn from 'classnames';

import fetcher from '@/lib/fetcher';

import type { Views } from '@/lib/types';

type Props = {
  title: string;
  slug: string;
  gradient: string;
};

export default function BlogPostCard({ title, slug, gradient }: Props) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;

  return (
    <Link
      href={`/blog/${slug}`}
      className={cn(
        'transform transition-all hover:scale-[1.01]',
        'w-full rounded-xl bg-gradient-to-r p-1 md:w-1/3',
        gradient
      )}>
      <div className="flex h-full flex-col justify-between rounded-lg bg-white p-4 dark:bg-gray-800">
        <div className="flex flex-col justify-between md:flex-row">
          <h4 className="mb-6 w-full text-lg font-medium tracking-tight text-gray-800 dark:text-gray-100 sm:mb-10 md:text-lg">
            {title}
          </h4>
        </div>
        <div className="capsize flex items-center text-gray-800 dark:text-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <span className="capsize ml-2 align-baseline">
            {views ? new Number(views).toLocaleString() : '–––'}
          </span>
        </div>
      </div>
    </Link>
  );
}
