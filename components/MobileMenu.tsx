import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import cn from 'classnames';

import useTranslation from '@/lib/hooks/useTranslation';

import styles from '@/styles/mobile-menu.module.css';
import useDelayedRender from '@/lib/hooks/useDelayedRender';

type Props = {
  isMenuOpen: boolean;
};

export default function MobileMenu({ isMenuOpen }: Props) {
  const router = useRouter();
  const { t } = useTranslation();
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    }
  );

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            'mt-4 md:hidden',
            isMenuRendered && styles.menuRendered
          )}>
          <li
            className={cn(
              'ml-3 border-b border-gray-300 dark:border-gray-700',
              router.asPath === '/' && 'font-semibold dark:text-primary'
            )}
            style={{ transitionDelay: '150ms' }}>
            <Link
              href="/"
              id="mobile-nav-home"
              className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
              {t('main.home')}
            </Link>
          </li>
          <li
            className={cn(
              'ml-3 border-b border-gray-300 dark:border-gray-700',
              router.pathname === '/about' && 'font-semibold dark:text-primary'
            )}
            style={{ transitionDelay: '175ms' }}>
            <Link
              href="/about"
              id="mobile-nav-about"
              className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
              {t('main.about')}
            </Link>
          </li>
          <li
            className={cn(
              'ml-3 border-b border-gray-300 dark:border-gray-700',
              router.pathname === '/projects' &&
                'font-semibold dark:text-primary'
            )}
            style={{ transitionDelay: '200ms' }}>
            <Link
              href="/projects"
              id="mobile-nav-projects"
              className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
              {t('main.projects')}
            </Link>
          </li>
          <li
            className={cn(
              'ml-3 border-b border-gray-300 dark:border-gray-700',
              router.pathname.includes('blog') &&
                'font-semibold dark:text-primary'
            )}
            style={{ transitionDelay: '250ms' }}>
            <Link
              href="/blog"
              id="mobile-nav-blog"
              className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
              Blog
            </Link>
          </li>
          <li
            className={cn(
              'ml-3 border-b border-gray-300 dark:border-gray-700',
              router.pathname === '/guestbook' &&
                'font-semibold dark:text-primary'
            )}
            style={{ transitionDelay: '275ms' }}>
            <Link
              href="/guestbook"
              id="mobile-nav-guestbook"
              className="ml-4 flex w-auto p-1 pb-4 text-lg sm:p-4">
              {t('guestbook.title')}
            </Link>
          </li>
        </ul>
      )}
    </>
  );
}
