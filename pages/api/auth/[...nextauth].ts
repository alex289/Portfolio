import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: 'https://alexanderkonietzko.vercel.app/static/images/konietzko_alexander.png',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      token.image = token.picture;
      session.user = token;
      session.isAdmin = token.email === process.env.ADMIN_EMAIL;

      return session;
    },
  },
};

export default NextAuth(authOptions);
