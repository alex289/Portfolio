import Link from 'next/link';

import useTranslation from '@/lib/useTranslation';

import ExternalLink from '@/components/link-external';

export default function Footer(): JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col justify-center px-8 bg-gray-50 dark:bg-gray-900">
      <footer className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-8">
        <hr className="w-full mb-8 border-gray-200 border-1 dark:border-gray-800" />
        <div className="w-full max-w-2xl pb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <Link href="/#top">
              <a
                id="footer-home"
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
              >
                {t('home')}
              </a>
            </Link>
            <Link href="/#about">
              <a
                id="footer-about"
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition"
              >
                {t('about')}
              </a>
            </Link>
            <Link href="/#projects">
              <a
                id="footer-projects"
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
        <p
          className="mx-auto text-sm text-gray-500 dark:text-gray-400"
          id="powered-by"
        >
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
