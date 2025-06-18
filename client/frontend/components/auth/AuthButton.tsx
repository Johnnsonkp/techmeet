'use client'

import Image from 'next/image'
import {handleSignIn} from '../../lib/auth/signInHandler'

interface AuthButtonProps {
  provider: 'google' | 'github'
  label: string
  iconSrc: string
}

export const AuthButton: React.FC<AuthButtonProps> = ({ provider, label, iconSrc }) => {
  return (
    <button
      onClick={() => handleSignIn(provider)}
      className="cursor-pointer my-2 w-full border border-slate-300 rounded px-6 py-3 flex items-center justify-center gap-2 hover:scale-101 transition duration-300 shadow"
    >
      <Image src={iconSrc} alt={`${provider} logo`} width={20} height={20} />
      <span>{label}</span>
    </button>
  )
}