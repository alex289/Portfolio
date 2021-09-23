import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const secs = process.uptime();
    const uptime =
      ('0' + Math.floor(secs / 3600)).slice(-2) +
      ':' +
      ('0' + Math.floor((secs % 3600) / 60)).slice(-2) +
      ':' +
      ('0' + Math.floor((secs % 3600) % 60)).slice(-2);

    const mem = process.memoryUsage();
    const formatted: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(mem)) {
      formatted[key] = formatMemory(value);
    }

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );

    res.status(200).json({
      status: 'UP',
      mem: formatted,
      uptime: uptime,
    });
  } else {
    res.status(404).json({ status: 'Not found' });
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
