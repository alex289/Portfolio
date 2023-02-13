import { AlertCircle, Book, GitPullRequest, History, Star } from 'lucide-react';

import type { Stats } from '@/lib/types';
import { getTranslations } from 'next-intl/server';

const getProjects = async () => {
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

const ProjectsPage = async () => {
  const data = await getProjects();
  const t = await getTranslations();

  return (
    <div className="mx-auto mb-16 flex max-w-3xl flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        {t('main.projects')}
      </h1>
      <a
        href="https://github.com/alex289"
        target="_blank"
        rel="noreferrer noopener"
        className="mx-auto mb-4 flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <ul className="flex flex-col">
          <li className="mb-4">
            <span className="text-lg font-semibold">{t('stats.title')}</span>
          </li>
          <li className="mb-2 flex justify-between">
            <span className="flex items-center">
              <Star className="mr-2 h-5 w-5 text-indigo-500" />
              {t('stats.stars')}:
            </span>
            <span className="ml-20 sm:ml-40">{data?.stars ?? '-'}</span>
          </li>
          <li className="mb-2 flex justify-between">
            <span className="flex items-center">
              <History className="mr-2 h-5 w-5 text-indigo-500" />{' '}
              {t('stats.commits')}:
            </span>
            <span className="ml-20 sm:ml-40">{data?.totalCommits ?? '-'}</span>
          </li>
          <li className="mb-2 flex justify-between">
            <span className="flex items-center">
              <GitPullRequest className="mr-2 h-5 w-5 text-indigo-500" />{' '}
              {t('stats.prs')}:
            </span>
            <span className="ml-20 sm:ml-40">{data?.prs ?? '-'}</span>
          </li>
          <li className="mb-2 flex justify-between">
            <span className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-indigo-500" />{' '}
              {t('stats.issues')}:
            </span>
            <span className="ml-20 sm:ml-40">{data?.issues ?? '-'}</span>
          </li>
          <li className="flex justify-between">
            <span className="flex items-center">
              <Book className="mr-2 h-5 w-5 text-indigo-500" />{' '}
              {t('stats.contributed')}:
            </span>
            <span className="ml-20 sm:ml-40">{data?.contributions ?? '-'}</span>
          </li>
        </ul>
      </a>
      <h2 className="text-gray-600 dark:text-gray-200">Projects</h2>
    </div>
  );
};

export function generateStaticParams() {
  return [
    {
      locale: 'en',
    },
    {
      locale: 'de',
    },
  ];
}

export default ProjectsPage;
