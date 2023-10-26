import { getServerSession, type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import env from '@/env.js';

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
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
};

export const getServerAuthSession = () => getServerSession(authOptions);
