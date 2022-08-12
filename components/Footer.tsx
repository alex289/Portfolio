import Link from 'next/link';

import useTranslation from '@/lib/useTranslation';

import ExternalLink from '@/components/ExternalLink';
import NowPlaying from '@/components/NowPlaying';

export default function Footer(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-800">
      <footer className="mx-auto mb-8 flex w-full max-w-3xl flex-col items-start justify-center">
        <hr className="mb-8 w-full border border-gray-200 bg-gray-200 dark:border-gray-700 dark:bg-gray-700" />
        <NowPlaying />
        <div className="grid w-full max-w-2xl grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <a
                id="footer-home"
                className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
                {t('main.home')}
              </a>
            </Link>
            <Link href="/about">
              <a
                id="footer-about"
                className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
                {t('main.about')}
              </a>
            </Link>
            <Link href="/projects">
              <a
                id="footer-projects"
                className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
                {t('main.projects')}
              </a>
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <Link href="/blog">
              <a className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
                Blog
              </a>
            </Link>
            <Link href="/guestbook">
              <a className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
                {t('guestbook.title')}
              </a>
            </Link>
            <ExternalLink href="https://github.com/Alex289">
              GitHub
            </ExternalLink>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="https://github.com/Alex289/dotfiles">
              {t('footer.my-setup')}
            </ExternalLink>
            <ExternalLink href="https://github.com/Alex289/Portfolio">
              {t('footer.sourcecode')}
            </ExternalLink>
            <ExternalLink href="https://github.com/Alex289/Alex289/issues/new?assignees=Alex289&labels=Contact&template=contact-template.md&title=%5BContact%5D+Your-title-here">
              {t('footer.contact')}
            </ExternalLink>
          </div>
        </div>
        <p
          className="mx-auto text-sm text-gray-500 dark:text-gray-300"
          id="powered-by">
          {t('footer.powered')}
          <ExternalLink
            href="https://nextjs.org/"
            color="text-primary hover:text-primary-dark">
            Next.js
          </ExternalLink>{' '}
          {t('footer.and')}
          <ExternalLink
            href="https://tailwindcss.com/"
            color="text-primary hover:text-primary-dark">
            TailwindCss
          </ExternalLink>
          . {t('footer.hosted')}
          <ExternalLink
            href="https://vercel.com/"
            color="text-primary hover:text-primary-dark">
            Vercel
          </ExternalLink>
          .
        </p>
      </footer>
    </div>
  );
}
