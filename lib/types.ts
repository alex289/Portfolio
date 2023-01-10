import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type LocalesJsonObject = {
  [x: string]: string | LocalesJsonObject;
};

export type UseTranslation = {
  t: (key: string) => string;
  locale: string | undefined;
};

export type Projects = {
  name: string;
  html_url: string;
  homepage: string;
  description: string;
  language: string;
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
  cover: string;
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

export type Stats = {
  stars: number;
  totalCommits: number;
  totalRepos: number;
  followers: number;
  contributions: number;
  prs: number;
  issues: number;
};
