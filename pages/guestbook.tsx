import Layout from '@/components/Layout';
import prisma from '@/lib/prisma';
import { Guestbook as GuestbookComponent } from '@/components/Guestbook';
import type { GuestbookData } from '@/lib/types';
import useTranslation from '@/lib/useTranslation';

export default function Guestbook({
  fallbackData,
}: {
  fallbackData: GuestbookData[];
}) {
  const { t } = useTranslation();
  return (
    <Layout>
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {t('guestbook.title')}
        </h1>
        <p className="mb-4 text-gray-600 dark:text-[#c2c2c2]">
          {t('guestbook.description')}
        </p>
        <GuestbookComponent fallbackData={fallbackData} />
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  });

  const fallbackData = entries.map((entry) => ({
    id: entry.id.toString(),
    body: entry.body,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString(),
  }));

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
}
