import { Github, Home, StarIcon } from 'lucide-react';

import type { Projects } from '@/lib/types';

const Project = ({ projects }: { projects: Projects[] | null }) => {
  return (
    <>
      {projects &&
        projects.length > 0 &&
        projects.map((project: Projects, index: number) => (
          <div
            key={index}
            id={project.name}
            className="my-3 rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-500">
            <div className="flex justify-between">
              <div className="flex items-center text-lg font-semibold tracking-tight">
                {project.name}
              </div>

              <div className="gap-4 flex">
                {project.homepage && project.homepage !== '' && (
                  <a
                    href={project.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="homepage">
                    <Home
                      strokeWidth={1.5}
                      className="default-transition default-focus relative inline-flex h-10 w-10 justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white sm:w-10"
                    />
                  </a>
                )}

                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub">
                  <Github className="default-transition default-focus relative inline-flex h-10 w-10 justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white sm:w-10" />
                </a>
              </div>
            </div>
            <div className="mt-1 text-balance">{project.description}</div>
            <div className="flex gap-10 mt-3">
              <div className="flex items-center">
                {project.language.color !== '' && (
                  <div
                    className="inline-block w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: project.language.color }}></div>
                )}
                {project.language.name}
              </div>

              {project.stargazerCount > 0 && (
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 mr-2 text-indigo-500" />
                  {project.stargazerCount}
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default Project;
