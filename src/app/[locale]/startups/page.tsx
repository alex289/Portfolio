import { routing } from '@/i18n/routing';
import { Rocket, ExternalLink, Globe, Users, Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import env from '@/env.mjs';

import type { Metadata } from 'next/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale, namespace: 'main' });
  return {
    title: t('startups'),
    openGraph: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('startups')}`],
    },
    twitter: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('startups')}`],
    },
  };
}

// Startup entries - Add your startups here
// Example structure:
// {
//   name: 'Startup Name',
//   tagline: 'Short description of what the startup does',
//   description: 'Detailed description of the startup, its mission, and your role',
//   website: 'https://example.com',
//   founded: '2024',
//   role: 'Co-Founder & CTO',
//   status: 'Active' | 'Acquired' | 'Stealth' | 'Building',
//   industry: 'FinTech' | 'HealthTech' | 'EdTech' | 'AI/ML' | etc.,
//   teamSize: '1-5',
//   highlights: ['Highlight 1', 'Highlight 2'],
//   technologies: ['Tech 1', 'Tech 2'],
//   color: 'from-blue-500 to-indigo-600',
// }
const startups: Array<{
  name: string;
  tagline: string;
  description: string;
  website?: string;
  founded: string;
  role: string;
  status: 'Active' | 'Acquired' | 'Stealth' | 'Building';
  industry: string;
  teamSize?: string;
  highlights: string[];
  technologies: string[];
  color: string;
}> = [];

const StartupsPage = () => {
  const t = useTranslations();

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        {t('startups.title')}
      </h1>
      <p className="mb-12 text-gray-600 dark:text-gray-300">
        {t('startups.description')}
      </p>

      {startups.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-16 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
            <Rocket className="h-8 w-8" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {t('startups.coming-soon-title')}
          </h2>
          <p className="max-w-md text-center text-gray-600 dark:text-gray-400">
            {t('startups.coming-soon-description')}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {startups.map((startup, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${startup.color} text-white shadow-md`}>
                      <Rocket className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {startup.name}
                      </h2>
                      <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                        {startup.tagline}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Founded {startup.founded}
                        </span>
                        {startup.teamSize && (
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {startup.teamSize} people
                          </span>
                        )}
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          startup.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          startup.status === 'Stealth' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                          startup.status === 'Building' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        }`}>
                          {startup.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  {startup.website && (
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100 dark:border-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50">
                      <Globe className="h-4 w-4" />
                      Visit Website
                    </a>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300">
                  {startup.description}
                </p>

                {/* Role & Industry */}
                <div className="flex flex-wrap gap-4">
                  <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">My Role</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{startup.role}</p>
                  </div>
                  <div className="rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Industry</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{startup.industry}</p>
                  </div>
                </div>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${startup.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StartupsPage;

