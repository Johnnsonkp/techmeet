import { SignInButton, SignOutButton } from './auth.js';

// In your component
{session ? (
  <SignOutButton />
) : (
  <SignInButton />
)}
