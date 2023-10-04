'use client';

import { useEffect } from 'react';

import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

import useDelayedRender from '@/lib/use-delayed-render';
import { usePathname, useRouter } from '@/lib/navigation';

import styles from '@/styles/mobile-menu.module.css';

type Props = {
  isMenuOpen: boolean;
  toggle: () => void;
};

export default function MobileMenu({ isMenuOpen, toggle }: Props) {
  const path = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    },
  );

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  const NavLinks = [
    {
      href: '/',
      text: t('main.home'),
      id: 'mobile-nav-home',
      transitionDelay: '150ms',
    },
    {
      href: '/about',
      text: t('main.about'),
      id: 'mobile-nav-about',
      transitionDelay: '175ms',
    },
    {
      href: '/projects',
      text: t('main.projects'),
      id: 'mobile-nav-projects',
      transitionDelay: '200ms',
    },
    {
      href: '/blog',
      text: 'Blog',
      id: 'mobile-nav-blog',
      transitionDelay: '250ms',
    },
    {
      href: '/guestbook',
      text: t('guestbook.title'),
      id: 'mobile-nav-guestbook',
      transitionDelay: '275ms',
    },
  ];

  function go(href: string) {
    router.push(href, {
      scroll: true,
    });
    toggle();
  }

  return (
    <>
      {isMenuMounted && (
        <ul
          className={clsx(
            styles.menu,
            'mt-4 md:hidden',
            isMenuRendered && styles.menuRendered,
          )}>
          {NavLinks.map((link) => (
            <li
              key={link.id}
              className={clsx(
                'ml-3 cursor-pointer border-b border-gray-300 dark:border-gray-700',
                path === link.href && 'font-semibold dark:text-indigo-500',
              )}
              style={{ transitionDelay: link.transitionDelay }}>
              <div
                onClick={() => go(link.href)}
                id={link.id}
                className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
                {link.text}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
