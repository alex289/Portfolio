'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

interface Props {
  slug: string;
  trackView: boolean;
}

interface PostView {
  slug: string;
  count: number;
}

export default function ViewCounter({ slug, trackView }: Props) {
  const t = useTranslations('blog');
  const { data } = useSWR<PostView[]>(`/api/views`, fetcher);
  const viewsForSlug = Array.isArray(data) ? data.find((view) => view.slug === slug) : undefined;
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
      {data ? `${views.toLocaleString()} ${t('views')}` : ''}
    </span>
  );
}
