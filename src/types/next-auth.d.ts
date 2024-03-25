import { type DefaultSession } from '@auth/core/types';

declare module '@auth/core/types' {
  interface Session {
    user: {
      isAdmin: boolean;
    } & DefaultSession['user'];
  }
}
