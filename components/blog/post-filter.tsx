import { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import { Filter } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

type Props = {
  filterBy: 'name' | 'tag';
  setFilter: (filter: 'name' | 'tag') => void;
};

export default function PostFilter({ filterBy, setFilter }: Props) {
  const t = useTranslations();
  return (
    <Menu as="div" className="absolute right-12 top-3 h-5 w-5">
      <Menu.Button>
        <Filter
          strokeWidth={1.5}
          className="h-5 w-5 cursor-pointer text-gray-400 dark:text-gray-300"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-800 dark:bg-gray-700">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setFilter('name')}
                  className={clsx(
                    active
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-900 dark:bg-gray-700 dark:text-gray-100',
                    filterBy === 'name' && 'font-bold',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  )}>
                  {t('blog.filter.by-name')}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setFilter('tag')}
                  className={clsx(
                    active
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-900 dark:bg-gray-700 dark:text-gray-100',
                    filterBy === 'tag' && 'font-bold',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm',
                  )}>
                  {t('blog.filter.by-tag')}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
