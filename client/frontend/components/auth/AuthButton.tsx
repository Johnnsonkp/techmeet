'use client'

import {GoogleOauthSignIn} from '../../lib/flask/api';
import Image from 'next/image'
import {handleSignIn} from '../../lib/auth/signInHandler'
import { useAuthStore } from '@/store/authStore';
import { useSession } from 'next-auth/react';

interface AuthButtonProps {
  provider: 'google' | 'github'
  label: string
  iconSrc: string
  setLoading: (loading: boolean) => void
  setOAuthAction?: any; // Optional for OAuth actions
  pathname?: string; // Optional for passing pathname if needed
}

interface Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  access_token: string | null;
  refresh_token: string | null;
  provider: string | null;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ provider, label, iconSrc, setLoading, setOAuthAction, pathname }) => {
  const setAuth = useAuthStore((s) => s.setAuth);
  
  const handleSignInWithLoadingStatus = async (provider: any, pathname: any) => {
    console.log('handleSignInWithLoadingStatus');

    if (pathname == '/auth/signup') {
      localStorage.setItem('tm_onboarding_required', 'true');
    }
    
    setLoading(true);
    handleSignIn(provider)


    // console.log('after login:');

    // if (pathname == '/auth/signin') {
    //   const { data: session, status } = useSession();
    //   const typedSession = session as Session | null;

    //   console.log('Session data:', typedSession);
    //   const data = await GoogleOauthSignIn(typedSession)

    //   if (data?.token) {
    //     localStorage.setItem('tm_jwt', data.token);
    //     console.log('new_user', data.new_user);
        
    //     setAuth({
    //       user: {
    //         id: data.user?.id,
    //         email: data.user?.email || undefined,
    //         name: data.user?.name || data.user?.first_name || undefined,
    //         image: data.user?.image || data.user?.profile_photo_url || undefined,
    //         bio: data.user?.bio || undefined,
    //       },
    //       access_token: data.token,
    //       refresh_token: data.refresh_token,
    //       provider: data.provider,
    //       oAuth_onboardingRequired: data.new_user || null,
    //     });
    //   } else {
    //     console.error('Flask did not return a valid token:', data);
    //   }
    // }
    

    console.log('setting oauth pathname:', pathname);    
    setOAuthAction(pathname)
    return
  }

  return (
    <button
      // onClick={() => handleSignIn(provider)}
      onClick={() => handleSignInWithLoadingStatus(provider, pathname)}
      className="cursor-pointer my-2 w-full border border-slate-300 rounded px-6 py-3 flex items-center justify-center gap-2 hover:scale-101 transition duration-300 shadow"
    >
      <Image src={iconSrc} alt={`${provider} logo`} width={20} height={20} />
      <span>{label}</span>
    </button>
  )
}