import Link from 'next/link';

import useTranslation from '@/lib/useTranslation';

import ExternalLink from '@/components/link-external';
import NowPlaying from '@/components/now-playing';

export default function Footer(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-800">
      <footer className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-8">
        <hr className="w-full mb-8 border border-gray-200 dark:border-gray-700" />
        <NowPlaying />
        <div className="w-full max-w-2xl pb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <a
                id="footer-home"
                className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition">
                {t('main.home')}
              </a>
            </Link>
            <Link href="/#about">
              <a
                id="footer-about"
                className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition">
                {t('main.about')}
              </a>
            </Link>
            <Link href="/#projects">
              <a
                id="footer-projects"
                className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition">
                {t('main.projects')}
              </a>
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
            <Link href="/blog">
              <a className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition">
                Blog
              </a>
            </Link>
            <Link href="/guestbook">
              <a className="text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50 transition">
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
          <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink>{' '}
          {t('footer.and')}
          <ExternalLink href="https://tailwindcss.com/">
            TailwindCss
          </ExternalLink>
          . {t('footer.hosted')}
          <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>.
        </p>
      </footer>
    </div>
  );
}
