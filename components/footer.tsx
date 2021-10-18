import { useRouter } from 'next/router';
import Link from 'next/link';
import type { ReactNode } from 'react';

import useTranslation from '@/lib/useTranslation';

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a
    className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer(): JSX.Element {
  const router = useRouter();

  const { t } = useTranslation();

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
    <div className="flex flex-col justify-center px-8 bg-white dark:bg-black">
      <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
        <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
        <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <a
                onClick={(event) => scrollTo(event, 'top')}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
              >
                {t('home')}
              </a>
            </Link>
            <Link href="/">
              <a
                onClick={(event) => scrollTo(event, 'about')}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
              >
                {t('about')}
              </a>
            </Link>
            <Link href="/">
              <a
                onClick={(event) => scrollTo(event, 'projects')}
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
              >
                {t('projects')}
              </a>
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="#">Twitter</ExternalLink>
            <ExternalLink href="https://github.com/Alex289">
              GitHub
            </ExternalLink>
            <Link href="/dashboard">
              <a className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition">
                {t('dashboard')}
              </a>
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="https://github.com/Alex289/My-config-setup">
              {t('my-setup')}
            </ExternalLink>
            <ExternalLink href="https://github.com/Alex289/Portfolio">
              {t('sourcecode')}
            </ExternalLink>
            <ExternalLink href="https://github.com/Alex289/Alex289/issues/new?assignees=Alex289&labels=Contact&template=contact-template.md&title=%5BContact%5D+Your-title-here">
              {t('contact')}
            </ExternalLink>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mx-auto">
          {t('powered')}
          <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink>{' '}
          {t('and')}
          <ExternalLink href="https://tailwindcss.com/">
            TailwindCss
          </ExternalLink>
          . {t('hosted')}
          <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>.
        </p>
      </footer>
    </div>
  );
}
