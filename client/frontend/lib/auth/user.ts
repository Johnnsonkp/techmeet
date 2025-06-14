'use server'

import { auth, signOut } from './auth'

import { redirect } from 'next/navigation'

/**
 * Get the currently signed-in user.
 * Works in server components or server actions.
 */
export async function currentUser() {
  console.log("currentUser initiated")
  const session = await auth()
  return session?.user || null
}

/**
 * Get the user's email or token to send to Flask backend.
 * You could customize this to return a JWT or accessToken if using JWT strategy.
 */
export async function getToken() {
  const session = await auth()
  return session?.user?.email ?? null // or use token if you use JWT strategy
}

/**
 * Redirects if user is not authenticated.
 * Use this in protected server components or layouts.
 */
export async function requireAuth() {
  const session = await auth()
  if (!session) {
    redirect('/auth')
  }
}

/**
 * Client-safe logout function.
 * Can be used inside client components.
 */
export async function logout() {
  // Must be called from client
  await signOut({ redirectTo: '/' })
}


export const checkIsAuthenticated = async () => {
  const session = await auth();

  if (session?.user) {
    return true;
  }
  return false;
};