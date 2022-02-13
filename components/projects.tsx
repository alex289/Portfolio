import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import type { Projects } from '@/lib/types';

const Project = ({
  fallbackData,
}: {
  fallbackData: Projects[];
}): JSX.Element => {
  const { data, error } = useSWR<Projects[]>('/api/repos', fetcher, {
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
      {data.map((project: Projects, index: number) => (
        <div
          key={index}
          className="p-3 my-3 grid lg:grid-cols-4 md:grid-cols-2 gap-4"
        >
          <h3 className="text-lg font-semibold tracking-wide">
            <a
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition"
              target="_blank"
              rel="noopener noreferrer"
              id={project.name}
              href={project.html_url}
            >
              {project.name}
            </a>
          </h3>
          <p className="col-span-2">{project.description}</p>
          <p>{project.language}</p>
        </div>
      ))}
    </>
  );
};

export default Project;
