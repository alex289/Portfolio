import { routing } from '@/i18n/routing';
import { Award, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import env from '@/env.mjs';

import type { Metadata } from 'next/types';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/certifications'>): Promise<Metadata> {
  const locale = (await params).locale as (typeof routing.locales)[number];
  const t = await getTranslations({ locale, namespace: 'main' });
  return {
    title: t('certifications'),
    openGraph: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('certifications')}`],
    },
    twitter: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('certifications')}`],
    },
  };
}

const certifications = [
  {
    name: 'IBM Accelerate Consulting Certification',
    issuer: 'IBM',
    date: 'November 2024',
    credentialId: 'c92e8117-05a0-4063-be5e-f67be8cb36e9',
    credentialUrl: 'https://www.credly.com/badges/c92e8117-05a0-4063-be5e-f67be8cb36e9',
    description: 'Completed IBM Accelerate Consulting program, demonstrating expertise in business consulting, technology solutions, and strategic problem-solving.',
    skills: ['Consulting', 'Business Strategy', 'Technology Solutions', 'Problem Solving'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Data Scientist in Python',
    issuer: 'Dataquest',
    date: '2024',
    credentialId: 'DBLZAYJ1P5UOS5MSXM9I',
    credentialUrl: 'https://app.dataquest.io/view_cert/DBLZAYJ1P5UOS5MSXM9I',
    description: 'Completed comprehensive data science path covering Python programming, data analysis, machine learning, statistics, and data visualization.',
    skills: ['Python', 'Pandas', 'Machine Learning', 'Statistics', 'Data Visualization'],
    color: 'from-purple-500 to-purple-600',
  },
  {
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: 'Coming Soon',
    credentialId: null,
    credentialUrl: null,
    description: 'Currently preparing for this certification to demonstrate expertise in designing distributed systems on AWS.',
    skills: ['AWS', 'Cloud Architecture', 'System Design', 'Infrastructure'],
    color: 'from-orange-500 to-orange-600',
    comingSoon: true,
  },
];

const CertificationsPage = () => {
  const t = useTranslations();

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        {t('certifications.title')}
      </h1>
      <p className="mb-12 text-gray-600 dark:text-gray-300">
        {t('certifications.description')}
      </p>

      <div className="space-y-6">
        {certifications.map((cert, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <div className="mb-3 flex items-start gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${cert.color} text-white shadow-md`}>
                    <Award className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                      {cert.name}
                    </h2>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {cert.issuer} • {cert.date}
                    </p>
                    {cert.credentialId && (
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-block rounded-md bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {cert.comingSoon ? (
                  <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                    <Award className="h-4 w-4" />
                    {t('certifications.coming-soon')}
                  </div>
                ) : (
                  cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-100 hover:text-indigo-700 dark:border-indigo-500 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 dark:hover:text-indigo-300">
                      <ExternalLink className="h-4 w-4" />
                      {t('certifications.view-credential')}
                    </a>
                  )
                )}
              </div>
            </div>

            <div
              className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${cert.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CertificationsPage;

