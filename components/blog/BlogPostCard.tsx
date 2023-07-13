import Link from 'next/link';

import useSWR from 'swr';
import { clsx } from 'clsx';

import fetcher from '@/lib/fetcher';

import type { Views } from '@/lib/types';
import { Eye } from 'lucide-react';

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
      className={clsx(
        'transform transition-all hover:scale-[1.01]',
        'w-full rounded-xl bg-gradient-to-r p-1 md:w-1/3',
        gradient,
      )}>
      <div className="flex h-full flex-col justify-between rounded-lg bg-white p-4 dark:bg-gray-800">
        <div className="flex flex-col justify-between md:flex-row">
          <h4 className="mb-6 w-full text-lg font-medium tracking-tight text-gray-800 dark:text-gray-100 sm:mb-10 md:text-lg">
            {title}
          </h4>
        </div>
        <div className="capsize flex items-center text-gray-800 dark:text-gray-200">
          <Eye strokeWidth={1.5} className="h-6 w-6" />

          <span className="capsize ml-2 align-baseline">
            {views ? new Number(views).toLocaleString() : '–––'}
          </span>
        </div>
      </div>
    </Link>
  );
}
