import {
  customSessionClient,
  lastLoginMethodClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import type { auth } from '@/lib/auth';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  plugins: [lastLoginMethodClient(), customSessionClient<typeof auth>()],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserInfer = authClient.$Infer.Session.user;
export type User = typeof UserInfer;
