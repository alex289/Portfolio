export interface Stats {
  stars: number;
  totalCommits: number;
  totalRepos: number;
  followers: number;
  contributions: number;
  prs: number;
  issues: number;
  topLanguages: {
    name: string;
    count: number;
    color: string;
  }[];
}

export interface Projects {
  name: string;
  url: string;
  homepage: string;
  description: string;
  stargazerCount: number;
  language: {
    name: string;
    color: string;
  };
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

export interface BlogPost {
  content: string;
  title: string;
  translation: string;
  publishedAt: string;
  summary: string;
  language: string;
  tags: string[];
  slug: string;
  readingTime: number;
}
