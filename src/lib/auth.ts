import { betterAuth } from 'better-auth';
import { customSession } from 'better-auth/plugins';

import env from '@/env.mjs';

export const auth = betterAuth({
  appName: 'Alexander Konietzko',
  telemetry: { enabled: false },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    customSession(async ({ user, session }) => {
      return {
        user: {
          ...user,
          isAdmin: user.email === env.ADMIN_EMAIL,
        },
        session,
      };
    }),
  ],
});
