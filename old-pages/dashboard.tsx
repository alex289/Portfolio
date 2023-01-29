import { Suspense } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import useTranslation from '@/lib/hooks/useTranslation';
import { getClient } from '@/lib/sanity/sanity-server';
import { postAmountQuery } from '@/lib/sanity/queries';

import Layout from '@/old-components/Layout';
import Metric from '@/old-components/Metric';
import Tracks from '@/old-components/TopTrack';

import type { GetStaticProps, NextPage } from 'next';
import type { Views } from '@/lib/types';

type Props = {
  previewMode: boolean;
  postsCount: number;
};

const Dashboard: NextPage<Props> = ({ previewMode, postsCount }) => {
  const { t } = useTranslation();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const { data: guestbookCount } = useSWR<{ count: number }>(
    '/api/guestbook?count=true',
    fetcher
  );
  const { data: commentCount } = useSWR<{ count: number }>(
    '/api/comment?count=true',
    fetcher
  );
  const { data: viewsData } = useSWR<Views>('/api/views', fetcher);

  if (!session || !session.user.isAdmin) {
    return (
      <Layout>
        <div className="mx-auto my-10 h-[30em] text-lg font-bold">
          {t('dashboard.unauthorized')}
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard - Alexander Konietzko">
      <Suspense>
        <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
            Dashboard
          </h1>
          <p className="mb-2">
            {t('dashboard.logged-in')} {session.user?.email} (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="underline">
              {t('dashboard.logout')}
            </button>
            )
          </p>
          <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <h2 className="mt-3 text-xl font-bold sm:col-span-2">
              {t('dashboard.blog-guestbook')}
            </h2>
            <Metric title={t('dashboard.metrics.blog-views')}>
              {viewsData?.total}
            </Metric>
            <Metric title={t('dashboard.metrics.blog-comments')}>
              {commentCount?.count}
            </Metric>
            <Metric title={t('dashboard.metrics.guestbook-entries')}>
              {guestbookCount?.count}
            </Metric>

            <h2 className="mt-3 text-xl font-bold sm:col-span-2">Sanity</h2>
            <Metric title={t('dashboard.metrics.preview-mode')}>
              {previewMode
                ? t('dashboard.metrics.preview-active')
                : t('dashboard.metrics.preview-inactive')}
            </Metric>
            <Metric title={t('dashboard.metrics.sanity-project')}>
              {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            </Metric>
            <Metric title={t('dashboard.metrics.posts-count')}>
              {postsCount}
            </Metric>
          </div>
          <h2 className="mb-4 mt-16 text-3xl font-bold tracking-tight text-black dark:text-white">
            {t('dashboard.top-tracks')}
          </h2>
          <Tracks />
        </div>
      </Suspense>
    </Layout>
  );
};

export default Dashboard;

export const getStaticProps: GetStaticProps = async ({ preview, locale }) => {
  const postsCount = await getClient(preview ?? false).fetch(postAmountQuery, {
    language: locale,
  });
  return {
    props: {
      previewMode: preview ?? false,
      postsCount,
    },
  };
};
