import env from '@/env.mjs';

import type { Projects, Stats } from './types';

interface ReposResponse {
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

export const getStats = async () => {
  const reposResponse = await fetch('https://api.github.com/graphql', {
    next: { revalidate: 60 * 60 * 24 },
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

  if (!reposResponse.ok) {
    return null;
  }

  const data = (await reposResponse.json()) as ReposResponse;
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

      languageCounts[languageName]!.count += 1;
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
  const reposResponse = await fetch(
    `https://api.github.com/users/alex289/repos?per_page=${perPage}&sort=pushed`,
    {
      next: { revalidate: 3600 }, // 1 hour
      headers: {
        Authorization: `Bearer ${env.GITHUB_API_TOKEN}`,
      },
    },
  );

  if (!reposResponse.ok) {
    return [];
  }

  return (await reposResponse.json()) as Projects[];
};
