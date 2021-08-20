import { useEffect, useState } from 'react';
import axios from 'axios';

import Layout from '@/components/layout';

type healthData = {
  status: string;
  mem: {
    rss: string;
    heapTotal: string;
    heapUsed: string;
    external: string;
    arrayBuffers: string;
  };
  uptime: string;
};

export default function Index() {
  const [data, setData] = useState<healthData>();
  useEffect(() => {
    axios.get('/api/health').then((res) => setData(res.data));
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
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.status || 'Error'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Uptime
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.uptime || 'Error'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Rss
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.mem.rss || 'Error'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Heap total
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.mem.heapTotal || 'Error'}
            </p>
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Heap used
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.mem.heapUsed || 'Error'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              External
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.mem.external || 'Error'}
            </p>
          </div>
          <div className="metric-card border border-gray-200 dark:border-gray-800 rounded p-4 max-w-72 w-full">
            <div className="flex items-center text-gray-900 dark:text-gray-100">
              Array buffers
            </div>
            <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
              {data?.mem.arrayBuffers || 'Error'}
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @media screen and (min-width: 768px) {
          .dashboard {
            margin-left: 31%;
            margin-right: 31%;
          }
        }
      `}</style>
    </Layout>
  );
}
