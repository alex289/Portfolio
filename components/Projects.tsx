import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import type { Projects } from '@/lib/types';

const Project = ({
  fallbackData,
  amount = 3,
}: {
  fallbackData: Projects[];
  amount?: number;
}): JSX.Element => {
  const { data, error } = useSWR<Projects[]>(
    `/api/repos?per_page=${amount}`,
    fetcher,
    {
      fallbackData,
    }
  );

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
          <div
            key={index}
            id={project.name}
            className="p-6 my-3 border border-gray-200 rounded-lg shadow dark:border-gray-700 grid lg:grid-cols-5 md:grid-cols-2 gap-4">
            <div className="flex flex-row">
              <p className="font-semibold text-gray-500 dark:text-white">
                {project.name}
              </p>
            </div>
            <p className="col-span-2">{project.description}</p>
            <p className="mx-4">{project.language}</p>
            <div className="flex flex-row gap-x-4">
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="relative inline-flex justify-center w-full h-10 px-3 py-2 text-sm font-medium text-gray-400 border border-gray-100 rounded-lg sm:w-10 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white dark:border-gray-500 default-transition default-focus"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2">
                    <path d="m3 9l9-7l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <path d="M9 22V12h6v10"></path>
                  </g>
                </svg>
              </a>

              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  className="relative inline-flex justify-center w-full h-10 px-3 py-2 text-sm font-medium text-gray-400 border border-gray-100 rounded-lg sm:w-10 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-white dark:border-gray-500 default-transition default-focus"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </div>
        ))}
      {!Array.isArray(data) && <p>No projects found</p>}
    </>
  );
};

export default Project;
