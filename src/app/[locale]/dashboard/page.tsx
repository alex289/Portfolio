import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

import Metric from '@/components/metric';
import { SignOutButton } from '@/components/sign-out';
import Track from '@/components/track';
import { auth } from '@/lib/auth';
import { getBlogPosts } from '@/lib/blog';
import { queryBuilder } from '@/lib/db';
import { getTopTracks } from '@/lib/spotify';

import type { Metadata } from 'next/types';

interface DashboardProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: 'Dashboard',
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

const getViewsCount = async () => {
  const data = await queryBuilder
    .selectFrom('views')
    .select(queryBuilder.fn.sum<number>('views.count').as('total'))
    .execute();

  return data[0]?.total ?? 0;
};

const getGuestbookEntriesCount = async () => {
  const data = await queryBuilder
    .selectFrom('guestbook')
    .select(queryBuilder.fn.count<number>('id').as('total'))
    .execute();

  return data[0]?.total ?? 0;
};

const DashboardPage = async ({ params: { locale } }: DashboardProps) => {
  const [session, t, viewsCount, guesbookEntriesCount, topTracks] =
    await Promise.all([
      auth(),
      getTranslations({ locale, namespace: 'dashboard' }),
      getViewsCount(),
      getGuestbookEntriesCount(),
      getTopTracks(),
    ]);

  if (!session) {
    return redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  if (!session.user.isAdmin) {
    return redirect('/');
  }

  return (
    <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
        Dashboard
      </h1>
      <p className="mb-2">
        {t('logged-in')} {session.user.email} (
        <SignOutButton />)
      </p>
      <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <h2 className="mt-3 text-xl font-bold sm:col-span-2">
          {t('blog-guestbook')}
        </h2>
        <Metric title={t('metrics.blog-views')}>{viewsCount}</Metric>
        <Metric title={t('metrics.posts-count')}>
          {getBlogPosts().filter((x) => x.language === locale).length}
        </Metric>
        <Metric title={t('metrics.guestbook-entries')}>
          {guesbookEntriesCount}
        </Metric>
      </div>
      <h2 className="mb-4 mt-16 text-3xl font-bold tracking-tight text-black dark:text-white">
        {t('top-tracks')}
      </h2>
      {topTracks.tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} {...track} />
      ))}
    </div>
  );
};

export default DashboardPage;
