'use client';
import { useEffect } from 'react';

import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

interface Props {
  slug: string;
  trackView: boolean;
}

interface PostView {
  slug: string;
  count: string;
}

export default function ViewCounter({ slug, trackView }: Props) {
  const { data } = useSWR<PostView[]>(`/api/views`, fetcher);
  const viewsForSlug = data?.find((view) => view.slug === slug);
  const views = new Number(viewsForSlug?.count ?? 0);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${slug}`, {
        method: 'POST',
      });

    if (process.env.NODE_ENV === 'production' && trackView) {
      void registerView();
    }
  }, [slug, trackView]);

  return (
    <span className="tracking-tighter">
      {data ? `${views.toLocaleString()} views` : ''}
    </span>
  );
}
