import { Fragment, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { Combobox, Dialog, Transition } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { atom, useAtom } from 'jotai';
import cn from 'classnames';

export const isOpenAtom = atom(false);
export const isCommandPaletteOpenAtom = atom((get) => get(isOpenAtom));

enum Actions {
  Router,
  Language,
  Theme,
}

const config = [
  {
    group: 'Navigation',
    title: 'Home',
    icon: null,
    action: Actions.Router,
    args: '/',
  },
  {
    title: 'About',
    icon: null,
    action: Actions.Router,
    args: '/about',
  },
  {
    title: 'Projects',
    icon: null,
    action: Actions.Router,
    args: '/projects',
  },
  {
    title: 'Blog',
    icon: null,
    action: Actions.Router,
    args: '/blog',
  },
  {
    title: 'Guestbook',
    icon: null,
    action: Actions.Router,
    args: '/guestbook',
  },
  {
    group: 'Socials',
    title: 'GitHub',
    icon: null,
    action: Actions.Router,
    args: 'https://github.com/alex289',
  },
  {
    title: 'Source Code',
    icon: null,
    action: Actions.Router,
    args: 'https://github.com/alex289/Portfolio',
  },
  {
    group: 'Settings',
    title: 'Change language',
    icon: null,
    action: Actions.Language,
    args: '',
  },
  {
    title: 'Switch theme',
    icon: null,
    action: Actions.Theme,
    args: '',
  },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [search, setSearch] = useState('');
  const { theme, setTheme } = useTheme();
  const router = useRouter();

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
    return config.filter(({ title }) => title.toLowerCase().includes(search));
  }, [search]);

  function handleChange(value: string) {
    setIsOpen(false);

    const action = Number(value[0]) as Actions;
    switch (action) {
      case Actions.Router:
        router.push(value.slice(2));
        break;
      case Actions.Language:
        router.replace(router.pathname, router.asPath, {
          locale: router.locale === 'de' ? 'en' : 'de',
          shallow: true,
        });
        break;
      case Actions.Theme:
        setTheme(theme === 'light' ? 'dark' : 'light');
        break;
    }
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        onClose={() => setIsOpen(false)}
        className={cn('fixed inset-0 overflow-y-auto p-4 pt-[25vh]')}>
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Dialog.Overlay className="fixed inset-0 bg-zinc-900/75" />
        </Transition.Child>
        <Transition.Child
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
            className={cn(
              'relative mx-auto max-w-xl overflow-hidden rounded-xl shadow-2xl',
              'divide-y divide-gray-200 bg-gray-50 ring-1 ring-black/5 dark:divide-gray-700 dark:bg-gray-800'
            )}>
            <div className="flex items-center px-4">
              <Combobox.Input
                onChange={(e) => setSearch(e.target.value)}
                className={cn(
                  'h-12 w-full border-0 bg-transparent text-gray-800 dark:text-gray-400',
                  'placeholder-gray-400 focus:ring-0'
                )}
                autoComplete="false"
                placeholder="Search..."
              />
            </div>
            <Combobox.Options static className="max-h-96 overflow-y-auto pb-4">
              {filteredItems.map((page) => (
                <div key={page.title}>
                  {page.group && (
                    <div className="m-2 ml-3 text-xs text-gray-500 dark:text-gray-400">
                      {page.group}
                    </div>
                  )}
                  <Combobox.Option value={`${page.action}:${page.args}`}>
                    {({ active }) => (
                      <div
                        className={cn(
                          'px-4 py-2',
                          active ? 'bg-primary' : 'bg-gray-50 dark:bg-gray-800'
                        )}>
                        <p
                          className={cn(
                            'flex flex-row pl-2',
                            active
                              ? 'text-white'
                              : 'text-gray-500 dark:text-gray-400'
                          )}>
                          {page.icon}
                          {page.title}
                        </p>
                      </div>
                    )}
                  </Combobox.Option>
                </div>
              ))}
              {search && filteredItems.length === 0 && (
                <p className="p-4 text-sm text-gray-500">No results</p>
              )}
            </Combobox.Options>
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
