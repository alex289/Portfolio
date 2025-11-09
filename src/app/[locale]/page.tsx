import { routing } from '@/i18n/routing';
import { ArrowRight, Github } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import FeaturedPost from '@/components/blog/featured-post';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const featuredProjects = [
  {
    name: 'Tech Job Market Trends Dashboard',
    description:
      'Scraped job postings to track hiring patterns and visualize trends using Python, Pandas, and Matplotlib.',
    url: 'https://github.com/Daniel21b/Job-Market-Analytics',
    homepage: '',
    stargazerCount: 0,
    language: {
      name: 'Python',
      color: '#3572A5',
    },
  },
  {
    name: 'DC Bikeshare Demand Analysis',
    description:
      'Analyzed 2M+ bikeshare trips with statistical correlations and interactive Plotly visualizations.',
    url: 'https://github.com/Daniel21b/DC-Bikeshare-Demand-Analysis',
    homepage: '',
    stargazerCount: 0,
    language: {
      name: 'Python',
      color: '#3572A5',
    },
  },
  {
    name: 'E-commerce Recommendation Engine',
    description:
      'Built ML recommendation models with scikit-learn, MLflow tracking, and AWS deployment.',
    url: 'https://github.com/Daniel21b/Retail-Demand-Prediction',
    homepage: '',
    stargazerCount: 0,
    language: {
      name: 'Python',
      color: '#3572A5',
    },
  },
];

const Index = async ({ params }: PageProps<'/[locale]'>) => {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale });
  return (
    <>
      <div className="flex flex-col-reverse items-start sm:flex-row">
        <div className="flex flex-col pr-8">
          <h1 className="mb-1 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
            Daniel Berhane
          </h1>
          <h2 className="mb-4 text-gray-700 dark:text-gray-200">
            {t('index-page.title')}
          </h2>
          <p className="mb-16 text-gray-600 dark:text-gray-300">
            {t('index-page.intro')}
          </p>
        </div>
        <div className="relative mb-8 mr-auto w-[80px] sm:mb-0 sm:w-[176px]">
          <Image
            alt="Daniel Berhane"
            height={500}
            width={500}
            src="/favicon.png"
            sizes="30vw"
            priority
            className="rounded-full"
          />
        </div>
      </div>

      <h3 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
        Latest Posts
      </h3>

      <div className="flex flex-col gap-6 md:flex-row">
        <FeaturedPost
          title={t('index-page.posts.1.title')}
          slug={t('index-page.posts.1.slug')}
          gradient="from-[#D8B4FE] via-[#726dde] to-[#818CF8]"
        />
      </div>

      <Link
        href={`/${locale}/blog`}
        className="mb-16 mt-8 flex h-6 cursor-pointer items-center rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
        {t('index-page.posts.read-all')}
        <ArrowRight strokeWidth={1.5} className="ml-1" />
      </Link>

      <h3
        id="projects"
        className="mb-4 text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl">
        Featured Projects
      </h3>

      <div className="mb-8 space-y-4">
        {featuredProjects.map((project, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {project.name}
                </h4>
                <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <div
                      className="mr-2 inline-block h-3 w-3 rounded-full"
                      style={{ backgroundColor: project.language.color }}
                    />
                    {project.language.name}
                  </div>
                </div>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 rounded-lg border border-gray-200 bg-white p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                aria-label="View on GitHub">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <Link
        href={`/${locale}/projects`}
        className="mb-16 mt-4 flex h-6 cursor-pointer items-center rounded-lg leading-7 text-gray-600 transition-all hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
        {t('projects.see-more')}
        <ArrowRight strokeWidth={1.5} className="ml-1" />
      </Link>
    </>
  );
};

export default Index;
