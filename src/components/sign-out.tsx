'use client';

import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import { authClient } from '@/lib/auth-client';

export const SignOutButton = () => {
  const t = useTranslations();
  const router = useRouter();
  return (
    <button
      onClick={async () =>
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push('/');
            },
          },
        })
      }
      className="underline cursor-pointer">
      {t('dashboard.logout')}
    </button>
  );
};
