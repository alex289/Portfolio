import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('pages.not-found');

  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">{t('title')}</h2>
      <p className="mt-2 max-w-md text-muted-foreground">{t('description')}</p>
      <Link href="/">
        <Button variant="outline" className="mt-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('back-home')}
        </Button>
      </Link>
    </section>
  );
}
