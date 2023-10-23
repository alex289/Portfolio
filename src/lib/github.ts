import env from '@/env.js';
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
  } as Stats;
};

export const getProjects = async (perPage = 10) => {
  const reposResponse = await fetch(
    `https://api.github.com/users/alex289/repos?per_page=${perPage}&sort=pushed`,
    {
      next: { revalidate: 60 * 60 * 24 },
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
