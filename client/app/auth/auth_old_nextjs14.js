// src/auth.js (or app/auth/auth.js)
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// 1. Define auth options
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers here
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Other options...
};

// 2. Create the auth handler
const handler = NextAuth(authOptions);

// 3. Export for API routes
export { handler as GET, handler as POST };

// 4. Export auth functions
export const auth = () => NextAuth(authOptions);
export const signIn = (provider) => NextAuth(authOptions).signIn(provider);
export const signOut = () => NextAuth(authOptions).signOut();