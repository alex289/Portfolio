type Props = {
  number: number;
  title: string;
};

export default function Step({ number, title }: Props) {
  return (
    <div className="step flex items-center py-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 pt-1 font-bold text-blue-500 dark:border-gray-800">
        {number}
      </div>
      <h3 className="ml-3 font-bold tracking-tight">{title}</h3>
    </div>
  );
}
