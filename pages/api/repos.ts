import type { NextApiRequest, NextApiResponse } from 'next';
import type { Projects } from '@/lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Projects[] | string>
) {
  if (req.method !== 'GET') {
    return res.status(405).json('Only GET method allowed');
  }

  const reposResponse = await fetch(
    'https://api.github.com/users/Alex289/repos?per_page=100&sort=pushed'
  );

  const repos = await reposResponse.json();

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );

  return res.status(200).json(repos);
}
