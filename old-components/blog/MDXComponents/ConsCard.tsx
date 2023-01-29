import { XCircle } from 'lucide-react';

type Props = {
  title: string;
  cons: string[];
};

export default function ConsCard({ title, cons }: Props) {
  return (
    <div className="my-6 w-full rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-900">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
