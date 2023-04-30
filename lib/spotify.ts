import env from '@/env.js';
import { ResponseTrackType, TopTracks } from './types';

const client_id = env.SPOTIFY_CLIENT_ID;
const client_secret = env.SPOTIFY_CLIENT_SECRET;
const refresh_token = env.SPOTIFY_REFRESH_TOKEN;

const basic = btoa(`${client_id}:${client_secret}`);
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(
    `${TOKEN_ENDPOINT}?grant_type=refresh_token&refresh_token=${refresh_token}`,
    {
      method: 'POST',
      next: { revalidate: 60 * 60 },
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return response.json();
};

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      cache: 'no-store',
    },
  });
};

export const getTopTracks = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(TOP_TRACKS_ENDPOINT, {
    next: { revalidate: 60 * 60 * 24 },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const { items } = await response.json();

  const tracks = items.slice(0, 10).map((track: ResponseTrackType) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    cover: track.album.images[1]?.url,
    title: track.name,
  }));

  return { tracks } as TopTracks;
};
