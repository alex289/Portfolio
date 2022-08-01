import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import Link from 'next/link';

import { useTheme } from 'next-themes';

import useTranslation from '@/lib/useTranslation';
import MobileMenu from '@/components/MobileMenu';
import ThemeToggleIcon from '@/components/icons/ThemeIcon';

type Props = {
  blogTranslation?: string;
};

const Navbar = ({ blogTranslation }: Props): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const router = useRouter();
  const { locale } = router;

  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <nav className="sticky-nav sticky top-0 z-50 mx-auto my-0 flex w-full max-w-4xl items-center justify-between bg-gray-50 p-4 text-gray-900 dark:bg-gray-800 dark:text-gray-100 md:my-4 md:p-4">
      <div>
        <MobileMenu />
        <div>
          <Link href="/">
            <a
              id="nav-home"
              className={`invisible m-1 text-gray-900 dark:text-gray-100 sm:m-4 md:visible ${
                router.asPath === '/' ? 'font-semibold' : ''
              }`}>
              <span className="dark:link-underline link-underline-black py-1">
                {t('main.home')}
              </span>
            </a>
          </Link>
          <Link href="/about">
            <a
              id="nav-about"
              className={`invisible m-1 text-gray-900 dark:text-gray-100 sm:m-4 md:visible ${
                router.pathname === '/about' ? 'font-semibold' : ''
              }`}>
              <span className="dark:link-underline link-underline-black py-1">
                {t('main.about')}
              </span>
            </a>
          </Link>
          <Link href="/projects">
            <a
              id="nav-projects"
              className={`invisible m-1 text-gray-900 dark:text-gray-100 sm:m-4 md:visible ${
                router.pathname === '/projects' ? 'font-semibold' : ''
              }`}>
              <span className="dark:link-underline link-underline-black py-1">
                {t('main.projects')}
              </span>
            </a>
          </Link>
          <Link href="/blog">
            <a
              id="nav-blog"
              className={`invisible m-1 text-gray-900 dark:text-gray-100 sm:m-4 md:visible ${
                router.pathname === '/blog' ? 'font-semibold' : ''
              }`}>
              <span className="dark:link-underline link-underline-black py-1">
                Blog
              </span>
            </a>
          </Link>
          <Link href="/guestbook">
            <a
              id="nav-guestbook"
              className={`m-1 hidden text-gray-900 dark:text-gray-100 sm:m-4 md:inline ${
                router.pathname === '/guestbook' ? 'font-semibold' : ''
              }`}>
              <span className="dark:link-underline link-underline-black py-1">
                {t('guestbook.title')}
              </span>
            </a>
          </Link>
        </div>
      </div>
      <div>
        <button
          id="dark-mode-toggle"
          aria-label="Toggle Dark Mode"
          type="button"
          className="mr-1 h-10 w-10 rounded-lg bg-gray-200 p-3 ring-gray-300 hover:ring-4 dark:bg-gray-700 md:mr-3"
          onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
          {mounted && <ThemeToggleIcon theme={resolvedTheme} />}
        </button>
        <Link
          href={blogTranslation || router.asPath}
          scroll={false}
          shallow={blogTranslation ? false : true}
          locale={locale === 'de' ? 'en' : 'de'}>
          <a
            id="switch-lang"
            className="md:dark:link-underline md:link-underline-black mx-3 pb-1 text-lg tracking-wide">
            {locale === 'de' ? 'EN' : 'DE'}
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
