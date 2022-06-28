import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import type { Projects } from '@/lib/types';

const Project = ({
  fallbackData,
}: {
  fallbackData: Projects[];
}): JSX.Element => {
  const { data, error } = useSWR<Projects[]>('/api/repos?per_page=3', fetcher, {
    fallbackData,
  });

  if (error) {
    return <div>Failed to load</div>;
  }
  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.length > 0 &&
        data.map((project: Projects, index: number) => (
          <a
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            id={project.name}
            href={project.html_url}
            className="p-6 my-3 border border-gray-200 rounded-lg shadow dark:border-gray-700 grid lg:grid-cols-4 md:grid-cols-2 gap-4 hover:bg-gray-200 dark:hover:bg-gray-700">
            <div className="flex flex-row">
              <p className="font-semibold text-gray-500 dark:text-white">
                {project.name}
              </p>
            </div>
            <p className="col-span-2">{project.description}</p>
            <p>{project.language}</p>
          </a>
        ))}
    </>
  );
};

export default Project;
