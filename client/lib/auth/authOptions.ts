import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from 'next-auth'

export const authOptions: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        }, // Fixed comma added
      },
    }), // Correctly closed GoogleProvider
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.name !== token.name) {
        token.name = session.name;
        try {
          // await setName(token.name);
          await token.name
        } catch (error) {
          console.error("Failed to set user name:", error);
        }
      }

      if (user) {
        // await clearStaleTokens(); // Clear stale verification tokens from database after a successful sign in
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
}; // Correctly closed export
//--------------------------------