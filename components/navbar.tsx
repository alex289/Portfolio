import { useRouter } from 'next/router';
import Link from 'next/link';

import { useTheme } from 'next-themes';

import useTranslation from '@/lib/useTranslation';
import MobileMenu from '@/components/mobilemenu';

const Navbar = (): JSX.Element => {
  const router = useRouter();
  const { locale } = router;

  const { theme, setTheme } = useTheme();
  const { t, changeLanguage } = useTranslation();

  function scrollTo(event: { preventDefault: () => void }, anchor: string) {
    event && event.preventDefault();

    if (router.pathname !== '/') {
      router.push('/#' + anchor);
    }

    const elementToView = document.getElementById(anchor);
    elementToView?.scrollIntoView();

    history.replaceState(
      '',
      document.title,
      window.location.origin + window.location.pathname + window.location.search
    );
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between w-full max-w-4xl p-4 md:p-8 mx-auto my-0 text-gray-900 bg-white sticky-nav md:my-8 dark:bg-black dark:text-gray-100">
      <div>
        <MobileMenu />
        <div className="md:w-0">
          <Link href="/">
            <a
              id="nav-home"
              onClick={(event) => scrollTo(event, 'top')}
              className="p-1 text-gray-900 sm:p-4 dark:text-gray-100 invisible md:visible"
            >
              {t('home')}
            </a>
          </Link>
          <Link href="/">
            <a
              id="nav-about"
              onClick={(event) => scrollTo(event, 'about')}
              className="p-1 text-gray-900 sm:p-4 dark:text-gray-100 invisible md:visible"
            >
              {t('about')}
            </a>
          </Link>
          <Link href="/">
            <a
              id="nav-projects"
              onClick={(event) => scrollTo(event, 'projects')}
              className="p-1 text-gray-900 sm:p-4 dark:text-gray-100 invisible md:visible"
            >
              {t('projects')}
            </a>
          </Link>
        </div>
      </div>
      <div>
        <button
          id="dark-mode-toggle"
          aria-label="Toggle Dark Mode"
          type="button"
          className="w-10 h-10 p-3 bg-gray-200 rounded-lg dark:bg-gray-800 mr-1 md:mr-3 ring-gray-300 hover:ring-4"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            className="w-4 h-4 text-gray-800 dark:text-gray-200"
          >
            {theme === 'dark' ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            )}
          </svg>
        </button>
        <select
          id="switch-lang"
          onChange={(event) => changeLanguage(event.target.value)}
          defaultValue={locale}
          className="form-select text-shadow-sm text-lg bg-transparent tracking-wide ml-1 md:ml-3 ring-gray-300"
        >
          <option className="text-black" value="en">
            EN
          </option>
          <option className="text-black" value="de">
            DE
          </option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
