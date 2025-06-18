'use client'

import { signIn, signOut } from 'next-auth/react'

import { logout } from '../../../lib/auth/user'

export const SignInButton: any = () => {
  <button onClick={() => signIn('google')}>Sign in with Google</button>
}

export const SignOutButton: any = () => {
  return (
    <button 
      className='flex align-middle justify-center p-1 w-4 border-2 bg-red-500 w-[110px] text-white' 
      onClick={() => logout()}>Sign Out</button>
  )
}