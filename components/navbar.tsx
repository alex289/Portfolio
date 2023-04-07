'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next-intl/client';
import { useTheme } from '@wits/next-themes';
import { Command, X } from 'lucide-react';
import { allBlogs } from 'contentlayer/generated';
import clsx from 'clsx';

import ThemeToggleIcon from './icons/theme-icon';
import MobileMenu from './mobile-menu';
import styles from '@/styles/mobile-menu.module.css';
import MenuIcon from './icons/menu-icon';

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const path = usePathname();

  const getTranslationPath = () => {
    const nextLocale = locale === 'de' ? 'en' : 'de';
    if (path?.includes('/blog/')) {
      const slug = path.substring(path.lastIndexOf('/') + 1);
      const post = allBlogs.find((post) => post.slug === slug);
      return `/${nextLocale}/blog/${post?.translation}`;
    }
    return `/${nextLocale}${path}`;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const NavLinks = [
    {
      href: '/',
      text: t('main.home'),
      id: 'nav-home',
    },
    {
      href: '/about',
      text: t('main.about'),
      id: 'nav-about',
    },
    {
      href: '/projects',
      text: t('main.projects'),
      id: 'nav-projects',
    },
    {
      href: '/blog',
      text: 'Blog',
      id: 'nav-blog',
    },
    {
      href: '/guestbook',
      text: t('guestbook.title'),
      id: 'nav-guestbook',
    },
  ];

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
    <div className="sticky top-0 z-50 bg-gray-50 bg-opacity-50 backdrop-blur-lg backdrop-saturate-150 dark:bg-gray-800 dark:bg-opacity-60">
      <nav
        className={clsx(
          'sticky top-0 z-50 mx-auto my-0 w-full max-w-3xl items-center justify-between px-4 pb-6 pt-1 text-gray-900 dark:text-gray-100 md:my-4 md:flex md:py-4 xl:px-0'
        )}>
        <div>
          {NavLinks.map(({ href, text, id }) => (
            <Link
              key={id}
              href={`/${locale}${href}`}
              id={id}
              className={clsx(
                'invisible mr-1 text-gray-900 sm:mr-8 md:visible',
                href === path || (path?.startsWith('/blog') && href === '/blog')
                  ? 'font-semibold dark:text-indigo-500'
                  : 'dark:text-gray-100'
              )}>
              <span className="dark:link-underline link-underline-black py-1">
                {text}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            id="burger"
            className={clsx(
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
              className="umami--click--cmd-button mr-3 h-10 w-10 rounded-lg bg-gray-200 p-3 text-3xl ring-gray-300 hover:ring-4 dark:bg-gray-700">
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
              href={getTranslationPath()}
              scroll={false}
              shallow
              locale={locale === 'de' ? 'en' : 'de'}
              id="switch-lang"
              className="md:dark:link-underline md:link-underline-black mx-3 pb-1 text-lg tracking-wide">
              {locale === 'de' ? 'EN' : 'DE'}
            </Link>
          </div>
        </div>
      </nav>
      <MobileMenu isMenuOpen={isMenuOpen} toggle={toggleMenu} />
    </div>
  );
};

export default Navbar;
