'use client';

import { logout } from '@/lib/auth/user';

export function LogoutButton({children}:{children?: React.ReactNode}) {

  const handleLogout = async () => {
    const zustand = await import('@/store/authStore');
    zustand.useAuthStore.getState().logout();
    localStorage.removeItem('tm_jwt');

    logout()
  };

  return <button 
    className="cursor-pointer w-full px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-red-600 flex items-center transition-colors duration-200" onClick={handleLogout}>{children}</button>;
}