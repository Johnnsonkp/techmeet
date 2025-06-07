// Tailwind buttons for sign in and signout
import { signIn, signOut } from 'next-auth/react';

export const handleSignIn = () => signIn('google');
export const handleSignOut = () => signOut();
