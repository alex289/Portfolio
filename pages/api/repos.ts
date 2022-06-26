import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  const reposResponse = await fetch(
    'https://api.github.com/users/Alex289/repos?per_page=100&sort=pushed'
  );

  const repos = await reposResponse.json();

  return new Response(JSON.stringify(repos), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  });
}
