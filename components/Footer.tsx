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
        <div className="grid w-full max-w-3xl grid-cols-1 gap-4 pb-12 sm:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              id="footer-home"
              className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
              {t('main.home')}
            </Link>
            <Link
              href="/about"
              id="footer-about"
              className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
              {t('main.about')}
            </Link>
            <Link
              href="/projects"
              id="footer-projects"
              className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
              {t('main.projects')}
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <Link
              href="/blog"
              className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
              Blog
            </Link>
            <Link
              href="/guestbook"
              className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50">
              {t('guestbook.title')}
            </Link>
            <ExternalLink href="https://github.com/alex289">
              GitHub
            </ExternalLink>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="https://github.com/alex289/dotfiles">
              {t('footer.my-setup')}
            </ExternalLink>
            <ExternalLink href="https://github.com/alex289/Portfolio">
              {t('footer.sourcecode')}
            </ExternalLink>
            <ExternalLink href="https://github.com/alex289/Alex289/issues/new?assignees=alex289&labels=Contact&template=contact-template.md&title=%5BContact%5D+Your-title-here">
              {t('footer.contact')}
            </ExternalLink>
          </div>
          <div className="flex flex-col space-y-4">
            <ExternalLink href="https://alexanderkonietzko-analytics.vercel.app/share/iGO3fY48/alexanderkonietzko">
              {t('footer.analytics')}
            </ExternalLink>
            <ExternalLink href="/feed.xml">Feed</ExternalLink>
            <ExternalLink href="/sitemap.xml">
              {t('footer.sitemap')}
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
            TailwindCSS
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
