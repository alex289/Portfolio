import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import cn from 'classnames';
import useDelayedRender from 'use-delayed-render';

import useTranslation from '@/lib/useTranslation';

import MenuIcon from './icons/MenuIcon';
import CrossIcon from './icons/CrossIcon';

import styles from 'styles/mobile-menu.module.css';

export default function MobileMenu() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    }
  );

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <button
        id="burger"
        className={cn(styles.burger, 'visible md:hidden')}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}>
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            'absolute mt-4 flex flex-col bg-gray-100 dark:bg-gray-800 md:hidden',
            isMenuRendered && styles.menuRendered
          )}>
          <li
            className={cn(
              'ml-3 border-b border-gray-300 dark:border-gray-700',
              router.asPath === '/' && 'font-semibold'
            )}
            style={{ transitionDelay: '150ms' }}>
            <Link href="/">
              <a
                id="mobile-nav-home"
                className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
                {t('main.home')}
              </a>
            </Link>
          </li>
          <li
            className={cn(
              'ml-3 border-b border-gray-300 dark:border-gray-700',
              router.pathname === '/about' && 'font-semibold'
            )}
            style={{ transitionDelay: '175ms' }}>
            <Link href="/about">
              <a
                id="mobile-nav-about"
                className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
                {t('main.about')}
              </a>
            </Link>
          </li>
          <li
            className={cn(
              'ml-3 border-b border-gray-300 dark:border-gray-700',
              router.pathname === '/projects' && 'font-semibold'
            )}
            style={{ transitionDelay: '200ms' }}>
            <Link href="/projects">
              <a
                id="mobile-nav-projects"
                className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
                {t('main.projects')}
              </a>
            </Link>
          </li>
          <li
            className={cn(
              'ml-3 border-b border-gray-300 dark:border-gray-700',
              router.pathname === '/blog' && 'font-semibold'
            )}
            style={{ transitionDelay: '250ms' }}>
            <Link href="/blog">
              <a
                id="mobile-nav-blog"
                className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
                Blog
              </a>
            </Link>
          </li>
          <li
            className={cn(
              'ml-3 border-b border-gray-300 dark:border-gray-700',
              router.pathname === '/guestbook' && 'font-semibold'
            )}
            style={{ transitionDelay: '275ms' }}>
            <Link href="/guestbook">
              <a
                id="mobile-nav-guestbook"
                className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
                {t('guestbook.title')}
              </a>
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
