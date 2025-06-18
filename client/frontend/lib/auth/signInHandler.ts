'use client'

import { signIn } from 'next-auth/react'

export const handleSignIn = async (provider: 'google' | 'github' | 'credentials') => {
  try {
    await signIn(provider)
  } catch (error) {
    console.error(`Error during ${provider} sign-in:`, error)
  }
}