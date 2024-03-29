import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

import env from '@/env.mjs';
import GuestbookEntry from '@/components/guestbook/guestbook-entry';
import GuestbookForm from '@/components/guestbook/guestbook-form';
import { auth } from '@/lib/auth';
import { queryBuilder } from '@/lib/db';

import type { Metadata } from 'next/types';

interface GuestbookProps {
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

export async function generateMetadata({
  params: { locale },
}: GuestbookProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'guestbook' });
  return {
    title: t('title'),
    openGraph: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('title')}`],
    },
    twitter: {
      images: [`${env.NEXT_PUBLIC_WEBSITE_URL}/api/og?title=${t('title')}`],
    },
  };
}

async function getGuestbook() {
  const data = await queryBuilder
    .selectFrom('guestbook')
    .select(['id', 'body', 'email', 'created_by', 'updated_at'])
    .orderBy('updated_at', 'desc')
    .limit(100)
    .execute();

  return data.map((entry) => {
    return { ...entry, updated_at: entry.updated_at.toISOString() };
  });
}

const GuestbookPage = ({ params: { locale } }: GuestbookProps) => {
  return (
    <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
      <Suspense>
        <GuestbookFormWrapper />
        <GuestbookEntries locale={locale} />
      </Suspense>
    </div>
  );
};

async function GuestbookEntries({ locale }: { locale: string }) {
  const [entries, session, t] = await Promise.all([
    getGuestbook(),
    auth(),
    getTranslations({ locale, namespace: 'guestbook' }),
  ]);

  return (
    <div className="mt-4 space-y-8">
      {entries?.map((entry) => (
        <GuestbookEntry
          key={entry.id.toString()}
          entry={entry}
          session={session}
          locale={locale}
          deleteText={t('delete')}
        />
      ))}
    </div>
  );
}

async function GuestbookFormWrapper() {
  const session = await auth();
  return <GuestbookForm session={session} />;
}

export default GuestbookPage;
