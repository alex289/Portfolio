import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Separator } from '@/components/ui/separator';
import type { Metadata } from 'next';
import { Locale } from 'next-intl';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/imprint'>): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('pages.imprint');
  return { title: t('title') };
}

export default async function ImprintPage({
  params,
}: PageProps<'/[locale]/imprint'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('pages.imprint');

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>

      <Separator className="my-10" />

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {t('responsible-title')}
          </h2>
          <div className="mt-3 space-y-1 leading-relaxed text-muted-foreground">
            <p>{t('name')}</p>
            <p>{t('address')}</p>
            <p>{t('email')}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {t('disclaimer-title')}
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {t('disclaimer')}
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight">
            {t('links-title')}
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {t('links')}
          </p>
        </div>
      </div>
    </section>
  );
}
