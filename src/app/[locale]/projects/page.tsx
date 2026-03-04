import { ProjectCard } from '@/components/projects/project-card';
import Stats from '@/components/projects/stats';
import { Button } from '@/components/ui/button';
import { routing } from '@/i18n/routing';
import { getProjects, getStats } from '@/lib/github';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/projects'>): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('pages.projects');
  return { title: t('title') };
}

export default async function Projects({
  params,
}: PageProps<'/[locale]/projects'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [stats, projects, t] = await Promise.all([
    getStats(),
    getProjects(),
    getTranslations('pages.projects'),
  ]);

  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="text-muted-foreground mt-2 mb-4">{t('description')}</p>

      {stats ? <Stats stats={stats} /> : null}

      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.name} className="mt-8">
            <ProjectCard project={project} />
          </div>
        ))
      ) : (
        <p className="text-muted-foreground mt-12 text-center">
          {t('no-projects')}
        </p>
      )}

      <a
        href="https://github.com/alex289?tab=repositories"
        target="_blank"
        rel="noreferrer noopener">
        <Button variant="ghost" className="mt-6">
          {t('all-repos')}
          <ArrowRight strokeWidth={1.5} className="ml-1" />
        </Button>
      </a>
    </section>
  );
}
