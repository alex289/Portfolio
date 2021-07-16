import Link from 'next/link';
import { ReactNode } from 'react';

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}>
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-12 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="#top">
            <a className="text-gray-500 hover:text-gray-600 transition">Home</a>
          </Link>
          <Link href="#about">
            <a className="text-gray-500 hover:text-gray-600 transition">
              About
            </a>
          </Link>
          <Link href="#projects">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Projects
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="#">Twitter</ExternalLink>
          <ExternalLink href="https://github.com/Alex289">GitHub</ExternalLink>
          <ExternalLink href="#">Coming soon...</ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://github.com/Alex289/My-config-setup">
            My setup
          </ExternalLink>
          <ExternalLink href="https://github.com/Alex289/Alex289/issues/new?assignees=Alex289&labels=Contact&template=contact-template.md&title=%5BContact%5D+Your-title-here">
            Contact
          </ExternalLink>
          <a
            href="mailto:alexanderkonietzko@gmx.de"
            className="text-gray-500 hover:text-gray-600 transition">
            Email
          </a>
        </div>
      </div>
      <p className="text-gray-400 text-sm mx-auto">
        Powered by{' '}
        <ExternalLink href="https://nextjs.org/">Next.js</ExternalLink> and{' '}
        <ExternalLink href="https://tailwindcss.com/">Tailwindcss</ExternalLink>
        . Hosted on{' '}
        <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>.
      </p>
    </footer>
  );
}
