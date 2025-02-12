import { type DefaultSession } from '@auth/core/types';

declare module 'next-auth' {
  interface Session {
    user: {
      isAdmin: boolean;
    } & DefaultSession['user'];
  }
}
