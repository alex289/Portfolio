import {
  AlertCircle,
  ArrowRight,
  Book,
  GitPullRequest,
  History,
  Star,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import env from '@/env.mjs';
import Project from '@/components/projects';
import { getProjects, getStats } from '@/lib/github';

import type { Metadata } from 'next/types';

interface ProjectsProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

export async function generateMetadata({
  params,
}: ProjectsProps): Promise<Metadata> {
  const locale = (await params).locale;
  const t = await getTranslations({ locale });
  return {
    title: t('main.projects'),
    openGraph: {
      images: [
        `${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('main.projects')}`,
      ],
    },
    twitter: {
      images: [
        `${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('main.projects')}`,
      ],
    },
  };
}

const ProjectsPage = async ({ params }: ProjectsProps) => {
  const locale = (await params).locale;
  const [stats, projects, t] = await Promise.all([
    getStats(),
    getProjects(),
    getTranslations({ locale }),
  ]);

  return (
    <div className="mx-auto mb-16 flex max-w-3xl flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        {t('main.projects')}
      </h1>
      <div className="flex gap-4 flex-col sm:flex-row w-full">
        <a
          href="https://github.com/alex289"
          target="_blank"
          rel="noreferrer noopener"
          className="mx-auto w-full mb-4 flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <ul className="flex flex-col">
            <li className="mb-4">
              <span className="text-lg font-semibold">{t('stats.title')}</span>
            </li>
            <li className="mb-2 flex justify-between">
              <span className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-indigo-500" />
                {t('stats.stars')}:
              </span>
              <span>{stats?.stars ?? '-'}</span>
            </li>
            <li className="mb-2 flex justify-between">
              <span className="flex items-center">
                <History className="mr-2 h-5 w-5 text-indigo-500" />{' '}
                {t('stats.commits')}:
              </span>
              <span>{stats?.totalCommits ?? '-'}</span>
            </li>
            <li className="mb-2 flex justify-between">
              <span className="flex items-center">
                <GitPullRequest className="mr-2 h-5 w-5 text-indigo-500" />{' '}
                {t('stats.prs')}:
              </span>
              <span>{stats?.prs ?? '-'}</span>
            </li>
            <li className="mb-2 flex justify-between">
              <span className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-indigo-500" />{' '}
                {t('stats.issues')}:
              </span>
              <span>{stats?.issues ?? '-'}</span>
            </li>
            <li className="flex justify-between">
              <span className="flex items-center">
                <Book className="mr-2 h-5 w-5 text-indigo-500" />{' '}
                {t('stats.contributed')}:
              </span>
              <span>{stats?.contributions ?? '-'}</span>
            </li>
          </ul>
        </a>
        <a
          href="https://github.com/alex289"
          target="_blank"
          rel="noreferrer noopener"
          className="mx-auto w-full mb-4 flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <ul className="flex flex-col">
            <li className="mb-4">
              <span className="text-lg font-semibold">
                {t('stats.top-languages')}
              </span>
            </li>
            {stats?.topLanguages.map((lang) => (
              <li className="mb-2 flex justify-between" key={lang.name}>
                <div className="flex items-center">
                  <div
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: lang.color }}></div>
                  {lang.name}:
                </div>
                <span>{lang.count}</span>
              </li>
            ))}
          </ul>
        </a>
      </div>

      <h2 className="text-gray-600 dark:text-gray-200 md:w-[48rem]">
        <Project projects={projects} />

        {projects.length === 0 && (
          <div className="w-[100rem]">{t('projects.not-found')}</div>
        )}

        <a
          href="https://github.com/alex289?tab=repositories"
          target="_blank"
          rel="noreferrer noopener">
          <button className="flex items-center mt-6 cursor-pointer">
            {t('projects.all-repos')}
            <ArrowRight strokeWidth={1.5} className="ml-1" />
          </button>
        </a>
      </h2>
    </div>
  );
};

export default ProjectsPage;
