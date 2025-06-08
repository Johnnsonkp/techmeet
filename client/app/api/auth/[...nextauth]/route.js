// Here the GET and POST is being imported from the auth.js file before we export fron here 

// untagged 8th June2025
// export { GET, POST } from "@/app/auth/auth";


// export { GET, POST } from "@/auth";
// import { handlers } from "@/app/auth/auth"; // Your auth config

// export const { GET, POST } = handlers;

// app/api/auth/[...nextauth]/route.ts

// import NextAuth from "next-auth";
// import authConfig from "@/app/auth/auth.config";

// // Initialize NextAuth
// const { handlers, auth } = NextAuth(authConfig);

// // Export HTTP methods directly
// // Export HTTP methods directly
// export const { GET, POST } = handlers;

// // Export auth for server-side usage
// export { auth };

// // Don't export signIn/signOut here - they should be imported directly where needed


// added 8th June , uses newer nextJS 15 with NextAuth 5

// location to be at app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  // JWT option: Add callbacks for custom behavior
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };