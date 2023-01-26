import { CheckCircle2 } from 'lucide-react';

export default function SuccessMessage({ children }: { children: string }) {
  return (
    <p className="flex items-center text-sm font-bold text-green-700 dark:text-green-400">
      <CheckCircle2 className="mr-2 h-4 w-4" />
      {children}
    </p>
  );
}
