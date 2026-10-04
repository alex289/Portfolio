export type Stats = {
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
};

export type Project = {
  name: string;
  url: string;
  homepage: string;
  description: string;
  stargazerCount: number;
  language: {
    name: string;
    color: string;
  };
  topics: string[];
};

type StatsResponse = {
  data: {
    user: {
      repositories: {
        totalCount: number;
        nodes: {
          stargazers: {
            totalCount: number;
          };
          primaryLanguage: {
            name: string;
            color: string;
          } | null;
        }[];
      };
      contributionsCollection: {
        totalCommitContributions: number;
        restrictedContributionsCount: number;
      };
      followers: {
        totalCount: number;
      };
      repositoriesContributedTo: {
        totalCount: number;
      };
      pullRequests: {
        totalCount: number;
      };
      openIssues: {
        totalCount: number;
      };
      closedIssues: {
        totalCount: number;
      };
    };
  };
};

type RepoNode = {
  name: string;
  url: string;
  description: string | null;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  isArchived: boolean;
  pushedAt: string;
  licenseInfo: { key: string } | null;
  releases: { totalCount: number };
  primaryLanguage?: {
    name: string;
    color: string;
  };
  defaultBranchRef: {
    target: { history: { totalCount: number } } | null;
  } | null;
  repositoryTopics: {
    nodes: {
      topic: {
        name: string;
      };
    }[];
  };
};

type RepoResponse = {
  data: {
    user: {
      repositories: {
        nodes: RepoNode[];
      };
    };
  };
};

export const getStats = async () => {
  const statsResponse = await fetch('https://api.github.com/graphql', {
    next: { revalidate: 3600 }, // 1 hour
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query userInfo($login: String!) {
          user(login: $login) {
            name
            login
            contributionsCollection {
              totalCommitContributions
              restrictedContributionsCount
            }
            repositoriesContributedTo(contributionTypes: [COMMIT, ISSUE, PULL_REQUEST, REPOSITORY]) {
              totalCount
            }
            pullRequests {
              totalCount
            }
            openIssues: issues(states: OPEN) {
              totalCount
            }
            closedIssues: issues(states: CLOSED) {
              totalCount
            }
            followers {
              totalCount
            }
            repositories(ownerAffiliations: [COLLABORATOR, OWNER], first: 100) {
              totalCount,
              nodes {
                name
                stargazers {
                  totalCount
                }
                primaryLanguage {
                  name,
                  color
                }
              }
            }
          }
        }
        `,
      variables: {
        login: process.env.GITHUB_USERNAME,
      },
    }),
  });

  if (!statsResponse.ok) {
    return null;
  }

  const data = (await statsResponse.json()) as StatsResponse;
  const user = data.data.user;

  let count = 0;
  user.repositories.nodes.forEach(
    (repo: { stargazers: { totalCount: number } }) => {
      count += repo.stargazers.totalCount;
    },
  );

  const languageCounts: Record<string, { count: number; color: string }> = {};

  user.repositories.nodes.forEach((repo) => {
    const languageName = repo.primaryLanguage?.name;
    const languageColor = repo.primaryLanguage?.color;

    if (languageName) {
      if (!languageCounts[languageName]) {
        languageCounts[languageName] = { count: 0, color: languageColor || '' };
      }

      languageCounts[languageName].count += 1;
    }
  });

  const topLanguages = Object.entries(languageCounts)
    .map(([name, { count, color }]) => ({
      name,
      count,
      color,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    stars: count,
    totalCommits:
      user.contributionsCollection.totalCommitContributions +
      user.contributionsCollection.restrictedContributionsCount,
    totalRepos: user.repositories.totalCount,
    followers: user.followers.totalCount,
    contributions: user.repositoriesContributedTo.totalCount,
    prs: user.pullRequests.totalCount,
    issues: user.openIssues.totalCount + user.closedIssues.totalCount,
    topLanguages: topLanguages,
  } as Stats;
};

const MONTH_IN_MS = 1000 * 60 * 60 * 24 * 30.44;
const FRESHNESS_HALF_LIFE_MONTHS = 18;

const logScore = (value: number, reference: number) =>
  Math.min(1, Math.log10(1 + value) / Math.log10(1 + reference));

const isShowcaseWorthy = (repo: RepoNode, login: string) =>
  !repo.isArchived &&
  !!repo.description?.trim() &&
  repo.name.toLowerCase() !== login.toLowerCase() &&
  repo.name !== '.github';

// Ranks a repo 0-100 from signals GitHub already tracks, so the showcase stays
// curated without a hardcoded list or topics. `newestPush` keeps the freshness
// term deterministic -- reading the wall clock here would break prerendering.
const scoreRepo = (repo: RepoNode, newestPush: number) => {
  const commits = repo.defaultBranchRef?.target?.history.totalCount ?? 0;
  const monthsBehind = (newestPush - Date.parse(repo.pushedAt)) / MONTH_IN_MS;

  return (
    35 * logScore(repo.stargazerCount, 300) +
    20 * logScore(commits, 500) +
    15 * Math.pow(0.5, monthsBehind / FRESHNESS_HALF_LIFE_MONTHS) +
    10 * logScore(repo.forkCount, 40) +
    10 * logScore(repo.releases.totalCount, 30) +
    (repo.homepageUrl ? 6 : 0) +
    (repo.licenseInfo ? 4 : 0)
  );
};

export const getProjects = async (limit = 6) => {
  const login = process.env.GITHUB_USERNAME;

  const reposResponse = await fetch('https://api.github.com/graphql', {
    next: { revalidate: 3600 }, // 1 hour
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query projectsInfo($login: String!) {
          user(login: $login) {
            repositories(first: 100, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC, isFork: false) {
              nodes {
                name
                url
                description
                homepageUrl
                stargazerCount
                forkCount
                isArchived
                pushedAt
                licenseInfo {
                  key
                }
                releases {
                  totalCount
                }
                primaryLanguage {
                  name
                  color
                }
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history {
                        totalCount
                      }
                    }
                  }
                }
                repositoryTopics(first: 5) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
          }
        }
        `,
      variables: {
        login: login,
      },
    }),
  });

  if (!reposResponse.ok) {
    return [];
  }

  const data = (await reposResponse.json()) as RepoResponse;

  const candidates = data.data.user.repositories.nodes.filter((repo) =>
    isShowcaseWorthy(repo, login ?? ''),
  );

  if (candidates.length === 0) {
    return [];
  }

  const newestPush = Math.max(
    ...candidates.map((repo) => Date.parse(repo.pushedAt)),
  );

  return candidates
    .map((repo) => ({ repo, score: scoreRepo(repo, newestPush) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(
      ({ repo }) =>
        ({
          name: repo.name,
          url: repo.url,
          homepage: repo.homepageUrl ?? '',
          description: repo.description ?? '',
          stargazerCount: repo.stargazerCount,
          language: {
            name: repo.primaryLanguage?.name || '',
            color: repo.primaryLanguage?.color || '',
          },
          topics: repo.repositoryTopics.nodes.map((node) => node.topic.name),
        }) as Project,
    );
};
