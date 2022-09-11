import { Suspense } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

import Layout from '@/components/Layout';
import Metric from '@/components/Metric';
import Tracks from '@/components/TopTrack';

import type { GetStaticProps, NextPage } from 'next';
import type { Views } from '@/lib/types';

type Props = {
  previewMode: boolean;
};

const Dashboard: NextPage<Props> = ({ previewMode }) => {
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

  if (!session || !session.isAdmin) {
    return (
      <Layout>
        <div className="mx-auto my-10 text-lg font-bold">
          Not authenticated/authorized
          <div
            className="mt-2 cursor-pointer text-sm font-normal"
            onClick={() => signOut({ callbackUrl: '/' })}>
            Logout
          </div>
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
            Logged in as {session.user?.email} (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="underline">
              Logout
            </button>
            )
          </p>
          <div className="my-2 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <h2 className="mt-3 text-xl font-bold sm:col-span-2">
              Blog/Guestbook
            </h2>
            <Metric title="Blog total views">{viewsData?.total}</Metric>
            <Metric title="Blog comments">{commentCount?.count}</Metric>
            <Metric title="Guestbook entries">{guestbookCount?.count}</Metric>

            <h2 className="mt-3 text-xl font-bold sm:col-span-2">Sanity</h2>
            <Metric title="Preview mode">{previewMode.toString()}</Metric>
            <Metric title="Sanity project id">
              {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            </Metric>
          </div>
          <h2 className="mb-4 mt-16 text-3xl font-bold tracking-tight text-black dark:text-white">
            Top Spotify Tracks
          </h2>
          <Tracks />
        </div>
      </Suspense>
    </Layout>
  );
};

export default Dashboard;

export const getStaticProps: GetStaticProps = async ({ preview }) => {
  return {
    props: {
      previewMode: preview ?? false,
    },
  };
};
