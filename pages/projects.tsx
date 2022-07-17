import { Suspense } from 'react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import useTranslation from '@/lib/useTranslation';

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
    <Layout title="Projects - Alexander Konietzko">
      <div className="flex flex-col items-start justify-center max-w-3xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {t('main.projects')}
        </h1>
        <Suspense fallback={null}>
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
    const backupResponse = await fetch(
      'https://gist.githubusercontent.com/alex289/152c0b6abecd4a7bac6b9abde6551185/raw/9c2e7c29eea6759cff46e4fb9c02ff17d59527f8/repos.json'
    );

    fallbackData = await backupResponse.json();
  }

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
};
