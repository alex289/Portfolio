import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import useTranslation from '@/lib/useTranslation';

import MenuIcon from '@/components/icons/menu-icon';
import CrossIcon from '@/components/icons/cross-icon';

const MobileMenu = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  function scrollTo(event: { preventDefault: () => void }, anchor: string) {
    event && event.preventDefault();
    router.push('/#' + anchor);

    setIsMenuOpen(false);
  }

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(true);
    }
  }

  return (
    <>
      <button
        id="burger"
        className="visible burger md:hidden"
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}>
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>

      <ul
        className={`menu flex flex-col absolute bg-gray-50 dark:bg-gray-800 mt-4 md:hidden ${
          isMenuOpen ? 'menuRendered' : ''
        }`}>
        <li
          className="ml-3 border-b border-gray-300 dark:border-gray-700"
          style={{ transitionDelay: '150ms' }}>
          <Link href="/">
            <a
              id="mobile-nav-home"
              onClick={() => setIsMenuOpen(false)}
              className="flex w-auto p-1 pb-4 ml-4 text-lg text-gray-900 sm:p-4 dark:text-gray-100">
              {t('main.home')}
            </a>
          </Link>
        </li>
        <li
          className="ml-3 border-b border-gray-300 dark:border-gray-700"
          style={{ transitionDelay: '150ms' }}>
          <Link href="/">
            <a
              id="mobile-nav-about"
              onClick={(event) => scrollTo(event, 'main.about')}
              className="flex w-auto p-1 pb-4 ml-4 text-lg text-gray-900 sm:p-4 dark:text-gray-100">
              {t('main.about')}
            </a>
          </Link>
        </li>
        <li
          className="ml-3 border-b border-gray-300 dark:border-gray-700"
          style={{ transitionDelay: '150ms' }}>
          <Link href="/">
            <a
              id="mobile-nav-projects"
              onClick={(event) => scrollTo(event, 'main.projects')}
              className="flex w-auto p-1 pb-4 ml-4 text-lg text-gray-900 sm:p-4 dark:text-gray-100">
              {t('main.projects')}
            </a>
          </Link>
        </li>
        <li
          className="ml-3 border-b border-gray-300 dark:border-gray-700"
          style={{ transitionDelay: '150ms' }}>
          <Link href="/blog">
            <a
              id="mobile-nav-blog"
              className="flex w-auto p-1 pb-4 ml-4 text-lg text-gray-900 sm:p-4 dark:text-gray-100">
              Blog
            </a>
          </Link>
        </li>
        <li
          className="ml-3 border-b border-gray-300 dark:border-gray-700"
          style={{ transitionDelay: '150ms' }}>
          <Link href="/guestbook">
            <a
              id="mobile-nav-guestbook"
              className="flex w-auto p-1 pb-4 ml-4 text-lg text-gray-900 sm:p-4 dark:text-gray-100">
              {t('guestbook.title')}
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MobileMenu;
