import {
  BadRequestEdge,
  isValidHttpMethod,
  MethodNotAllowedEdge,
} from '@/lib/api';

import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  if (!isValidHttpMethod(req.method, ['GET'])) {
    return MethodNotAllowedEdge();
  }

  const reposResponse = await fetch('https://api.github.com/graphql', {
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
    return BadRequestEdge('Could not fetch GitHub stats');
  }

  const data = await reposResponse.json();
  const user = data.data.user;

  let count = 0;
  user.repositories.nodes.forEach(
    (repo: { stargazers: { totalCount: number } }) => {
      count += repo.stargazers.totalCount;
    }
  );

  const stats = {
    stars: count,
    totalCommits:
      user.contributionsCollection.totalCommitContributions +
      user.contributionsCollection.restrictedContributionsCount,
    totalRepos: user.repositories.totalCount,
    followers: user.followers.totalCount,
    contributions: user.repositoriesContributedTo.totalCount,
    prs: user.pullRequests.totalCount,
    issues: user.openIssues.totalCount + user.closedIssues.totalCount,
  };

  return new Response(JSON.stringify(stats), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
    },
  });
}
