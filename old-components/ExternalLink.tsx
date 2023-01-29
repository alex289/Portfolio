import { ReactNode } from 'react';

const ExternalLink = ({
  href,
  children,
  color,
}: {
  href: string;
  children: ReactNode;
  color?: string;
}) => (
  <a
    className={`transition ${
      color ??
      'text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-50'
    }`}
    target="_blank"
    rel="noopener noreferrer"
    href={href}>
    {children}
  </a>
);

export default ExternalLink;
