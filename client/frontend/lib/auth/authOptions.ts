import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from 'next-auth'
import { RSC_PREFETCH_SUFFIX } from "next/dist/lib/constants";

export const authOptions: NextAuthConfig = {
  trustHost: true,  // needed for production mode for railway.app
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: 'openid email profile https://www.googleapis.com/auth/calendar',
        }, // Fixed comma added
      },
    }), // Correctly closed GoogleProvider
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization:{
        params: {
          prompt: "consent",
        },
      },
    }), // closed GithubProvider
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.access_token = account.access_token;
        token.provider = account.provider;
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      // You’ll use this in your React app to send data to Flask
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          email: token.email,
        },
        access_token: token.access_token,
        provider: token.provider,
      };
    },
  }
};