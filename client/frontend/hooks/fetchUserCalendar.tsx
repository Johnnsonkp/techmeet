import { useAuthStore } from '@/store/authStore'

// getCalendar is a utility async function, not a React hook
export async function getCalendar() {
  // Access tokens from Zustand store
  const token = useAuthStore.getState().access_token;
  const refresh_token = useAuthStore.getState().refresh_token;
  const BASE_URL = 'http://localhost:5328';

  try {
    const response = await fetch(`${BASE_URL}/api/v1/google_calendar/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        access_token: token,
        refresh_token: refresh_token,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data?.message || 'Failed to fetch calendar data');
    }
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
}