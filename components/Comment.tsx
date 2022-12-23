import { FormEvent, Suspense, useRef, useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import { comment } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import deLocale from 'date-fns/locale/de';
import enLocale from 'date-fns/locale/en-US';
import useSWR from 'swr';

import fetcher from '@/lib/fetcher';
import useTranslation from '@/lib/useTranslation';

import ErrorMessage from '@/components/guestbook/ErrorMessage';
import LoadingSpinner from '@/components/guestbook/LoadingSpinner';
import SuccessMessage from '@/components/guestbook/SuccessMessage';

import { Form, FormState } from '@/lib/types';

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
          <div className="flex gap-3">
            <button
              className="my-4 flex h-8 w-32 items-center justify-center rounded bg-gray-200 font-bold text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              onClick={() => {
                signIn('github');
              }}>
              {t('guestbook.login')}
              <svg
                className="ml-2 h-5 w-5 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </button>
            <button
              className="my-4 flex h-8 w-32 items-center justify-center rounded bg-gray-200 font-bold text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              onClick={() => {
                signIn('google');
              }}>
              {t('guestbook.login')}
              <svg
                className="ml-2 h-4 w-4 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <title>Google</title>
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
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
                    {formatDistanceToNow(new Date(entry.updated_at), {
                      addSuffix: true,
                      locale: locale === 'de' ? deLocale : enLocale,
                    })}
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
