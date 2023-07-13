import { useState, useRef, Suspense, FormEvent } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import useTranslation from '@/lib/hooks/useTranslation';

import GuestbookEntry from '@/components/guestbook/GuestbookEntry';
import SuccessMessage from '@/components/guestbook/SuccessMessage';
import ErrorMessage from '@/components/guestbook/ErrorMessage';
import GoogleIcon from '@/components/icons/GoogleIcon';
import GitHubIcon from '@/components/icons/GitHubIcon';

import { Form, type FormState } from '@/lib/types';
import type { guestbook } from '@prisma/client';

export default function Guestbook({
  fallbackData,
}: {
  fallbackData: guestbook[];
}) {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef<HTMLInputElement | null>(null);
  const { data: entries, mutate } = useSWR<guestbook[]>(
    '/api/guestbook',
    fetcher,
    {
      fallbackData,
    },
  );

  const leaveEntry = async (e: FormEvent) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    if (inputEl === null || inputEl.current === null) {
      setForm({ state: Form.Error });
      return;
    }

    if (inputEl.current.value.trim().length === 0) {
      setForm({ state: Form.Error, message: t('guestbook.error') });
      return;
    }

    const res = await fetch('/api/guestbook', {
      body: JSON.stringify({
        body: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    inputEl.current.value = '';
    mutate();
    setForm({
      state: Form.Success,
      message: t('guestbook.success'),
    });
  };

  return (
    <>
      {session?.user && (
        <p className="text-sm text-gray-600 dark:text-[#c2c2c2]">
          {t('guestbook.logged-in-as')} {session?.user?.email} (
          <button onClick={() => signOut()} className="underline">
            {t('guestbook.logout')}
          </button>
          )
        </p>
      )}
      <div className="my-4 w-full rounded border border-blue-200 bg-blue-50 p-6 dark:border-gray-800 dark:bg-blue-opaque">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 md:text-xl">
          {t('guestbook.form.title')}
        </h2>
        <p className="my-1 text-gray-800 dark:text-gray-200">
          {t('guestbook.form.description')}
        </p>
        {!session && (
          <div className="my-1 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="mb-2 mr-2 inline-flex items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
              onClick={() => {
                signIn('github');
              }}>
              <GitHubIcon className="-ml-1 mr-2 h-4 w-4" />
              {t('guestbook.login')}GitHub
            </button>
            <button
              type="button"
              className="dark:focus:ring-[#4285F4]/55 mb-2 mr-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
              onClick={() => {
                signIn('google');
              }}>
              <GoogleIcon className="-ml-1 mr-2 h-4 w-4" />
              {t('guestbook.login')}Google
            </button>
          </div>
        )}
        {session?.user && (
          <form className="relative my-4" onSubmit={leaveEntry}>
            <input
              ref={inputEl}
              aria-label="Your message"
              placeholder={t('guestbook.form.input')}
              required
              maxLength={100}
              type="text"
              className="mt-1 block w-full rounded-md border border-blue-50 bg-white py-2 pl-4 pr-32 text-gray-900 focus:border-primary focus:ring-primary dark:border-blue-opaque dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              className="absolute right-1 top-1 flex h-8 w-28 items-center justify-center rounded bg-gray-100 px-4 py-1 font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              type="submit">
              {form.state === Form.Loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-800 dark:text-gray-200" />
              ) : (
                t('guestbook.form.submit')
              )}
            </button>
          </form>
        )}
        {form.state === Form.Error ? (
          <ErrorMessage>{form.message as string}</ErrorMessage>
        ) : form.state === Form.Success ? (
          <SuccessMessage>{form.message as string}</SuccessMessage>
        ) : (
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {t('guestbook.form.info')}
          </p>
        )}
      </div>
      <div className="mt-4 space-y-8">
        <Suspense>
          {entries &&
            entries.map((entry) => (
              <GuestbookEntry
                key={entry.id.toString()}
                t={t}
                entry={entry}
                user={session?.user}
              />
            ))}
        </Suspense>
      </div>
    </>
  );
}
