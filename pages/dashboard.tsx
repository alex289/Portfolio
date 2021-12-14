import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

import Layout from '@/components/layout';

import { healthData } from '@/lib/types';

export default function Dashboard(): JSX.Element {
  const { data, error } = useSWR<healthData>('/api/health', fetcher);

  if (error) {
    return <div>Failed to load</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col items-start justify-center max-w-2xl mb-16 dashboard">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Dashboard
        </h1>
        <div className="w-full my-2 grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="w-full p-4 border border-gray-200 rounded metric-card dark:border-gray-800 max-w-72">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Status
            </div>
            <div className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
              <p
                id="status"
                className={data.status ? 'text-green-600' : 'text-red-600'}
              >
                {data.status}
              </p>
            </div>
          </div>
          <div className="w-full p-4 border border-gray-200 rounded metric-card dark:border-gray-800 max-w-72">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Environment
            </div>
            <p className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
              {data.env}
            </p>
          </div>
          <div className="w-full p-4 border border-gray-200 rounded metric-card dark:border-gray-800 max-w-72">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Uptime
            </div>
            <p className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
              {data.uptime}
            </p>
          </div>
          <div className="w-full p-4 border border-gray-200 rounded metric-card dark:border-gray-800 max-w-72">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Rss
            </div>
            <p className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
              {data.mem.rss}
            </p>
          </div>
          <div className="w-full p-4 border border-gray-200 rounded metric-card dark:border-gray-800 max-w-72">
            <p className="flex items-center text-gray-900 dark:text-gray-100">
              Heap total
            </p>
            <div className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
              {data.mem.heapTotal}
            </div>
          </div>
          <div className="w-full p-4 border border-gray-200 rounded metric-card dark:border-gray-800 max-w-72">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Heap used
            </div>
            <p className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
              {data.mem.heapUsed}
            </p>
          </div>
        </div>
        <div className="w-full my-2 grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="w-full p-4 border border-gray-200 rounded metric-card dark:border-gray-800 max-w-72">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              External
            </div>
            <p className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
              {data.mem.external}
            </p>
          </div>
          <div className="w-full p-4 border border-gray-200 rounded metric-card dark:border-gray-800 max-w-72">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Array buffers
            </div>
            <p className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
              {data.mem.arrayBuffers}
            </p>
          </div>
          <div className="w-full p-4 border border-gray-200 rounded metric-card dark:border-gray-800 max-w-72">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Deployed
            </div>
            <p className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
              {data.vercel.deployed ? 'True' : 'False'}
            </p>
          </div>
          <div className="w-full p-4 border border-gray-200 rounded metric-card dark:border-gray-800 max-w-72">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Vercel environment
            </div>
            <p className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
              {data.vercel.env}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
