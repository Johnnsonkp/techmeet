// / Re-exports Client-Side Functions fron next-auth
import NextAuth from "next-auth";
import authConfig from "./auth.config"; // split authentication config for security and easy amendment
// Initialize NextAuth
const handler = NextAuth(authConfig);
// Export HTTP methods directly from the handler
export const { GET, POST } = handler;
// Export auth function for server-side usage
export const auth = handler.auth;
// Remove signIn/signOut exports if not locally defined
export { signIn, signOut } from "next-auth/react"; // Only if needed
//-----------------------------------------
// code below had issues with GET, POST handlers due new Auth,js v5 structure
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     }),
//   ],
// });
// // Export handlers (GET/POST) and auth functions
// export const { GET, POST } = handlers;
// export { auth, signIn, signOut };
//---------------------------------------------------
// below is wrong structure as was using NextAuth.js v4
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization : {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//         },
//       },
//     })
//   ],
// });