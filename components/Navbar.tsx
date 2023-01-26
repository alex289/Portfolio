import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';
import cn from 'classnames';
import { useTheme } from 'next-themes';
import { useAtom } from 'jotai';
import { Command, X } from 'lucide-react';

import useTranslation from '@/lib/hooks/useTranslation';

import MobileMenu from '@/components/MobileMenu';
import { isOpenAtom } from '@/components/CommandPalette';

import ThemeToggleIcon from '@/components/icons/ThemeIcon';
import MenuIcon from '@/components/icons/MenuIcon';

import styles from 'styles/mobile-menu.module.css';

type Props = {
  blogTranslation?: string;
};

const Navbar = ({ blogTranslation }: Props): JSX.Element => {
  const [, setCommandPaletteOpen] = useAtom(isOpenAtom);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { t, locale } = useTranslation();

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }

  return (
    <nav className="sticky top-0 z-50 mx-auto my-0 w-full max-w-3xl items-center justify-between px-4 pb-6 pt-1 text-gray-900 dark:text-gray-100 md:my-4 md:flex md:py-4 xl:px-0">
      <div>
        <Link
          href="/"
          id="nav-home"
          className={`invisible mr-1 text-gray-900 sm:mr-4 md:visible ${
            router.asPath === '/'
              ? 'font-semibold dark:text-primary'
              : 'dark:text-gray-100'
          }`}>
          <span className="dark:link-underline link-underline-black py-1">
            {t('main.home')}
          </span>
        </Link>
        <Link
          href="/about"
          id="nav-about"
          className={`invisible m-1 text-gray-900  sm:m-4 md:visible ${
            router.pathname === '/about'
              ? 'font-semibold dark:text-primary'
              : 'dark:text-gray-100'
          }`}>
          <span className="dark:link-underline link-underline-black py-1">
            {t('main.about')}
          </span>
        </Link>
        <Link
          href="/projects"
          id="nav-projects"
          className={`invisible m-1 text-gray-900 sm:m-4 md:visible ${
            router.pathname === '/projects'
              ? 'font-semibold dark:text-primary'
              : 'dark:text-gray-100'
          }`}>
          <span className="dark:link-underline link-underline-black py-1">
            {t('main.projects')}
          </span>
        </Link>
        <Link
          href="/blog"
          id="nav-blog"
          className={`invisible m-1 text-gray-900 sm:m-4 md:visible ${
            router.pathname.includes('blog')
              ? 'font-semibold dark:text-primary'
              : 'dark:text-gray-100'
          }`}>
          <span className="dark:link-underline link-underline-black py-1">
            Blog
          </span>
        </Link>
        <Link
          href="/guestbook"
          id="nav-guestbook"
          className={`m-1 hidden text-gray-900 sm:m-4 md:inline ${
            router.pathname === '/guestbook'
              ? 'font-semibold dark:text-primary'
              : 'dark:text-gray-100'
          }`}>
          <span className="dark:link-underline link-underline-black py-1">
            {t('guestbook.title')}
          </span>
        </Link>
      </div>
      <div className="flex justify-between">
        <button
          id="burger"
          className={cn(
            styles.burger,
            'umami--click--burger-button visible md:hidden'
          )}
          aria-label="Toggle menu"
          type="button"
          onClick={toggleMenu}>
          <MenuIcon data-hide={isMenuOpen} />
          <X
            data-hide={!isMenuOpen}
            className="absolute h-5 w-5 text-gray-900 dark:text-gray-100"
          />
        </button>
        <div>
          <button
            aria-label="Open Command Palette"
            type="button"
            className="umami--click--cmd-button mr-3 h-10 w-10 rounded-lg bg-gray-200 p-3 text-3xl ring-gray-300 hover:ring-4 dark:bg-gray-700"
            onClick={() => setCommandPaletteOpen(true)}>
            <Command className="h-4 w-4 text-gray-800 dark:text-gray-200" />
          </button>
          <button
            id="dark-mode-toggle"
            aria-label="Toggle Dark Mode"
            type="button"
            className="umami--click--theme-button mr-1 h-10 w-10 rounded-lg bg-gray-200 p-3 ring-gray-300 hover:ring-4 dark:bg-gray-700 md:mr-3"
            onClick={() =>
              setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
            }>
            {mounted && <ThemeToggleIcon theme={resolvedTheme} />}
          </button>
          <Link
            href={blogTranslation || router.asPath}
            scroll={false}
            shallow={blogTranslation ? false : true}
            locale={locale === 'de' ? 'en' : 'de'}
            id="switch-lang"
            className="md:dark:link-underline md:link-underline-black mx-3 pb-1 text-lg tracking-wide">
            {locale === 'de' ? 'EN' : 'DE'}
          </Link>
        </div>
      </div>
      <MobileMenu isMenuOpen={isMenuOpen} />
    </nav>
  );
};

export default Navbar;
