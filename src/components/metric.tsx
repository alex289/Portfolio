import type { ReactNode } from 'react';

const Metric = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => (
  <div className="w-full rounded-sm border border-gray-200 p-4 shadow-sm dark:border-gray-700">
    <div className="flex items-center text-gray-900 dark:text-gray-100">
      {title}
    </div>
    <p className="spacing-sm mt-2 text-3xl text-black dark:text-white">
      {children ?? '-'}
    </p>
  </div>
);

export default Metric;
