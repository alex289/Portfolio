import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import type { Projects } from '@/lib/types';

const Project = (): JSX.Element => {
  const { data, error } = useSWR<Projects[]>(
    'https://api.github.com/users/Alex289/repos',
    fetcher
  );

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
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 my-3 p-3"
        >
          <h3 className="font-semibold text-lg tracking-wide">
            <a
              className="hover:text-blue-800 text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 transition"
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
