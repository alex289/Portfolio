import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  theme: {
    colorScheme: 'auto',
    brandColor: '',
    logo: 'https://alexanderkonietzko.vercel.app/static/images/konietzko_alexander.png',
  },
  providers: [
    CredentialsProvider({
      id: 'admin-login',
      name: 'admin login',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {
          isAdmin: true,
        };

        if (credentials?.password === process.env.AUTH_ADMIN_PASSWORD) {
          return user;
        }
        return null;
      },
    }),
  ],
});
