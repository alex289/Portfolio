'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { clsx } from 'clsx';
import {
  BarChart3,
  Book,
  Code2,
  Edit,
  Fingerprint,
  Folder,
  Home,
  Link,
  Moon,
  Power,
  Sun,
  User,
} from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useMemo, useState } from 'react';

import { useUrlState } from '@/lib/use-url-state';

import type { Session } from 'next-auth';

enum Actions {
  Router,
  Language,
  Theme,
  Session,
}

export default function CommandPalette({
  session,
}: {
  session: Session | null;
}) {
  const t = useTranslations();
  const [isOpen, setIsOpen] = useUrlState<boolean>('menu');
  const [search, setSearch] = useState('');
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const config = useMemo(() => {
    return [
      {
        group: 'Navigation',
        title: t('main.home'),
        action: Actions.Router,
        args: '/',
        icon: <Home strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />,
      },
      {
        title: t('main.about'),
        action: Actions.Router,
        args: '/about',
        icon: (
          <Fingerprint
            strokeWidth={1.5}
            className="mr-2 mt-[0.12rem] h-5 w-5"
          />
        ),
      },
      {
        title: t('main.projects'),
        action: Actions.Router,
        args: '/projects',
        icon: (
          <Folder strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
        ),
      },
      {
        title: 'Blog',
        action: Actions.Router,
        args: '/blog',
        icon: <Book strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />,
      },
      {
        title: t('guestbook.title'),
        action: Actions.Router,
        args: '/guestbook',
        icon: <Edit strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />,
      },
      {
        title: 'Dashboard',
        action: Actions.Router,
        args: '/dashboard',
        disabled: !session?.user.isAdmin,
        icon: (
          <BarChart3 strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
        ),
      },
      {
        group: t('command-palette.socials'),
        title: 'GitHub',
        action: Actions.Router,
        args: 'https://github.com/Daniel21b',
        icon: <Link strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />,
      },
      {
        title: t('footer.sourcecode'),
        action: Actions.Router,
        args: 'https://github.com/Daniel21b/portfolio',
        icon: <Code2 strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />,
      },
      {
        group: t('command-palette.settings'),
        title: t('command-palette.switch-theme'),
        action: Actions.Theme,
        args: '',
        icon:
          theme === 'light' ? (
            <Moon strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
          ) : (
            <Sun strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />
          ),
      },
      {
        title: 'Login (Google)',
        action: Actions.Session,
        args: 'google',
        disabled: session ? true : false,
        icon: <User strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />,
      },
      {
        title: 'Login (GitHub)',
        action: Actions.Session,
        args: 'github',
        disabled: session ? true : false,
        icon: <User strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />,
      },
      {
        title: `Logout (${session?.user.name})`,
        action: Actions.Session,
        args: '',
        disabled: session ? false : true,
        icon: <Power strokeWidth={1.5} className="mr-2 mt-[0.12rem] h-5 w-5" />,
      },
    ];
  }, [session, t, theme]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
        (event.code === 'scape' && isOpen)
      ) {
        event.preventDefault();

        setIsOpen(!isOpen);
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, setIsOpen]);

  const filteredItems = useMemo(() => {
    return config.filter(({ title }) =>
      title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, config]);

  function handleChange(value: string | null) {
    if (!value || value === '') {
      setSearch('');
      return;
    }

    setIsOpen(false);
    setSearch('');

    const action = Number(value[0]) as Actions;
    const valuePath = value.slice(2) as typeof pathname;

    const url = new URL(window.location.href);
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    url.searchParams.delete('menu');

    switch (action) {
      case Actions.Router:
        if (valuePath !== '/blog/[slug]') {
          router.push(valuePath);
        }
        break;
      case Actions.Theme:
        setTheme(theme === 'light' ? 'dark' : 'light');
        break;
      case Actions.Session:
        if (value.slice(2) === '') {
          void signOut({ callbackUrl: url.toString() });
        } else {
          void signIn(value.slice(2), { callbackUrl: url.toString() });
        }
        break;
    }
  }

  return (
    <Transition show={isOpen ? isOpen === 'true' : false} appear>
      <Dialog
        as="div"
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]">
        <TransitionChild
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div
            className="fixed inset-0 bg-zinc-900/75"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />
        </TransitionChild>
        <TransitionChild
          as="div"
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95">
          <Combobox
            as="div"
            value=""
            onChange={handleChange}
            className={clsx(
              'relative mx-auto max-w-xl overflow-hidden rounded-xl shadow-2xl',
              'divide-y divide-gray-200 bg-gray-50 ring-1 ring-black/5 dark:divide-gray-700 dark:bg-gray-800',
            )}>
            <div className="flex items-center px-4">
              <ComboboxInput
                onChange={(event) => setSearch(event.target.value)}
                autoFocus
                className={clsx(
                  'h-12 w-full border-0 bg-transparent text-gray-800 dark:text-gray-400',
                  'placeholder-gray-400 focus:ring-0',
                )}
                autoComplete="false"
                placeholder="Search..."
              />
            </div>
            <ComboboxOptions
              static
              className="empty:hidden max-h-96 overflow-y-auto pb-4">
              {filteredItems.map((page) => (
                <div key={page.title}>
                  {page.group && (
                    <div className="m-2 ml-3 text-xs text-gray-500 dark:text-gray-400">
                      {page.group}
                    </div>
                  )}
                  {!page.disabled && (
                    <ComboboxOption
                      value={`${page.action}:${page.args}`}
                      className={clsx(
                        'cursor-pointer px-4 py-2 sm:border-l-2',
                        'data-focus:border-l-indigo-500 dark:data-focus:border-l-indigo-500 sm:data-focus:bg-gray-200 sm:dark:data-focus:bg-gray-700',
                        'border-gray-50 bg-gray-50 dark:border-gray-800 dark:bg-gray-800',
                      )}>
                      <div className="flex flex-row pl-1 text-gray-500 dark:text-gray-400">
                        <div className="flex">
                          {page.icon}
                          {page.title}
                        </div>
                      </div>
                    </ComboboxOption>
                  )}
                </div>
              ))}
              {search && filteredItems.length === 0 && (
                <p className="p-4 text-sm text-gray-500">
                  {t('command-palette.no-results')}
                </p>
              )}
            </ComboboxOptions>
          </Combobox>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
