import { routing } from '@/i18n/routing';
import { Database, Code, BarChart3, ExternalLink, Github } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import env from '@/env.mjs';

import type { Metadata } from 'next/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projects'>): Promise<Metadata> {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale });
  return {
    title: t('main.projects'),
    openGraph: {
      images: [
        `${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('main.projects')}`,
      ],
    },
    twitter: {
      images: [
        `${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('main.projects')}`,
      ],
    },
  };
}

const myProjects = [
  {
    title: 'Tech Job Market Trends Dashboard',
    description:
      'Scraped job postings from career sites using BeautifulSoup to track company hiring patterns. Standardized company names with Pandas and analyzed month-over-month position changes with NumPy. Visualized hiring trends using Matplotlib.',
    technologies: ['Python', 'Pandas', 'BeautifulSoup', 'Matplotlib', 'NumPy'],
    period: 'Jan 2024 - Mar 2024',
    github: 'https://github.com/Daniel21b/Job-Market-Analytics',
    category: 'data-analysis',
  },
  {
    title: 'DC Bikeshare Demand & Peak Usage Analysis',
    description:
      'Processed 2+ million Bikeshare trips using Pandas to identify usage patterns across DC metro stations. Calculated statistical correlations between weather and ridership. Generated Seaborn heatmaps and Plotly interactive visualizations. Connected data to Looker for interactive dashboards.',
    technologies: ['Python', 'Pandas', 'Seaborn', 'Plotly', 'Looker'],
    period: 'Aug 2024 - Oct 2024',
    github: 'https://github.com/Daniel21b/DC-Bikeshare-Demand-Analysis',
    category: 'data-analysis',
  },
  {
    title: 'E-commerce Recommendation Engine',
    description:
      'Developed recommendation models using scikit-learn to predict customer product preferences. Tracked experiments with MLflow. Stored recommendation scores in PostgreSQL. Deployed interactive Plotly dashboard on AWS EC2.',
    technologies: [
      'Python',
      'scikit-learn',
      'MLflow',
      'PostgreSQL',
      'AWS',
      'Plotly',
    ],
    period: 'Mar 2025 - May 2025',
    github: 'https://github.com/Daniel21b/Retail-Demand-Prediction',
    category: 'machine-learning',
  },
];

const services = [
  {
    icon: BarChart3,
    title: 'Data Analytics',
    description:
      'ETL pipeline development, data visualization with Power BI and Tableau, SQL optimization, and business intelligence reporting.',
    skills: [
      'Python',
      'SQL',
      'Power BI',
      'Tableau',
      'AWS',
      'Snowflake',
      'dbt',
    ],
  },
  {
    icon: Code,
    title: 'Frontend Development',
    description:
      'Building responsive and interactive user interfaces using modern JavaScript frameworks and libraries.',
    skills: ['JavaScript', 'React', 'Next.js', 'TailwindCSS', 'TypeScript'],
  },
  {
    icon: Database,
    title: 'Backend Development',
    description:
      'Designing and implementing RESTful APIs, database architecture, and server-side applications.',
    skills: ['Python', 'FastAPI', 'PostgreSQL', 'MySQL', 'MongoDB', 'AWS'],
  },
];

const ProjectsPage = async ({ params }: PageProps<'/[locale]/projects'>) => {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale });

  return (
    <div className="mx-auto mb-16 flex max-w-3xl flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        {t('main.projects')}
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-300">
        A collection of my data analysis and software engineering projects.
      </p>

      {/* Services Section */}
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
        Services
      </h2>
      <div className="mb-12 grid w-full gap-4 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-500">
            <service.icon className="mb-4 h-8 w-8 text-indigo-500" />
            <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              {service.description}
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              {service.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-black dark:text-white md:text-3xl">
        Featured Projects
      </h2>
      <div className="w-full space-y-6">
        {myProjects.map((project, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-500">
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  {project.period}
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-200 bg-white p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-700 dark:border-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                  aria-label="View on GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Link */}
      <a
        href="https://github.com/Daniel21b?tab=repositories"
        target="_blank"
        rel="noreferrer noopener"
        className="mt-8 flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-200">
        <span className="mr-2">View all repositories on GitHub</span>
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
};

export default ProjectsPage;
