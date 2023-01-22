import { FormEvent, Suspense, useRef, useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { comment } from '@prisma/client';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import useTranslation from '@/lib/hooks/useTranslation';

import ErrorMessage from '@/components/guestbook/ErrorMessage';
import LoadingSpinner from '@/components/guestbook/LoadingSpinner';
import SuccessMessage from '@/components/guestbook/SuccessMessage';

import { Form, type FormState } from '@/lib/types';

const Comment = ({ slug }: { slug: string }) => {
  const { t, locale } = useTranslation();
  const { data: session } = useSession();

  const inputEl = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState<FormState>({ state: Form.Initial });

  const { data: entries, mutate } = useSWR<comment[]>(
    `/api/comment?post=${slug}`,
    fetcher
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    if (inputEl === null || inputEl.current === null) {
      setForm({ state: Form.Error });
      return;
    }

    if (inputEl.current.value.trim().length === 0) {
      setForm({ state: Form.Error, message: t('comment.error') });
      return;
    }

    const res = await fetch('/api/comment?slug=' + slug, {
      body: JSON.stringify({
        body: inputEl.current.value,
        slug,
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
      message: t('comment.success'),
    });
  };

  const deleteEntry = async (entryId: number) => {
    await fetch(`/api/comment/${entryId}`, {
      method: 'DELETE',
    });

    mutate();
  };

  return (
    <div className="mt-10 w-full pt-4">
      <p className="mb-2 text-xl font-semibold">{t('comment.title')}</p>
      <form onSubmit={onSubmit} className="relative">
        {session && (
          <>
            <input
              aria-label={t('comment.form.placeholder')}
              placeholder={t('comment.form.placeholder')}
              ref={inputEl}
              required
              disabled={!session}
              type="text"
              className="mt-1 block w-full rounded-md border border-blue-50 bg-gray-200 py-2 pl-4 pr-32 text-gray-900 focus:border-primary focus:ring-primary dark:border-blue-opaque dark:bg-gray-700 dark:text-gray-100"
            />
            <button
              className="absolute right-1 top-1 flex h-8 w-28 items-center justify-center rounded bg-gray-100 px-4 py-1 font-medium text-gray-900 dark:bg-gray-600 dark:text-gray-100"
              disabled={!session}
              type="submit">
              {form.state === Form.Loading ? (
                <LoadingSpinner />
              ) : (
                t('comment.form.submit')
              )}
            </button>
            <div className="mt-1">
              {form.state === Form.Error ? (
                <ErrorMessage>{form.message as string}</ErrorMessage>
              ) : form.state === Form.Success ? (
                <SuccessMessage>{form.message as string}</SuccessMessage>
              ) : null}
            </div>
            <div className="mt-1 ml-1">
              <button
                type="button"
                onClick={() => signOut()}
                className="mt-2 mr-2 h-8 w-28 rounded bg-gray-200 px-4 py-1 font-bold text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                {t('comment.logout')}
              </button>
              {t('logged-in-as')} {session.user?.name} ({session.user?.email})
            </div>
          </>
        )}
        {!session && (
          <div className="my-1 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="mr-2 mb-2 inline-flex items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-none focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
              onClick={() => {
                signIn('github');
              }}>
              <svg
                className="mr-2 -ml-1 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="github"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512">
                <path
                  fill="currentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
              </svg>
              {t('guestbook.login')}GitHub
            </button>
            <button
              type="button"
              className="dark:focus:ring-[#4285F4]/55 mr-2 mb-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50"
              onClick={() => {
                signIn('google');
              }}>
              <svg
                className="mr-2 -ml-1 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512">
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
              </svg>
              {t('guestbook.login')}Google
            </button>
          </div>
        )}
      </form>
      <div className="mt-4 space-y-8">
        <Suspense>
          {entries &&
            entries.length > 0 &&
            entries.map((entry) => (
              <div
                className="flex flex-col space-y-2"
                key={entry.id.toString()}>
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
                      }
                    )}
                  </p>
                  {session?.user &&
                    (entry.email === session?.user?.email ||
                      session.user.isAdmin) && (
                      <>
                        <span className="text-gray-600 dark:text-[#c2c2c2]">
                          /
                        </span>
                        <button
                          className="text-sm text-red-600 dark:text-red-400"
                          onClick={() => deleteEntry(entry.id)}>
                          {t('guestbook.delete')}
                        </button>
                      </>
                    )}
                </div>
              </div>
            ))}
          {entries && entries.length === 0 && <p>{t('comment.no-comment')}</p>}
        </Suspense>
      </div>
    </div>
  );
};

export default Comment;
