import {
  BadRequestEdge,
  isValidHttpMethod,
  MethodNotAllowedEdge,
} from '@/lib/api';
import { BACKUP_REPOS_URL } from '@/lib/constants';

import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  if (!isValidHttpMethod(req.method, ['GET'])) {
    return MethodNotAllowedEdge();
  }

  const per_page = req.nextUrl.searchParams.get('per_page') || '20';

  const reposResponse = await fetch(
    `https://api.github.com/users/alex289/repos?per_page=${per_page}&sort=pushed`
  );

  let repos = await reposResponse.json();

  if (!reposResponse.ok) {
    const fallbackResponse = await fetch(BACKUP_REPOS_URL);

    if (!fallbackResponse.ok) {
      return BadRequestEdge('Failed to fetch fallback data');
    }

    repos = await fallbackResponse.json();
    repos = repos
      .filter((repo: { fork: boolean }) => !repo.fork)
      .slice(0, Number(per_page));
  }

  return new Response(JSON.stringify(repos), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  });
}
