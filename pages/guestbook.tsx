import { prisma } from '@/lib/prisma';
import useTranslation from '@/lib/useTranslation';

import Layout from '@/components/Layout';
import { Guestbook as GuestbookComponent } from '@/components/Guestbook';

import type { GetStaticProps, NextPage } from 'next';
import type { guestbook } from '@prisma/client';

const Guestbook: NextPage<{
  fallbackData: guestbook[];
}> = ({ fallbackData }) => {
  const { t } = useTranslation();
  return (
    <Layout title={t('guestbook.title') + ' - Alexander Konietzko'}>
      <div className="mx-auto mb-16 flex w-full max-w-3xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {t('guestbook.title')}
        </h1>
        <p className="mb-3 text-gray-600 dark:text-[#c2c2c2]">
          {t('guestbook.description')}
        </p>
        <GuestbookComponent fallbackData={fallbackData} />
      </div>
    </Layout>
  );
};

export default Guestbook;

export const getStaticProps: GetStaticProps = async () => {
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
  };
};
