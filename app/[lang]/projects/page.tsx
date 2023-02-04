'use client';

import useSWR from 'swr';
import { AlertCircle, Book, GitPullRequest, History, Star } from 'lucide-react';

import useTranslation from '@/lib/i18n/use-translation';
import fetcher from '@/lib/fetcher';

import type { Stats } from '@/lib/types';

const ProjectsPage = () => {
  const { data } = useSWR<Stats>('/api/stats', fetcher);
  const { t } = useTranslation();

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

export default ProjectsPage;
