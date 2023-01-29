import { AlertCircle } from 'lucide-react';

export default function ErrorMessage({ children }: { children: string }) {
  return (
    <p className="flex items-center text-sm font-bold text-red-800 dark:text-red-400">
      <AlertCircle className="mr-2 h-4 w-4" />
      {children}
    </p>
  );
}
