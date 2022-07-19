import type { ReactNode } from 'react';

const Metric = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => (
  <div className="max-w-72 w-full rounded border border-gray-200 p-4 shadow dark:border-gray-700">
    <div className="flex items-center text-gray-900 dark:text-gray-100">
      {title}
    </div>
    <p className="spacing-sm mt-2 text-3xl font-bold text-black dark:text-white">
      {children || '-'}
    </p>
  </div>
);

export default Metric;
