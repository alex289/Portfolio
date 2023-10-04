export type NowPlayingSong = {
  album: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
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

export type Projects = {
  name: string;
  html_url: string;
  homepage: string;
  description: string;
  language: string;
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

export type Song = {
  songUrl: string;
  artist: string;
  cover: string;
  title: string;
};

export type TopTracks = {
  tracks: Song[];
};

export type ResponseTrackType = {
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
};
