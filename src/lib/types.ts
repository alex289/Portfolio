export interface NowPlayingSong {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
}

export interface Stats {
  stars: number;
  totalCommits: number;
  totalRepos: number;
  followers: number;
  contributions: number;
  prs: number;
  issues: number;
}

export interface Projects {
  name: string;
  html_url: string;
  homepage: string;
  description: string;
  language: string;
}

export enum Form {
  Initial,
  Loading,
  Success,
  Error,
}

export interface FormState {
  state: Form;
  message?: string;
}

export interface Song {
  songUrl: string;
  artist: string;
  cover: string;
  title: string;
}

export interface TopTracks {
  tracks: Song[];
}

export interface ResponseTrackType {
  artists: {
    name: string;
  }[];
  name: string;
  external_urls: {
    spotify: string;
  };
  album: {
    images: {
      url: string;
    }[];
  };
}