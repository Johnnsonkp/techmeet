import { signIn, signOut } from 'next-auth/react';

// Handlers
export const handleSignIn = () => signIn('google');
export const handleSignOut = () => signOut();

// Button Components
export const SignInButton = () => (
  <button
    onClick={handleSignIn}
    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    Sign in with Google
  </button>
);

export const SignOutButton = () => (
  <button
    onClick={handleSignOut}
    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
  >
    Sign Out
  </button>
);