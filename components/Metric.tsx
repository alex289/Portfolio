import type { ReactNode } from 'react';

const Metric = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="w-full p-4 border border-gray-200 rounded shadow dark:border-gray-700 max-w-72">
    <div className="flex items-center text-gray-900 dark:text-gray-100">
      {title}
    </div>
    <p className="mt-2 text-3xl font-bold text-black spacing-sm dark:text-white">
      {children}
    </p>
  </div>
);

export default Metric;
