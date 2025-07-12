import { useAuthStore } from '@/store/authStore';

interface AuthData {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    first_name?: string;
    last_name?: string;
    profile_photo_url?: string | null;
    bio?: string | null; // Ensure bio is included if available
  };
  provider?: 'google' | 'github' | 'credentials';
}

// You can make this a regular function that accepts setAuth as a param
export function syncAuthToLocal(authData: AuthData, setAuth: any) {
  const { token, user, provider = 'credentials' } = authData;

  // Save JWT in localStorage
  localStorage.setItem('tm_jwt', token);

  // Update Zustand
  setAuth({
    user: {
      id: user.id,
      email: user.email,
      name: user?.name || user?.first_name, 
      image: user.profile_photo_url || null,
      bio: user?.bio || null, // Ensure bio is included if available
    },
    access_token: token,
    provider,
  });
}
