import { getTranslator } from 'next-intl/server';
import { getServerSession } from 'next-auth';

import { queryBuilder } from '@/lib/db';

import GuestbookForm from '@/components/guestbook/guestbook-form';
import GuestbookEntry from '@/components/guestbook/guestbook-entry';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

import type { Metadata } from 'next/types';

type GuestbookProps = {
  params: {
    locale: string;
  };
};

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

export async function generateMetadata({
  params: { locale },
}: GuestbookProps): Promise<Metadata> {
  const t = await getTranslator(locale);
  return {
    title: t('guestbook.title'),
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

const GuestbookPage = async ({ params: { locale } }: GuestbookProps) => {
  const [entries, session, t] = await Promise.all([
    getGuestbook(),
    getServerSession(authOptions),
    getTranslator(locale, 'guestbook'),
  ]);

  return (
    <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        {t('title')}
      </h1>
      <p className="mb-3 text-gray-600 dark:text-[#c2c2c2]">
        {t('description')}
      </p>

      <GuestbookForm session={session} />
      <div className="mt-4 space-y-8">
        {entries &&
          entries.map((entry) => (
            <GuestbookEntry
              key={entry.id.toString()}
              entry={entry}
              session={session}
              locale={locale}
              deleteText={t('delete')}
            />
          ))}
      </div>
    </div>
  );
};

export default GuestbookPage;
