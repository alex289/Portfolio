import profilePic from '../../../public/static/images/konietzko_alexander.jpg';
import { ProjectCard } from '@/components/projects/project-card';
import SocialIcons from '@/components/social-icons';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { getProjects } from '@/lib/github';
import { ArrowRight } from 'lucide-react';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [projects, t] = await Promise.all([
    getProjects(3),
    getTranslations('pages.home'),
  ]);
  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      <div className="flex flex-col-reverse items-center sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="text-muted-foreground">{t('greeting')}</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            {t('name')}
          </h1>
          <p className="mt-1 text-xl text-muted-foreground sm:text-2xl">
            {t('title')}
          </p>

          <p className="mt-2 mb-16 text-lg text-muted-foreground">
            {t('tagline')}
          </p>
        </div>

        <div className="relative mb-6 w-32 sm:mb-0 sm:w-44">
          <Image
            alt="Alexander Konietzko"
            height={500}
            width={500}
            src={profilePic}
            placeholder="blur"
            sizes="30vw"
            priority
            className="rounded-full"
          />
        </div>
      </div>

      <SocialIcons size="size-12" />

      <h1 className="mt-8 text-3xl font-bold tracking-tight">
        {t('projects')}
      </h1>

      {projects.length > 0 ? (
        projects.map((project) => (
          <div key={project.name} className="mt-8">
            <ProjectCard project={project} />
          </div>
        ))
      ) : (
        <p className="mt-12 text-center text-muted-foreground">
          {t('no-projects')}
        </p>
      )}

      <Link href="/projects">
        <Button variant="ghost" className="mt-6">
          {t('more-projects')}
          <ArrowRight strokeWidth={1.5} className="ml-1" />
        </Button>
      </Link>
    </section>
  );
}
