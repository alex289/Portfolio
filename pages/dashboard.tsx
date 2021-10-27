import { useEffect, useState } from 'react';
import axios from 'axios';

import Layout from '@/components/layout';

import type { healthData } from '@/lib/types';

export default function Dashboard(): JSX.Element {
  const [data, setData] = useState<healthData>();

  useEffect(() => {
    const getData = async () => {
      await axios
        .get<healthData>('/api/health')
        .then((res) => setData(res.data));
    };

    getData();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col justify-center items-start max-w-2xl dashboard mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Dashboard
        </h1>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Status
            </div>
            <div className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              <p
                id="status"
                className={data?.status ? 'text-green-600' : 'text-red-600'}
              >
                {data?.status || 'No data'}
              </p>
            </div>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Environment
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.env || 'No data'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Uptime
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.uptime || 'No data'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Rss
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.mem.rss || 'No data'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <p className="flex items-center text-gray-900 dark:text-gray-100">
              Heap total
            </p>
            <div className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.mem.heapTotal || 'No data'}
            </div>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Heap used
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.mem.heapUsed || 'No data'}
            </p>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              External
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.mem.external || 'No data'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Array buffers
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.mem.arrayBuffers || 'No data'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Deployed
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.vercel.deployed || 'False'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Vercel environment
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.vercel.env || 'No data'}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
