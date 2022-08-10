import { Suspense } from 'react';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTheme } from 'next-themes';

import fetcher from '@/lib/fetcher';
import useTranslation from '@/lib/useTranslation';
import { BACKUP_REPOS_URL, DAY_IN_SECONDS } from '@/lib/constants';

import Project from '@/components/Projects';
import Layout from '@/components/Layout';

import type { GetStaticProps } from 'next';
import type { Projects } from '@/lib/types';

export default function ProjectsPage({
  fallbackData,
}: {
  fallbackData: Projects[];
}) {
  const { resolvedTheme } = useTheme();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const { data, error } = useSWR<Projects[]>('/api/repos', fetcher, {
    fallbackData,
  });

  if (error) {
    return <Layout>Failed to load</Layout>;
  }
  if (!data) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <Layout title={t('main.projects') + ' - Alexander Konietzko'}>
      <div className="mx-auto mb-16 flex max-w-3xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {t('main.projects')}
        </h1>
        <Suspense>
          <div className="mb-4 w-full">
            <a
              href="https://github.com/alex289"
              target="_blank"
              rel="noreferrer noopener">
              <Image
                alt="GitHub Stats"
                className="mx-auto"
                width={495}
                height={195}
                unoptimized
                src={`https://github-readme-stats.vercel.app/api?username=alex289&show_icons=true&cache_seconds=43200${
                  resolvedTheme === 'dark' ? '&theme=discord_old_blurple' : ''
                }${locale === 'de' ? '&locale=de' : ''}`}
              />
            </a>
          </div>
          <h2 className="text-gray-600 dark:text-gray-200">
            <Project fallbackData={fallbackData} amount={10} />
          </h2>
        </Suspense>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const reposResponse = await fetch(
    'https://api.github.com/users/Alex289/repos?per_page=20&sort=pushed'
  );

  let fallbackData = await reposResponse.json();

  if (!reposResponse.ok) {
    const backupResponse = await fetch(BACKUP_REPOS_URL);

    fallbackData = await backupResponse.json();
  }

  return {
    props: {
      fallbackData,
    },
    revalidate: DAY_IN_SECONDS,
  };
};
