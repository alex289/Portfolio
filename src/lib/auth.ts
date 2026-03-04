import { betterAuth } from 'better-auth/minimal';
import {
  customSession,
  lastLoginMethod,
  oAuthProxy,
} from 'better-auth/plugins';

export const auth = betterAuth({
  appName: 'Alexander Konietzko',
  telemetry: { enabled: false },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      redirectURI: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/auth/callback/github`,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/api/auth/callback/google`,
    },
  },
  plugins: [
    oAuthProxy(),
    lastLoginMethod(),
    customSession(async ({ user, session }) => {
      return {
        user: {
          ...user,
          isAdmin: user.email === process.env.ADMIN_EMAIL,
        },
        session,
      };
    }),
  ],
});
