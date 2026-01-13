'use client';

import styles from '@/styles/mobile-menu.module.css';

import { usePathname, useRouter } from '@/i18n/navigation';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import useDelayedRender from '@/lib/use-delayed-render';

interface Props {
  isMenuOpen: boolean;
  toggle: () => void;
}

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
      href: '/certifications',
      text: t('main.certifications'),
      id: 'mobile-nav-certifications',
      transitionDelay: '225ms',
    },
    {
      href: '/startups',
      text: t('main.startups'),
      id: 'mobile-nav-startups',
      transitionDelay: '250ms',
    },
    {
      href: '/blog',
      text: t('main.books'),
      id: 'mobile-nav-books',
      transitionDelay: '275ms',
    },
  ];

  function go(href: typeof path) {
    if (href !== '/blog/[slug]') {
      router.push(href);
      toggle();
    }
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
                onClick={() => go(link.href as typeof path)}
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
