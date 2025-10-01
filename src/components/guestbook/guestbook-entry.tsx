'use client';

import { useRouter } from 'next/navigation';

import { User } from '@/lib/auth-client';

interface GuestBookEntryProps {
  entry: {
    id: number;
    email: string;
    body: string;
    created_by: string;
    updated_at: string;
  };
  user: User | undefined;
  locale: string;
  deleteText: string;
}

export default function GuestbookEntry({
  entry,
  user,
  locale,
  deleteText,
}: GuestBookEntryProps) {
  const router = useRouter();
  const deleteEntry = async () => {
    await fetch(`/api/guestbook?id=${entry.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    });

    router.refresh();
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="prose w-full break-words dark:text-gray-200">
        {entry.body}
      </div>
      <div className="flex items-center space-x-3">
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          {entry.created_by}
        </p>
        <span className="text-gray-600 dark:text-[#c2c2c2]">/</span>
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
              className="text-sm text-red-600 dark:text-red-400 cursor-pointer"
              onClick={deleteEntry}>
              {deleteText}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
