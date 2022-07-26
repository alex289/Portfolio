import { getTopTracks } from '@/lib/spotify';
import { isValidHttpMethod, MethodNotAllowedEdge } from '@/lib/api';

import type { NextApiRequest } from 'next';

type ResponseTrackType = {
  artists: {
    name: string;
  }[];
  name: string;
  external_urls: {
    spotify: string;
  };
};

export default async function handler(req: NextApiRequest) {
  if (!isValidHttpMethod(req.method, ['GET'])) {
    return MethodNotAllowedEdge();
  }

  const response = await getTopTracks();
  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((track: ResponseTrackType) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
  }));

  return new Response(JSON.stringify({ tracks }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}

export const config = {
  runtime: 'experimental-edge',
};
