import { Projects, Stats } from './types';

export const getStats = async () => {
  const reposResponse = await fetch('https://api.github.com/graphql', {
    next: { revalidate: 60 * 60 * 24 },
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
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

  const data = await reposResponse.json();
  const user = data.data.user;

  let count = 0;
  user.repositories.nodes.forEach(
    (repo: { stargazers: { totalCount: number } }) => {
      count += repo.stargazers.totalCount;
    }
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
        Authorization: `bearer ${process.env.GITHUB_API_TOKEN}`,
      },
    }
  );

  if (!reposResponse.ok) {
    return [];
  }

  return (await reposResponse.json()) as Projects[];
};
