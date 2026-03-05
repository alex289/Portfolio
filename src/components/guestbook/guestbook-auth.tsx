'use client';

import { useTranslations } from 'next-intl';
import { authClient, User } from '@/lib/auth-client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import GitHubIcon from '../icons/github';
import GoogleIcon from '../icons/google';
import { getInitials } from '@/lib/utils';
import { LogOut } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Badge } from '../ui/badge';
import { useEffect, useState } from 'react';

export function SignInButtons() {
  const t = useTranslations('pages.guestbook.auth');
  const [lastMethod, setLastMethod] = useState<string | null>(null);

  // Hydration error fix
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLastMethod(authClient.getLastUsedLoginMethod());
  }, []);

  return (
    <div className="border-border flex flex-col items-center gap-4 rounded-lg border p-8">
      <p className="text-muted-foreground">{t('sign-in-prompt')}</p>
      <div className="flex flex-col gap-3 md:flex-row">
        <Button
          className="md:flex-1"
          variant={lastMethod === 'github' ? 'default' : 'outline'}
          onClick={async () =>
            await authClient.signIn.social({
              provider: 'github',
              callbackURL: '/guestbook',
            })
          }>
          <GitHubIcon className="mr-2" />
          {t('sign-in-github')}
          {lastMethod === 'github' && (
            <Badge className="ml-2" variant="secondary">
              Last used
            </Badge>
          )}
        </Button>
        <Button
          className="md:flex-1"
          variant={lastMethod === 'google' ? 'default' : 'outline'}
          onClick={async () =>
            await authClient.signIn.social({
              provider: 'google',
              callbackURL: '/guestbook',
            })
          }>
          <GoogleIcon className="mr-2" />
          {t('sign-in-google')}
          {lastMethod === 'google' && (
            <Badge className="ml-2" variant="secondary">
              Last used
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
}

export function UserInfo({ user }: { user: User }) {
  const t = useTranslations('pages.guestbook.auth');
  const router = useRouter();

  async function logOut() {
    await authClient.signOut();
    router.refresh();
  }
  return (
    <div className="flex items-center justify-between">
      <div className="text-muted-foreground flex items-center gap-2 text-sm">
        <Avatar className="h-6 w-6">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <span>
          {t('signed-in-as')}{' '}
          <strong className="text-foreground">{user.name}</strong>
        </span>
      </div>
      <Button variant="ghost" size="sm" onClick={async () => await logOut()}>
        <LogOut className="mr-2" />
        {t('sign-out')}
      </Button>
    </div>
  );
}
