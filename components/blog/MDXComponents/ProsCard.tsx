import { CheckCircle } from 'lucide-react';

type Props = {
  title: string;
  pros: string[];
};

export default function ProsCard({ title, pros }: Props) {
  return (
    <div className="my-4 w-full rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-900">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
