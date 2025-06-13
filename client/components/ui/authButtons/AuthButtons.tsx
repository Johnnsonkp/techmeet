'use client'

import { signIn, signOut } from 'next-auth/react'

import { logout } from '@/lib/auth/user'

export const SignInButton: any = () => {
  <button onClick={() => signIn('google')}>Sign in with Google</button>
}

// export const SignOutButton: any = () => {
//   return <button className='flex align-middle justify-center p-3 w-5 border-2 bg-red-400 w-[150px]' onClick={() => signOut()}>Sign Out</button>
// }

export const SignOutButton: any = () => {
  return (
    <button 
      className='flex align-middle justify-center p-3 w-5 border-2 bg-red-400 w-[150px]' 
      onClick={() => logout()}>Sign Out</button>
  )
}