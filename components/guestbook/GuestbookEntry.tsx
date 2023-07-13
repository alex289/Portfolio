import { useRouter } from 'next/router';

import { guestbook } from '@prisma/client';
import { useSWRConfig } from 'swr';

type GuestBookEntryProps = {
  t: (key: string) => string;
  entry: guestbook;
  user:
    | {
        isAdmin?: boolean | null | undefined;
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
};

export default function GuestbookEntry({
  t,
  entry,
  user,
}: GuestBookEntryProps) {
  const { mutate } = useSWRConfig();
  const { locale } = useRouter();
  const deleteEntry = async () => {
    await fetch(`/api/guestbook/${entry.id}`, {
      method: 'DELETE',
    });

    mutate('/api/guestbook');
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="prose w-full break-words dark:prose-dark">
        {entry.body}
      </div>
      <div className="flex items-center space-x-3">
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          {entry.created_by}
        </p>
        <span className=" text-gray-600 dark:text-[#c2c2c2]">/</span>
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          {new Date(entry.updated_at).toLocaleDateString(
            locale === 'de' ? 'de-DE' : 'en-US',
            {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            },
          )}
        </p>
        {user && (entry.email === user.email || user.isAdmin) && (
          <>
            <span className="text-gray-600 dark:text-[#c2c2c2]">/</span>
            <button
              className="text-sm text-red-600 dark:text-red-400"
              onClick={deleteEntry}>
              {t('guestbook.delete')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
