import { Suspense } from 'react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';

import Layout from '@/components/Layout';

import type { GetStaticProps } from 'next';
import type { Projects } from '@/lib/types';

export default function ProjectsPage({
  fallbackData,
}: {
  fallbackData: Projects[];
}) {
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
          Projects
        </h1>
        {data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th className="px-2 py-4 text-left border-b border-gray-500">
                  Name
                </th>
                <th className="px-2 py-4 text-left border-b border-gray-500">
                  Description
                </th>
                <th className="hidden px-2 py-4 text-left border-b border-gray-500 md:block">
                  Language
                </th>
              </tr>
            </thead>
            <tbody>
              <Suspense fallback={null}>
                {data.map((project, index) => (
                  <tr
                    key={index}
                    className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
                    <td className="px-2 py-4">
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-2">
                        {project.name}
                      </a>
                    </td>
                    <td className="px-2 py-4">{project.description}</td>
                    <td className="hidden px-2 py-4 md:block">
                      {project.language}
                    </td>
                  </tr>
                ))}
              </Suspense>
            </tbody>
          </table>
        )}
        {data.length === 0 && <p>No projects found</p>}
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const reposResponse = await fetch(
    'https://api.github.com/users/Alex289/repos?per_page=20&sort=pushed'
  );

  const fallbackData = await reposResponse.json();

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
};
