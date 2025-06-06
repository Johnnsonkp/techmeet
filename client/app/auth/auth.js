// import GoogleProvider from "next-auth/providers/google";

// providers: [
//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!
//   }),
// ]

import { signIn, signOut } from 'next-auth/react';

export const handleSignIn = () => signIn('google');
export const handleSignOut = () => signOut();