import { getMessages } from '@/app/[locale]/guestbook/actions';
import { getTranslations } from 'next-intl/server';
import { GuestbookMessages } from './guestbook-messages';
import { Skeleton } from '@/components/ui/skeleton';

export async function GuestbookMessagesFeed() {
  const [messages, t] = await Promise.all([
    getMessages(),
    getTranslations('pages.guestbook'),
  ]);

  if (messages.length === 0) {
    return (
      <p className="text-center text-muted-foreground">{t('no-messages')}</p>
    );
  }

  return <GuestbookMessages messages={messages} />;
}

export function GuestbookMessagesSkeleton() {
  return (
    <div className="flex flex-col gap-3 space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
