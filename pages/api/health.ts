import type { NextApiRequest, NextApiResponse } from 'next';

import type { ObjectType } from '@/lib/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const secs = process.uptime();
    const uptime =
      ('0' + Math.floor(secs / 3600)).slice(-2) +
      ':' +
      ('0' + Math.floor((secs % 3600) / 60)).slice(-2) +
      ':' +
      ('0' + Math.floor((secs % 3600) % 60)).slice(-2);

    const mem = process.memoryUsage();
    const formatted: ObjectType = {};

    for (const [key, value] of Object.entries(mem)) {
      formatted[key] = formatMemory(value);
    }

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );

    res.status(200).json({
      status: 'UP',
      env: process.env.NODE_ENV,
      mem: formatted,
      uptime: uptime,
      vercel: {
        deployed: process.env.VERCEL === '1' ? true : false,
        env: process.env.VERCEL_ENV ? process.env.VERCEL_ENV : 'local',
      },
    });
  } else {
    res.status(500).json({ status: 'Internal Server Error' });
  }
}

function formatMemory(bytes: number) {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1000,
    sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
