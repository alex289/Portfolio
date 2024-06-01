import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import env from '@/env.mjs';

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: `${env.NEXT_PUBLIC_WEBSITE_URL}/static/images/konietzko_alexander.png`,
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          isAdmin: session.user?.email === env.ADMIN_EMAIL,
        },
      };
    },
  },
});
