import { routing } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { headers } from 'next/headers';
import { SignInButtons, UserInfo } from '@/components/guestbook/guestbook-auth';
import { GuestbookForm } from '@/components/guestbook/guestbook-form';
import { Separator } from '@/components/ui/separator';
import {
  GuestbookMessagesFeed,
  GuestbookMessagesSkeleton,
} from '@/components/guestbook/guestbook-messages-feed';
import { Suspense } from 'react';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/guestbook'>): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations('pages.guestbook');
  return { title: t('title') };
}

export default async function Guestbook({
  params,
}: PageProps<'/[locale]/guestbook'>) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [session, t] = await Promise.all([
    auth.api.getSession({
      headers: await headers(),
    }),
    getTranslations('pages.guestbook'),
  ]);
  return (
    <section className="mx-auto max-w-4xl px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mt-2 text-muted-foreground">{t('description')}</p>

      <div className="mt-8 space-y-6">
        {session ? (
          <>
            <UserInfo user={session.user} />
            <GuestbookForm />
          </>
        ) : (
          <SignInButtons />
        )}
      </div>

      <Separator className="my-8" />

      <Suspense fallback={<GuestbookMessagesSkeleton />}>
        <GuestbookMessagesFeed />
      </Suspense>
    </section>
  );
}
