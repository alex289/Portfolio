'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { authClient, User } from '@/lib/auth-client';
import { Form } from '@/lib/types';
import GitHubIcon from '../icons/github-icon';
import GoogleIcon from '../icons/google-icon';
import ErrorMessage from './error-message';
import SuccessMessage from './success-message';

import type { FormState } from '@/lib/types';
import type { FormEvent } from 'react';

export default function GuestbookForm({ user }: { user: User | undefined }) {
  const router = useRouter();
  const t = useTranslations();
  const [form, setForm] = useState<FormState>({ state: Form.Initial });
  const inputEl = useRef<HTMLInputElement | null>(null);

  const leaveEntry = async (e: FormEvent) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    if (inputEl.current === null) {
      setForm({ state: Form.Error });
      return;
    }

    if (inputEl.current.value.trim().length === 0) {
      setForm({ state: Form.Error, message: t('guestbook.error') });
      return;
    }

    const res = await fetch('/api/guestbook', {
      body: JSON.stringify({
        value: inputEl.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const { error } = (await res.json()) as { error: string };
    if (error) {
      setForm({
        state: Form.Error,
        message: error,
      });
      return;
    }

    inputEl.current.value = '';
    setForm({
      state: Form.Success,
      message: t('guestbook.success'),
    });

    router.refresh();
  };

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
        {t('guestbook.title')}
      </h1>
      <div className="my-4 w-full rounded-sm border border-blue-200 bg-blue-50 p-6 dark:border-gray-800 dark:bg-blue-opaque">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 md:text-xl">
          {t('guestbook.form.title')}
        </h2>
        <p className="my-1 text-gray-800 dark:text-gray-200">
          {t('guestbook.form.description')}
        </p>
        {!user && (
          <div className="my-1 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="mb-2 mr-2 inline-flex cursor-pointer items-center rounded-lg bg-[#24292F] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#24292F]/90 focus:outline-hidden focus:ring-4 focus:ring-[#24292F]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-gray-500"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: 'github',
                  callbackURL: window.location.pathname,
                });
              }}>
              <GitHubIcon className="-ml-1 mr-2 h-4 w-4" />
              {t('guestbook.login')}GitHub
            </button>
            <button
              type="button"
              className="dark:focus:ring-[#4285F4]/55 cursor-pointer mb-2 mr-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-hidden focus:ring-4 focus:ring-[#4285F4]/50"
              onClick={async () => {
                await authClient.signIn.social({
                  provider: 'google',
                  callbackURL: window.location.pathname,
                });
              }}>
              <GoogleIcon className="-ml-1 mr-2 h-4 w-4" />
              {t('guestbook.login')}Google
            </button>
          </div>
        )}
        {user && (
          <form className="relative my-4" onSubmit={(e) => leaveEntry(e)}>
            <input
              ref={inputEl}
              aria-label="Your message"
              placeholder={t('guestbook.form.input')}
              required
              maxLength={100}
              type="text"
              disabled={form.state === Form.Loading}
              className="mt-1 block w-full rounded-md border border-blue-50 bg-white py-2 pl-4 pr-32 text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-blue-opaque dark:bg-gray-800 dark:text-gray-100"
            />
            <button
              className="absolute cursor-pointer right-1 top-1 flex h-8 w-28 items-center justify-center rounded-sm bg-gray-100 px-4 py-1 font-medium text-gray-900 dark:bg-gray-700 dark:text-gray-100"
              type="submit">
              {form.state === Form.Loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-gray-800 dark:text-gray-200" />
              ) : (
                t('guestbook.form.submit')
              )}
            </button>
            <button
              className="my-3 cursor-pointer flex items-center text-sm text-gray-800 dark:text-gray-200"
              type="button"
              onClick={async () =>
                await authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.refresh();
                    },
                  },
                })
              }>
              <ArrowRight strokeWidth={1.5} height={20} className="ml-1" />{' '}
              {t('guestbook.logout')}
            </button>
          </form>
        )}
        {form.state === Form.Error && (
          <ErrorMessage>{form.message ?? ''}</ErrorMessage>
        )}
        {form.state === Form.Success && (
          <SuccessMessage>{form.message ?? ''}</SuccessMessage>
        )}
        {(form.state === Form.Initial || form.state === Form.Loading) && (
          <p className="text-sm text-gray-800 dark:text-gray-200">
            {t('guestbook.form.info')}
          </p>
        )}
      </div>
    </>
  );
}
