'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const accessToken = useAuthStore((s) => s.access_token);

  useEffect(() => {
    const token = accessToken || localStorage.getItem('tm_jwt');
    if (!token) {
      router.replace('/auth/signin');
    }
  }, [accessToken]);

  return <>{children}</>;
}
