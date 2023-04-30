import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import { env } from '@/env.mjs';

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: 'https://alexanderkonietzko.vercel.app/static/images/konietzko_alexander.png',
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID as string,
      clientSecret: env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID as string,
      clientSecret: env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      token.image = token.picture;
      token.isAdmin = token.email === env.ADMIN_EMAIL;
      session.user = token as typeof session.user;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
