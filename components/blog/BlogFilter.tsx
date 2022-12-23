import { Fragment } from 'react';

import { Menu, Transition } from '@headlessui/react';
import cn from 'classnames';

import useTranslation from '@/lib/hooks/useTranslation';

type Props = {
  filterBy: 'name' | 'tag';
  setFilter: (filter: 'name' | 'tag') => void;
};

export default function BlogFilter({ filterBy, setFilter }: Props) {
  const { t } = useTranslation();
  return (
    <Menu as="div" className="absolute right-12 top-3 h-5 w-5">
      <Menu.Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 cursor-pointer text-gray-400 dark:text-gray-300">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
          />
        </svg>
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
                  className={cn(
                    active
                      ? 'bg-primary text-white'
                      : 'text-gray-900 dark:bg-gray-700 dark:text-gray-100',
                    filterBy === 'name' && 'font-bold',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm'
                  )}>
                  {t('blog.filter.by-name')}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setFilter('tag')}
                  className={cn(
                    active
                      ? 'bg-primary text-white'
                      : 'text-gray-900 dark:bg-gray-700 dark:text-gray-100',
                    filterBy === 'tag' && 'font-bold',
                    'group flex w-full items-center rounded-md px-2 py-2 text-sm'
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
