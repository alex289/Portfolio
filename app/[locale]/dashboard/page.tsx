import { getLocale, getTranslations } from 'next-intl/server';
import { getServerSession } from 'next-auth';
import { allBlogs } from '@/.contentlayer/generated';

import { queryBuilder } from '@/lib/db';
import { getTopTracks } from '@/lib/spotify';
import { SignOutButton } from '@/components/sign-out';

import Metric from '@/components/metric';
import Track from '@/components/track';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import type { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Dashboard',
};

const getViewsCount = async () => {
  const { sum } = queryBuilder.fn;
  const data = await queryBuilder
    .selectFrom('views')
    .select(sum<number>('views.count').as('total'))
    .execute();

  return data[0]?.total ?? 0;
};

const getGuestbookEntriesCount = async () => {
  const { sum } = queryBuilder.fn;
  const data = await queryBuilder
    .selectFrom('guestbook')
    .select(sum<number>('id').as('total'))
    .execute();

  return data[0]?.total ?? 0;
};

const DashboardPage = async () => {
  const [session, t, locale, viewsCount, guesbookEntriesCount, topTracks] =
    await Promise.all([
      getServerSession(authOptions),
      getTranslations(),
      getLocale(),
      getViewsCount(),
      getGuestbookEntriesCount(),
      getTopTracks(),
    ]);

  if (!session) {
    return redirect('/api/auth/signin?callbackUrl=/dashboard');
  }

  if (!session || !session.user.isAdmin) {
    return (
      <div className="mx-auto my-10 h-[30em] text-lg font-bold">
        {t('dashboard.unauthorized')}
      </div>
    );
  }

  return (
    <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
        Dashboard
      </h1>
      <p className="mb-2">
        {t('dashboard.logged-in')} {session.user?.email} (
        <SignOutButton />)
      </p>
      <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <h2 className="mt-3 text-xl font-bold sm:col-span-2">
          {t('dashboard.blog-guestbook')}
        </h2>
        <Metric title={t('dashboard.metrics.blog-views')}>{viewsCount}</Metric>
        <Metric title={t('dashboard.metrics.posts-count')}>
          {allBlogs.filter((x) => x.language === locale)?.length}
        </Metric>
        <Metric title={t('dashboard.metrics.guestbook-entries')}>
          {guesbookEntriesCount}
        </Metric>
      </div>
      <h2 className="mb-4 mt-16 text-3xl font-bold tracking-tight text-black dark:text-white">
        {t('dashboard.top-tracks')}
      </h2>
      {topTracks.tracks.map((track, index) => (
        <Track ranking={index + 1} key={track.songUrl} {...track} />
      ))}
    </div>
  );
};

export default DashboardPage;
