'use client';

import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export const SignOutButton = () => {
  const t = useTranslations();
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="underline cursor-pointer">
      {t('dashboard.logout')}
    </button>
  );
};
