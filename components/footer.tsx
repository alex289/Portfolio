import { useRouter } from 'next/router';
import Link from 'next/link';
import { ReactNode } from 'react';

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

export default function Footer() {
  const router = useRouter();

  const { t } = useTranslation();

  function scrollTo(e: { preventDefault: () => unknown }, anchor: string) {
    e && e.preventDefault();
    if (router.pathname !== '/') {
      router.push('/#' + anchor);
    }
    const elementToView = document.getElementById(anchor);
    elementToView?.scrollIntoView();
  }

  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a
              onClick={(e) => scrollTo(e, 'top')}
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
            >
              {t('home')}
            </a>
          </Link>
          <Link href="/">
            <a
              onClick={(e) => scrollTo(e, 'about')}
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
            >
              {t('about')}
            </a>
          </Link>
          <Link href="/">
            <a
              onClick={(e) => scrollTo(e, 'projects')}
              className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
            >
              {t('projects')}
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="#">Twitter</ExternalLink>
          <ExternalLink href="https://github.com/Alex289">GitHub</ExternalLink>
          <ExternalLink href="#">{t('comming-soon')}</ExternalLink>
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
        <ExternalLink href="https://tailwindcss.com/">TailwindCss</ExternalLink>
        . {t('hosted')}
        <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>.
      </p>
    </footer>
  );
}
