import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type LocalesJsonObject = {
  [x: string]: string | LocalesJsonObject;
};

export type UseTranslation = {
  t: (key: string) => string;
};

export type Projects = {
  name: string;
  html_url: string;
  homepage: string;
  description: string;
  language: string;
};

export type healthData = {
  status: string;
  env: string;
  uptime: string;
  mem: NodeJS.MemoryUsage;
  vercel: {
    deployed: boolean;
    env: string;
  };
};

export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type Song = {
  songUrl: string;
  artist: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};

export type Views = {
  total: number;
};

export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export type FormState = {
  state: Form;
  message?: string;
};

export type Post = {
  _id: string;
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  date: string;
  excerpt: string;
  language: string;
  translation: string;
  tags: string[];
  readingTime: string;
};

export type ClickEvent = {
  preventDefault: () => void;
};
