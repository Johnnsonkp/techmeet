// app/providers/AuthHydrator.tsx
'use client';

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
  provider: string | null;
}

export function AuthHydrator() {
  const { data: session } = useSession();
  const setAuth = useAuthStore((s) => s.setAuth);
  const typedSession = session as Session | null;

  const base_url = process.env.NEXT_PUBLIC_FLASK_BASE_URL

   useEffect(() => {
      if (!typedSession) return;
  
      const sync = async () => {
        const jwt = localStorage.getItem("tm_jwt");
        if (jwt) return; // Already synced
  
        if (!typedSession?.access_token || !typedSession.user?.email || typedSession?.provider !== "google") return;
  
        setAuth({
          user: {
            id: typedSession.user?.id,
            email: typedSession.user?.email || null,
            name: typedSession.user?.name || null,
            image: typedSession.user?.image || null,
          },
          access_token: typedSession?.access_token ?? null,
          provider: typedSession?.provider ?? null,
        });
  
        const res = await fetch(`${base_url}/api/v1/oauth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: typedSession.user.email,
            name: typedSession.user?.name,
            access_token: typedSession?.access_token,
          }),
        });
  
        const data = await res.json();
        
        if (data.token) {
          localStorage.setItem("tm_jwt", data.token);
          console.log("JWT token stored in localStorage");
        } else {
          console.error("Failed to get token from Flask:", data);
        }
      };
  
      sync();
    }, [typedSession]);

  return null; // no UI
}