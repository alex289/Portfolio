import { signIn, signOut, useSession } from 'next-auth/react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

import Layout from '@/components/Layout';
import Metric from '@/components/Metric';

import type { GetStaticProps } from 'next';
import type { healthData, Views } from '@/lib/types';

type Props = {
  previewMode: boolean;
};

export default function Dashboard({ previewMode }: Props): JSX.Element {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const { data } = useSWR<healthData>('/api/health', fetcher);
  const { data: guestbookCount } = useSWR('/api/guestbook?count=true', fetcher);
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
    <Layout>
      <div className="mx-auto mb-16 flex w-full flex-col items-start justify-center xl:w-6/12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
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
          <Metric title="Status">
            <span className={data?.status ? 'text-green-600' : 'text-red-600'}>
              {data?.status}
            </span>
          </Metric>
          <Metric title="Environment">{data?.env}</Metric>

          <h2 className="mt-3 text-xl font-bold sm:col-span-2">Health</h2>
          <Metric title="Uptime">{data?.uptime}</Metric>
          <Metric title="Rss">{data?.mem.rss}</Metric>
          <Metric title="Heap total">{data?.mem.heapTotal}</Metric>
          <Metric title="Heap used">{data?.mem.heapUsed}</Metric>
          <Metric title="External">{data?.mem.external}</Metric>
          <Metric title="Array buffers">{data?.mem.arrayBuffers}</Metric>

          <h2 className="mt-3 text-xl font-bold sm:col-span-2">Deployment</h2>
          <Metric title="Deployed">{data?.vercel.deployed.toString()}</Metric>
          <Metric title="Vercel environment">{data?.vercel.env}</Metric>

          <h2 className="mt-3 text-xl font-bold sm:col-span-2">
            Blog/Guestbook
          </h2>
          <Metric title="Blog total views">{viewsData?.total}</Metric>
          <Metric title="Guestbook entries">{guestbookCount?.count}</Metric>

          <h2 className="mt-3 text-xl font-bold sm:col-span-2">Sanity</h2>
          <Metric title="Preview mode">{previewMode.toString()}</Metric>
          <Metric title="Sanity project id">
            {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          </Metric>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      previewMode: context.preview ?? false,
    },
  };
};
