import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';
import { Locale } from 'next-intl';
import { Button } from '@/components/ui/button';
import GermanPrivacy from '@/components/privacy/german';
import EnglishPrivacy from '@/components/privacy/english';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/privacy'>): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('pages.privacy');
  return { title: t('title') };
}

export default async function PrivacyPage({
  params,
}: PageProps<'/[locale]/privacy'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('pages.privacy');

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>

      <p className="mt-6 mb-2 leading-relaxed text-muted-foreground">
        {t('intro')}
      </p>

      <Button
        asChild
        variant="ghost"
        size="sm"
        className="h-auto whitespace-normal">
        <a
          href="https://datenschutz-generator.de/"
          target="_blank"
          rel="noopener noreferrer">
          {t('source')}
        </a>
      </Button>

      <Separator className="my-10" />

      <div className="space-y-8">
        {locale === 'de' ? <GermanPrivacy /> : null}
        {locale === 'en' ? <EnglishPrivacy /> : null}
      </div>
    </section>
  );
}
