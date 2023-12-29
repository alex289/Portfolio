import { clsx } from 'clsx';
import { Eye } from 'lucide-react';
import Balancer from 'react-wrap-balancer';

import { Link } from '@/lib/navigation';
import ViewCounter from './views-counter';

interface FeaturedPostProps {
  title: string;
  postId: number;
  slug: string;
  gradient: string;
}

export default function FeaturedPost({
  title,
  postId,
  slug,
  gradient,
}: FeaturedPostProps) {
  return (
    <Link
      href={`/blog/${slug}-${postId}`}
      className={clsx(
        'transform transition-all hover:scale-[1.01]',
        'w-full rounded-xl bg-gradient-to-r p-1 md:w-1/3',
        gradient,
      )}>
      <div className="flex h-full flex-col justify-between rounded-lg bg-white p-4 dark:bg-gray-800">
        <div className="flex flex-col justify-between md:flex-row">
          <h4 className="mb-6 w-full text-lg font-medium tracking-tight text-gray-800 dark:text-gray-100 sm:mb-10 md:text-lg">
            <Balancer>{title}</Balancer>
          </h4>
        </div>
        <div className="capsize flex items-center text-gray-800 dark:text-gray-200">
          <Eye strokeWidth={1.5} className="h-6 w-6" />

          <span className="capsize ml-2 align-baseline">
            <ViewCounter slug={slug + '-' + postId} trackView={false} />
          </span>
        </div>
      </div>
    </Link>
  );
}
