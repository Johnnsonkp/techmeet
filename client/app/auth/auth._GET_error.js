// import NextAuth from "next-auth";

// export const {
//   handlers: { GET, POST},
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   providers: [
//       // add alternative authenicator
//   ],
// });


// src/auth.js (or wherever your auth config is)
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define your authentication options
// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt:"consent",
//           access_type: "offline",
//           response_type: "code",
//         }
//       }
//     }),
//     // Add other providers here
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       // Add custom JWT handling if needed
//       return token;
//     },
//     async session({ session, token }) {
//       // Add custom session handling if needed
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   // Other NextAuth options...
// };

// // Create the handler
// const handler = NextAuth(authOptions);

// // Export for API routes
// export { handler as GET, handler as POST };

// // Export named functions for direct use
// export const auth = () => NextAuth(authOptions);
// export const signIn = () => NextAuth(authOptions).signIn;
// export const signOut = () => NextAuth(authOptions).signOut;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
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
    })
  ],
});

