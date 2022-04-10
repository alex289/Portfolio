import { signIn, signOut, useSession } from 'next-auth/react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

import Layout from '@/components/Layout';

import { healthData } from '@/lib/types';
import Metric from '@/components/Metric';

export default function Dashboard(): JSX.Element {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  const { data, error } = useSWR<healthData>('/api/health', fetcher);

  if (!session || !session.isAdmin) {
    return <Layout>Not authenticated</Layout>;
  }
  if (error) {
    return <Layout>Failed to load</Layout>;
  }
  if (!data) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-start justify-center w-full mx-auto mb-16 xl:w-6/12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Dashboard
        </h1>
        <div
          onClick={() => signOut({ callbackUrl: '/' })}
          className="cursor-pointer">
          Logout
        </div>
        <div className="w-full my-2 grid gap-4 grid-cols-1 sm:grid-cols-2">
          <Metric title="Status">
            <span className={data.status ? 'text-green-600' : 'text-red-600'}>
              {data.status}
            </span>
          </Metric>
          <Metric title="Environment">{data.env}</Metric>
          <Metric title="Uptime">{data.uptime}</Metric>
          <Metric title="Rss">{data.mem.rss}</Metric>
          <Metric title="Heap total">{data.mem.heapTotal}</Metric>
          <Metric title="Heap used">{data.mem.heapUsed}</Metric>
          <Metric title="External">{data.mem.external}</Metric>
          <Metric title="Array buffers">{data.mem.arrayBuffers}</Metric>
          <Metric title="Deployed">
            {data.vercel.deployed ? 'true' : 'false'}
          </Metric>
          <Metric title="Vercel environment">{data.vercel.env}</Metric>
        </div>
      </div>
    </Layout>
  );
}
