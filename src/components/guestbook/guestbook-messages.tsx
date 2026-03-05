'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useFormatter } from 'next-intl';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { deleteMessage } from '@/app/[locale]/guestbook/actions';

type Message = {
  id: string;
  createdBy: string;
  body: string;
  createdAt: Date;
  isOwn?: boolean;
};

export function GuestbookMessages({ messages }: { messages: Message[] }) {
  const format = useFormatter();

  return (
    <div className="flex flex-col gap-3 space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className="flex gap-3">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback>
              {msg.createdBy.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium">{msg.createdBy}</span>
              <span className="text-muted-foreground text-xs">
                {format.dateTime(msg.createdAt, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </span>
            </div>
            <p className="text-muted-foreground mt-0.5 text-sm wrap-break-word">
              {msg.body}
            </p>
          </div>
          {msg.isOwn ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={async () => await deleteMessage(msg.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      ))}
    </div>
  );
}
