import { customSessionClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import env from '@/env.mjs';

import type { auth } from '@/lib/auth';

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_WEBSITE_URL,
  plugins: [customSessionClient<typeof auth>()],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserInfer = authClient.$Infer.Session.user;
export type User = typeof UserInfer;
