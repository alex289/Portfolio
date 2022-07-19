import { ReactNode } from 'react';

const ExternalLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <a
    className="text-gray-500 transition hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50"
    target="_blank"
    rel="noopener noreferrer"
    href={href}>
    {children}
  </a>
);

export default ExternalLink;
