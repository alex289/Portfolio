import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import env from '@/env.js';
import NextAuth, { type Session } from 'next-auth';
import { type NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const {
  handlers: { GET, POST },
  auth,
}: {
  auth: () => Promise<Session | null>;
  handlers: {
    GET: (req: NextRequest) => Promise<Response>;
    POST: (req: NextRequest) => Promise<Response>;
  };
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
    session: ({ session, token }) => {
      token.image = token.picture;
      token.isAdmin = token.email === env.ADMIN_EMAIL;
      session.user = token as typeof session.user;

      return session;
    },
  },
});
