'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('pages.error');

  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="text-6xl font-bold tracking-tight">500</h1>
      <h2 className="mt-4 text-2xl font-semibold">{t('title')}</h2>
      <p className="mt-2 max-w-md text-muted-foreground">{t('description')}</p>
      <Button variant="outline" className="mt-8" onClick={reset}>
        {t('retry')}
      </Button>
    </section>
  );
}
