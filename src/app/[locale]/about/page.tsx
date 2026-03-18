import { skills } from '@/components/skills';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('pages.about');
  return { title: t('title') };
}

export default async function About({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('pages.about');

  const birthDate = new Date(2002, 9, 28);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-4xl font-bold">{t('title')}</h1>

      <p className="mt-6 leading-relaxed text-muted-foreground">
        {t.rich('bio', {
          age,
          br: () => <br />,
          netgo: (chunks) => (
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <a
                  href="https://netgo.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-foreground underline decoration-dotted underline-offset-4">
                  {chunks}
                </a>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">netgo</p>
                  <p className="text-sm text-muted-foreground">
                    {t('netgo-description')}
                  </p>
                  <a
                    href="https://netgo.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline">
                    {t('netgo-link')} →
                  </a>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
          wh: (chunks) => (
            <HoverCard openDelay={100} closeDelay={100}>
              <HoverCardTrigger asChild>
                <a
                  href="https://w-hs.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-foreground underline decoration-dotted underline-offset-4">
                  {chunks}
                </a>
              </HoverCardTrigger>
              <HoverCardContent className="w-72">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">
                    Westfälische Hochschule
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {t('wh-description')}
                  </p>
                  <a
                    href="https://w-hs.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline">
                    {t('wh-link')} →
                  </a>
                </div>
              </HoverCardContent>
            </HoverCard>
          ),
        })}
      </p>

      <Link href="/projects">
        <Button variant="ghost" className="mt-6">
          {t('my-projects')}
          <ArrowRight strokeWidth={1.5} className="ml-1" />
        </Button>
      </Link>

      <Separator className="my-10" />

      <h2 className="text-2xl font-semibold tracking-tight">
        {t('skillsTitle')}
      </h2>

      <div className="mt-6 space-y-6">
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t('languages')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.languages.map((skill) => (
              <HoverCard key={skill.key} openDelay={10} closeDelay={100}>
                <HoverCardTrigger>{skill}</HoverCardTrigger>
                <HoverCardContent className="w-auto px-3 py-1.5 text-center">
                  {skill.key}
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t('frameworks')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.frameworks.map((skill) => (
              <HoverCard key={skill.key} openDelay={10} closeDelay={100}>
                <HoverCardTrigger>{skill}</HoverCardTrigger>
                <HoverCardContent className="w-auto px-3 py-1.5 text-center">
                  {skill.key}
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">
            {t('tools')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.tools.map((skill) => (
              <HoverCard key={skill.key} openDelay={10} closeDelay={100}>
                <HoverCardTrigger>{skill}</HoverCardTrigger>
                <HoverCardContent className="w-auto px-3 py-1.5 text-center">
                  {skill.key}
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
