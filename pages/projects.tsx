import { Suspense } from 'react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import useTranslation from '@/lib/useTranslation';
import { BACKUP_REPOS_URL } from '@/lib/constants';

import Project from '@/components/Projects';
import Layout from '@/components/Layout';

import type { GetStaticProps } from 'next';
import type { Projects } from '@/lib/types';

export default function ProjectsPage({
  fallbackData,
}: {
  fallbackData: Projects[];
}) {
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
    revalidate: 60,
  };
};
