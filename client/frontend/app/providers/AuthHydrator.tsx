"use client";

import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

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

export function AuthHydrator() {
  const { data: session, status } = useSession();
  const setAuth = useAuthStore((s) => s.setAuth);
  // const user = useAuthStore((s) => s.user);
  const typedSession = session as Session | null;
  const base_url = process.env.NEXT_PUBLIC_FLASK_BASE_URL;

  useEffect(() => {
    if (status !== 'authenticated' || !typedSession?.user || !typedSession?.access_token) return;

    const onboardingRequired = localStorage.getItem('tm_onboarding_required');
    const jwt = localStorage.getItem('tm_jwt');
    if (jwt) return;

    setAuth({
      user: {
        id: typedSession.user.id,
        email: typedSession.user.email || undefined,
        name: typedSession.user.name || undefined,
        image: typedSession.user.image || undefined,
      },
      access_token: typedSession.access_token,
      refresh_token: typedSession.refresh_token,
      provider: typedSession.provider,
    });

    // if (!onboardingRequired || onboardingRequired === 'true') return;
    // if (onboardingRequired === 'true') return;
    if (onboardingRequired === 'false' && typedSession?.user) {

      (async () => {
        try {
          const res = await fetch(`${base_url}/api/v1/oauth/${typedSession.provider}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: typedSession?.user?.email,
              name: typedSession?.user?.name,
              access_token: typedSession.access_token,
              refresh_token: typedSession.refresh_token,
            }),
          });

          const data = await res.json();

          if (data?.token) {
            localStorage.setItem('tm_jwt', data.token);

            console.log('new_user', data.new_user);
            
            if (data.new_user === true) {
              localStorage.setItem('tm_onboarding_required', 'true');
            } else {
              localStorage.setItem('tm_onboarding_required', 'false');
            }
            
            setAuth({
              user: {
                id: data.user?.id,
                email: data.user?.email || undefined,
                name: data.user?.name || data.user?.first_name || undefined,
                image: data.user?.image || data.user?.profile_photo_url || undefined,
                bio: data.user?.bio || undefined,
              },
              access_token: data.token,
              refresh_token: data.refresh_token,
              provider: data.provider,
              oAuth_onboardingRequired: data.new_user || null,
            });
          } else {
            console.error('Flask did not return a valid token:', data);
          }
        } catch (err) {
          console.error('Error syncing with Flask backend:', err);
        }
        
      })();
      localStorage.setItem('tm_onboarding_required', 'false');
    }

    // if (onboardingRequired === 'true' && typedSession?.user) {
      
    // }
  }, [typedSession, status, setAuth, base_url]);

  return null;
}
