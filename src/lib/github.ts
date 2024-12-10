import env from '@/env.mjs';

import type { Projects, Stats } from './types';

interface StatsResponse {
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
          };
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
}

interface RepoResponse {
  data: {
    user: {
      repositories: {
        nodes: {
          name: string;
          url: string;
          description: string;
          homepageUrl: string;
          stargazerCount: number;
          primaryLanguage: {
            name: string;
            color: string;
          };
        }[];
      };
    };
  };
}

export const getStats = async () => {
  const statsResponse = await fetch('https://api.github.com/graphql', {
    next: { revalidate: 3600 }, // 1 hour
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.GITHUB_API_TOKEN}`,
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
            repositories(ownerAffiliations: OWNER, first: 100) {
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
        login: 'alex289',
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
    const languageName = repo.primaryLanguage.name;
    const languageColor = repo.primaryLanguage.color;

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

export const getProjects = async (perPage = 10) => {
  const reposResponse = await fetch('https://api.github.com/graphql', {
    next: { revalidate: 3600 }, // 1 hour
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.GITHUB_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        query projectsInfo($login: String!, $perPage: Int!) {
          user(login: $login) {
            repositories(first: $perPage, orderBy: {field: PUSHED_AT, direction: DESC}, privacy: PUBLIC) {
              nodes {
                name
                url
                description
                homepageUrl
                stargazerCount
                primaryLanguage {
                  name
                  color
                }
              }
            }
          }
        }
        `,
      variables: {
        login: 'alex289',
        perPage: perPage,
      },
    }),
  });

  if (!reposResponse.ok) {
    return [];
  }

  const data = (await reposResponse.json()) as RepoResponse;

  return data.data.user.repositories.nodes.map(
    (repo) =>
      ({
        name: repo.name,
        url: repo.url,
        homepage: repo.homepageUrl,
        description: repo.description || '',
        stargazerCount: repo.stargazerCount,
        language: {
          name: repo.primaryLanguage.name || '',
          color: repo.primaryLanguage.color || '',
        },
      }) as Projects,
  );
};
